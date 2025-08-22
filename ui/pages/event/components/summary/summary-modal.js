import React from 'react';
import { useEvent } from '../../contexts/event-context';

export function SummaryModal(props) {
  const { showSummaryModal, setShowSummaryModal } = props;

  const { people, currentCount, notCheckedInCount, analytics } = useEvent();

  if (!showSummaryModal) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 overflow-y-auto duration-300">
      <div className="flex min-h-screen items-center justify-center px-4 pb-4 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setShowSummaryModal(false)}
        />

        <div className="animate-in slide-in-from-bottom mx-auto inline-block w-full max-w-sm transform overflow-hidden rounded-3xl border border-white/20 bg-white/10 text-left align-middle shadow-2xl backdrop-blur-xl transition-all duration-500 sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="px-6 pb-6 pt-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  Event Summary
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Quick overview of event statistics
                </p>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
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

            <div className="space-y-4">
              <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-purple-100 sm:text-base">
                      Current attendee count
                    </span>
                    <p className="mt-1 text-xs text-white/60">
                      People currently present
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-white sm:text-4xl">
                    {currentCount}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-white sm:text-base">
                      Not checked in
                    </span>
                    <p className="mt-1 text-xs text-white/60">
                      Haven't arrived yet
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-white sm:text-3xl">
                    {notCheckedInCount}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-emerald-100 sm:text-base">
                      Total participants
                    </span>
                    <p className="mt-1 text-xs text-white/60">
                      Registered for event
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-white sm:text-3xl">
                    {people.length}
                  </span>
                </div>
              </div>

              <div className="hidden gap-4 pt-2 sm:grid sm:grid-cols-3">
                <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-4 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  <div className="text-lg font-bold text-white">
                    {analytics.avgStayTime}
                  </div>
                  <div className="mt-1 text-xs text-amber-100">
                    Avg Stay (min)
                  </div>
                </div>
                <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-purple-500/20 p-4 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  <div className="text-lg font-bold text-white">
                    {analytics.peakHour}
                  </div>
                  <div className="mt-1 text-xs text-violet-100">Peak Hour</div>
                </div>
                <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  <div className="text-lg font-bold text-white">
                    {analytics.totalCompanies}
                  </div>
                  <div className="mt-1 text-xs text-cyan-100">Companies</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse space-y-2 space-y-reverse border-t border-white/20 bg-white/5 px-6 py-4 sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0">
            <button
              type="button"
              onClick={() => setShowSummaryModal(false)}
              className="inline-flex w-full justify-center rounded-xl border border-slate-400/30 bg-gradient-to-r from-slate-500/80 to-slate-600/80 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-slate-600/90 hover:to-slate-700/90 sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
