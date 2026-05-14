import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import SmoothScroll from './components/shared/SmoothScroll';
import '@/styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);