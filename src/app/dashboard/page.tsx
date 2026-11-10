"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Star,
  Calendar,
  MessageSquare,
  Globe,
  Sliders,
  CheckSquare,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const router = useRouter();
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
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                workspace.isLiveAudit
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-teal-50 text-teal-800 border-teal-200"
              }`}
            >
              {workspace.isLiveAudit ? "Live Audit Data Active" : "Workspace Ready"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Real-time tracking of Search, Maps 3-Pack, and Generative AI Share of Voice for{" "}
            <strong className="text-slate-800">{workspace.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/local-seo">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<MapPin className="w-3.5 h-3.5" />}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
            >
              Open GMB SEO Hub
            </Button>
          </Link>
          <Link href="/dashboard/tasks">
            <Button variant="secondary" size="sm" rightIcon={<Zap className="w-3.5 h-3.5" />}>
              {workspace.tasks.length} Smart Tasks
            </Button>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          CORE GOOGLE BUSINESS PROFILE (GMB) SEO ENGINE HERO CARD
          (Directly surfaces GMB optimization so client never misses it)
         ========================================================================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white shadow-xl shadow-teal-950/20 border border-teal-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 rounded-2xl bg-white p-2.5 flex items-center justify-center shrink-0 shadow-md">
            {/* Official Google 'G' Icon */}
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-white font-heading">
                Google Business Profile (GMB) SEO & Maps 3-Pack Automation
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Core Local Growth Engine
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Automated 5x5 Geo-Grid rankings, weekly scheduled AI posts, 5-star customer review replies, and business listing synchronization for <strong>{workspace.name}</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-teal-200">
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                <MapPin className="w-3 h-3 text-emerald-400" /> 5x5 Geo-Grid Heatmap
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                <Calendar className="w-3 h-3 text-teal-300" /> Weekly AI Posts
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                <Star className="w-3 h-3 text-amber-400" /> 5-Star Review Replier
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                <Sliders className="w-3 h-3 text-cyan-300" /> Auto/Approval Mode
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/local-seo"
          className="w-full lg:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95"
        >
          <MapPin className="w-4 h-4 text-slate-950" />
          <span>Launch GMB SEO Suite →</span>
        </Link>
      </div>

      {/* Quick Mobile / Desktop Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/local-seo"
          className="p-3.5 rounded-2xl bg-white border border-teal-200/80 hover:border-teal-500 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">GMB Local SEO</div>
            <div className="text-[10px] text-teal-700 font-medium">5x5 Grid & Posts</div>
          </div>
        </Link>

        <Link
          href="/dashboard/website-seo"
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="p-2 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Website SEO</div>
            <div className="text-[10px] text-slate-500 font-medium">Technical Crawl</div>
          </div>
        </Link>

        <Link
          href="/dashboard/ai-visibility"
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="p-2 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">AI Search Share</div>
            <div className="text-[10px] text-slate-500 font-medium">ChatGPT & Gemini</div>
          </div>
        </Link>

        <Link
          href="/dashboard/tasks"
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="p-2 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Smart Tasks</div>
            <div className="text-[10px] text-slate-500 font-medium">{workspace.tasks.length} Action Items</div>
          </div>
        </Link>
      </div>

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
          onClick={() => router.push("/dashboard/ai-visibility")}
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
          onClick={() => router.push("/dashboard/local-seo")}
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
          onClick={() => router.push("/dashboard/website-seo")}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{q.engine}</span>
                    <Badge variant="teal" size="sm">{q.category}</Badge>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cited & Active
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic">"{q.query}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Geo-Grid Summary */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading">Google Maps 3-Pack Snapshot</h2>
            </div>
            <Link href="/dashboard/local-seo" className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1">
              <span>Open Heatmap</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Active Proximity Radius:</span>
              <span className="font-bold text-slate-900">5.0 Miles</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Top-3 Coverage Rate:</span>
              <span className="font-bold text-emerald-700">84% of Grid Nodes</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Average Map Rank:</span>
              <span className="font-bold text-teal-800">#1.8 Proximity Avg</span>
            </div>

            <Link
              href="/dashboard/local-seo"
              className="mt-2 w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Inspect 5x5 Geo-Grid Ranking</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
