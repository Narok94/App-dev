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
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-[#12151F] text-[#F2F1EA] selection:bg-[#C8F03D] selection:text-[#12151F] font-sans antialiased">
      {children}
    </div>
  );
}
