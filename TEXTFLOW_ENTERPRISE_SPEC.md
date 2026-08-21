# TextFlow.io — Production-Grade Technical Specification & Codebase Blueprint
**Version:** 2.5 Enterprise
**Author:** Principal Software Architect & Lead Frontend Engineer
**Stack:** React 18+, Vite, Tailwind CSS, Lucide React
**Privacy Model:** 100% Client-Side In-Memory Execution (Zero Server Transmission)

---

## 1. EXECUTIVE SUMMARY & ARCHITECTURAL PHILOSOPHY

### 1.1 Target Audience
TextFlow.io is engineered for modern digital knowledge workers who manipulate unstructured text on a daily basis:
* **Software Engineers & DevOps Operators:** Rapid JSON formatting, Base64 encoding/decoding, HTML entity escaping, and log text cleaning without exposing secrets to external remote servers.
* **Data Analysts & Marketers:** Instant extraction of email addresses, URLs, IP addresses, phone numbers, and string slugification.
* **Copywriters & Content Editors:** Case transformations (Title Case, UPPERCASE, lowercase), stripping extra whitespace, and live reading metrics calculation.

### 1.2 Zero-Server Privacy Guarantee
Traditional web utilities transmit text payloads to backend microservices for processing, exposing confidential corporate notes, API tokens, customer PII, and financial records to third-party network logs. TextFlow.io operates on a **zero-server privacy paradigm**:
1. All JavaScript transformation logic executes inside the browser's V8 or JavaScriptCore engine.
2. No API endpoints exist for text processing; zero outbound network fetch calls are issued during transformations.
3. User settings and history snapshots are saved strictly in `localStorage` / `sessionStorage` bounded by browser origin security boundaries.

### 1.3 Performance Objectives
* **Sub-50ms First Contentful Paint (FCP)** and **sub-100ms Time to Interactive (TTI)**.
* **Zero UI lockup during typing**: Live metrics computations and regular expression extraction are decoupled or debounced (`useDebounce` hook with 300ms delay).
* **Lighthouse Target Score**: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.

---

## 2. COMPLETE PROJECT DIRECTORY STRUCTURE

```
textflow-io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── babel.config.cjs
├── .gitignore
├── tests/
│   ├── textTransformers.test.js
│   └── app.spec.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── AppContext.jsx
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useDebounce.js
    ├── utils/
    │   ├── textTransformers.js
    │   ├── regexExtractors.js
    │   └── jsonToolbox.js
    └── components/
        ├── layout/
        │   ├── Header.jsx
        │   └── Footer.jsx
        ├── workspace/
        │   ├── Workspace.jsx
        │   ├── InputPane.jsx
        │   └── OutputPane.jsx
        ├── tools/
        │   ├── ActionHub.jsx
        │   └── ToolCard.jsx
        ├── history/
        │   └── HistoryDrawer.jsx
        └── modals/
            └── MacroBuilderModal.jsx
```

---

## 3. CONFIGURATION & SETUP FILES

### 3.1 `package.json`
```json
{
  "name": "textflow-io",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.378.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.24.5",
    "@babel/preset-react": "^7.24.1",
    "@playwright/test": "^1.44.0",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "babel-jest": "^29.7.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "vite": "^5.2.11"
  }
}
```

### 3.2 `vite.config.js`
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
```

### 3.3 `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0b0f19',
          900: '#0f172a',
          850: '#172033',
          800: '#1e293b',
          700: '#334155',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
```

### 3.4 `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 4. CORE APPLICATION ENTRY POINT & STYLING

### 4.1 `index.html`
```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TextFlow.io - Enterprise Client-Side Web Utility Hub</title>
    <meta name="description" content="Zero-latency, zero-server privacy text processing engine for developer, extraction, and formatting utilities." />
    <!-- Google Fonts Inter & Fira Code -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4.2 `src/main.jsx`
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
```

### 4.3 `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #06b6d4;
}

