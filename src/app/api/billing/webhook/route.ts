import { NextRequest, NextResponse } from 'next/server';
import { StripeBillingService } from '@/lib/billing/stripe-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const result = StripeBillingService.processWebhookEvent(event);
    return NextResponse.json({ received: true, ...result });
  } catch (err: any) {
    return NextResponse.json({ error: 'Webhook processing failed', details: err.message }, { status: 400 });
  }
}
