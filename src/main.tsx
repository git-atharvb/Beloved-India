import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import SmoothScroll from './components/shared/SmoothScroll';
import '@/styles/globals.css';
import '@/styles/theme.css';
import { ThemeProvider } from '@/hooks/useTheme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </ThemeProvider>
  </StrictMode>,
);