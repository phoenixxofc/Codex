import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  X,
  History,
  RotateCcw,
  Trash2,
  Clock
} from 'lucide-react';

export const HistoryDrawer = () => {
  const {
    isHistoryOpen,
    setIsHistoryOpen,
    history,
    clearHistory,
    setInputText,
    setOutputText,
    setActiveTool,
    showToast
  } = useApp();

  if (!isHistoryOpen) return null;

  const handleRestore = (entry) => {
    setInputText(entry.input);
    setOutputText(entry.output);
    setActiveTool(entry.toolName);
    setIsHistoryOpen(false);
    showToast(`Restored state from ${entry.toolName}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-base">History Vault</h3>
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
              {history.length}/20
            </span>
          </div>

          <button
            onClick={() => setIsHistoryOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
              <Clock className="w-10 h-10 text-slate-700" />
              <p className="text-xs">No transformation history recorded yet.</p>
            </div>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                    {entry.toolName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {entry.timestamp}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 truncate mb-1">
                  <span className="text-slate-600">In:</span> {entry.input}
                </div>
                <div className="text-xs font-mono text-slate-300 truncate mb-3">
                  <span className="text-slate-600">Out:</span> {entry.output}
                </div>

                <button
                  onClick={() => handleRestore(entry)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-medium rounded transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Entry</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <button
              onClick={clearHistory}
              className="w-full flex items-center justify-center gap-2 py-2 bg-rose-950/50 hover:bg-rose-900/80 border border-rose-800/80 text-rose-300 text-xs font-semibold rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History Vault</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