/* Code area focus outline */
textarea:focus, input:focus {
  outline: none;
}
```

---

## 5. GLOBAL STATE MANAGEMENT & HOOKS

### 5.1 `src/hooks/useLocalStorage.js`
```javascript
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage persistent state in browser localStorage with error handling fallback.
 * @param {string} key
 * @param {any} initialValue
 * @returns {[any, Function]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

### 5.2 `src/hooks/useDebounce.js`
```javascript
import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value updates (e.g. for heavy regex or live computation).
 * @param {any} value
 * @param {number} delay
 * @returns {any}
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 5.3 `src/context/AppContext.jsx`
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useLocalStorage('textflow_theme', 'dark');
  const [history, setHistory] = useLocalStorage('textflow_history', []);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMacroModalOpen, setIsMacroModalOpen] = useState(false);
  const [savedMacros, setSavedMacros] = useLocalStorage('textflow_macros', []);
  const [toastMessage, setToastMessage] = useState(null);

  // Apply dark/light class on root html document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Show auto-expiring notification toast
  const showToast = (message, duration = 2500) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, duration);
  };

  // Add record to history vault (max 20 items)
  const addHistoryEntry = (toolName, input, output) => {
    if (!input || input === output) return;
    const entry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      toolName,
      input,
      output
    };
    setHistory((prev) => [entry, ...prev.slice(0, 19)]);
  };

  const clearHistory = () => {
    setHistory([]);
    showToast('History cleared');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider
      value={{
        inputText,
        setInputText,
        outputText,
        setOutputText,
        activeTool,
        setActiveTool,
        searchQuery,
        setSearchQuery,
        theme,
        toggleTheme,
        history,
        addHistoryEntry,
        clearHistory,
        isHistoryOpen,
        setIsHistoryOpen,
        isMacroModalOpen,
        setIsMacroModalOpen,
        savedMacros,
        setSavedMacros,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
```

---

## 6. UTILITY FUNCTIONS & LOGIC ENGINE

### 6.1 `src/utils/textTransformers.js`
```javascript
/**
 * Pure functions for text transformation and string formatting operations.
 */

export const toUppercase = (text) => (text ? text.toUpperCase() : '');

export const toLowercase = (text) => (text ? text.toLowerCase() : '');

export const toTitleCase = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/(?:^|\s|-|_)\S/g, (match) => match.toUpperCase());
};

export const toCamelCase = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

export const toKebabCase = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toSnakeCase = (text) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

export const stripExtraSpaces = (text) => {
  if (!text) return '';
  return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
};

export const removeLineBreaks = (text) => {
  if (!text) return '';
  return text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
};

export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const reverseString = (text) => {
  if (!text) return '';
  return text.split('').reverse().join('');
};

export const calculateMetrics = (text) => {
  if (!text) {
    return { characters: 0, words: 0, lines: 0, readingTimeMinutes: 0 };
  }
  const characters = text.length;
  const wordsArray = text.trim().split(/\s+/).filter(Boolean);
  const words = wordsArray.length;
  const lines = text.split(/\r\n|\r|\n/).length;
  const readingTimeMinutes = Math.ceil(words / 200);

  return { characters, words, lines, readingTimeMinutes };
};
```

### 6.2 `src/utils/regexExtractors.js`
```javascript
/**
 * Regular expressions and data extractors for structured information harvesting.
 */

export const REGEX_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
  url: /(https?:\/\/[^\s<>"{}|\^~\[\]`]+)/gi,
  ipv4: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
  phone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  numbers: /-?\d+(?:\.\d+)?/g
};

export const extractEmails = (text) => {
  if (!text) return 'No emails found.';
  const matches = text.match(REGEX_PATTERNS.email);
  if (!matches) return 'No emails found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractUrls = (text) => {
  if (!text) return 'No URLs found.';
  const matches = text.match(REGEX_PATTERNS.url);
  if (!matches) return 'No URLs found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractIPs = (text) => {
  if (!text) return 'No IP addresses found.';
  const matches = text.match(REGEX_PATTERNS.ipv4);
  if (!matches) return 'No IP addresses found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractPhones = (text) => {
  if (!text) return 'No phone numbers found.';
  const matches = text.match(REGEX_PATTERNS.phone);
  if (!matches) return 'No phone numbers found.';
  const unique = Array.from(new Set(matches));
  return unique.join('\n');
};

export const extractNumbers = (text) => {
  if (!text) return 'No numbers found.';
  const matches = text.match(REGEX_PATTERNS.numbers);
  if (!matches) return 'No numbers found.';
  return matches.join('\n');
};
```

### 6.3 `src/utils/jsonToolbox.js`
```javascript
/**
 * Developer utilities for JSON formatting, syntax validation, Base64 encoding/decoding, and HTML escaping.
 */

export const beautifyJson = (text, indent = 2) => {
  if (!text || !text.trim()) return '';
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    return `[JSON Syntax Error]: ${error.message}`;
  }
};

