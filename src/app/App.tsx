
import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { GameProvider } from './store/gameStore';
import { Toaster } from 'sonner';
import { IPhoneFrame } from './components/mobile/IPhoneFrame';

export default function App() {
  return (
    <GameProvider>
      <div className="bg-[#1c1c1e] min-h-screen flex items-center justify-center p-8">
        <IPhoneFrame>
            <RouterProvider router={router} />
        </IPhoneFrame>
      </div>
      <Toaster position="top-center" richColors />
    </GameProvider>
  );
}
