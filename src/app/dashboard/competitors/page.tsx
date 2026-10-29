"use client";

import React from "react";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { MetricCard } from "@/ui/MetricCard";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Users2, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";

export default function CompetitorsPage() {
  const { workspace } = useWorkspace();
  const competitors = workspace.competitors;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Competitor Intelligence
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Benchmarking {workspace.name} against top local competitors in {workspace.location}.
          </p>
        </div>

        <Button variant="primary" className="text-xs">
          Add Competitor
        </Button>
      </div>

      {/* Overview Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Brand */}
        <div className="rounded-2xl border-2 border-teal-500 bg-teal-50/20 p-6 shadow-sm relative">
          <span className="absolute top-4 right-4 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Your Business
          </span>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{workspace.name}</h3>
          <p className="text-xs text-slate-500 mb-4">{workspace.domain}</p>

          <div className="space-y-3 pt-3 border-t border-teal-200/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">Visibility Score:</span>
              <span className="font-bold text-teal-700">{workspace.overallVisibilityScore}/100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">Local GMB Score:</span>
              <span className="font-bold text-teal-700">{workspace.localVisibilityScore}/100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 font-medium">AI Recommendation:</span>
              <span className="font-bold text-teal-700">{workspace.aiVisibilityScore}/100</span>
            </div>
          </div>
        </div>

        {/* Competitor Cards */}
        {competitors.map((comp) => (
          <div key={comp.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-slate-900">{comp.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">{comp.domain}</p>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Overall Score:</span>
                <span className="font-bold text-slate-900">{comp.overallScore}/100</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Local Score:</span>
                <span className="font-bold text-slate-900">{comp.localScore}/100</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">AI Score:</span>
                <span className="font-bold text-slate-900">{comp.aiScore}/100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Gap Analysis */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Competitor Strengths & Weaknesses</h2>
        <div className="space-y-6">
          {competitors.map((comp) => (
            <div key={comp.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900">{comp.name} ({comp.domain})</h4>
                <span className="text-xs text-slate-500 font-medium">
                  {comp.sharedKeywords} Shared Keywords
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {comp.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Weaknesses & Opportunities
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {comp.weaknesses.map((w, i) => (
                      <li key={i}>• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

