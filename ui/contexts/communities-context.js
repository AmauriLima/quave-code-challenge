
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Communities } from '../../communities/communities';

export const CommunitiesContext = createContext(null);

export const CommunitiesProvider = ({ children }) => {
  const getInitialEventId = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('event') || '';
    }
    return '';
  };

  const { communities, communitiesReady } = useTracker(() => {
    const handle = Meteor.subscribe('communities');
    const ready = handle.ready();
    const items = ready ? Communities.find({}, { sort: { name: 1 } }).fetch() : [];
    return { communities: items, communitiesReady: ready };
  }, []);

  const [selectedCommunityId, setSelectedCommunityId] = useState(getInitialEventId());
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    if (selectedCommunityId) {
      setSelectedCommunity(communities.find(c => c._id === selectedCommunityId));
    }
  }, [selectedCommunityId, communities]);

  const updateSelectedEvent = (eventId) => {
    setSelectedCommunityId(eventId);
    
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (eventId) {
        url.searchParams.set('event', eventId);
        const selectedEvent = communities.find(c => c._id === eventId);
        if (selectedEvent) {
          document.title = `Event Check-in - ${selectedEvent.name}`;
        }
      } else {
        url.searchParams.delete('event');
        document.title = 'Event Check-in';
      }
      window.history.pushState({}, '', url);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const eventFromUrl = urlParams.get('event') || '';
      if (eventFromUrl !== selectedCommunityId) {
        setSelectedCommunityId(eventFromUrl);
      }
    };

    window?.addEventListener('popstate', handlePopState);

    return () => window?.removeEventListener('popstate', handlePopState);
  }, [selectedCommunityId]);

  const value = useMemo(() => ({
    selectedCommunityId,
    selectedCommunity,
    setSelectedCommunityId,
    setSelectedCommunity,
    updateSelectedEvent,
    communities,
    communitiesReady,
  }), [selectedCommunityId, selectedCommunity, updateSelectedEvent, communities, communitiesReady]);

  return (
    <CommunitiesContext.Provider value={value}>
      {children}
    </CommunitiesContext.Provider>
  );
}

export const useCommunities = () => useContext(CommunitiesContext);