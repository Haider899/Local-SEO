"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { MetricCard } from "@/ui/MetricCard";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ScoreGauge } from "@/ui/ScoreGauge";
import { Bot, Sparkles, CheckCircle2, XCircle, Search, ExternalLink, RefreshCw, Layers } from "lucide-react";

export default function AiVisibilityPage() {
  const { workspace } = useWorkspace();
  const [filter, setFilter] = useState("all");

  const queries = workspace.aiQueries;
  const filtered =
    filter === "mentioned"
      ? queries.filter((q) => q.mentioned)
      : filter === "unmentioned"
      ? queries.filter((q) => !q.mentioned)
      : queries;

  const mentionedCount = queries.filter((q) => q.mentioned).length;
  const recommendedCount = queries.filter((q) => q.recommended).length;
  const mentionRate = queries.length ? Math.round((mentionedCount / queries.length) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              AI Search Visibility (AEO)
            </h1>
            <Badge variant="info">AI Answer Engines</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Tracking presence and direct brand citations across ChatGPT, Perplexity, Gemini, and Claude for {workspace.name}.
          </p>
        </div>

        <Button variant="outline" className="text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh AI Crawl
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="AI Visibility Score"
          value={`${workspace.aiVisibilityScore}/100`}
          score={workspace.aiVisibilityScore}
          subtitle="Composite AEO authority"
        />
        <MetricCard
          title="Brand Mention Rate"
          value={`${mentionRate}%`}
          change={+14}
          subtitle={`${mentionedCount} of ${queries.length} AI queries`}
        />
        <MetricCard
          title="Direct Recommendation"
          value={`${recommendedCount} Queries`}
          subtitle="Recommended as primary choice"
        />
        <MetricCard
          title="Active Citations"
          value="48 Links"
          subtitle="Referenced across AI search responses"
        />
      </div>

      {/* Query Filter and Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            Monitored AI Engine Queries
          </h2>

          <div className="flex items-center gap-2">
            {["all", "mentioned", "unmentioned"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f} ({f === "all" ? queries.length : f === "mentioned" ? mentionedCount : queries.length - mentionedCount})
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">User Prompt / Query</th>
                <th className="py-3 px-4">Engine</th>
                <th className="py-3 px-4">Mentioned</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Context Snippet</th>
                <th className="py-3 px-4">Competitors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-900 max-w-xs">
                    {item.query}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="default" className="text-xs">
                      {item.engine}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    {item.mentioned ? (
                      <span className="inline-flex items-center text-xs font-medium text-emerald-600 gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Cited
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium text-slate-400 gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <XCircle className="w-3.5 h-3.5" /> Not Found
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {item.positionRank ? `#${item.positionRank}` : "—"}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500 max-w-sm italic">
                    &ldquo;{item.contextSnippet}&rdquo;
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500">
                    {item.competitorsMentioned.join(", ") || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

