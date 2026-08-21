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
