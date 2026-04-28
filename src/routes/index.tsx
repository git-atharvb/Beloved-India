import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Tourism from '@/pages/Tourism';
import Heritage from '@/pages/Heritage';
import Geography from '@/pages/Geography';
import Explore from '@/pages/Explore';
import Food from '@/pages/Food'; // Moved import to avoid conflict with previous placeholder
import Culture from '@/pages/Culture'; // Placeholder page

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tourism', element: <Tourism /> },
      { path: 'culture', element: <Culture /> }, // Placeholder page
      { path: 'food', element: <Food /> },
      { path: 'heritage', element: <Heritage /> },
      { path: 'geography', element: <Geography /> },
      { path: 'explore', element: <Explore /> },
    ],
  },
]);