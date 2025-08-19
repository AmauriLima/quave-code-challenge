import React from 'react';
import { useEvent } from '../../contexts/event-context';

export function SummaryModal(props) {
  const { 
    showSummaryModal, 
    setShowSummaryModal, 
  } = props;

  const { people, currentCount, notCheckedInCount, analytics } = useEvent();

  if (!showSummaryModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-4 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setShowSummaryModal(false)}
          />

        <div className="inline-block align-middle bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto animate-in slide-in-from-bottom duration-500">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Event Summary</h3>
                <p className="text-sm text-white/70 mt-2">Quick overview of event statistics</p>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-5 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-purple-100 font-semibold text-sm sm:text-base">Current attendee count</span>
                    <p className="text-xs text-white/60 mt-1">People currently present</p>
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-white">{currentCount}</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold text-sm sm:text-base">Not checked in</span>
                    <p className="text-xs text-white/60 mt-1">Haven't arrived yet</p>
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">{notCheckedInCount}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-5 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-emerald-100 font-semibold text-sm sm:text-base">Total participants</span>
                    <p className="text-xs text-white/60 mt-1">Registered for event</p>
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">{people.length}</span>
                </div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-4 text-center shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-lg font-bold text-white">{analytics.avgStayTime}</div>
                  <div className="text-xs text-amber-100 mt-1">Avg Stay (min)</div>
                </div>
                <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-violet-400/30 rounded-2xl p-4 text-center shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-lg font-bold text-white">{analytics.peakHour}</div>
                  <div className="text-xs text-violet-100 mt-1">Peak Hour</div>
                </div>
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-4 text-center shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-lg font-bold text-white">{analytics.totalCompanies}</div>
                  <div className="text-xs text-cyan-100 mt-1">Companies</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border-t border-white/20 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={() => setShowSummaryModal(false)}
              className="w-full sm:w-auto inline-flex justify-center rounded-xl border border-slate-400/30 shadow-lg px-6 py-3 bg-gradient-to-r from-slate-500/80 to-slate-600/80 backdrop-blur-sm text-base font-semibold text-white hover:from-slate-600/90 hover:to-slate-700/90 transition-all duration-300 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}