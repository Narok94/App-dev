/**
 * Central type exports for application architecture.
 */

export * from './database';
export * from './pwa';
export * from './learning';

export interface ArchitectureModule {
  id: string;
  name: string;
  path: string;
  purpose: string;
  status: 'active' | 'ready_for_extension' | 'configured';
  category: 'core' | 'presentation' | 'infrastructure' | 'domain';
}

export interface SystemArchitectureStatus {
  version: string;
  environment: 'development' | 'production' | 'staging';
  isDatabaseReady: boolean;
  isPwaReady: boolean;
  modulesCount: number;
}
