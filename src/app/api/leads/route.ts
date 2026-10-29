import { NextRequest, NextResponse } from "next/server";
import { getLeads, saveLead, updateLeadStatus } from "@/lib/data/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, businessName, websiteUrl, service, budget, message, type, healthScore } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "A valid email address is required to submit an inquiry." },
        { status: 400 }
      );
    }

    const newLead = saveLead({
      type: type || "service_quote",
      name: name || email.split("@")[0],
      email: email.trim().toLowerCase(),
      phone: phone || undefined,
      businessName: businessName || undefined,
      websiteUrl: websiteUrl || undefined,
      service: service || undefined,
      budget: budget || undefined,
      message: message || undefined,
      healthScore: healthScore !== undefined ? Number(healthScore) : undefined,
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Lead id and status are required." },
        { status: 400 }
      );
    }

    const updated = updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update lead" },
      { status: 500 }
    );
  }
}
