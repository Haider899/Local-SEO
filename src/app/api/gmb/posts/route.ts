import { NextRequest, NextResponse } from 'next/server';
import { GBPPostGenerator } from '@/lib/gmb/post-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, businessName, category, preferredType, mode } = body;

    const post = GBPPostGenerator.generatePost({
      clientId: clientId || 'biz_default',
      businessName: businessName || 'Local Business',
      category: category || 'General Contractor',
      preferredType,
      mode: mode || 'Auto',
    });

    return NextResponse.json({ success: true, post });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to generate GBP post', details: err.message },
      { status: 500 }
    );
  }
}
