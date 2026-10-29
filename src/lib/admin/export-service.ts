import fs from 'fs';
import path from 'path';

export class AdminExportService {
  /**
   * Generates a CSV string from an array of objects.
   */
  private static toCSV(headers: { key: string; label: string }[], rows: any[]): string {
    const headerLine = headers.map((h) => `"${h.label.replace(/"/g, '""')}"`).join(',');
    const dataLines = rows.map((row) =>
      headers
        .map((h) => {
          const val = row[h.key] !== undefined && row[h.key] !== null ? String(row[h.key]) : '';
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    return [headerLine, ...dataLines].join('\r\n');
  }

  static exportClientsCSV(): string {
    const clientsFile = path.join(process.cwd(), '.data', 'clients.json');
    if (!fs.existsSync(clientsFile)) return '';

    const clients = JSON.parse(fs.readFileSync(clientsFile, 'utf8'));
    const headers = [
      { key: 'id', label: 'Client ID' },
      { key: 'businessName', label: 'Business Name' },
      { key: 'domain', label: 'Domain' },
      { key: 'ownerName', label: 'Owner Name' },
      { key: 'ownerEmail', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'plan', label: 'Package Plan' },
      { key: 'mrr', label: 'Monthly Revenue ($)' },
      { key: 'status', label: 'Status' },
      { key: 'automationPaused', label: 'Automation Paused' },
      { key: 'mode', label: 'Mode' },
      { key: 'gmbConnected', label: 'GMB Connected' },
      { key: 'healthScore', label: 'Health Score' },
      { key: 'joinedDate', label: 'Joined Date' },
    ];

    return this.toCSV(headers, clients);
  }

  static exportLeadsCSV(): string {
    const leadsFile = path.join(process.cwd(), '.data', 'leads.json');
    if (!fs.existsSync(leadsFile)) return '';

    const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
    const headers = [
      { key: 'id', label: 'Lead ID' },
      { key: 'type', label: 'Lead Type' },
      { key: 'name', label: 'Contact Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'businessName', label: 'Business Name' },
      { key: 'service', label: 'Service Inquired' },
      { key: 'budget', label: 'Budget' },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Date' },
    ];

    return this.toCSV(headers, leads);
  }
}
