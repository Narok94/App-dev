/**
 * Progressive Web App (PWA) utilities.
 * Handles service worker lifecycle and registration safely in browser environments.
 */

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (process.env.NODE_ENV === 'development') {
          console.info('[PWA] Service Worker registered successfully:', registration.scope);
        }
      })
      .catch((error) => {
        console.warn('[PWA] Service Worker registration failed:', error);
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
      console.warn('[PWA] Error unregistering service worker:', error);
    });
}
