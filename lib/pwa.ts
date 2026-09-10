/**
 * Progressive Web App (PWA) utilities.
 * Desativa service workers obsoletos e limpa caches residuais que bloqueavam navegação no mobile.
 */

import { logger } from '@/utils/logger';

export function cleanupServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Executa de forma assíncrona após primeiro render para nunca competir na thread principal
  setTimeout(() => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(() => {});
      }
    }).catch((err) => {
      logger.warn('Falha ao limpar registros de Service Worker:', 'PWA', err);
    });

    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name).catch(() => {});
        }
      }).catch(() => {});
    }
  }, 100);
}

// Alias de retrocompatibilidade para chamadas existentes
export const registerServiceWorker = cleanupServiceWorker;
export const unregisterServiceWorker = cleanupServiceWorker;

