import React from 'react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-purple-400 rounded-full blur-xl opacity-30 animate-pulse" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4">
        Event Check-in
      </h1>
      <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
        Welcome to your professional event management platform. Select an event to begin managing participants.
      </p>
    </header>
  );
}