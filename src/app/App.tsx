
import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { GameProvider } from './store/gameStore';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <GameProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </GameProvider>
  );
}