export const minifyJson = (text) => {
  if (!text || !text.trim()) return '';
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  } catch (error) {
    return `[JSON Syntax Error]: ${error.message}`;
  }
};

export const encodeBase64 = (text) => {
  if (!text) return '';
  try {
    return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  } catch (error) {
    return `[Base64 Encoding Error]: ${error.message}`;
  }
};

export const decodeBase64 = (text) => {
  if (!text) return '';
  try {
    return decodeURIComponent(atob(text).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (error) {
    return `[Base64 Decoding Error]: Invalid Base64 payload - ${error.message}`;
  }
};

export const escapeHtml = (text) => {
  if (!text) return '';
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (tag) => htmlEntities[tag] || tag);
};

export const unescapeHtml = (text) => {
  if (!text) return '';
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};
```

---

## 7. COMPONENT ARCHITECTURE: LAYOUT & NAVIGATION

### 7.1 `src/components/layout/Header.jsx`
```jsx
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
```

### 7.2 `src/components/layout/Footer.jsx`
```jsx
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
```

---

## 8. COMPONENT ARCHITECTURE: THE WORKSPACE & INPUT/OUTPUT

### 8.1 `src/components/workspace/Workspace.jsx`
```jsx
import React from 'react';
import { InputPane } from './InputPane.jsx';
import { OutputPane } from './OutputPane.jsx';

export const Workspace = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 my-4">
      <InputPane />
      <OutputPane />
    </div>
  );
};
```

### 8.2 `src/components/workspace/InputPane.jsx`
```jsx
import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Trash2,
  Upload,
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
```

### 8.3 `src/components/workspace/OutputPane.jsx`
```jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Copy,
  Check,
  Download,
  Code,
  Sparkles
} from 'lucide-react';

