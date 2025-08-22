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
    const headers = [
      'Name',
      'Company',
      'Title',
      'Check-in Time',
      'Check-out Time',
      'Status',
    ];
    const rows = people.map((person) => {
      const fullName =
        `${person.firstName || ''} ${person.lastName || ''}`.trim();
      const checkInTime = person.checkInAt
        ? formatDateTime(person.checkInAt)
        : 'N/A';
      const checkOutTime = person.checkOutAt
        ? formatDateTime(person.checkOutAt)
        : 'N/A';
      const status =
        person.checkInAt && !person.checkOutAt
          ? 'Present'
          : person.checkOutAt
            ? 'Checked Out'
            : 'Not Checked In';

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
      .map((row) => row.map((field) => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${selectedCommunity?.name || 'event'}_report.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastNotification('Report exported successfully! 📊');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/20 bg-white/10 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateSelectedEvent('')}
              className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
              title="Back to event selection"
              aria-label="Back to event selection"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-xl font-bold text-transparent">
                {selectedCommunity?.name}
              </h1>
              <p className="text-sm text-slate-300">Manage participants</p>
            </div>
          </div>

          <div className="mx-8 hidden max-w-md flex-1 md:flex">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-5 w-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, company, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-2xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:border-transparent focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`rounded-xl border p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                soundEnabled
                  ? 'border-emerald-400/30 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                  : 'border-white/20 bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {soundEnabled ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H2v-6h3.586l5.707-5.707A1 1 0 0113 4v16a1 1 0 01-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                )}
              </svg>
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-500/80 to-pink-500/80 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-purple-600/90 hover:to-pink-600/90"
              title="Export report"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="hidden lg:inline">Export</span>
            </button>

            <button
              onClick={() => setShowBulkActions(true)}
              className="flex items-center space-x-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
              title="Bulk actions"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="hidden lg:inline">Bulk</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
