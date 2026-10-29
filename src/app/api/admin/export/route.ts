import { NextRequest, NextResponse } from 'next/server';
import { AdminExportService } from '@/lib/admin/export-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'clients';

    if (type === 'clients') {
      const csv = AdminExportService.exportClientsCSV();
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="omnirank_clients_${Date.now()}.csv"`,
        },
      });
    }

    if (type === 'leads') {
      const csv = AdminExportService.exportLeadsCSV();
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="omnirank_leads_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid export type. Use ?type=clients or ?type=leads' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
