/**
 * Secure structured logger utility.
 * Prevents internal errors, stack traces, and sensitive data from leaking to the console.
 */

const SENSITIVE_KEYS = new RegExp(
  'password|secret|token|api[_-]?key|credential|authorization|bearer|cookie|database_url|session|auth|private[_-]?key',
  'i'
);

const JWT_PATTERN = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
const CONNECTION_STRING_PATTERN = /:\/\/[^:]+:[^@]+@/;

/**
 * Sanitizes primitive strings against accidental credential or connection string leakage.
 */
function sanitizeString(str: string): string {
  if (str.length > 500) {
    str = `${str.slice(0, 500)}... [Truncated]`;
  }
  if (CONNECTION_STRING_PATTERN.test(str)) {
    return '[REDACTED_CONNECTION_STRING]';
  }
  if (JWT_PATTERN.test(str) && str.length > 30) {
    return '[REDACTED_TOKEN]';
  }
  return str;
}

/**
 * Recursively redacts sensitive keys from objects and errors to prevent accidental leakage in logs.
 */
function sanitizeData(data: unknown, depth = 0): unknown {
  if (depth > 4) return '[Max Depth Reached]';
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return sanitizeString(data);
  }

  if (typeof data !== 'object') {
    return data;
  }

  // Handle Error instances safely without leaking stack traces or internal secrets
  if (data instanceof Error) {
    return {
      name: data.name,
      message: sanitizeString(data.message),
    };
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

const isDev = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV);

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
      // In production, log warning message only (no raw data or stack traces)
      console.warn(prefix, message);
    }
  },

  error(message: string, context?: string, error?: unknown): void {
    const prefix = context ? `[App:${context}]` : '[App]';
    if (isDev) {
      if (error !== undefined) {
        console.error(prefix, message, sanitizeData(error));
      } else {
        console.error(prefix, message);
      }
    } else {
      // In production, keep error logs strictly minimal without leaking internal object structures
      console.error(prefix, message);
    }
  },
};
