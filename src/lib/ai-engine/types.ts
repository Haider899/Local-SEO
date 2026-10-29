export type ActionCategory = 'profile' | 'reviews' | 'content' | 'geogrid' | 'website';
export type ActionPriority = 'critical' | 'high' | 'medium' | 'low';
export type ActionStatus = 'pending' | 'in_progress' | 'completed' | 'dismissed';

export interface AIActionItem {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: ActionCategory;
  priority: ActionPriority;
  status: ActionStatus;
  targetZone?: 'North' | 'South' | 'East' | 'West' | 'Center' | 'General';
  rationale: string; // The data-backed reasoning (e.g. why North zone failed)
  predictedImpact: string; // e.g. "+15% Local 3-Pack visibility in North zip codes"
  requiresApproval: boolean; // True if name/address/primary category or mode === 'Approval'
  createdAt: string;
  completedAt?: string;
  metricBefore?: {
    metricName: string;
    value: number | string;
  };
  metricAfter?: {
    metricName: string;
    value: number | string;
  };
}

export interface ClientIntelligenceInput {
  clientId: string;
  businessName: string;
  primaryCategory: string;
  mode: 'Auto' | 'Approval';
  healthScore: number;
  totalReviews: number;
  averageRating: number;
  unansweredReviewsCount: number;
  lastPostDate?: string;
  geoGridZoneBreakdown?: {
    north: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    south: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    east: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    west: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    center: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
  };
  websiteAuditScore?: number;
}
