import React from 'react';
import { Header } from './components/header';
import { EventSelecionCard } from './components/event-selecion-card';
import { FeaturesPreview } from './components/features-preview';
import { Background } from '../event/components/background';

export function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Background />
      
      <div className="relative z-10 w-full max-w-lg">
        <Header />

        <EventSelecionCard />

        <FeaturesPreview />
      </div>
    </div>
  );
}