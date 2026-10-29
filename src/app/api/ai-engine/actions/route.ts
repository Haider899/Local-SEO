import { NextRequest, NextResponse } from 'next/server';
import { AIDecisionEngine } from '@/lib/ai-engine/decision-engine';
import { AIActionLogger } from '@/lib/ai-engine/action-logger';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get('clientId') || undefined;

  const actions = AIActionLogger.getActions(clientId);
  return NextResponse.json({ success: true, actions });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const actions = AIDecisionEngine.generatePrioritizedActions({
      clientId: body.clientId || 'biz_default',
      businessName: body.businessName || 'Local Business',
      primaryCategory: body.primaryCategory || 'Local Services',
      mode: body.mode || 'Auto',
      healthScore: Number(body.healthScore || 70),
      totalReviews: Number(body.totalReviews || 25),
      averageRating: Number(body.averageRating || 4.5),
      unansweredReviewsCount: Number(body.unansweredReviewsCount || 2),
      geoGridZoneBreakdown: body.geoGridZoneBreakdown,
      websiteAuditScore: body.websiteAuditScore ? Number(body.websiteAuditScore) : undefined,
    });

    AIActionLogger.saveActions(actions);
    return NextResponse.json({ success: true, actions });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to synthesize AI decision plan', details: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { actionId, metricAfterValue } = body;

    if (!actionId) {
      return NextResponse.json({ error: 'Missing actionId' }, { status: 400 });
    }

    const updated = AIActionLogger.completeAction(actionId, metricAfterValue);
    if (!updated) {
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, action: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
