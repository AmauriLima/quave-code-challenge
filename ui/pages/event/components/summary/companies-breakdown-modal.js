import React from 'react';
import { useEvent } from '../../contexts/event-context';

export function CompaniesBreakdownModal(props) {
  const { showCompanyModal, setShowCompanyModal } = props;

  const { companyBreakdown, currentCount } = useEvent();

  if (!showCompanyModal) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 overflow-y-auto duration-300">
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setShowCompanyModal(false)}
        />

        <div className="animate-in slide-in-from-bottom inline-block transform overflow-hidden rounded-3xl border border-white/20 bg-white/10 text-left align-bottom shadow-2xl backdrop-blur-xl transition-all duration-500 sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
          <div className="px-6 pb-6 pt-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-2xl font-bold text-transparent">
                  Company Breakdown
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Current attendees by company affiliation
                </p>
              </div>
              <button
                onClick={() => setShowCompanyModal(false)}
                className="rounded-xl border border-white/20 p-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
                aria-label="Close"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className="max-h-96 overflow-y-auto overflow-x-hidden pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.3) transparent',
              }}
            >
              {Object.keys(companyBreakdown).length === 0 ? (
                <div className="py-16 text-center">
                  <div className="relative">
                    <svg
                      className="mx-auto mb-6 h-16 w-16 text-white/40"
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
                    <div className="absolute left-1/2 top-4 h-16 w-16 -translate-x-1/2 transform animate-pulse rounded-full bg-purple-400/20 blur-xl" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    No attendees present
                  </h3>
                  <p className="text-white/60">
                    Company breakdown will appear here when people check in
                  </p>
                </div>
              ) : (
                <div className="mr-2 space-y-4">
                  {Object.entries(companyBreakdown)
                    .sort((a, b) => b[1] - a[1])
                    .map(([company, count], index) => {
                      const percentage = ((count / currentCount) * 100).toFixed(
                        1
                      );
                      const colors = [
                        'from-purple-500/20 to-pink-500/20 border-purple-400/30',
                        'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
                        'from-emerald-500/20 to-teal-500/20 border-emerald-400/30',
                        'from-amber-500/20 to-orange-500/20 border-amber-400/30',
                        'from-rose-500/20 to-pink-500/20 border-rose-400/30',
                      ];
                      const colorClass = colors[index % colors.length];

                      return (
                        <div key={company} className="group">
                          <div
                            className={`bg-gradient-to-r ${colorClass} rounded-2xl border p-5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-r from-white/20 to-white/10 font-bold text-white shadow-lg backdrop-blur-sm">
                                    #{index + 1}
                                  </div>
                                  {index === 0 && (
                                    <div className="absolute -right-1 -top-1">
                                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-amber-400">
                                        <svg
                                          className="h-3 w-3 text-yellow-900"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-bold text-white transition-colors group-hover:text-white">
                                    {company}
                                  </h4>
                                  <p className="text-sm text-white/70">
                                    {percentage}% of current attendees
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="mb-1 text-3xl font-bold text-white">
                                  {count}
                                </div>
                                <div className="text-xs font-medium uppercase tracking-wider text-white/60">
                                  {count === 1 ? 'person' : 'people'}
                                </div>
                              </div>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-white/60 to-white/40 shadow-lg transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            s
            {Object.keys(companyBreakdown).length > 0 && (
              <div className="mt-6 border-t border-white/20 pt-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                      <span className="font-medium text-white/80">
                        {Object.keys(companyBreakdown).length}{' '}
                        {Object.keys(companyBreakdown).length === 1
                          ? 'company'
                          : 'companies'}{' '}
                        represented
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">
                        {currentCount}
                      </span>
                      <span className="text-white/60">
                        total attendees present
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse space-y-2 space-y-reverse border-t border-white/20 bg-white/5 px-6 py-4 sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0">
            <button
              type="button"
              onClick={() => setShowCompanyModal(false)}
              className="inline-flex w-full justify-center rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-500/80 to-pink-500/80 px-6 py-3 text-base font-semibold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-purple-600/90 hover:to-pink-600/90 sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
