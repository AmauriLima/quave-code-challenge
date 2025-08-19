import React from 'react';
import { useEvent } from '../../contexts/event-context';
import { Participant } from './participant';

export function Participants() {
  const { peopleReady, filteredPeople, searchTerm, displayedCount, loadMore, isLoadingMore, loadingActions } = useEvent();

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {peopleReady && filteredPeople.length === 0 && (
        <div className="text-center py-16">
          <div className="relative">
            <svg className="w-16 h-16 text-white/40 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchTerm ? 'No matches found' : 'No participants yet'}
          </h3>
          <p className="text-white/60">
            {searchTerm ? 'Try adjusting your search terms' : 'Participants will appear here when they register'}
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        {filteredPeople.slice(0, displayedCount).map((person, index) => {
          const isCheckedIn = !!(person.checkInAt && !person.checkOutAt);
          const isLoading = loadingActions.has(person._id);
          
          return (
            <Participant
              key={person._id}
              person={person}
              isLoading={isLoading}
              isCheckedIn={isCheckedIn}
              index={index}
            />
          );
        })}
      </div>

      {filteredPeople.length > displayedCount && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-600/90 hover:to-pink-600/90 transition-all duration-300 shadow-xl border border-purple-400/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
          >
            {isLoadingMore ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>Load More ({filteredPeople.length - displayedCount} remaining)</span>
              </>
            )}
          </button>
        </div>
      )}

      {filteredPeople.length > 0 && (
        <div className="mt-6 text-center text-white/60 text-sm">
          Showing {Math.min(displayedCount ?? 0, filteredPeople.length ?? 0)} of {filteredPeople.length ?? 0} participants
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}