import React from 'react';
import { useEvent } from '../../contexts/event-context';

export function Summary(props) {
  const { 
    setShowCompanyModal,
    setShowSummaryModal,
  } = props;

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
    <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="hidden sm:flex gap-6 mb-6">
          <div className="flex-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-4 flex items-center justify-between shadow-xl hover:scale-105 transition-all duration-300">
            <div>
              <span className="text-purple-100 font-medium text-sm">Currently present</span>
              <div className="text-white/60 text-xs mt-1">Active participants</div>
            </div>
            <span className="text-3xl font-bold text-white">{currentCount}</span>
          </div>
          
          <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-xl hover:scale-105 transition-all duration-300">
            <div>
              <span className="text-white font-medium text-sm">Not checked in</span>
              <div className="text-white/60 text-xs mt-1">Pending arrivals</div>
            </div>
            <span className="text-2xl font-bold text-white">{notCheckedInCount}</span>
          </div>
          
          <div className="flex-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-4 flex items-center justify-between shadow-xl hover:scale-105 transition-all duration-300">
            <div>
              <span className="text-emerald-100 font-medium text-sm">Total</span>
              <div className="text-white/60 text-xs mt-1">All registered</div>
            </div>
            <span className="text-2xl font-bold text-white">{people.length}</span>
          </div>
          
                      <div className="flex-shrink-0 space-x-3 flex">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-4 shadow-xl hover:scale-105 transition-all duration-300">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 100 100">
                  {Object.entries(companyBreakdown).length > 0 ? (
                    (() => {
                      let cumulativePercentage = 0;
                      const colors = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
                      return Object.entries(companyBreakdown).map(([company, count], index) => {
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
                      });
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
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Analytics</div>
                <div className="text-white/70 text-xs">{analytics.totalCompanies} companies</div>
              </div>
            </div>

            <button
              onClick={() => setShowCompanyModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-medium hover:from-purple-600/90 hover:to-pink-600/90 transition-all duration-300 shadow-xl shadow-purple-500/25 border border-purple-400/30 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Companies</span>
            </button>
          </div>
        </div>

        <div className="sm:hidden mb-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{currentCount}</div>
                <div className="text-xs text-white/70">Present</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-xl font-bold text-white">{people.length}</div>
                <div className="text-xs text-white/70">Total</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCompanyModal(true)}
                className="flex items-center space-x-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-medium hover:from-purple-600/90 hover:to-pink-600/90 transition-all duration-300 shadow-lg border border-purple-400/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="hidden xs:inline">Companies</span>
              </button>
              <button
                onClick={() => setShowSummaryModal(true)}
                className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="hidden xs:inline">Details</span>
              </button>
            </div>
          </div>
        </div>

        <div className="sm:hidden mb-6">
          <div className="relative">
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

        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20 shadow-xl">
          <div 
            className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 ease-in-out border border-purple-400/50"
            style={{
              width: '33.333%',
              left: activeTab === 'all' ? '0%' : activeTab === 'checked-in' ? '33.333%' : '66.666%',
            }}
          />
          
          <div className="relative flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${
                activeTab === 'all'
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              All ({people.length})
            </button>
            <button
              onClick={() => setActiveTab('checked-in')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${
                activeTab === 'checked-in'
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Checked-in ({currentCount})
            </button>
            <button
              onClick={() => setActiveTab('checked-out')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${
                activeTab === 'checked-out'
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Checked-out ({people.filter(p => p.checkOutAt).length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 