import { NextRequest, NextResponse } from 'next/server';
import { AdminImpersonationService } from '@/lib/admin/impersonation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { adminEmail, clientId, clientBusinessName } = body;

    if (!clientId || !clientBusinessName) {
      return NextResponse.json(
        { error: 'Missing clientId or clientBusinessName' },
        { status: 400 }
      );
    }

    const session = AdminImpersonationService.createSession({
      adminEmail: adminEmail || 'superadmin@omnirank.ai',
      clientId,
      clientBusinessName,
    });

    return NextResponse.json({
      success: true,
      session,
      redirectUrl: `/dashboard?impersonate_token=${session.token}&client=${session.clientId}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
