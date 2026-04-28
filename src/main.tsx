import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from '@/routes/index'; // Import router from new routes file
import '@/styles/globals.css';
import '@/styles/theme.css';
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);