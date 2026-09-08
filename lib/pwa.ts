/**
 * Progressive Web App (PWA) utilities.
 * Handles service worker lifecycle and registration safely in browser environments.
 */

import { logger } from '@/utils/logger';

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        logger.info('Service Worker registrado com sucesso:', 'PWA', registration.scope);
      })
      .catch((error) => {
        logger.warn('Falha ao registrar Service Worker.', 'PWA', error);
      });
  });
}

export function unregisterServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
    })
    .catch((error) => {
      logger.warn('Falha ao desregistrar Service Worker.', 'PWA', error);
    });
}
