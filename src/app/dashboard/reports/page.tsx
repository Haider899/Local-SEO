"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { FileBarChart2, Download, Calendar, Mail, CheckCircle2, Sparkles, Printer } from "lucide-react";

export default function ReportsPage() {
  const { workspace } = useWorkspace();
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const reportsList = [
    {
      id: "rep-1",
      title: "Monthly GMB & Local SEO Performance Report",
      dateRange: "September 1 - September 30, 2026",
      type: "Comprehensive",
      summary: "340% increase in Local 3-Pack impressions, 850 calls and directions.",
      status: "Ready",
    },
    {
      id: "rep-2",
      title: "Weekly 5x5 Geo-Grid Ranking Heatmap Analysis",
      dateRange: "October 20 - October 27, 2026",
      type: "Geo-Grid Intelligence",
      summary: "88% Share of Voice across 5-mile service radius.",
      status: "Ready",
    },
    {
      id: "rep-3",
      title: "Website Technical SEO & Mobile Audit (Package 2)",
      dateRange: "October 15, 2026",
      type: "Technical Audit",
      summary: "LocalBusiness Schema verified; 94/100 Mobile PageSpeed score.",
      status: "Ready",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Performance Reports & Exports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Weekly and monthly automated ranking reports generated for {workspace.name}.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint} className="text-xs">
            <Printer className="w-3.5 h-3.5 mr-1.5" /> Print / PDF View
          </Button>
          <Button variant="primary" className="text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate Instant Report
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reportsList.map((rep) => (
          <div
            key={rep.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-teal-500/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="info">{rep.type}</Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {rep.dateRange}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{rep.title}</h3>
              <p className="text-xs text-slate-500">{rep.summary}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

