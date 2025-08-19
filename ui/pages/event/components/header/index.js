import React from 'react';
import { formatDateTime } from '../../../../utils/format-date-time';
import { useSound } from '../../../../contexts/sound-context';
import { useToast } from '../../../../contexts/toast-context';
import { useEvent } from '../../contexts/event-context';
import { useCommunities } from '../../../../contexts/communities-context';

export function Header(props) {
  const { setShowBulkActions } = props;

  const { updateSelectedEvent, selectedCommunity } = useCommunities();
  const { setToastNotification } = useToast();
  const { soundEnabled, setSoundEnabled } = useSound();

  const { people, searchTerm, setSearchTerm } = useEvent();

  const exportToCSV = () => {
    const headers = ['Name', 'Company', 'Title', 'Check-in Time', 'Check-out Time', 'Status'];
    const rows = people.map(person => {
      const fullName = `${person.firstName || ''} ${person.lastName || ''}`.trim();
      const checkInTime = person.checkInAt ? formatDateTime(person.checkInAt) : 'N/A';
      const checkOutTime = person.checkOutAt ? formatDateTime(person.checkOutAt) : 'N/A';
      const status = person.checkInAt && !person.checkOutAt ? 'Present' : 
                   person.checkOutAt ? 'Checked Out' : 'Not Checked In';
      
      return [
        fullName,
        person.companyName || '',
        person.title || '',
        checkInTime,
        checkOutTime,
        status,
      ];
    });

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedCommunity?.name || 'event'}_report.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setToastNotification('Report exported successfully! 📊');
  };

  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateSelectedEvent('')}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
              title="Back to event selection"
              aria-label="Back to event selection"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                {selectedCommunity?.name}
              </h1>
              <p className="text-sm text-slate-300">Manage participants</p>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, company, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${
                soundEnabled 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/30' 
                  : 'bg-white/10 text-white/60 border-white/20 hover:bg-white/20'
              }`}
              title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {soundEnabled ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H2v-6h3.586l5.707-5.707A1 1 0 0113 4v16a1 1 0 01-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                )}
              </svg>
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-purple-600/90 hover:to-pink-600/90 transition-all duration-300 shadow-lg shadow-purple-500/25 border border-purple-400/30 hover:scale-105"
              title="Export report"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden lg:inline">Export</span>
            </button>

            <button
              onClick={() => setShowBulkActions(true)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20 hover:scale-105"
              title="Bulk actions"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden lg:inline">Bulk</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}