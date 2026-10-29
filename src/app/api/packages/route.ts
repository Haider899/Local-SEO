import { NextRequest, NextResponse } from "next/server";
import { getPackages, updatePackage, logAdminAction } from "@/lib/data/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const packages = getPackages();
    return NextResponse.json({ success: true, packages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates, adminEmail } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { success: false, error: "Package ID and updates are required." },
        { status: 400 }
      );
    }

    const updated = updatePackage(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 });
    }

    logAdminAction(
      adminEmail || "admin@omnirank.ai",
      "Package Pricing Updated",
      updated.name,
      `Price updated to $${updated.price}/mo with ${updated.features.length} features`
    );

    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update package" },
      { status: 500 }
    );
  }
}
