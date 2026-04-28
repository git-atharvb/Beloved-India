import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Tourism from '@/pages/Tourism';
import Culture from '@/pages/Culture';
import Food from '@/pages/Food';
import Heritage from '@/pages/Heritage';
import Geography from '@/pages/Geography';
import Explore from '@/pages/Explore';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tourism', element: <Tourism /> },
      { path: 'culture', element: <Culture /> },
      { path: 'food', element: <Food /> },
      { path: 'heritage', element: <Heritage /> },
      { path: 'geography', element: <Geography /> },
      { path: 'explore', element: <Explore /> },
    ],
  },
]);