/**
 * Architectural database contracts and interfaces.
 * Prepares the application for ORM/Database integration (PostgreSQL, Firestore, SQLite, Prisma, etc.)
 */

export type DatabaseStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface DatabaseConfig {
  url?: string;
  maxConnections?: number;
  timeoutMs?: number;
  ssl?: boolean;
}

export interface BaseEntity {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface Repository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  findMany(options?: QueryOptions): Promise<T[]>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface DatabaseHealth {
  status: DatabaseStatus;
  latencyMs?: number;
  provider: 'uninitialized' | 'postgres' | 'firestore' | 'sqlite' | 'other';
  lastChecked?: string;
}
