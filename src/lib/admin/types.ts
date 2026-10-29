export type AdminRole = 'super_admin' | 'sales' | 'support';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  twoFactorEnabled: boolean;
  lastLoginAt: string;
}

export interface ImpersonationSession {
  token: string;
  adminId: string;
  adminEmail: string;
  clientId: string;
  clientBusinessName: string;
  expiresAt: string;
}

export interface QueueJobStatus {
  id: string;
  jobType: 'GMB_SYNC' | 'GEO_GRID_SCAN' | 'AI_DECISION_RUN' | 'REVIEW_CHECK' | 'POST_PUBLISH';
  clientId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  attempts: number;
  errorMessage?: string;
  scheduledAt: string;
  finishedAt?: string;
}

export interface OperationalAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  clientId?: string;
  businessName?: string;
  errorType: 'GMB_TOKEN_EXPIRED' | 'SCRAPER_BLOCKED' | 'PAYMENT_FAILED' | 'API_RATE_LIMIT';
  message: string;
  timestamp: string;
  resolved: boolean;
}
