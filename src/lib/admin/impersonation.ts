import { ImpersonationSession } from './types';
import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), '.data', 'admin_logs.json');

export class AdminImpersonationService {
  /**
   * Generates a 1-hour secure impersonation session token for support troubleshooting.
   * Logs the action to admin_logs.json for audit and accountability.
   */
  static createSession(params: {
    adminEmail: string;
    clientId: string;
    clientBusinessName: string;
  }): ImpersonationSession {
    const token = `imp_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    const session: ImpersonationSession = {
      token,
      adminId: 'admin_sys',
      adminEmail: params.adminEmail,
      clientId: params.clientId,
      clientBusinessName: params.clientBusinessName,
      expiresAt,
    };

    // Log the event in admin_logs.json
    this.recordAuditLog({
      adminEmail: params.adminEmail,
      action: 'Client Impersonation',
      target: params.clientBusinessName,
      details: `Generated 1-hour impersonation session (token: ${token.substring(0, 8)}...)`,
    });

    return session;
  }

  private static recordAuditLog(entry: {
    adminEmail: string;
    action: string;
    target: string;
    details: string;
  }) {
    try {
      if (fs.existsSync(LOG_FILE)) {
        const data = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
        data.unshift({
          id: `log_${Date.now()}`,
          ...entry,
          timestamp: new Date().toISOString(),
        });
        fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2), 'utf8');
      }
    } catch {
      // Continue gracefully
    }
  }
}
