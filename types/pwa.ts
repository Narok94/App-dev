/**
 * Progressive Web App (PWA) type definitions.
 * Handles service worker state, installation prompt events, and offline status.
 */

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export type ServiceWorkerState = 'unsupported' | 'registering' | 'active' | 'waiting' | 'redundant' | 'failed';

export interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  swState: ServiceWorkerState;
}
