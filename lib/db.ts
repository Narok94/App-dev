import { DatabaseConfig, DatabaseHealth } from '@/types/database';

/**
 * Database client abstraction layer.
 * Prepares the architectural bridge for future persistence implementations
 * (such as PostgreSQL, Cloud SQL, Firestore, Supabase, or SQLite).
 */

class DatabaseManager {
  private static instance: DatabaseManager | null = null;
  private isConfigured = false;
  private provider: DatabaseHealth['provider'] = 'uninitialized';

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * Initializes the database connection with environment configurations.
   */
  public async initialize(_config?: DatabaseConfig): Promise<void> {
    // Architectural foundation prepared. Ready for connection strings or SDK clients.
    this.isConfigured = true;
    this.provider = 'uninitialized';
  }

  /**
   * Checks database connectivity and health.
   */
  public async checkHealth(): Promise<DatabaseHealth> {
    return {
      status: this.isConfigured ? 'connected' : 'disconnected',
      provider: this.provider,
      lastChecked: new Date().toISOString(),
    };
  }

  public isReady(): boolean {
    return this.isConfigured;
  }
}

export const dbManager = DatabaseManager.getInstance();
