import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Copy,
  Check,
  Download,
  Code,
  Sparkles,
  X
} from 'lucide-react';

export const OutputPane = () => {
  const { outputText, setOutputText, activeTool, setActiveTool, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `textflow-result-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded result file');
  };

  const handleDeselectTool = () => {
    setActiveTool(null);
    setOutputText('');
    showToast('Deselected tool & cleared result');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">

      {/* Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/60 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Transformed Result
          </span>
          {activeTool && (
            <div className="flex items-center gap-1 text-[10px] font-medium text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-full">
              <span>{activeTool}</span>
              <button
                onClick={handleDeselectTool}
                className="hover:text-rose-400 transition-colors ml-0.5"
                title="Cancel / Deselect Tool"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            disabled={!outputText}
            className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors ${
              copied
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold disabled:opacity-40 disabled:hover:bg-cyan-500'
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!outputText}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded disabled:opacity-40 transition-colors"
            title="Download Output as File"
          >
            <Download className="w-3 h-3 text-cyan-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Readonly Output Box */}
      <div className="relative flex-1 p-3">
        {outputText ? (
          <textarea
            readOnly
            value={outputText}
            className="w-full h-full min-h-[320px] bg-transparent text-cyan-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
          />
        ) : (
          <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center text-slate-600 gap-2">
            <Sparkles className="w-8 h-8 text-slate-700" />
            <p className="text-xs">Select any tool from the Action Hub to see transformed output here.</p>
          </div>
        )}
      </div>

    </div>
  );
};
