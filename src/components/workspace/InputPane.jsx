import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  FileText,
  Trash2,
  Upload,
  FileUp,
  AlignLeft,
  Sparkles
} from 'lucide-react';

export const InputPane = () => {
  const { inputText, setInputText, showToast } = useApp();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target.result);
      showToast(`Loaded file: ${file.name}`);
    };
    reader.readAsText(file);
  };

  const loadSampleText = () => {
    const sample = `TextFlow.io Enterprise Web Application
User: alex.developer@company.org
System API Key: sk_live_992183192019a8f
IP: 192.168.1.105 | Server: 10.0.0.12
Support Phone: +1-800-555-0199 or (555) 019-2834

JSON Payload:
{"status": 200, "message": "Ready to transform raw unstructured text streams instantly."}`;
    setInputText(sample);
    showToast('Loaded sample dataset');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">

      {/* Pane Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/60 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlignLeft className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Input Raw Stream
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={loadSampleText}
            className="flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-1 rounded transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>Sample Text</span>
          </button>

          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded cursor-pointer transition-colors">
            <Upload className="w-3 h-3 text-cyan-400" />
            <span>Upload File</span>
            <input type="file" accept=".txt,.json,.csv,.md,.log" onChange={handleFileUpload} className="hidden" />
          </label>

          {inputText && (
            <button
              onClick={() => { setInputText(''); showToast('Input cleared'); }}
              className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear Input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Input Textarea */}
      <div className="relative flex-1 p-3">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste or type raw unstructured text here..."
          className="w-full h-full min-h-[320px] bg-transparent text-slate-100 font-mono text-sm resize-none focus:outline-none placeholder-slate-600 leading-relaxed"
          spellCheck="false"
        />
      </div>

    </div>
  );
};
