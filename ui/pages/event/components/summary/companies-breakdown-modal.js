import React from 'react';
import { useEvent } from '../../contexts/event-context';

export function CompaniesBreakdownModal(props) {
  const { showCompanyModal, setShowCompanyModal } = props;

  const { companyBreakdown, currentCount } = useEvent();

  if (!showCompanyModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setShowCompanyModal(false)}
          />

        <div className="inline-block align-bottom bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full animate-in slide-in-from-bottom duration-500">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Company Breakdown</h3>
                <p className="text-sm text-white/70 mt-2">Current attendees by company affiliation</p>
              </div>
              <button
                onClick={() => setShowCompanyModal(false)}
                className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto overflow-x-hidden pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent'}}>
              {Object.keys(companyBreakdown).length === 0 ? (
                <div className="text-center py-16">
                  <div className="relative">
                    <svg className="w-16 h-16 text-white/40 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No attendees present</h3>
                  <p className="text-white/60">Company breakdown will appear here when people check in</p>
                </div>
              ) : (
                <div className="space-y-4 mr-2">
                  {Object.entries(companyBreakdown)
                    .sort((a, b) => b[1] - a[1])
                    .map(([company, count], index) => {
                      const percentage = ((count / currentCount) * 100).toFixed(1);
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
                          <div className={`bg-gradient-to-r ${colorClass} backdrop-blur-sm border rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl`}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold border border-white/20 shadow-lg">
                                    #{index + 1}
                                  </div>
                                  {index === 0 && (
                                    <div className="absolute -top-1 -right-1">
                                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-white text-lg group-hover:text-white transition-colors">{company}</h4>
                                  <p className="text-white/70 text-sm">{percentage}% of current attendees</p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-3xl font-bold text-white mb-1">{count}</div>
                                <div className="text-xs text-white/60 uppercase tracking-wider font-medium">
                                  {count === 1 ? 'person' : 'people'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
                              <div 
                                className="h-full bg-gradient-to-r from-white/60 to-white/40 transition-all duration-1000 ease-out rounded-full shadow-lg"
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
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                      <span className="text-white/80 font-medium">
                        {Object.keys(companyBreakdown).length} {Object.keys(companyBreakdown).length === 1 ? 'company' : 'companies'} represented
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-lg">{currentCount}</span>
                      <span className="text-white/60">total attendees present</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/5 border-t border-white/20 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={() => setShowCompanyModal(false)}
              className="w-full sm:w-auto inline-flex justify-center rounded-xl border border-purple-400/30 shadow-xl px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-base font-semibold text-white hover:from-purple-600/90 hover:to-pink-600/90 transition-all duration-300 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}