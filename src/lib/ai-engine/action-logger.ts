import { AIActionItem } from './types';
import fs from 'fs';
import path from 'path';

const LOG_FILE_PATH = path.join(process.cwd(), '.data', 'ai_actions.json');

export class AIActionLogger {
  private static ensureStorage() {
    const dir = path.dirname(LOG_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(LOG_FILE_PATH)) {
      fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2), 'utf8');
    }
  }

  static getActions(clientId?: string): AIActionItem[] {
    this.ensureStorage();
    try {
      const data = fs.readFileSync(LOG_FILE_PATH, 'utf8');
      const actions: AIActionItem[] = JSON.parse(data);
      if (clientId) {
        return actions.filter((a) => a.clientId === clientId);
      }
      return actions;
    } catch {
      return [];
    }
  }

  static saveActions(newActions: AIActionItem[]): void {
    this.ensureStorage();
    const existing = this.getActions();
    const map = new Map<string, AIActionItem>();

    existing.forEach((item) => map.set(item.id, item));
    newActions.forEach((item) => map.set(item.id, item));

    fs.writeFileSync(
      LOG_FILE_PATH,
      JSON.stringify(Array.from(map.values()), null, 2),
      'utf8'
    );
  }

  static completeAction(
    actionId: string,
    metricAfterValue?: number | string
  ): AIActionItem | null {
    this.ensureStorage();
    const existing = this.getActions();
    const action = existing.find((a) => a.id === actionId);

    if (!action) return null;

    action.status = 'completed';
    action.completedAt = new Date().toISOString();
    if (metricAfterValue !== undefined && action.metricBefore) {
      action.metricAfter = {
        metricName: action.metricBefore.metricName,
        value: metricAfterValue,
      };
    }

    this.saveActions(existing);
    return action;
  }
}
