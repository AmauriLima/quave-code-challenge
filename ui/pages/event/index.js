/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import { Header } from './components/header';
import { Summary } from './components/summary';
import { SummaryModal } from './components/summary/summary-modal';
import { CompaniesBreakdownModal } from './components/summary/companies-breakdown-modal';
import { BulkActionsModal } from './components/header/bulk-actions-modal';
import { Participants } from './components/participants';
import { Background } from './components/background';
import { EventProvider } from './contexts/event-context';

export function Event() {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  return (
    <EventProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 relative overflow-hidden">
        <Background />

        <Header setShowBulkActions={setShowBulkActions} />

        <Summary 
          setShowCompanyModal={setShowCompanyModal}
          setShowSummaryModal={setShowSummaryModal}
        />

        <Participants />

        <SummaryModal
          showSummaryModal={showSummaryModal}
          setShowSummaryModal={setShowSummaryModal}
        />

        <CompaniesBreakdownModal
          showCompanyModal={showCompanyModal}
          setShowCompanyModal={setShowCompanyModal}
        />

        <BulkActionsModal
          showBulkActions={showBulkActions}
          setShowBulkActions={setShowBulkActions}
        />
      </div>
    </EventProvider>
  );
}