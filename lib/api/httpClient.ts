/**
 * Centralized, Secure HTTP Client Layer.
 * Provides resilient, typed requests with timeout enforcement, interceptors, and safe error normalization.
 * Prepared for future API routes, Neon PostgreSQL backend services, and authenticated calls.
 */

import { logger } from '@/utils/logger';
import { isValidUrl } from '@/utils/validation';
import { env } from '@/lib/env';

export interface HttpRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeoutMs?: number;
  params?: Record<string, string | number | boolean | undefined>;
  retries?: number;
  skipAuth?: boolean;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

export class HttpError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly code?: string;
  public readonly isNetworkError: boolean;
  public readonly isTimeout: boolean;

  constructor(params: {
    message: string;
    status?: number;
    statusText?: string;
    code?: string;
    isNetworkError?: boolean;
    isTimeout?: boolean;
  }) {
    super(params.message);
    this.name = 'HttpError';
    this.status = params.status ?? 0;
    this.statusText = params.statusText ?? '';
    this.code = params.code;
    this.isNetworkError = params.isNetworkError ?? false;
    this.isTimeout = params.isTimeout ?? false;
  }
}

type RequestInterceptor = (config: RequestInit & { url: string }) => Promise<RequestInit & { url: string }> | (RequestInit & { url: string });
type ResponseInterceptor = <T>(response: HttpResponse<T>) => Promise<HttpResponse<T>> | HttpResponse<T>;

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 1;
const INSECURE_SCHEMES = ['javascript:', 'data:', 'file:', 'blob:', 'vbscript:'];

