import { NextRequest, NextResponse } from "next/server";
import { runWebsiteAudit } from "@/lib/audit/engine";
import { saveAuditResult } from "@/lib/store";
import { saveLead } from "@/lib/data/repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, email, businessName, location, primaryService, targetKeyword } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid website URL is required to run the audit." },
        { status: 400 }
      );
    }

    const auditResult = await runWebsiteAudit({
      url,
      businessName,
      location,
      primaryService,
      targetKeyword,
    });

    saveAuditResult(auditResult);

    // Save lead into persistent storage for sales follow-up & admin visibility
    if (email && typeof email === "string" && email.includes("@")) {
      try {
        saveLead({
          type: "free_audit",
          name: businessName || email.split("@")[0],
          email: email.trim().toLowerCase(),
          businessName: businessName || undefined,
          websiteUrl: url,
          healthScore: auditResult.overallScore,
        });
      } catch (leadErr) {
        console.warn("Could not save lead in repository:", leadErr);
      }
    }

    return NextResponse.json({
      success: true,
      auditId: auditResult.id,
      result: auditResult,
    });
  } catch (error: any) {
    console.error("Audit Execution Error:", error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred during the audit scan.",
      },
      { status: 422 }
    );
  }
}
