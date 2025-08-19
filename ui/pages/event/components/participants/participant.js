import React from 'react';
import { formatDateTime } from '../../../../utils/format-date-time';
import { useSound } from '../../../../contexts/sound-context';
import { useToast } from '../../../../contexts/toast-context';
import { callAsync } from '../../../../utils/call-async';
import { useEvent } from '../../contexts/event-context';

export function Participant(props) {
  const { person, isLoading, isCheckedIn, index } = props;

  const { playSound } = useSound();
  const { setToastNotification } = useToast();
  const { setLoadingActions } = useEvent();

  const fullName = `${person.firstName || ''} ${person.lastName || ''}`.trim();

  const handleCheckIn = async () => {
    const personId = person._id;
    
    setLoadingActions(prev => new Set(prev).add(personId));
    
    try {
      await callAsync('people.checkIn', personId);
      playSound('checkin');
      setToastNotification(`${fullName} checked in successfully! 🎉`);
    } catch (error) {
      setToastNotification(`Failed to check in ${fullName} ${error.message}`, 'error');
    } finally {
      setLoadingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(personId);
        return newSet;
      });
    }
  };

  const handleCheckOut = async () => {
    const personId = person._id;
    
    setLoadingActions(prev => new Set(prev).add(personId));
    
    try {
      await callAsync('people.checkOut', personId);
      playSound('checkout');
      setToastNotification(`${fullName} checked out successfully! 👋`);
    } catch (error) {
      setToastNotification(`Failed to check out ${fullName}`, 'error');
    } finally {
      setLoadingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(personId);
        return newSet;
      });
    }
  };

  const canShowCheckout = () => {
    if (!person.checkInAt || person.checkOutAt) return false;
    const checkedInAtMs = new Date(person.checkInAt).getTime();
    return Date.now() - checkedInAtMs >= 5000;
  };

  return (
    <div 
      key={person._id} 
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 animate-in slide-in-from-left shadow-xl hover:scale-[1.02] hover:shadow-2xl"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                isCheckedIn ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 
                person.checkOutAt ? 'bg-rose-400 shadow-lg shadow-rose-400/50' : 'bg-white/40'
              }`} />
              {isCheckedIn && (
                <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg">{fullName || 'Name not provided'}</h3>
              <div className="text-sm text-white/70 space-y-1 mt-1">
                {person.companyName && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{person.companyName}</span>
                  </div>
                )}
                {person.title && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{person.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            {person.checkInAt && (
              <div className="flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-emerald-400/30 animate-in fade-in duration-500">
                <svg className="w-3 h-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium text-emerald-200">Check-in:</span>
                <span className="text-emerald-100">{formatDateTime(person.checkInAt)}</span>
              </div>
            )}
            {person.checkOutAt && (
              <div className="flex items-center space-x-2 bg-rose-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-rose-400/30 animate-in fade-in duration-500">
                <svg className="w-3 h-3 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium text-rose-200">Check-out:</span>
                <span className="text-rose-100">{formatDateTime(person.checkOutAt)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 ml-6">
          <button
            type="button"
            className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm border ${
              isCheckedIn
                ? 'bg-white/10 text-white/50 cursor-not-allowed border-white/20'
                : 'bg-gradient-to-r from-emerald-500/80 to-teal-500/80 hover:from-emerald-600/90 hover:to-teal-600/90 text-white hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/25 border-emerald-400/30'
            }`}
            onClick={() => handleCheckIn(person)}
            disabled={isCheckedIn || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="hidden sm:inline">Processing...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Check-in</span>
                <span className="sm:hidden">In</span>
              </div>
            )}
          </button>
          
          {canShowCheckout(person) && (
            <button
              type="button"
              className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm border ${
                !isCheckedIn
                  ? 'bg-white/10 text-white/50 cursor-not-allowed border-white/20'
                  : 'bg-gradient-to-r from-rose-500/80 to-pink-500/80 hover:from-rose-600/90 hover:to-pink-600/90 text-white hover:scale-105 active:scale-95 shadow-xl shadow-rose-500/25 border-rose-400/30'
              }`}
              onClick={() => handleCheckOut(person)}
              disabled={!isCheckedIn || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="hidden sm:inline">Processing...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Check-out</span>
                  <span className="sm:hidden">Out</span>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}