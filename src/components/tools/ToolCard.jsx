import React from 'react';

export const ToolCard = ({ title, description, icon: Icon, category, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col text-left p-3.5 rounded-xl border transition-all group relative overflow-hidden ${
        active
          ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
          : 'bg-slate-900/50 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className={`p-1.5 rounded-lg ${
          active
            ? 'bg-cyan-500 text-slate-950'
            : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700 group-hover:text-cyan-300'
        } transition-colors`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
          {title}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
        {description}
      </p>
    </button>
  );
};
