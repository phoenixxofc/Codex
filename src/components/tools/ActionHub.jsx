import React from 'react';
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
  Bot
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

  const handleExecuteTool = (name, transformFn) => {
    if (!inputText) {
      showToast('Please enter text into the input pane first.');
      return;
    }
    const result = transformFn(inputText);
    setOutputText(result);
    setActiveTool(name);
    addHistoryEntry(name, inputText, result);
    showToast(`Applied: ${name}`);
  };

  const handleDeselectTool = () => {
    setActiveTool(null);
    setOutputText('');
    showToast('Deselected active tool');
  };

  const toolsList = [
    // AI & Formatting Tools
    {
      id: 'ai-humanizer',
      title: 'AI Text Humanizer & Polisher',
      description: 'Removes AI filler phrases ("it is important to note", "tapestry") and simplifies complex buzzwords.',
      category: 'AI & Formatting',
      icon: Bot,
      action: (text) => transformers.humanizeAiText(text)
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

  const categories = ['AI & Formatting', 'Extraction', 'Developer'];

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
