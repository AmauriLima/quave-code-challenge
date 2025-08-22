/* eslint-disable no-await-in-loop */
import React from 'react';
import { useEvent } from '../../contexts/event-context';
import { useToast } from '../../../../contexts/toast-context';
import { useSound } from '../../../../contexts/sound-context';
import { callAsync } from '../../../../utils/call-async';

export function BulkActionsModal(props) {
  const { showBulkActions, setShowBulkActions } = props;

  const { playSound } = useSound();
  const { setToastNotification } = useToast();
  const { people, currentCount, analytics } = useEvent();

  const handleBulkCheckIn = async () => {
    const notCheckedIn = people.filter((p) => !p.checkInAt || p.checkOutAt);

    for (const person of notCheckedIn) {
      try {
        await callAsync('people.checkIn', person._id);
      } catch (error) {
        console.error('Failed to check in:', person, error);
      }
    }

    playSound('checkin');
    setToastNotification(`Checked in ${notCheckedIn.length} people! 🎉`);
    setShowBulkActions(false);
  };

  const handleBulkCheckOut = async () => {
    const currentlyPresent = people.filter((p) => p.checkInAt && !p.checkOutAt);

    for (const person of currentlyPresent) {
      try {
        await callAsync('people.checkOut', person._id);
      } catch (error) {
        console.error('Failed to check out:', person, error);
      }
    }

    playSound('checkout');
    setToastNotification(`Checked out ${currentlyPresent.length} people! 👋`);
    setShowBulkActions(false);
  };

  if (!showBulkActions) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 overflow-y-auto duration-300">
      <div className="flex min-h-screen items-center justify-center px-4 pb-4 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setShowBulkActions(false)}
        />

        <div className="animate-in slide-in-from-bottom mx-auto inline-block w-full max-w-sm transform overflow-hidden rounded-3xl border border-white/20 bg-white/10 text-left align-middle shadow-2xl backdrop-blur-xl transition-all duration-500 sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          <div className="px-6 pb-6 pt-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  Bulk Actions
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Perform actions on multiple participants
                </p>
              </div>
              <button
                onClick={() => setShowBulkActions(false)}
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

            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                        <svg
                          className="h-4 w-4 text-emerald-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        Check-in all pending
                      </h4>
                    </div>
                    <p className="text-sm text-emerald-100">
                      {
                        people.filter((p) => !p.checkInAt || p.checkOutAt)
                          .length
                      }{' '}
                      people will be checked in
                    </p>
                  </div>
                  <button
                    onClick={handleBulkCheckIn}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 px-6 py-3 font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-emerald-600/90 hover:to-teal-600/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    disabled={
                      people.filter((p) => !p.checkInAt || p.checkOutAt)
                        .length === 0
                    }
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Check-in All</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-400/30 bg-gradient-to-r from-rose-500/20 to-pink-500/20 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20">
                        <svg
                          className="h-4 w-4 text-rose-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        Check-out all present
                      </h4>
                    </div>
                    <p className="text-sm text-rose-100">
                      {currentCount} people currently present will be checked
                      out
                    </p>
                  </div>
                  <button
                    onClick={handleBulkCheckOut}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl border border-rose-400/30 bg-gradient-to-r from-rose-500/80 to-pink-500/80 px-6 py-3 font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-rose-600/90 hover:to-pink-600/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    disabled={currentCount === 0}
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Check-out All</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-purple-500/20 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
                    <svg
                      className="h-4 w-4 text-violet-300"
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
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Analytics Summary
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <div className="mb-1 text-2xl font-bold text-white">
                      {analytics.avgStayTime}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-violet-100">
                      Avg Stay (min)
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <div className="mb-1 text-2xl font-bold text-white">
                      {analytics.peakHour}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-violet-100">
                      Peak Hour
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <div className="mb-1 text-2xl font-bold text-white">
                      {analytics.totalCompanies}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-violet-100">
                      Companies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse space-y-2 space-y-reverse border-t border-white/20 bg-white/5 px-6 py-4 sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0">
            <button
              onClick={() => setShowBulkActions(false)}
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
