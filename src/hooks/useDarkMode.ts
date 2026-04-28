import { useState, useEffect } from 'react';

/**
 * Custom hook to manage dark mode state and persist it in localStorage.
 * It also applies the 'dark' class to the document's root element.
 * @returns A tuple containing the current dark mode state and a function to toggle it.
 */
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage for preference, or default to system preference
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    // Check system preference if no localStorage preference is found
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}

export default useDarkMode;