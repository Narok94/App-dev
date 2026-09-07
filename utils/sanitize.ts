/**
 * Data Sanitization Utilities.
 * Enforces defense-in-depth against XSS, script injection, and invalid character sets.
 */

const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
};

/**
 * Escapes characters with special meaning in HTML to prevent XSS.
 */
export function sanitizeHtmlEntities(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`/]/g, (char) => HTML_ENTITY_MAP[char] || char);
}

/**
 * Strips HTML tags, JavaScript pseudo-protocols, and control characters from string input.
 */
export function sanitizeInputString(input: unknown, maxLength = 100): string {
  if (typeof input !== 'string') return '';
  
  // 1. Remove dangerous control chars (ASCII 0-31 except tab and newline, plus DEL 127)
  let cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // 2. Strip HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // 3. Strip script / javascript pseudo-protocols
  cleaned = cleaned.replace(/javascript:/gi, '');
  cleaned = cleaned.replace(/data:/gi, '');
  cleaned = cleaned.replace(/vbscript:/gi, '');

  // 4. Normalize whitespace
  cleaned = cleaned.trim().replace(/\s+/g, ' ');

  // 5. Enforce length boundary
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Specifically sanitizes user display names (e.g. for student profile).
 * Permits letters, numbers, spaces, dots, hyphens, and underscores.
 * Max length: 30 chars.
 */
export function sanitizeUserName(name: unknown, fallback = 'Explorador'): string {
  if (typeof name !== 'string') return fallback;
  
  // Remove dangerous chars, leave alphanumeric, unicode letters, spaces and simple punctuation
  const cleaned = sanitizeInputString(name, 30);
  
  // Extra filter for display name
  const filtered = cleaned.replace(/[^\p{L}\p{N}\s._-]/gu, '').trim();

  if (filtered.length < 2) {
    return fallback;
  }

  return filtered;
}
