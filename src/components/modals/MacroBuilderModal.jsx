import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import * as transformers from '../../utils/textTransformers.js';
import * as jsonTools from '../../utils/jsonToolbox.js';
import {
  X,
  Sliders,
  Play,
  Plus,
  Trash2
} from 'lucide-react';

export const MacroBuilderModal = () => {
  const {
    isMacroModalOpen,
    setIsMacroModalOpen,
    inputText,
    setOutputText,
    setActiveTool,
    addHistoryEntry,
    showToast
  } = useApp();

  const availableSteps = [
    { id: 'stripSpaces', name: 'Strip Whitespace', fn: transformers.stripExtraSpaces },
    { id: 'uppercase', name: 'UPPERCASE', fn: transformers.toUppercase },
    { id: 'lowercase', name: 'lowercase', fn: transformers.toLowercase },
    { id: 'titlecase', name: 'Title Case', fn: transformers.toTitleCase },
    { id: 'slug', name: 'URL Slug Generator', fn: transformers.generateSlug },
    { id: 'jsonBeautify', name: 'JSON Formatter', fn: (text) => jsonTools.beautifyJson(text, 2) },
    { id: 'base64Encode', name: 'Base64 Encode', fn: jsonTools.encodeBase64 },
    { id: 'htmlEscape', name: 'HTML Entity Escape', fn: jsonTools.escapeHtml }
  ];

  const [selectedPipeline, setSelectedPipeline] = useState([availableSteps[0].id, availableSteps[1].id]);

  if (!isMacroModalOpen) return null;

  const handleAddStep = (stepId) => {
    setSelectedPipeline([...selectedPipeline, stepId]);
  };

  const handleRemoveStep = (index) => {
    setSelectedPipeline(selectedPipeline.filter((_, i) => i !== index));
  };

  const handleExecutePipeline = () => {
    if (!inputText) {
      showToast('Please enter input text first');
      return;
    }
    if (selectedPipeline.length === 0) {
      showToast('Please add at least one macro step');
      return;
    }

    let result = inputText;
    selectedPipeline.forEach((stepId) => {
      const stepObj = availableSteps.find((s) => s.id === stepId);
      if (stepObj) {
        result = stepObj.fn(result);
      }
    });

    const pipelineName = `Macro Pipeline (${selectedPipeline.length} steps)`;
    setOutputText(result);
    setActiveTool(pipelineName);
    addHistoryEntry(pipelineName, inputText, result);
    setIsMacroModalOpen(false);
    showToast('Executed custom macro pipeline');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-lg">Custom Macro Builder</h3>
          </div>
          <button
            onClick={() => setIsMacroModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Pipeline Sequence */}
        <div className="mb-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Execution Pipeline Chain
          </label>
          <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 min-h-[100px]">
            {selectedPipeline.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                No transformation steps added yet. Add steps from below.
              </p>
            ) : (
              selectedPipeline.map((stepId, idx) => {
                const stepObj = availableSteps.find((s) => s.id === stepId);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80 flex items-center justify-center font-mono font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-200">{stepObj?.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveStep(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Add Steps Selection */}
        <div className="mb-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Available Operations
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleAddStep(step.id)}
                className="flex items-center justify-between bg-slate-950/60 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg transition-colors text-left"
              >
                <span>{step.name}</span>
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => setIsMacroModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleExecutePipeline}
            className="flex items-center gap-1.5 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Execute Macro Sequence</span>
          </button>
        </div>

      </div>
    </div>
  );
};
