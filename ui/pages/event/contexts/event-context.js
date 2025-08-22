import { useTracker } from 'meteor/react-meteor-data';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCommunities } from '../../../contexts/communities-context';
import { Meteor } from 'meteor/meteor';
import { People } from '../../../../people/people';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { selectedCommunityId } = useCommunities();

  const [displayedCount, setDisplayedCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loadingActions, setLoadingActions] = useState(new Set());

  const { people, peopleReady } = useTracker(() => {
    if (!selectedCommunityId) {
      return { people: [], peopleReady: true };
    }
    const handle = Meteor.subscribe('people.byCommunity', selectedCommunityId);
    const ready = handle.ready();
    const items = ready
      ? People.find(
          { communityId: selectedCommunityId },
          { sort: { lastName: 1, firstName: 1 } }
        ).fetch()
      : [];
    return { people: items, peopleReady: ready };
  }, [selectedCommunityId]);

  const filteredPeople = useMemo(() => {
    let filtered = people;

    if (activeTab === 'checked-in') {
      filtered = people.filter((p) => p.checkInAt && !p.checkOutAt);
    } else if (activeTab === 'checked-out') {
      filtered = people.filter((p) => p.checkOutAt);
    }

    if (!searchTerm.trim()) return filtered;
    const searchLower = searchTerm.toLowerCase().trim();
    return filtered.filter((person) => {
      const fullName = `${person.firstName || ''} ${person.lastName || ''}`
        .trim()
        .toLowerCase();
      const company = (person.companyName || '').toLowerCase();
      const title = (person.title || '').toLowerCase();
      return (
        fullName.includes(searchLower) ||
        company.includes(searchLower) ||
        title.includes(searchLower)
      );
    });
  }, [people, searchTerm, activeTab]);

  const { currentCount, companyBreakdown, notCheckedInCount } = useMemo(() => {
    const currentlyIn = people.filter((p) => p.checkInAt && !p.checkOutAt);
    const breakdown = currentlyIn.reduce((acc, p) => {
      const key = p.companyName || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const notIn = people.filter(
      (p) => !p.checkInAt || (p.checkInAt && p.checkOutAt)
    ).length;
    return {
      currentCount: currentlyIn.length,
      companyBreakdown: breakdown,
      notCheckedInCount: notIn,
    };
  }, [people]);

  const analytics = useMemo(() => {
    const checkedOutPeople = people.filter((p) => p.checkOutAt);

    const avgStayTime =
      checkedOutPeople.length > 0
        ? checkedOutPeople.reduce((sum, p) => {
            const checkIn = new Date(p.checkInAt).getTime();
            const checkOut = new Date(p.checkOutAt).getTime();
            return sum + (checkOut - checkIn);
          }, 0) / checkedOutPeople.length
        : 0;

    const hourlyCheckins = {};
    people.forEach((p) => {
      if (p.checkInAt) {
        const hour = new Date(p.checkInAt).getHours();
        hourlyCheckins[hour] = (hourlyCheckins[hour] || 0) + 1;
      }
    });

    const peakHour = Object.entries(hourlyCheckins).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      avgStayTime: Math.round(avgStayTime / (1000 * 60)), // in minutes
      peakHour: peakHour ? `${peakHour[0]}:00` : 'N/A',
      totalCompanies: Object.keys(companyBreakdown).length,
    };
  }, [people, companyBreakdown]);

  useEffect(() => {
    setDisplayedCount(20);
  }, [searchTerm, activeTab]);

  const loadMore = () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + 20);
      setIsLoadingMore(false);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoadingMore ||
        filteredPeople.length <= displayedCount
      ) {
        return;
      }

      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, filteredPeople.length, displayedCount]);

  const value = useMemo(
    () => ({
      people,
      peopleReady,
      currentCount,
      companyBreakdown,
      notCheckedInCount,
      analytics,
      filteredPeople,
      searchTerm,
      activeTab,
      setSearchTerm,
      setActiveTab,
      loadingActions,
      setLoadingActions,
      displayedCount,
      isLoadingMore,
      loadMore,
    }),
    [
      people,
      peopleReady,
      currentCount,
      companyBreakdown,
      notCheckedInCount,
      analytics,
      filteredPeople,
      searchTerm,
      activeTab,
      setSearchTerm,
      setActiveTab,
      loadingActions,
      setLoadingActions,
      displayedCount,
    ]
  );

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
