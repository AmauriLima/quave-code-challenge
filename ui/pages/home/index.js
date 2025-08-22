import React from 'react';
import { Header } from './components/header';
import { EventSelecionCard } from './components/event-selecion-card';
import { FeaturesPreview } from './components/features-preview';
import { Background } from '../event/components/background';

export function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Background />

      <div className="relative z-10 w-full max-w-lg">
        <Header />

        <EventSelecionCard />

        <FeaturesPreview />
      </div>
    </div>
  );
}
