import { OperationalAlert, QueueJobStatus } from './types';
import fs from 'fs';
import path from 'path';

const ALERTS_FILE = path.join(process.cwd(), '.data', 'operational_alerts.json');
const QUEUE_FILE = path.join(process.cwd(), '.data', 'queue_status.json');

export class AdminMonitoringService {
  private static ensureStorage() {
    const dir = path.dirname(ALERTS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(ALERTS_FILE)) {
      const defaultAlerts: OperationalAlert[] = [
        {
          id: 'alert_1',
          severity: 'INFO',
          errorType: 'API_RATE_LIMIT',
          message: 'Google Places API quota utilization at 42% (Normal operating limits)',
          timestamp: new Date().toISOString(),
          resolved: true,
        },
      ];
      fs.writeFileSync(ALERTS_FILE, JSON.stringify(defaultAlerts, null, 2), 'utf8');
    }

    if (!fs.existsSync(QUEUE_FILE)) {
      const defaultQueue: QueueJobStatus[] = [
        {
          id: 'job_101',
          jobType: 'GEO_GRID_SCAN',
          clientId: 'biz_101',
          status: 'COMPLETED',
          attempts: 1,
          scheduledAt: new Date(Date.now() - 3600000).toISOString(),
          finishedAt: new Date(Date.now() - 3500000).toISOString(),
        },
        {
          id: 'job_102',
          jobType: 'AI_DECISION_RUN',
          clientId: 'biz_102',
          status: 'COMPLETED',
          attempts: 1,
          scheduledAt: new Date(Date.now() - 7200000).toISOString(),
          finishedAt: new Date(Date.now() - 7100000).toISOString(),
        },
      ];
      fs.writeFileSync(QUEUE_FILE, JSON.stringify(defaultQueue, null, 2), 'utf8');
    }
  }

  static getAlerts(): OperationalAlert[] {
    this.ensureStorage();
    try {
      return JSON.parse(fs.readFileSync(ALERTS_FILE, 'utf8'));
    } catch {
      return [];
    }
  }

  static getQueueStatus(): QueueJobStatus[] {
    this.ensureStorage();
    try {
      return JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    } catch {
      return [];
    }
  }

  static recordAlert(alert: Omit<OperationalAlert, 'id' | 'timestamp' | 'resolved'>): OperationalAlert {
    this.ensureStorage();
    const alerts = this.getAlerts();
    const newAlert: OperationalAlert = {
      id: `alert_${Date.now()}`,
      ...alert,
      timestamp: new Date().toISOString(),
      resolved: false,
    };
    alerts.unshift(newAlert);
    fs.writeFileSync(ALERTS_FILE, JSON.stringify(alerts, null, 2), 'utf8');
    return newAlert;
  }
}
