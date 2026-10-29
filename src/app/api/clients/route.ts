import { NextRequest, NextResponse } from "next/server";
import {
  getClients,
  saveClient,
  updateClient,
  logAdminAction,
  getAdminLogs,
} from "@/lib/data/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clients = getClients();
    const logs = getAdminLogs();
    return NextResponse.json({ success: true, clients, logs });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      domain,
      ownerName,
      ownerEmail,
      phone,
      plan,
      mode,
      password,
    } = body;

    if (!ownerEmail || !businessName) {
      return NextResponse.json(
        { success: false, error: "Business name and owner email are required." },
        { status: 400 }
      );
    }

    const selectedPlan = plan === "pkg_2" || plan?.includes("50")
      ? "Package 2 ($50/mo)"
      : "Package 1 ($20/mo)";
    const mrr = selectedPlan === "Package 2 ($50/mo)" ? 50 : 20;

    const newClient = saveClient({
      businessName,
      domain: domain || `${businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      ownerName: ownerName || ownerEmail.split("@")[0],
      ownerEmail: ownerEmail.trim().toLowerCase(),
      phone: phone || undefined,
      plan: selectedPlan,
      mrr,
      status: "Active",
      automationPaused: false,
      mode: mode === "Approval" ? "Approval" : "Auto",
      gmbConnected: false,
      lastLoginDate: "Just Now",
      healthScore: 65,
      lastActionTaken: "Account provisioned & starting baseline audit initialized",
      password: password || undefined,
    });

    logAdminAction(
      "system",
      "Client Registered",
      newClient.businessName,
      `New subscription registered for ${newClient.plan} ($${mrr}/mo)`
    );

    return NextResponse.json({ success: true, client: newClient });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create client" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, payload, adminEmail } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Client ID is required." },
        { status: 400 }
      );
    }

    const executor = adminEmail || "admin@omnirank.ai";
    let updates: any = {};
    let logMessage = "";

    if (action === "disable") {
      updates = {
        status: "Disabled",
        automationPaused: true,
      };
      logMessage = "Disabled client account and paused all ongoing automations";
    } else if (action === "enable") {
      updates = {
        status: "Active",
        automationPaused: false,
      };
      logMessage = "Restored client login and resumed automated workflows";
    } else if (action === "reset_password") {
      updates = {
        password: payload.newPassword || "TempPass2026!",
      };
      logMessage = "Manually reset client login password";
    } else if (action === "change_plan") {
      const isPkg2 = payload.plan?.includes("50") || payload.plan === "Package 2 ($50/mo)";
      updates = {
        plan: isPkg2 ? "Package 2 ($50/mo)" : "Package 1 ($20/mo)",
        mrr: isPkg2 ? 50 : 20,
      };
      logMessage = `Changed plan to ${updates.plan}`;
    } else if (action === "toggle_gmb") {
      updates = {
        gmbConnected: Boolean(payload.connected),
      };
      logMessage = updates.gmbConnected
        ? "Connected Google Business Profile via OAuth2"
        : "Disconnected Google Business Profile";
    } else if (action === "toggle_mode") {
      updates = {
        mode: payload.mode === "Approval" ? "Approval" : "Auto",
      };
      logMessage = `Changed automation mode to ${updates.mode}`;
    } else {
      updates = payload || {};
      logMessage = "Updated client profile settings";
    }

    const updated = updateClient(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
    }

    logAdminAction(executor, `Account Override (${action})`, updated.businessName, logMessage);

    return NextResponse.json({ success: true, client: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update client" },
      { status: 500 }
    );
  }
}
