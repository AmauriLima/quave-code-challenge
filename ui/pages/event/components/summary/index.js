import React from 'react';
import { useEvent } from '../../contexts/event-context';

export function Summary(props) {
  const { setShowCompanyModal, setShowSummaryModal } = props;

  const {
    people,
    currentCount,
    companyBreakdown,
    notCheckedInCount,
    analytics,
    searchTerm,
    activeTab,
    setSearchTerm,
    setActiveTab,
  } = useEvent();

  return (
    <div className="sticky top-20 z-10 border-b border-white/20 bg-white/10 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 hidden gap-6 sm:flex">
          <div className="flex flex-1 items-center justify-between rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <div>
              <span className="text-sm font-medium text-purple-100">
                Currently present
              </span>
              <div className="mt-1 text-xs text-white/60">
                Active participants
              </div>
            </div>
            <span className="text-3xl font-bold text-white">
              {currentCount}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <div>
              <span className="text-sm font-medium text-white">
                Not checked in
              </span>
              <div className="mt-1 text-xs text-white/60">Pending arrivals</div>
            </div>
            <span className="text-2xl font-bold text-white">
              {notCheckedInCount}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-between rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <div>
              <span className="text-sm font-medium text-emerald-100">
                Total
              </span>
              <div className="mt-1 text-xs text-white/60">All registered</div>
            </div>
            <span className="text-2xl font-bold text-white">
              {people.length}
            </span>
          </div>

          <div className="flex flex-shrink-0 space-x-3">
            <div className="flex items-center space-x-3 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <div className="relative h-14 w-14">
                <svg
                  className="h-14 w-14 -rotate-90 transform"
                  viewBox="0 0 100 100"
                >
                  {Object.entries(companyBreakdown).length > 0 ? (
                    (() => {
                      let cumulativePercentage = 0;
                      const colors = [
                        '#8b5cf6',
                        '#ec4899',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                      ];
                      return Object.entries(companyBreakdown).map(
                        ([company, count], index) => {
                          const percentage = (count / currentCount) * 100;
                          const strokeDasharray = `${percentage} ${100 - percentage}`;
                          const strokeDashoffset = -cumulativePercentage;
                          cumulativePercentage += percentage;

                          return (
                            <circle
                              key={company}
                              cx="50"
                              cy="50"
                              r="15.915"
                              fill="transparent"
                              stroke={colors[index % colors.length]}
                              strokeWidth="10"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                            />
                          );
                        }
                      );
                    })()
                  ) : (
                    <circle
                      cx="50"
                      cy="50"
                      r="15.915"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="10"
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-white" />
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Analytics
                </div>
                <div className="text-xs text-white/70">
                  {analytics.totalCompanies} companies
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCompanyModal(true)}
              className="flex items-center space-x-2 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/80 to-pink-500/80 px-6 py-4 font-medium text-white shadow-xl shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-purple-600/90 hover:to-pink-600/90"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>Companies</span>
            </button>
          </div>
        </div>

        <div className="mb-6 sm:hidden">
          <div className="flex items-center justify-between rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {currentCount}
                </div>
                <div className="text-xs text-white/70">Present</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {people.length}
                </div>
                <div className="text-xs text-white/70">Total</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCompanyModal(true)}
                className="flex items-center space-x-1 rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-500/80 to-pink-500/80 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-purple-600/90 hover:to-pink-600/90"
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="xs:inline hidden">Companies</span>
              </button>
              <button
                onClick={() => setShowSummaryModal(true)}
                className="flex items-center space-x-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="xs:inline hidden">Details</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:hidden">
          <div className="relative">
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

        <div className="relative rounded-2xl border border-white/20 bg-white/10 p-1 shadow-xl backdrop-blur-sm">
          <div
            className="absolute bottom-1 top-1 rounded-xl border border-purple-400/50 bg-gradient-to-r from-purple-500/80 to-pink-500/80 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out"
            style={{
              width: '33.333%',
              left:
                activeTab === 'all'
                  ? '0%'
                  : activeTab === 'checked-in'
                    ? '33.333%'
                    : '66.666%',
            }}
          />

          <div className="relative flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`relative z-10 flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'all'
                  ? 'font-semibold text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              All ({people.length})
            </button>
            <button
              onClick={() => setActiveTab('checked-in')}
              className={`relative z-10 flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'checked-in'
                  ? 'font-semibold text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Checked-in ({currentCount})
            </button>
            <button
              onClick={() => setActiveTab('checked-out')}
              className={`relative z-10 flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'checked-out'
                  ? 'font-semibold text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Checked-out ({people.filter((p) => p.checkOutAt).length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
