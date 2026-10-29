import { AdminRole } from './types';

export type Permission =
  | 'VIEW_CLIENTS'
  | 'VIEW_LEADS'
  | 'MANAGE_CLIENT_ACCOUNTS' // Password reset, enable/disable
  | 'CHANGE_PACKAGES_PLANS'
  | 'VIEW_BILLING_SETTINGS'
  | 'EDIT_PACKAGES'
  | 'IMPERSONATE_CLIENT'
  | 'VIEW_OPERATIONAL_MONITORING'
  | 'EXPORT_DATA';

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: [
    'VIEW_CLIENTS',
    'VIEW_LEADS',
    'MANAGE_CLIENT_ACCOUNTS',
    'CHANGE_PACKAGES_PLANS',
    'VIEW_BILLING_SETTINGS',
    'EDIT_PACKAGES',
    'IMPERSONATE_CLIENT',
    'VIEW_OPERATIONAL_MONITORING',
    'EXPORT_DATA',
  ],
  support: [
    'VIEW_CLIENTS',
    'VIEW_LEADS',
    'MANAGE_CLIENT_ACCOUNTS',
    'IMPERSONATE_CLIENT',
    'VIEW_OPERATIONAL_MONITORING',
  ],
  sales: [
    'VIEW_CLIENTS',
    'VIEW_LEADS',
    'EXPORT_DATA',
  ],
};

export class AdminRBAC {
  static hasPermission(role: AdminRole, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
  }

  static getPermissions(role: AdminRole): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }
}
