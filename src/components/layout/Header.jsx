import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  FileText,
  Search,
  Sun,
  Moon,
  History,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    setIsHistoryOpen,
    setIsMacroModalOpen,
    history
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <FileText className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
              TextFlow<span className="text-cyan-400 font-extrabold">.io</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded ml-2">
              Enterprise
            </span>
          </div>
        </div>

        {/* Global Tool Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. UPPERCASE, JSON, Regex, Base64)..."
              className="w-full bg-slate-950/70 border border-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-1.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-slate-500 transition-all"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Privacy Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium">Client-Side Only</span>
          </div>

          {/* Custom Macro Builder Trigger */}
          <button
            onClick={() => setIsMacroModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-slate-100 border border-slate-700 rounded-lg transition-colors"
            title="Open Macro Builder"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Macro Builder</span>
          </button>

          {/* History Vault Trigger */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-slate-100 border border-slate-700 rounded-lg transition-colors"
            title="History Vault"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">History</span>
            {history.length > 0 && (
              <span className="bg-cyan-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {history.length}
              </span>
            )}
          </button>

          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
