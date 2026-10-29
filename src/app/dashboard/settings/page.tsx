"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Settings, ShieldCheck, Key, MapPin, Globe, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { workspace } = useWorkspace();
  const [mode, setMode] = useState<"Auto" | "Approval">("Auto");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Workspace Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure automation modes, Google OAuth connection, and reporting schedules for {workspace.name}.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Settings successfully updated.
        </div>
      )}

      {/* Mode Selection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            GMB Automation Execution Mode
          </h2>
          <p className="text-xs text-slate-500">
            Choose whether the AI applies routine profile updates and replies automatically or asks for your sign-off first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setMode("Auto")}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              mode === "Auto"
                ? "border-teal-600 bg-teal-50/30 shadow-sm"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900">Auto Mode</span>
              {mode === "Auto" && <Badge variant="success">Active</Badge>}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI automatically publishes scheduled posts, responds to verified 5-star reviews, and updates attributes. (Name/Address/Category always requires manual approval).
            </p>
          </div>

          <div
            onClick={() => setMode("Approval")}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              mode === "Approval"
                ? "border-teal-600 bg-teal-50/30 shadow-sm"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900">Approval Mode</span>
              {mode === "Approval" && <Badge variant="warning">Active</Badge>}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every single AI-generated post, review reply, and profile edit enters the &ldquo;Smart Tasks&rdquo; queue for your one-click manual approval before going live.
            </p>
          </div>
        </div>
      </div>

      {/* Google Business Profile Connection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Google Business Profile Integration
          </h2>
          <p className="text-xs text-slate-500">
            Connect via official Google OAuth 2.0 to grant secure API access for posting and review management.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-teal-600 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{workspace.name}</p>
              <p className="text-xs text-slate-500">{workspace.location} • GMB Linked</p>
            </div>
          </div>

          <Button variant="outline" className="text-xs">
            Reconnect OAuth
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave}>
          Save Workspace Preferences
        </Button>
      </div>
    </div>
  );
}

