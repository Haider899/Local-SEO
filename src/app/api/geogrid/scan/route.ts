import { NextRequest, NextResponse } from 'next/server';
import { GeoGridRankService } from '@/lib/geogrid/rank-checker';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, businessName, keyword, lat, lng, gridSize, radiusMiles } = body;

    if (!keyword || lat === undefined || lng === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: keyword, lat, lng' },
        { status: 400 }
      );
    }

    const scan = await GeoGridRankService.executeScan({
      clientId: clientId || 'biz_default',
      businessName: businessName || 'Local Business',
      keyword,
      center: { lat: Number(lat), lng: Number(lng) },
      gridSize: gridSize ? Number(gridSize) as 3 | 5 | 7 : 5,
      radiusMiles: radiusMiles ? Number(radiusMiles) : 5,
    });

    return NextResponse.json({ success: true, scan });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to execute geo-grid scan', details: err.message },
      { status: 500 }
    );
  }
}
