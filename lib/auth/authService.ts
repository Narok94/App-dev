/**
 * Architectural Authentication Service Foundation.
 * Implements IAuthService contract and hooks into the centralized HttpClient.
 * Ready for future backend/Neon integration without breaking current client workflow.
 */

import { IAuthService, AuthSession, AuthTokens, LoginCredentials, RegisterPayload, User } from '@/types/auth';
import { httpClient, HttpError } from '@/lib/api';
import { tokenStorage } from './tokenStorage';
import { logger } from '@/utils/logger';

class AuthService implements IAuthService {
  constructor() {
    // Configure HttpClient request interceptor to automatically attach Bearer token when available
    httpClient.addRequestInterceptor(async (config) => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        const headers = new Headers(config.headers);
        headers.set('Authorization', `Bearer ${token}`);
        return { ...config, headers };
      }
      return config;
    });
  }

  public async login(_credentials: LoginCredentials): Promise<AuthSession> {
    logger.info('AuthService: Login initiated. Waiting for backend route deployment.', 'AuthService');
    throw new HttpError({
      message: 'Módulo de autenticação ainda não ativo no ambiente atual.',
      code: 'AUTH_NOT_IMPLEMENTED',
    });
  }

  public async register(_payload: RegisterPayload): Promise<AuthSession> {
    logger.info('AuthService: Register initiated. Waiting for backend route deployment.', 'AuthService');
    throw new HttpError({
      message: 'Módulo de registro ainda não ativo no ambiente atual.',
      code: 'AUTH_NOT_IMPLEMENTED',
    });
  }

  public async logout(): Promise<void> {
    tokenStorage.clearTokens();
    logger.info('AuthService: Local session cleared.', 'AuthService');
  }

  public async refreshToken(): Promise<AuthTokens | null> {
    const refresh = tokenStorage.getRefreshToken();
    if (!refresh) return null;
    return null;
  }

  public async getCurrentUser(): Promise<User | null> {
    return null;
  }

  public async getSession(): Promise<AuthSession | null> {
    return null;
  }

  public async updateProfile(_updates: Partial<Pick<User, 'name' | 'avatarUrl'>>): Promise<User> {
    throw new HttpError({
      message: 'Atualização de perfil remoto ainda não ativa.',
      code: 'AUTH_NOT_IMPLEMENTED',
    });
  }
}

export const authService = new AuthService();
