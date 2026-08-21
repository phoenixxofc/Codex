import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { calculateMetrics } from '../../utils/textTransformers.js';
import { ShieldCheck, Cpu, Clock, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const { inputText, toastMessage } = useApp();
  const metrics = calculateMetrics(inputText);

  return (
    <footer className="mt-auto bg-slate-900 border-t border-slate-800 px-4 lg:px-8 py-2.5 text-xs text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Left Side: Toast Feedback or Security Guarantee */}
        <div className="flex items-center gap-2">
          {toastMessage ? (
            <div className="flex items-center gap-1.5 text-cyan-400 font-medium animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{toastMessage}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Server Architecture: 100% of data is processed locally in browser memory.</span>
            </div>
          )}
        </div>

        {/* Right Side: Live Input Metrics */}
        <div className="flex items-center gap-4 text-slate-300 font-mono">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{metrics.characters.toLocaleString()} chars</span>
          </div>

          <div className="h-3 w-px bg-slate-700" />

          <div>
            <span>{metrics.words.toLocaleString()} words</span>
          </div>

          <div className="h-3 w-px bg-slate-700" />

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>~{metrics.readingTimeMinutes} min read</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
