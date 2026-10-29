import { NextRequest, NextResponse } from 'next/server';
import { GBPReviewManager } from '@/lib/gmb/review-manager';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, review, businessName, customerName, customerContact, clientId, reviewLink, channel } = body;

    if (action === 'reply') {
      if (!review) {
        return NextResponse.json({ error: 'Missing review payload' }, { status: 400 });
      }
      const reply = GBPReviewManager.generateReply(review, businessName || 'Our Business');
      return NextResponse.json({ success: true, reply });
    }

    if (action === 'request') {
      if (!customerName || !customerContact) {
        return NextResponse.json({ error: 'Missing customerName or customerContact' }, { status: 400 });
      }
      const campaign = GBPReviewManager.createReviewRequest({
        clientId: clientId || 'biz_default',
        customerName,
        customerContact,
        businessName: businessName || 'Our Business',
        reviewLink: reviewLink || 'https://g.page/r/your-review-link',
        channel: channel || 'SMS',
      });
      return NextResponse.json({ success: true, campaign });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
