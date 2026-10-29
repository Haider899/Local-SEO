"use client";

import React from "react";
import Link from "next/link";
import { ScoreGauge } from "@/ui/ScoreGauge";
import { MetricCard } from "@/ui/MetricCard";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import {
  Bot,
  MapPin,
  Search,
  Layers,
  Users2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { workspace } = useWorkspace();

  return (
    <div className="space-y-8">
      {/* Top Welcome & Score Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Visibility Intelligence Overview
            </h1>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
              workspace.isLiveAudit 
                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                : "bg-teal-50 text-teal-800 border-teal-200"
            }`}>
              {workspace.isLiveAudit ? "Live Audit Data Active" : "No Domain Scanned Yet"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time tracking of Search, Maps 3-Pack, and Generative AI Share of Voice for{" "}
            <strong className="text-slate-800">{workspace.name}</strong>.
          </p>
        </div>

        <Link href="/dashboard/tasks">
          <Button variant="gradient" size="sm" rightIcon={<Zap className="w-3.5 h-3.5" />}>
            View {workspace.tasks.length} Smart Tasks
          </Button>
        </Link>
      </div>

      {/* Onboarding Invitation for Unconfigured Workspaces */}
      {!workspace.isLiveAudit && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-white border border-teal-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 crystal-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-700/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Connect your business to unlock live visibility intelligence
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Run an instant audit on your website domain to generate custom scores, AI citation share, and geo-grid tracking.
              </p>
            </div>
          </div>
          <Link
            href="/#audit-section"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-sm shadow-teal-600/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan My Website</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      )}

      {/* 4 Core Pillars Score Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Overall Visibility Score
          </span>
          <ScoreGauge score={workspace.overallVisibilityScore} grade={workspace.grade} size={130} />
          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Grade {workspace.grade} Health
          </div>
        </div>

        <MetricCard
          title="AI Search Share (AEO)"
          value={`${workspace.aiVisibilityScore}%`}
          score={workspace.aiVisibilityScore}
          subtitle={`Evaluated across ChatGPT & Perplexity`}
          icon={<Bot className="w-4 h-4 text-indigo-600" />}
          badge={workspace.aiVisibilityScore >= 60 ? "AEO Active" : "Needs Schema"}
          change={workspace.aiVisibilityScore >= 60 ? 12 : -5}
          changeLabel="% vs benchmark"
        />

        <MetricCard
          title="Local 3-Pack Presence"
          value={`${workspace.localVisibilityScore}%`}
          score={workspace.localVisibilityScore}
          subtitle={`Geo-grid in ${workspace.location}`}
          icon={<MapPin className="w-4 h-4 text-emerald-600" />}
          badge="Top 3 Grid"
          change={workspace.localVisibilityScore >= 60 ? 4 : 1}
          changeLabel="geo nodes active"
        />

        <MetricCard
          title="Organic SEO Health"
          value={`${workspace.seoHealthScore} / 100`}
          score={workspace.seoHealthScore}
          subtitle={`${workspace.issuesCount.critical} Critical Issues Detected`}
          icon={<Search className="w-4 h-4 text-sky-600" />}
          badge={workspace.seoHealthScore >= 75 ? "Healthy" : "Attention Needed"}
          change={workspace.seoHealthScore >= 75 ? 3 : -2}
          changeLabel="crawl score"
        />
      </div>

      {/* Grid: AI Visibility Stream & Geo-Grid Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Queries Monitor */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading">Live AI Mentions & Citations</h2>
            </div>
            <Link href="/dashboard/ai-visibility" className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {workspace.aiQueries.slice(0, 3).map((q) => (
              <div
                key={q.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold px-2 py-0.5 rounded-md bg-white text-slate-800 text-[10px] border border-slate-200">
                      {q.engine}
                    </span>
                    <span className="text-slate-700 font-medium truncate max-w-xs">{q.query}</span>
                  </div>
                  {q.mentioned ? (
                    <Badge variant="success" size="sm">
                      {q.positionRank ? `#${q.positionRank} Rec` : "Mentioned"}
                    </Badge>
                  ) : (
                    <Badge variant="danger" size="sm">Not Mentioned</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 italic leading-relaxed font-normal">
                  "{q.contextSnippet}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Geo Grid Heatmap Snapshot */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading">Local 3-Pack Heatmap (5 mi)</h2>
            </div>
            <Link href="/dashboard/local-seo" className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1">
              <span>Interactive Grid</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <div className="text-[11px] text-slate-600 font-medium mb-3 text-center">
              Target Query: <span className="text-slate-900 font-bold">"{workspace.targetKeyword}"</span> • {workspace.location}
            </div>
            <div className="grid grid-cols-5 gap-1.5 max-w-[240px] w-full">
              {[-2, -1, 0, 1, 2].flatMap((r) =>
                [-2, -1, 0, 1, 2].map((c) => {
                  const isCenter = r === 0 && c === 0;
                  const dist = Math.sqrt(r * r + c * c);
                  const decay = (100 - (workspace.categoryScores.local || 60)) / 30;
                  const rank = isCenter ? 1 : Math.max(1, Math.min(15, Math.round(1 + dist * decay)));
                  return (
                    <div
                      key={`${r}-${c}`}
                      title={isCenter ? `${workspace.name} Physical Center` : `Distance: ${(dist * 1.8).toFixed(1)} mi - Rank #${rank}`}
                      className={`h-7 rounded-lg flex items-center justify-center font-bold text-[11px] transition-all hover:scale-110 cursor-pointer ${
                        isCenter
                          ? "bg-indigo-600 text-white shadow-xs"
                          : rank === 1
                          ? "bg-emerald-500 text-white"
                          : rank <= 3
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : rank <= 7
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {isCenter ? "⭐" : rank}
                    </div>
                  );
                })
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold mt-3">
              Click 'Interactive Grid' above to adjust radius & view nodes
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Keyword Rank Table & Smart Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tracked Keywords */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading">Top Tracked Keywords</h2>
            </div>
            <Link href="/dashboard/rank-tracker" className="text-xs text-indigo-600 hover:underline font-bold">
              View All {workspace.keywords.length} →
            </Link>
          </div>

          <div className="space-y-2">
            {workspace.keywords.slice(0, 4).map((kw) => (
              <div
                key={kw.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{kw.keyword}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Vol: {kw.searchVolume}/mo • {kw.location}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-sm text-slate-900 px-2 py-0.5 rounded-lg bg-white border border-slate-200">
                    #{kw.currentPosition}
                  </span>
                  <span
                    className={`font-bold text-xs ${
                      kw.change > 0 ? "text-emerald-600" : kw.change < 0 ? "text-rose-600" : "text-slate-400"
                    }`}
                  >
                    {kw.change > 0 ? `+${kw.change}` : kw.change === 0 ? "—" : kw.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Tasks Center */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading">Actionable Smart Tasks</h2>
            </div>
            <Link href="/dashboard/tasks" className="text-xs text-indigo-600 hover:underline font-bold">
              Open Task Center →
            </Link>
          </div>

          <div className="space-y-2.5">
            {workspace.tasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{task.title}</span>
                  <Badge variant={task.priority === "Critical" ? "danger" : "info"} size="sm">
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-600 font-normal">{task.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
