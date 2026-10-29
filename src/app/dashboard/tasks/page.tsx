"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { SmartTask } from "@/types";
import {
  CheckSquare,
  Sparkles,
  Bot,
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Circle,
  EyeOff,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function SmartTasksDashboardPage() {
  const { workspace } = useWorkspace();
  const [tasks, setTasks] = useState<SmartTask[]>(workspace.tasks || []);

  useEffect(() => {
    setTasks(workspace.tasks || []);
  }, [workspace.tasks]);

  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "in_progress" | "completed">("all");

  const updateTaskStatus = (id: string, newStatus: SmartTask["status"]) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const filteredTasks =
    statusFilter === "all" ? tasks : tasks.filter((t) => t.status === statusFilter);

  const openCount = tasks.filter((t) => t.status === "open").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Smart Tasks & Growth Engine
            </h1>
            <Badge variant="teal">AEO & Local Fixes</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Prioritized tactical actions generated from your audit to maximize search rankings and AI citations.
          </p>
        </div>

        {/* Status Filter Tabs (Only show if tasks exist) */}
        {tasks.length > 0 && (
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 text-xs font-semibold shadow-2xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === "all" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter("open")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === "open"
                  ? "bg-rose-600 text-white font-bold shadow-2xs"
                  : "text-rose-600 hover:text-rose-700"
              }`}
            >
              Open ({openCount})
            </button>
            <button
              onClick={() => setStatusFilter("in_progress")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === "in_progress"
                  ? "bg-teal-700 text-white font-bold shadow-2xs"
                  : "text-teal-700 hover:text-teal-800"
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === "completed"
                  ? "bg-emerald-600 text-white font-bold shadow-2xs"
                  : "text-emerald-600 hover:text-emerald-700"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        )}
      </div>

      {/* Unconfigured / Empty State for Fresh User Accounts */}
      {tasks.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center max-w-2xl mx-auto space-y-6 crystal-card">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mx-auto shadow-sm">
            <Zap className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              No Active Tasks Generated Yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              You haven't scanned your website yet. Run a free instant audit to generate customized, prioritized Smart Tasks for your local rankings and AI search visibility.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/#audit-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Scan Your Website Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-left text-xs text-slate-600">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <strong className="block text-slate-900 font-bold mb-1">Local 3-Pack</strong>
              Audit Google Maps NAP, categories, and review velocity.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <strong className="block text-slate-900 font-bold mb-1">AEO Visibility</strong>
              Detect ChatGPT, Claude, and Perplexity citation readiness.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <strong className="block text-slate-900 font-bold mb-1">Technical SEO</strong>
              Check Core Web Vitals, JSON-LD Schema, and security headers.
            </div>
          </div>
        </div>
      ) : (
        /* Tasks List */
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs font-medium crystal-card">
              No tasks found matching filter "{statusFilter}".
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-6 rounded-3xl bg-white border transition-all duration-200 space-y-4 shadow-sm crystal-card ${
                  task.status === "completed"
                    ? "border-emerald-200 bg-emerald-50/20 opacity-85"
                    : "border-slate-200/90 hover:border-teal-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {task.category === "ai" ? (
                      <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                        <Bot className="w-4 h-4" />
                      </div>
                    ) : task.category === "local" ? (
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <MapPin className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                        <Search className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3
                        className={`text-base font-bold ${
                          task.status === "completed" ? "text-slate-500 line-through" : "text-slate-900"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                        <span>Due: {task.dueDate}</span>
                        <span>•</span>
                        <span>Est: {task.estimatedMinutes} mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        task.impact === "High"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {task.impact} Impact
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {task.difficulty} Effort
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {task.explanation}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-700 font-medium">
                    <strong className="text-teal-700 font-bold">Action: </strong>
                    {task.action}
                  </div>

                  {/* Status Switcher Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {task.status !== "in_progress" && task.status !== "completed" && (
                      <button
                        onClick={() => updateTaskStatus(task.id, "in_progress")}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
                      >
                        Start Task
                      </button>
                    )}

                    {task.status !== "completed" ? (
                      <button
                        onClick={() => updateTaskStatus(task.id, "completed")}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTaskStatus(task.id, "open")}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:text-slate-900 transition-colors"
                      >
                        Re-open
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
