import React from 'react';

export function Header() {
  return (
    <header className="mb-12 text-center">
      <div className="relative">
        <div className="mx-auto mb-6 flex h-20 w-20 rotate-3 transform items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/25 transition-transform duration-300 hover:rotate-0">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="absolute left-1/2 top-4 h-20 w-20 -translate-x-1/2 transform animate-pulse rounded-full bg-purple-400 opacity-30 blur-xl" />
      </div>

      <h1 className="mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
        Event Check-in
      </h1>
      <p className="mx-auto max-w-md text-lg leading-relaxed text-slate-300">
        Welcome to your professional event management platform. Select an event
        to begin managing participants.
      </p>
    </header>
  );
}
