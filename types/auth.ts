/**
 * Core Authentication and Authorization Type Contracts.
 * Prepares the architectural foundation for future authentication,
 * JWT management, role-based access control (RBAC), and Neon PostgreSQL user entities.
 */

export type UserRole = 'student' | 'instructor' | 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  metadata?: Record<string, unknown>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number; // in seconds
  tokenType: 'Bearer';
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
  expiresAt: number; // timestamp ms
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: AuthSession | null;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  provider?: 'credentials' | 'google' | 'github';
  oauthCode?: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password?: string;
}

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  register(payload: RegisterPayload): Promise<AuthSession>;
  logout(): Promise<void>;
  refreshToken(): Promise<AuthTokens | null>;
  getCurrentUser(): Promise<User | null>;
  getSession(): Promise<AuthSession | null>;
  updateProfile(updates: Partial<Pick<User, 'name' | 'avatarUrl'>>): Promise<User>;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
