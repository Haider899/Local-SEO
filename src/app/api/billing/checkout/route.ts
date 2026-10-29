import { NextRequest, NextResponse } from 'next/server';
import { StripeBillingService } from '@/lib/billing/stripe-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, clientEmail, businessName, packageId } = body;

    if (!packageId || (packageId !== 'pkg_1' && packageId !== 'pkg_2')) {
      return NextResponse.json({ error: 'Valid packageId (pkg_1 or pkg_2) is required' }, { status: 400 });
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    const session = StripeBillingService.createCheckoutSession({
      clientId: clientId || `biz_${Date.now()}`,
      clientEmail: clientEmail || 'client@example.com',
      businessName: businessName || 'My Business',
      packageId,
      successUrl: `${protocol}://${host}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${protocol}://${host}/pricing`,
    });

    return NextResponse.json({ success: true, session });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
