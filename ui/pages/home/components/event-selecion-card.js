import React from 'react';
import { useCommunities } from '../../../contexts/communities-context';

export function EventSelecionCard() {
  const {
    selectedCommunityId,
    communities,
    communitiesReady,
    updateSelectedEvent,
  } = useCommunities();

  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Choose Your Event
        </h2>
        <p className="text-sm text-slate-300">
          Select from your available events to get started
        </p>
      </div>

      <div className="relative">
        <select
          id="event"
          className="w-full cursor-pointer appearance-none rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-base text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:border-transparent focus:ring-2 focus:ring-purple-400"
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
            communities.map((c) => <EventOption key={c._id} community={c} />)}
        </select>

        <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 transform">
          <svg
            className="h-5 w-5 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {communitiesReady && communities.length > 0 && (
        <div className="mt-8 rounded-2xl border border-purple-300/20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6">
          <div className="flex items-center justify-between text-center">
            <EventInfo icon={communities.length} label="Available Events" />
            <div className="h-12 w-px bg-white/20" />
            <EventInfo icon="✨" label="Premium Platform" />
            <div className="h-12 w-px bg-white/20" />
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
    <option
      value={community?._id ?? ''}
      style={{ backgroundColor: '#1e293b', color: 'white', padding: '8px' }}
    >
      {community?.name ?? 'Select an event...'}
    </option>
  );
}

function EventInfo(props) {
  const { icon, label } = props;

  return (
    <div>
      <div className="text-2xl font-bold text-white">{icon}</div>
      <div className="text-xs uppercase tracking-wide text-slate-300">
        {label}
      </div>
    </div>
  );
}
