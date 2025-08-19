import React from 'react';
import { useCommunities } from '../../../contexts/communities-context';

export function EventSelecionCard() {
  const { selectedCommunityId, communities, communitiesReady, updateSelectedEvent } = useCommunities();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Choose Your Event</h2>
        <p className="text-slate-300 text-sm">Select from your available events to get started</p>
      </div>

      <div className="relative">
        <select
          id="event"
          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer backdrop-blur-sm hover:bg-white/15 text-base"
          value={selectedCommunityId}
          onChange={(e) => updateSelectedEvent(e.target.value)}
          style={{
            backgroundImage: 'none',
            textIndent: '0px',
            textOverflow: 'ellipsis',
          }}
        >
          <EventOption community={null} />

          {communitiesReady &&
            communities.map((c) => (
              <EventOption key={c._id} community={c} />
            ))}
        </select>
        
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {communitiesReady && communities.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-300/20">
          <div className="flex items-center justify-between text-center">
            <EventInfo icon={communities.length} label="Available Events" />
            <div className="w-px h-12 bg-white/20" />
            <EventInfo icon="✨" label="Premium Platform" />
            <div className="w-px h-12 bg-white/20" />
            <EventInfo icon="🚀" label="Ready to Launch" />
          </div>
        </div>
      )}
    </div>
  );
}

function EventOption(props) {
  const { community } = props;

  return (
    <option value={community?._id ?? ''} style={{backgroundColor: '#1e293b', color: 'white', padding: '8px'}}>
      {community?.name ?? 'Select an event...'}
    </option>
  );
}

function EventInfo(props) {
  const { icon, label } = props;

  return (
    <div>
      <div className="text-2xl font-bold text-white">{icon}</div>
      <div className="text-xs text-slate-300 uppercase tracking-wide">{label}</div>
    </div>
  );
}