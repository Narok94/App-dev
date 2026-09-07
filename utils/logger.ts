/**
 * Secure structured logger utility.
 * Prevents internal errors and sensitive data from leaking to the console in production environments.
 */

const SENSITIVE_KEYS = new RegExp(
  'password|secret|token|api[_-]?key|credential|authorization|bearer',
  'i'
);

/**
 * Recursively redacts sensitive keys from objects to prevent accidental credential leakage in logs.
 */
function sanitizeData(data: unknown, depth = 0): unknown {
  if (depth > 4) return '[Max Depth Reached]';
  if (data === null || data === undefined) return data;
  
  if (typeof data === 'string') {
    if (data.length > 500) {
      return `${data.slice(0, 500)}... [Truncated]`;
    }
    return data;
  }

  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item, depth + 1));
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.test(key)) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = sanitizeData(val, depth + 1);
    }
  }
  return sanitized;
}

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

export const logger = {
  debug(message: string, context?: string, data?: unknown): void {
    if (!isDev) return;
    const prefix = context ? `[App:${context}]` : '[App]';
    if (data !== undefined) {
      console.debug(prefix, message, sanitizeData(data));
    } else {
      console.debug(prefix, message);
    }
  },

  info(message: string, context?: string, data?: unknown): void {
    if (!isDev) return;
    const prefix = context ? `[App:${context}]` : '[App]';
    if (data !== undefined) {
      console.info(prefix, message, sanitizeData(data));
    } else {
      console.info(prefix, message);
    }
  },

  warn(message: string, context?: string, data?: unknown): void {
    const prefix = context ? `[App:${context}]` : '[App]';
    if (isDev) {
      if (data !== undefined) {
        console.warn(prefix, message, sanitizeData(data));
      } else {
        console.warn(prefix, message);
      }
    } else {
      console.warn(prefix, message);
    }
  },

  error(message: string, context?: string, error?: unknown): void {
    const prefix = context ? `[App:${context}]` : '[App]';
    if (isDev) {
      if (error !== undefined) {
        console.error(prefix, message, error);
      } else {
        console.error(prefix, message);
      }
    } else {
      console.error(prefix, message);
    }
  },
};
