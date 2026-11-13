"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { MetricCard } from "@/ui/MetricCard";
import { ScoreGauge } from "@/ui/ScoreGauge";
import { AuditResult } from "@/types";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import {
  Globe,
  MapPin,
  Bot,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AuditReportPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params?.id as string;
  const { saveAuditAsActiveWorkspace } = useWorkspace();
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAudit() {
      try {
        const res = await fetch(`/api/audit/${auditId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.audit) {
            setAudit(data.audit);
          }
        }
      } catch {
        // Continue
      } finally {
        setLoading(false);
      }
    }
    if (auditId) {
      loadAudit();
    }
  }, [auditId]);

  const handleOpenInDashboard = () => {
    if (audit) {
      saveAuditAsActiveWorkspace(audit);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-teal-600 selection:text-white font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 relative pt-12 sm:pt-16 pb-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24 space-y-4">
              <Sparkles className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
              <p className="text-slate-500 text-sm font-medium">Loading comprehensive audit report...</p>
            </div>
          ) : audit ? (
            <div className="space-y-8">
              {/* Header Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      Verified Audit Report
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {new Date(audit.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    {audit.businessName}
                  </h1>
                  <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
                    <Globe className="w-3.5 h-3.5 text-teal-600" /> {audit.domain} • {audit.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <ScoreGauge score={audit.overallScore} size={90} label="Score" />
                  </div>
                  <Button variant="primary" onClick={handleOpenInDashboard} className="py-3 shadow-sm font-bold">
                    Open in Live Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <MetricCard title="SEO Structure" value={`${audit.categoryScores.seo}%`} score={audit.categoryScores.seo} />
                <MetricCard title="Technical" value={`${audit.categoryScores.technical}%`} score={audit.categoryScores.technical} />
                <MetricCard title="Local GMB Signals" value={`${audit.categoryScores.local}%`} score={audit.categoryScores.local} />
                <MetricCard title="AI / AEO Search" value={`${audit.categoryScores.ai}%`} score={audit.categoryScores.ai} />
                <MetricCard title="Authority" value={`${audit.categoryScores.authority}%`} score={audit.categoryScores.authority} />
              </div>

              {/* Priority Issues & Action Items */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 font-heading">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Detected Priority Action Items ({audit.issues.length})
                </h3>

                <div className="space-y-4">
                  {audit.issues.map((issue) => (
                    <div key={issue.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">{issue.title}</span>
                        <Badge variant={issue.severity === "critical" ? "danger" : "warning"}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 font-normal">{issue.description}</p>
                      <p className="text-xs text-teal-700 font-bold">
                        💡 Recommendation: {issue.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <h2 className="text-2xl font-black text-slate-900 font-heading">Audit Not Found</h2>
              <p className="text-slate-500 text-sm">
                The requested audit report ID does not exist or has expired.
              </p>
              <Button variant="primary" href="/free-tools/local-rank-checker">
                Run a New Scan
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