export class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private allowedOrigins: Set<string> = new Set();

  constructor(baseURL = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...defaultHeaders,
    };

    // Inicializa allowlist com origens confiáveis conhecidas
    if (typeof window !== 'undefined' && window.location?.origin) {
      this.allowedOrigins.add(window.location.origin);
    }
    if (env.VITE_API_URL) {
      try {
        const parsed = new URL(env.VITE_API_URL);
        this.allowedOrigins.add(parsed.origin);
      } catch {
        // Ignora caso seja caminho relativo
      }
    }
    if (baseURL && (baseURL.startsWith('http://') || baseURL.startsWith('https://'))) {
      try {
        const parsed = new URL(baseURL);
        this.allowedOrigins.add(parsed.origin);
      } catch {
        // Ignora
      }
    }
  }

  public setBaseURL(url: string): void {
    this.baseURL = url;
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      try {
        const parsed = new URL(url);
        this.allowedOrigins.add(parsed.origin);
      } catch {
        // Ignora
      }
    }
  }

  public addAllowedOrigin(origin: string): void {
    try {
      const parsed = new URL(origin);
      this.allowedOrigins.add(parsed.origin);
    } catch {
      this.allowedOrigins.add(origin.trim().toLowerCase());
    }
  }

  public getAllowedOrigins(): string[] {
    return Array.from(this.allowedOrigins);
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  private validateUrlSecurity(targetUrl: string): void {
    const trimmedLower = targetUrl.trim().toLowerCase();

    for (const scheme of INSECURE_SCHEMES) {
      if (trimmedLower.startsWith(scheme)) {
        throw new HttpError({
          message: `Requisição bloqueada: protocolo inseguro "${scheme}" não é permitido.`,
          code: 'ERR_INSECURE_PROTOCOL',
        });
      }
    }

    // Caminhos relativos da própria aplicação (ex: /api/...) são seguros por definição
    if (targetUrl.startsWith('/') && !targetUrl.startsWith('//')) {
      return;
    }

    let parsed: URL;
    try {
      parsed = new URL(targetUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    } catch {
      throw new HttpError({
        message: 'Requisição bloqueada: URL inválida ou malformada.',
        code: 'ERR_INVALID_URL',
      });
    }

    const isDev = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV);
    const isLocalhost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';

    // Bloqueia HTTP não criptografado fora de ambiente local / dev
    if (parsed.protocol === 'http:' && !isDev && !isLocalhost) {
      throw new HttpError({
        message: 'Requisição bloqueada: HTTP sem criptografia é proibido em produção.',
        code: 'ERR_INSECURE_HTTP',
      });
    }

    // Valida contra a allowlist de destinos
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const isAllowed =
      this.allowedOrigins.has(parsed.origin) ||
      (currentOrigin && parsed.origin === currentOrigin) ||
      (isDev && isLocalhost);

    if (!isAllowed) {
      logger.warn(`Requisição bloqueada para destino não autorizado: ${parsed.origin}`, 'HttpClient');
      throw new HttpError({
        message: 'Requisição bloqueada: destino não permitido na política de segurança.',
        code: 'ERR_BLOCKED_DESTINATION',
      });
    }
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    let fullUrl = path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `${this.baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    if (!isValidUrl(fullUrl, true)) {
      throw new HttpError({
        message: 'Requisição bloqueada: URL inválida ou protocolo não permitido.',
        code: 'ERR_INVALID_URL',
      });
    }

    this.validateUrlSecurity(fullUrl);

    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
      }
    }

    return fullUrl;
  }

  public async request<T = unknown>(
    path: string,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const {
      timeoutMs = DEFAULT_TIMEOUT_MS,
      retries = DEFAULT_RETRIES,
      params,
      body,
      headers: customHeaders,
      ...customInit
    } = options;

    let url = this.buildUrl(path, params);

    const headers = new Headers({
      ...this.defaultHeaders,
      ...(customHeaders as Record<string, string> | undefined),
    });

    let fetchInit: RequestInit & { url: string } = {
      ...customInit,
      url,
      headers,
    };

    if (body !== undefined) {
      fetchInit.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    // Run request interceptors
    for (const interceptor of this.requestInterceptors) {
      fetchInit = await interceptor(fetchInit);
      url = fetchInit.url;
    }

    let attempt = 0;
    while (attempt <= retries) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutMs);

      try {
        const response = await fetch(url, {
          ...fetchInit,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        let parsedData: unknown = null;
        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
          try {
            parsedData = await response.json();
          } catch {
            parsedData = null;
          }
        } else {
          parsedData = await response.text();
        }

        const httpResponse: HttpResponse<T> = {
          data: parsedData as T,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          ok: response.ok,
        };

        if (!response.ok) {
          // Normalize server errors safely without leaking internal details
          const safeMessage = response.status >= 500
            ? 'Erro interno no servidor. Tente novamente mais tarde.'
            : response.status === 404
            ? 'Recurso não encontrado.'
            : response.status === 401
            ? 'Sessão expirada ou não autenticada.'
            : response.status === 403
            ? 'Acesso negado.'
            : 'Ocorreu um erro ao processar sua solicitação.';

          logger.warn(`HTTP ${response.status}: ${response.statusText}`, 'HttpClient', {
            url,
            status: response.status,
          });

          throw new HttpError({
            message: safeMessage,
            status: response.status,
            statusText: response.statusText,
            code: `HTTP_${response.status}`,
          });
        }

        // Run response interceptors
        let finalResponse = httpResponse;
        for (const interceptor of this.responseInterceptors) {
          finalResponse = await interceptor(finalResponse);
        }

        return finalResponse;
      } catch (err: unknown) {
        clearTimeout(timeoutId);

        const isAbort = err instanceof DOMException && err.name === 'AbortError';
        const isNetwork = !isAbort && err instanceof TypeError;

        if (attempt < retries && (isNetwork || isAbort)) {
          attempt++;
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, attempt * 500));
          continue;
        }

        if (err instanceof HttpError) {
          throw err;
        }

        if (isAbort) {
          throw new HttpError({
            message: 'A requisição excedeu o tempo limite de resposta.',
            isTimeout: true,
            code: 'ERR_TIMEOUT',
          });
        }

        logger.error('Network request failed', 'HttpClient', err);
        throw new HttpError({
          message: 'Falha na conexão de rede. Verifique sua internet.',
          isNetworkError: true,
          code: 'ERR_NETWORK',
        });
      }
    }

    throw new HttpError({
      message: 'Falha ao executar requisição.',
      code: 'ERR_MAX_RETRIES',
    });
  }

  public get<T>(path: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  public post<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }

  public put<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(path, { ...options, method: 'PUT', body });
  }

  public patch<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(path, { ...options, method: 'PATCH', body });
  }

  public delete<T>(path: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();
