/* eslint-disable no-await-in-loop */
import React from 'react';
import { useEvent } from '../../contexts/event-context';
import { useToast } from '../../../../contexts/toast-context';
import { useSound } from '../../../../contexts/sound-context';
import { callAsync } from '../../../../utils/call-async';

export function BulkActionsModal(props) {
  const {
    showBulkActions,
    setShowBulkActions,
  } = props;

  const { playSound } = useSound();
  const { setToastNotification } = useToast();
  const { people, currentCount, analytics } = useEvent();

  const handleBulkCheckIn = async () => {
    const notCheckedIn = people.filter(p => !p.checkInAt || p.checkOutAt);
    
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
    const currentlyPresent = people.filter(p => p.checkInAt && !p.checkOutAt);
    
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
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-4 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setShowBulkActions(false)}
          />

        <div className="inline-block align-middle bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Bulk Actions</h3>
                <p className="text-sm text-white/70 mt-2">Perform actions on multiple participants</p>
              </div>
              <button
                onClick={() => setShowBulkActions(false)}
                className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-white text-lg">Check-in all pending</h4>
                    </div>
                    <p className="text-emerald-100 text-sm">
                      {people.filter(p => !p.checkInAt || p.checkOutAt).length} people will be checked in
                    </p>
                  </div>
                  <button
                    onClick={handleBulkCheckIn}
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500/80 to-teal-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-emerald-600/90 hover:to-teal-600/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-emerald-400/30 shadow-lg hover:scale-105"
                    disabled={people.filter(p => !p.checkInAt || p.checkOutAt).length === 0}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Check-in All</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm border border-rose-400/30 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-white text-lg">Check-out all present</h4>
                    </div>
                    <p className="text-rose-100 text-sm">
                      {currentCount} people currently present will be checked out
                    </p>
                  </div>
                  <button
                    onClick={handleBulkCheckOut}
                    className="w-full sm:w-auto bg-gradient-to-r from-rose-500/80 to-pink-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-rose-600/90 hover:to-pink-600/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-rose-400/30 shadow-lg hover:scale-105"
                    disabled={currentCount === 0}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Check-out All</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-violet-400/30 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white text-lg">Analytics Summary</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{analytics.avgStayTime}</div>
                    <div className="text-xs text-violet-100 uppercase tracking-wide">Avg Stay (min)</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{analytics.peakHour}</div>
                    <div className="text-xs text-violet-100 uppercase tracking-wide">Peak Hour</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{analytics.totalCompanies}</div>
                    <div className="text-xs text-violet-100 uppercase tracking-wide">Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border-t border-white/20 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => setShowBulkActions(false)}
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