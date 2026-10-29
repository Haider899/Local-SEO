"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { MetricCard } from "@/ui/MetricCard";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Layers, ArrowUp, ArrowDown, Minus, Search, Plus, ExternalLink } from "lucide-react";

export default function RankTrackerPage() {
  const { workspace } = useWorkspace();
  const [searchTerm, setSearchTerm] = useState("");
  const keywords = workspace.keywords;

  const filtered = keywords.filter((k) =>
    k.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top3Count = keywords.filter((k) => k.currentPosition <= 3).length;
  const top10Count = keywords.filter((k) => k.currentPosition <= 10).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Keyword Rank Tracker
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time localized Google SERP and Local 3-Pack tracking for {workspace.name} in {workspace.location}.
          </p>
        </div>

        <Button variant="primary" className="text-xs">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Keyword
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Top 3 Positions"
          value={top3Count}
          change={+2}
          subtitle="Google Map Pack Dominance"
        />
        <MetricCard
          title="Top 10 Positions"
          value={top10Count}
          subtitle="First page organic listings"
        />
        <MetricCard
          title="Total Tracked"
          value={keywords.length}
          subtitle="Active search terms"
        />
        <MetricCard
          title="Avg Search Volume"
          value="2,196 /mo"
          subtitle="Monthly local addressable search"
        />
      </div>

      {/* Keywords Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
            />
          </div>
          <span className="text-xs text-slate-400">
            Showing {filtered.length} of {keywords.length} keywords
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Keyword</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Search Volume</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Change</th>
                <th className="py-3 px-4">SERP Features</th>
                <th className="py-3 px-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    {item.keyword}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500">{item.location}</td>
                  <td className="py-4 px-4 font-medium text-slate-700">
                    {item.searchVolume.toLocaleString()} /mo
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                        item.currentPosition <= 3
                          ? "bg-emerald-100 text-emerald-800"
                          : item.currentPosition <= 10
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      #{item.currentPosition}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.change > 0 ? (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-600 gap-0.5">
                        <ArrowUp className="w-3.5 h-3.5" /> +{item.change}
                      </span>
                    ) : item.change < 0 ? (
                      <span className="inline-flex items-center text-xs font-bold text-rose-600 gap-0.5">
                        <ArrowDown className="w-3.5 h-3.5" /> {item.change}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs text-slate-400 gap-0.5">
                        <Minus className="w-3.5 h-3.5" /> 0
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.serpFeatures.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-400">{item.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

