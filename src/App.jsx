import React from 'react';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Workspace } from './components/workspace/Workspace.jsx';
import { ActionHub } from './components/tools/ActionHub.jsx';
import { HistoryDrawer } from './components/history/HistoryDrawer.jsx';
import { MacroBuilderModal } from './components/modals/MacroBuilderModal.jsx';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        <Workspace />
        <ActionHub />
      </main>
      <Footer />
      <HistoryDrawer />
      <MacroBuilderModal />
    </div>
  );
}

export default App;
