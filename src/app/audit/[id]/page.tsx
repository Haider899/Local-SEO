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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24 space-y-4">
              <Sparkles className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
              <p className="text-slate-400 text-sm">Loading comprehensive audit report...</p>
            </div>
          ) : audit ? (
            <div className="space-y-8">
              {/* Header Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info">Verified Audit Report</Badge>
                    <span className="text-xs text-slate-500">{new Date(audit.timestamp).toLocaleDateString()}</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-white">{audit.businessName}</h1>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> {audit.domain} • {audit.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <ScoreGauge score={audit.overallScore} size={90} label="Score" />
                  </div>
                  <Button variant="primary" onClick={handleOpenInDashboard} className="py-3">
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
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Detected Priority Action Items ({audit.issues.length})
                </h3>

                <div className="space-y-4">
                  {audit.issues.map((issue) => (
                    <div key={issue.id} className="p-5 rounded-xl border border-slate-800 bg-slate-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-base">{issue.title}</span>
                        <Badge variant={issue.severity === "critical" ? "danger" : "warning"}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300">{issue.description}</p>
                      <p className="text-xs text-blue-400 font-medium">
                        💡 Recommendation: {issue.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <h2 className="text-2xl font-bold text-white">Audit Not Found</h2>
              <p className="text-slate-400 text-sm">
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

