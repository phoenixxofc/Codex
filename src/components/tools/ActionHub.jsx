import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { ToolCard } from './ToolCard.jsx';
import * as transformers from '../../utils/textTransformers.js';
import * as extractors from '../../utils/regexExtractors.js';
import * as jsonTools from '../../utils/jsonToolbox.js';
import {
  Type,
  Mail,
  Globe,
  Network,
  Phone,
  Hash,
  Code2,
  Binary,
  ShieldCheck,
  Scissors,
  CaseUpper,
  CaseLower,
  Baseline,
  Link2,
  Sparkles,
  FileCode,
  Bot,
  CaseSensitive,
  FileSpreadsheet,
  Check,
  Copy,
  Wand2
} from 'lucide-react';

export const ActionHub = () => {
  const {
    inputText,
    setOutputText,
    activeTool,
    setActiveTool,
    searchQuery,
    addHistoryEntry,
    showToast
  } = useApp();

  // Report Formatter Options State
  const [reportTitleIndicator, setReportTitleIndicator] = useState('xxx'); // 'xxx', 'xx', 'x', 'blankline'
  const [reportTitleFontSize, setReportTitleFontSize] = useState(14); // 13 or 14
  const [reportBoldTitles, setReportBoldTitles] = useState(true);
  const [reportBoldColon, setReportBoldColon] = useState(true);
  const [reportGenerateToc, setReportGenerateToc] = useState(true);
  const [richCopied, setRichCopied] = useState(false);
  const [reportHtmlResult, setReportHtmlResult] = useState('');

  // AI Humanizer Studio Options State
  const [aiRemoveFiller, setAiRemoveFiller] = useState(true);
  const [aiRestructureText, setAiRestructureText] = useState(true);

  const handleExecuteTool = (name, transformFn) => {
    if (!inputText) {
      showToast('Please enter text into the input pane first.');
      return;
    }
    const result = transformFn(inputText);
    if (typeof result === 'object' && result.plainText !== undefined) {
      setOutputText(result.plainText);
      setReportHtmlResult(result.htmlText);
    } else {
      setOutputText(result);
      setReportHtmlResult('');
    }
    setActiveTool(name);
    addHistoryEntry(name, inputText, typeof result === 'object' ? result.plainText : result);
    showToast(`Applied: ${name}`);
  };

  const handleCopyRichTextForWord = () => {
    if (!inputText) {
      showToast('Please enter report text first.');
      return;
    }
    const res = transformers.formatOfficialReport(inputText, {
      titleIndicator: reportTitleIndicator,
      titleFontSize: reportTitleFontSize,
      boldTitles: reportBoldTitles,
      boldColonPrefix: reportBoldColon,
      generateToc: reportGenerateToc
    });

    try {
      const blob = new Blob([res.htmlText], { type: 'text/html' });
      const textBlob = new Blob([res.plainText], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': textBlob })];
      navigator.clipboard.write(data).then(() => {
        setRichCopied(true);
        showToast('Copied MS Word Rich-Text format to clipboard!');
        setTimeout(() => setRichCopied(false), 2500);
      });
    } catch (err) {
      navigator.clipboard.writeText(res.plainText);
      showToast('Copied plain text format to clipboard!');
    }
  };

  const handleDeselectTool = () => {
    setActiveTool(null);
    setOutputText('');
    setReportHtmlResult('');
    showToast('Deselected active tool');
  };

  const toolsList = [
    // Official Report Studio
    {
      id: 'official-report-formatter',
      title: 'Official Report Formatter & TOC Generator',
      description: 'Formats reports with Times New Roman (12pt body, 13/14pt titles), 1.5 line spacing, block justification, bold colons, and Table of Contents.',
      category: 'Official Report Studio',
      icon: FileSpreadsheet,
      action: (text) => transformers.formatOfficialReport(text, {
        titleIndicator: reportTitleIndicator,
        titleFontSize: reportTitleFontSize,
        boldTitles: reportBoldTitles,
        boldColonPrefix: reportBoldColon,
        generateToc: reportGenerateToc
      })
    },

    // AI & Formatting Tools
    {
      id: 'ai-humanizer',
      title: 'AI Text Humanizer & Polisher',
      description: 'Humanizes AI text by removing filler phrases ("it is important to note") and restructuring sentence flow.',
      category: 'AI & Formatting',
      icon: Bot,
      action: (text) => transformers.humanizeAiText(text, {
        removeFillerWords: aiRemoveFiller,
        restructureText: aiRestructureText
      })
    },
    {
      id: 'sentence-capitalizer',
      title: 'Sentence & Proper Noun Capitalizer',
      description: 'Capitalizes sentence starts and formats proper nouns (ChatGPT, GPT, API, JSON, TextFlow).',
      category: 'AI & Formatting',
      icon: CaseSensitive,
      action: (text) => transformers.capitalizeNecessaryWords(text)
    },
    {
      id: 'uppercase',
      title: 'UPPERCASE',
      description: 'Converts all characters in input stream to capital letters.',
      category: 'AI & Formatting',
      icon: CaseUpper,
      action: (text) => transformers.toUppercase(text)
    },
    {
      id: 'lowercase',
      title: 'lowercase',
      description: 'Converts all text characters to lower case.',
      category: 'AI & Formatting',
      icon: CaseLower,
      action: (text) => transformers.toLowercase(text)
    },
    {
      id: 'titlecase',
      title: 'Title Case',
      description: 'Capitalizes first letter of each word in the string.',
      category: 'AI & Formatting',
      icon: Baseline,
      action: (text) => transformers.toTitleCase(text)
    },
    {
      id: 'camelcase',
      title: 'camelCase',
      description: 'Formats text into camelCase variable naming convention.',
      category: 'AI & Formatting',
      icon: Type,
      action: (text) => transformers.toCamelCase(text)
    },
    {
      id: 'kebabcase',
      title: 'kebab-case',
      description: 'Converts spaces and capitalization into dash-separated words.',
      category: 'AI & Formatting',
      icon: Link2,
      action: (text) => transformers.toKebabCase(text)
    },
    {
      id: 'snakecase',
      title: 'snake_case',
      description: 'Converts input text into underscore-separated lowercase words.',
      category: 'AI & Formatting',
      icon: Code2,
      action: (text) => transformers.toSnakeCase(text)
    },
    {
      id: 'slug',
      title: 'URL Slug Generator',
      description: 'Creates safe, sanitized web URL slug strings.',
      category: 'AI & Formatting',
      icon: Link2,
      action: (text) => transformers.generateSlug(text)
    },
    {
      id: 'stripspaces',
      title: 'Strip Whitespace',
      description: 'Collapses redundant spaces and trims padding whitespace.',
      category: 'AI & Formatting',
      icon: Scissors,
      action: (text) => transformers.stripExtraSpaces(text)
    },
    {
      id: 'removelines',
      title: 'Remove Line Breaks',
      description: 'Replaces newline characters with single spaces.',
      category: 'AI & Formatting',
      icon: Type,
      action: (text) => transformers.removeLineBreaks(text)
    },

    // Data Extraction Tools
    {
      id: 'extract-emails',
      title: 'Email Harvester',
      description: 'Scans unstructured text and extracts unique email addresses.',
      category: 'Extraction',
      icon: Mail,
      action: (text) => extractors.extractEmails(text)
    },
    {
      id: 'extract-urls',
      title: 'URL Finder',
      description: 'Extracts all http/https web links into a clean list.',
      category: 'Extraction',
      icon: Globe,
      action: (text) => extractors.extractUrls(text)
    },
    {
      id: 'extract-ips',
      title: 'IP Address Scraper',
      description: 'Parses IPv4 network addresses from raw logs or text.',
      category: 'Extraction',
      icon: Network,
      action: (text) => extractors.extractIPs(text)
    },
    {
      id: 'extract-phones',
      title: 'Phone Number Parser',
      description: 'Extracts phone numbers across various formats.',
      category: 'Extraction',
      icon: Phone,
      action: (text) => extractors.extractPhones(text)
    },
    {
      id: 'extract-numbers',
      title: 'Number Extractor',
      description: 'Filters out non-numeric characters and lists all numbers.',
      category: 'Extraction',
      icon: Hash,
      action: (text) => extractors.extractNumbers(text)
    },

    // Developer Tools
    {
      id: 'json-beautify',
      title: 'JSON Formatter',
      description: 'Beautifies and formats messy JSON payloads with 2-space indentation.',
      category: 'Developer',
      icon: FileCode,
      action: (text) => jsonTools.beautifyJson(text, 2)
    },
    {
      id: 'json-minify',
      title: 'JSON Minifier',
      description: 'Strips all whitespace and line breaks from JSON payloads.',
      category: 'Developer',
      icon: FileCode,
      action: (text) => jsonTools.minifyJson(text)
    },
    {
      id: 'base64-encode',
      title: 'Base64 Encoder',
      description: 'Encodes raw UTF-8 string data into Base64 format.',
      category: 'Developer',
      icon: Binary,
      action: (text) => jsonTools.encodeBase64(text)
    },
    {
      id: 'base64-decode',
      title: 'Base64 Decoder',
      description: 'Decodes Base64 encoded payloads back into plain text.',
      category: 'Developer',
      icon: Binary,
      action: (text) => jsonTools.decodeBase64(text)
    },
    {
      id: 'html-escape',
      title: 'HTML Entity Escaper',
      description: 'Escapes special characters (&, <, >, ", \') for web safety.',
      category: 'Developer',
      icon: ShieldCheck,
      action: (text) => jsonTools.escapeHtml(text)
    }
  ];

  const filteredTools = toolsList.filter((tool) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  });

  const categories = ['Official Report Studio', 'AI & Formatting', 'Extraction', 'Developer'];

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">
            Action Hub & Utility Engine
          </h2>
        </div>

        {activeTool && (
          <button
            onClick={handleDeselectTool}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/60 border border-rose-800/80 px-3 py-1 rounded-lg transition-colors"
          >
            Clear Selected Tool ({activeTool})
          </button>
        )}
      </div>

      {categories.map((cat) => {
        const catTools = filteredTools.filter((t) => t.category === cat);
        if (catTools.length === 0) return null;

        return (
          <div key={cat} className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-800/80 pb-1 flex items-center justify-between">
              <span>{cat} Utilities</span>
            </h3>

            {/* Interactive Settings Control Panel for Official Report Studio */}
            {cat === 'Official Report Studio' && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-4 text-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Microsoft Word Official Report Controls</span>
                  </div>

                  <button
                    onClick={handleCopyRichTextForWord}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors"
                  >
                    {richCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{richCopied ? 'Copied MS Word Format' : 'Copy Formatted for MS Word'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Title Indicator Selector */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Title Line Pattern Indicator:</label>
                    <select
                      value={reportTitleIndicator}
                      onChange={(e) => setReportTitleIndicator(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1 focus:border-cyan-500"
                    >
                      <option value="xxx">x.x.x (Sub-subheading e.g. 1.1.1)</option>
                      <option value="xx">x.x (Subheading e.g. 1.1)</option>
                      <option value="x">x / x.0 (Chapter e.g. 1 or 1.0)</option>
                      <option value="blankline">First Line After Blank Line Spacer</option>
                    </select>
                  </div>

                  {/* Title Font Size */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Title Font Size (Body = 12pt Times New Roman):</label>
                    <select
                      value={reportTitleFontSize}
                      onChange={(e) => setReportTitleFontSize(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1 focus:border-cyan-500"
                    >
                      <option value={14}>14pt (Standard Header)</option>
                      <option value={13}>13pt (Compact Header)</option>
                    </select>
                  </div>

                  {/* Options Toggles */}
                  <div className="flex flex-col justify-center space-y-1.5 pt-1">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reportBoldTitles}
                        onChange={(e) => setReportBoldTitles(e.target.checked)}
                        className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>Make All Titles Bold (Default: Bold)</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reportBoldColon}
                        onChange={(e) => setReportBoldColon(e.target.checked)}
                        className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>Make Text Before Colon (:) Bold</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reportGenerateToc}
                        onChange={(e) => setReportGenerateToc(e.target.checked)}
                        className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>Generate Table of Contents from Numbers</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Control Panel for AI & Formatting Utilities */}
            {cat === 'AI & Formatting' && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-4 text-xs space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-cyan-400 pb-2 border-b border-slate-800/80">
                  <Wand2 className="w-4 h-4" />
                  <span>AI Humanizer & Formatting Settings</span>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiRemoveFiller}
                      onChange={(e) => setAiRemoveFiller(e.target.checked)}
                      className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Remove AI Filler Words & Phrases ("it is important to note", "tapestry of")</span>
                  </label>

                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiRestructureText}
                      onChange={(e) => setAiRestructureText(e.target.checked)}
                      className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Humanize by Restructuring Text & Sentence Flow ("is able to" → "can", "utilize" → "use")</span>
                  </label>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {catTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  active={activeTool === tool.title}
                  onClick={() => handleExecuteTool(tool.title, tool.action)}
                  onDeselect={handleDeselectTool}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
