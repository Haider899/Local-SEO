import { AIActionItem, ClientIntelligenceInput } from './types';

export class AIDecisionEngine {
  /**
   * Synthesizes audit, reviews, and geo-grid intelligence to generate prioritized actions.
   */
  static generatePrioritizedActions(input: ClientIntelligenceInput): AIActionItem[] {
    const actions: AIActionItem[] = [];
    const now = new Date().toISOString();

    // 1. GEO-GRID ANALYSIS (Connecting Geo-Grid Heatmap to Action Plan)
    if (input.geoGridZoneBreakdown) {
      const { north, south, east, west } = input.geoGridZoneBreakdown;

      if (north.status === 'weak') {
        actions.push({
          id: `act_geo_north_${Date.now()}`,
          clientId: input.clientId,
          title: 'Targeted Review Campaign for North Zone Customers',
          description: `Your average ranking in the Northern zone is #${north.avgRank}. Competitors in that quadrant currently have 2.4x more localized review density. Dispatch review request SMS/emails specifically targeting Northern service addresses.`,
          category: 'reviews',
          priority: 'high',
          status: 'pending',
          targetZone: 'North',
          rationale: `North zone average rank is #${north.avgRank} (Weak). Geo-grid indicates authority drops off beyond 2.5 miles North.`,
          predictedImpact: '+3 to +5 rank position increase in North quadrant within 14 days',
          requiresApproval: input.mode === 'Approval',
          createdAt: now,
          metricBefore: { metricName: 'North Avg Rank', value: north.avgRank },
        });
      }

      if (west.status === 'weak') {
        actions.push({
          id: `act_geo_west_${Date.now()}`,
          clientId: input.clientId,
          title: 'Publish Hyper-Local Service Update for Western Service Area',
          description: `Create a Google Business Profile update post highlighting services offered in Western neighborhoods with localized keywords and directional tags.`,
          category: 'content',
          priority: 'medium',
          status: 'pending',
          targetZone: 'West',
          rationale: `West zone ranking is #${west.avgRank} (Weak). Search intent in this zone favors localized service terminology.`,
          predictedImpact: 'Improves entity proximity association for West quadrant searches',
          requiresApproval: input.mode === 'Approval',
          createdAt: now,
          metricBefore: { metricName: 'West Avg Rank', value: west.avgRank },
        });
      }
    }

    // 2. UNANSWERED REVIEWS ANALYSIS
    if (input.unansweredReviewsCount > 0) {
      actions.push({
        id: `act_rev_${Date.now()}`,
        clientId: input.clientId,
        title: `Auto-Draft & Publish Replies for ${input.unansweredReviewsCount} Pending Reviews`,
        description: `There are ${input.unansweredReviewsCount} customer reviews without business owner responses. Quick responses directly boost Google Local trust signals and user conversion rates.`,
        category: 'reviews',
        priority: 'critical',
        status: 'pending',
        targetZone: 'General',
        rationale: 'Google algorithms reward profiles with >90% response rate within 24-48 hours.',
        predictedImpact: 'Lifts profile responsiveness score to 100% and improves Local 3-Pack retention',
        requiresApproval: input.mode === 'Approval',
        createdAt: now,
        metricBefore: { metricName: 'Unanswered Reviews', value: input.unansweredReviewsCount },
      });
    }

    // 3. CONTENT POSTING CADENCE
    actions.push({
      id: `act_post_${Date.now()}`,
      clientId: input.clientId,
      title: 'Generate Weekly GBP Highlight Post (Seasonal Promotion)',
      description: `Draft an engaging Google Business Profile update with a high-converting CTA button ("Call Now" / "Book Online") to maintain fresh profile signals.`,
      category: 'content',
      priority: 'medium',
      status: 'pending',
      targetZone: 'General',
      rationale: 'Active posting signals operational vitality to Google ranking crawlers.',
      predictedImpact: '+18% increase in Google Map user actions (Calls & Directions)',
      requiresApproval: input.mode === 'Approval',
      createdAt: now,
    });

    // 4. CORE PROFILE RESTRICTED AUDIT (Always requires manual approval as per spec)
    if (input.healthScore < 75) {
      actions.push({
        id: `act_profile_${Date.now()}`,
        clientId: input.clientId,
        title: 'Review Secondary Category & Attribute Enhancements',
        description: 'Profile completeness is below 75%. Optimize secondary service categories, business attributes (e.g. wheelchair accessible, online appointments), and services menu.',
        category: 'profile',
        priority: 'high',
        status: 'pending',
        targetZone: 'General',
        rationale: 'Secondary categories expand keyword search coverage by up to 35%.',
        predictedImpact: 'Expands discovery search footprint for non-branded queries',
        requiresApproval: true, // Core rule: Category/name/address changes ALWAYS require manual approval
        createdAt: now,
        metricBefore: { metricName: 'Health Score', value: input.healthScore },
      });
    }

    // 5. WEBSITE AUDIT (Package 2 feature)
    if (input.websiteAuditScore !== undefined && input.websiteAuditScore < 70) {
      actions.push({
        id: `act_web_${Date.now()}`,
        clientId: input.clientId,
        title: 'Fix Missing LocalBusiness Schema & Meta Tags on Website',
        description: `Website SEO score is ${input.websiteAuditScore}/100. Inject JSON-LD LocalBusiness schema with precise NAP (Name, Address, Phone) matching Google Business Profile.`,
        category: 'website',
        priority: 'high',
        status: 'pending',
        targetZone: 'General',
        rationale: 'NAP discrepancy between website and GMB reduces algorithm ranking confidence.',
        predictedImpact: 'Resolves NAP consistency penalties and activates rich map snippets',
        requiresApproval: input.mode === 'Approval',
        createdAt: now,
        metricBefore: { metricName: 'Website SEO Score', value: input.websiteAuditScore },
      });
    }

    return actions;
  }
}
