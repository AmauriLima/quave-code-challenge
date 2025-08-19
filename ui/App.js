import React from 'react';
import { CommunitiesProvider } from './contexts/communities-context';
import { Main } from './pages/main/main';
import { ToastProvider } from './contexts/toast-context';
import { Toast } from './components/toast';
import { SoundProvider } from './contexts/sound-context';

export const App = () => (
  <SoundProvider>
    <CommunitiesProvider>
      <ToastProvider>
        <Main />
        <Toast />
      </ToastProvider>
    </CommunitiesProvider>
  </SoundProvider>
);
