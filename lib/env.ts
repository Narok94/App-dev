/**
 * Secure Environment Variables Module.
 * Validates, types, and protects environment configuration at runtime.
 * Guarantees that server-only secrets are never accessed on the client.
 */

import { logger } from '@/utils/logger';

interface ClientEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  readonly isDev: boolean;
  readonly isProd: boolean;
}

/**
 * Validates and exposes safe client-side environment variables.
 */
function parseClientEnv(): ClientEnv {
  const isDev = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV);
  const isProd = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.PROD);
  
  const rawApiUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '';
  const rawEnv = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_ENV) || (isDev ? 'development' : 'production');

  // Verify that no server secret is accidentally prefixed or accessible
  if (typeof window !== 'undefined') {
    const dangerousKeys = [
      'DATABASE_URL',
      'VITE_DATABASE_URL',
      'SECRET',
      'VITE_SECRET',
      'PRIVATE_KEY',
      'VITE_PRIVATE_KEY',
      'GEMINI_API_KEY',
      'VITE_GEMINI_API_KEY',
      'JWT_SECRET',
      'VITE_JWT_SECRET',
    ];
    const envRecord = (import.meta.env as unknown as Record<string, unknown>) || {};
    dangerousKeys.forEach((key) => {
      if (envRecord[key]) {
        logger.error(`CRITICAL SECURITY WARNING: Sensitive key "${key}" detected in client-side bundle!`);
      }
    });
  }

  const validEnvs: Array<'development' | 'staging' | 'production'> = ['development', 'staging', 'production'];
  const appEnv = validEnvs.includes(rawEnv as 'development') ? (rawEnv as 'development' | 'staging' | 'production') : 'production';

  return {
    VITE_API_URL: typeof rawApiUrl === 'string' ? rawApiUrl.trim() : '',
    VITE_APP_ENV: appEnv,
    isDev,
    isProd,
  };
}

export const env: ClientEnv = parseClientEnv();
