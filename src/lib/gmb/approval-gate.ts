export type FieldChangeType =
  | 'NAME'
  | 'ADDRESS'
  | 'PRIMARY_CATEGORY'
  | 'SECONDARY_CATEGORY'
  | 'DESCRIPTION'
  | 'HOURS'
  | 'ATTRIBUTES'
  | 'SERVICES';

export interface ProposedProfileChange {
  id: string;
  clientId: string;
  field: FieldChangeType;
  oldValue: string | string[];
  proposedValue: string | string[];
  mode: 'Auto' | 'Approval';
  requiresManualApproval: boolean;
  status: 'PENDING_APPROVAL' | 'AUTO_APPLIED' | 'APPROVED' | 'REJECTED';
  rationale: string;
  createdAt: string;
}

export class GBPApprovalGate {
  /**
   * Evaluates whether a proposed GBP profile modification requires manual approval.
   * Documentation Rule:
   * "Name/address/primary category changes always require manual approval, in either mode."
   */
  static evaluateChange(params: {
    clientId: string;
    field: FieldChangeType;
    oldValue: string | string[];
    proposedValue: string | string[];
    mode: 'Auto' | 'Approval';
    rationale: string;
  }): ProposedProfileChange {
    const isCriticalField =
      params.field === 'NAME' ||
      params.field === 'ADDRESS' ||
      params.field === 'PRIMARY_CATEGORY';

    // Critical fields ALWAYS require manual approval regardless of mode
    const requiresManualApproval = isCriticalField || params.mode === 'Approval';

    return {
      id: `change_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      clientId: params.clientId,
      field: params.field,
      oldValue: params.oldValue,
      proposedValue: params.proposedValue,
      mode: params.mode,
      requiresManualApproval,
      status: requiresManualApproval ? 'PENDING_APPROVAL' : 'AUTO_APPLIED',
      rationale: params.rationale,
      createdAt: new Date().toISOString(),
    };
  }
}
