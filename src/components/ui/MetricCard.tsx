import React from "react";
import { cn, getScoreColor } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  score?: number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  badge?: string;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  subtitle,
  score,
  change,
  changeLabel,
  icon,
  badge,
  onClick,
}: MetricCardProps) {
  const scoreColors = score !== undefined ? getScoreColor(score) : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md relative overflow-hidden",
        onClick && "cursor-pointer hover:scale-[1.01]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className={cn("text-2xl font-black tracking-tight text-slate-900", scoreColors?.text)}>
          {value}
        </span>
        {badge && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {badge}
          </span>
        )}
      </div>

      {score !== undefined && (
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, score))}%`, backgroundColor: scoreColors?.fill }}
          />
        </div>
      )}

      {(subtitle || change !== undefined) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
          {change !== undefined && (
            <span
              className={cn(
                "font-bold flex items-center",
                change > 0 ? "text-emerald-600" : change < 0 ? "text-rose-600" : "text-slate-500"
              )}
            >
              {change > 0 ? `+${change}` : change}
            </span>
          )}
          <span className="truncate">{changeLabel || subtitle}</span>
        </div>
      )}
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color,
}: {
  value: number;
  max?: number;
  className?: string;
  color?: string;
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const defaultFill = percentage >= 80 ? "bg-emerald-500" : percentage >= 60 ? "bg-sky-500" : percentage >= 40 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className={cn("w-full bg-slate-100 h-2 rounded-full overflow-hidden", className)}>
      <div
        className={cn("h-full transition-all duration-500 rounded-full", !color && defaultFill)}
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs",
        className
      )}
      {...props}
    />
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
      {icon && (
        <div className="p-4 rounded-2xl bg-slate-50 text-slate-500 border border-slate-200 mb-4">
          {icon}
        </div>
      )}
      <h4 className="text-base font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
