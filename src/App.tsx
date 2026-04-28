import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/index';
import LoadingScreen from '@/components/shared/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      {!isLoading && <RouterProvider router={router} />}
    </>
  );
}

export default App;