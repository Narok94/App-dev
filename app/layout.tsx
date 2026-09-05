import React, { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/pwa';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inicializa o Service Worker do PWA
    registerServiceWorker();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0] text-[#2B231D] selection:bg-[#E2D8CC] selection:text-[#2B231D] font-sans antialiased">
      {children}
    </div>
  );
}