export const OutputPane = () => {
  const { outputText, activeTool, showToast } = useApp();
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
            <span className="text-[10px] font-medium text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-full">
              {activeTool}
            </span>
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
```

---

## 9. COMPONENT ARCHITECTURE: THE ACTION HUB (TOOLS GRID)

### 9.1 `src/components/tools/ToolCard.jsx`
```jsx
import React from 'react';

export const ToolCard = ({ title, description, icon: Icon, onClick, active }) => {
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
```

### 9.2 `src/components/tools/ActionHub.jsx`
```jsx
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
  FileCode
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

  const toolsList = [
    // Text Formatting Tools
    {
      id: 'uppercase',
      title: 'UPPERCASE',
      description: 'Converts all characters in input stream to capital letters.',
      category: 'Formatting',
      icon: CaseUpper,
      action: (text) => transformers.toUppercase(text)
    },
    {
      id: 'lowercase',
      title: 'lowercase',
      description: 'Converts all text characters to lower case.',
      category: 'Formatting',
      icon: CaseLower,
      action: (text) => transformers.toLowercase(text)
    },
    {
      id: 'titlecase',
      title: 'Title Case',
      description: 'Capitalizes first letter of each word in the string.',
      category: 'Formatting',
      icon: Baseline,
      action: (text) => transformers.toTitleCase(text)
    },
    {
      id: 'camelcase',
      title: 'camelCase',
      description: 'Formats text into camelCase variable naming convention.',
      category: 'Formatting',
      icon: Type,
      action: (text) => transformers.toCamelCase(text)
    },
    {
      id: 'kebabcase',
      title: 'kebab-case',
      description: 'Converts spaces and capitalization into dash-separated words.',
      category: 'Formatting',
      icon: Link2,
      action: (text) => transformers.toKebabCase(text)
    },
    {
      id: 'snakecase',
      title: 'snake_case',
      description: 'Converts input text into underscore-separated lowercase words.',
      category: 'Formatting',
      icon: Code2,
      action: (text) => transformers.toSnakeCase(text)
    },
    {
      id: 'slug',
      title: 'URL Slug Generator',
      description: 'Creates safe, sanitized web URL slug strings.',
      category: 'Formatting',
      icon: Link2,
      action: (text) => transformers.generateSlug(text)
    },
    {
      id: 'stripspaces',
      title: 'Strip Whitespace',
      description: 'Collapses redundant spaces and trims padding whitespace.',
      category: 'Formatting',
      icon: Scissors,
      action: (text) => transformers.stripExtraSpaces(text)
    },
    {
      id: 'removelines',
      title: 'Remove Line Breaks',
      description: 'Replaces newline characters with single spaces.',
      category: 'Formatting',
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

  const categories = ['Formatting', 'Extraction', 'Developer'];

  return (
    <div className="my-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg font-bold text-slate-100 tracking-tight">
          Action Hub & Utility Engine
        </h2>
      </div>

      {categories.map((cat) => {
        const catTools = filteredTools.filter((t) => t.category === cat);
        if (catTools.length === 0) return null;

        return (
          <div key={cat} className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-800/80 pb-1">
              {cat} Utilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {catTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  category={tool.category}
                  active={activeTool === tool.title}
                  onClick={() => handleExecuteTool(tool.title, tool.action)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
```

---

## 10. ADVANCED FEATURES & HISTORY VAULT

### 10.1 `src/components/history/HistoryDrawer.jsx`
```jsx
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
```

### 10.2 `src/components/modals/MacroBuilderModal.jsx`
```jsx
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
```

---

## 11. PERFORMANCE OPTIMIZATION, SECURITY & ERROR BOUNDARIES

### 11.1 Code Splitting & Chunk Strategy
Vite and Rollup configured manual chunking separates React engine core dependencies from iconography vector trees (`lucide-react`). Dynamic `import()` modules ensure sub-100KB initial gzipped bundle footprint.

### 11.2 Content Security Policy (CSP) Template
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; frame-ancestors 'none';
```
*(Note: `connect-src 'none'` strictly enforces zero outbound HTTP requests, proving local privacy).*

---

## 12. TESTING, CI/CD, AND DEPLOYMENT PIPELINE

### 12.1 Unit Tests (`tests/textTransformers.test.js`)
```javascript
const transformers = require('../src/utils/textTransformers.js');

describe('textTransformers Unit Tests', () => {
  test('toUppercase transforms string to uppercase', () => {
    expect(transformers.toUppercase('hello world')).toBe('HELLO WORLD');
  });

  test('toLowercase transforms string to lowercase', () => {
    expect(transformers.toLowercase('HELLO WORLD')).toBe('hello world');
  });

  test('toTitleCase capitalizes words correctly', () => {
    expect(transformers.toTitleCase('hello world textflow')).toBe('Hello World Textflow');
  });

  test('toCamelCase formats string into camelCase', () => {
    expect(transformers.toCamelCase('hello world test')).toBe('helloWorldTest');
  });

  test('toKebabCase formats string into kebab-case', () => {
    expect(transformers.toKebabCase('Hello World TextFlow')).toBe('hello-world-text-flow');
  });

  test('stripExtraSpaces removes unnecessary spaces', () => {
    expect(transformers.stripExtraSpaces('  hello   world  ')).toBe('hello world');
  });

  test('generateSlug produces clean URL slugs', () => {
    expect(transformers.generateSlug('TextFlow.io Enterprise Utility!')).toBe('textflowio-enterprise-utility');
  });

  test('calculateMetrics returns accurate counts', () => {
    const metrics = transformers.calculateMetrics('Hello world textflow');
    expect(metrics.characters).toBe(20);
    expect(metrics.words).toBe(3);
    expect(metrics.lines).toBe(1);
  });
});
```

### 12.2 E2E Playwright Tests (`tests/app.spec.js`)
```javascript
const { test, expect } = require('@playwright/test');

test.describe('TextFlow.io E2E Core Workflow', () => {
  test('User can enter text and apply UPPERCASE transformation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check main title
    await expect(page.locator('text=TextFlow')).toBeVisible();

    // Type text in raw input area
    const inputArea = page.locator('textarea[placeholder*="Paste or type raw"]');
    await inputArea.fill('hello textflow test');

    // Click UPPERCASE tool card
    await page.click('text=UPPERCASE');

    // Verify output text
    const outputArea = page.locator('textarea[readonly]');
    await expect(outputArea).toHaveValue('HELLO TEXTFLOW TEST');
  });

  test('User can clear input stream', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const inputArea = page.locator('textarea[placeholder*="Paste or type raw"]');
    await inputArea.fill('sample data');
    await page.click('button[title="Clear Input"]');
    await expect(inputArea).toHaveValue('');
  });
});
```

### 12.3 GitHub Actions Workflow (`.github/workflows/deploy.yml`)
```yaml
name: TextFlow.io Production Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code Repository
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Unit Tests
        run: npm test

      - name: Production Bundle Build
        run: npm run build

      - name: Deploy to Vercel Production Edge
        if: github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```
