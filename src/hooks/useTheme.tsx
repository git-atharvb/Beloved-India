import React, { useEffect } from 'react';
import { create } from 'zustand';

type ThemeState = {
  dark: boolean;
  toggle: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTheme = create<ThemeState>((set: any) => ({
  dark: false,
  toggle: () => set((s: ThemeState) => ({ dark: !s.dark })),
}));

// Apply the dark class to the html element
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { dark } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return <>{children}</>;
};
