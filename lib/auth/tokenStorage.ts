/**
 * Secure Token Storage Manager.
 * Mitigates XSS token extraction by defaulting to in-memory token storage.
 * Designed for seamless transition to HttpOnly cookies or secure worker storage.
 */

class TokenStorageManager {
  private memoryToken: string | null = null;
  private memoryRefreshToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  /**
   * Sets current active authentication tokens in memory.
   */
  public setTokens(accessToken: string, refreshToken?: string, expiresInSeconds?: number): void {
    this.memoryToken = accessToken;
    if (refreshToken) {
      this.memoryRefreshToken = refreshToken;
    }
    if (expiresInSeconds) {
      this.tokenExpiresAt = Date.now() + expiresInSeconds * 1000;
    }
  }

  /**
   * Retrieves the in-memory access token if not expired.
   */
  public getAccessToken(): string | null {
    if (this.tokenExpiresAt && Date.now() >= this.tokenExpiresAt) {
      this.memoryToken = null;
      return null;
    }
    return this.memoryToken;
  }

  public getRefreshToken(): string | null {
    return this.memoryRefreshToken;
  }

  public isTokenExpired(): boolean {
    if (!this.tokenExpiresAt) return false;
    // Buffer of 30 seconds before expiration
    return Date.now() >= this.tokenExpiresAt - 30_000;
  }

  public clearTokens(): void {
    this.memoryToken = null;
    this.memoryRefreshToken = null;
    this.tokenExpiresAt = null;
  }
}

export const tokenStorage = new TokenStorageManager();
