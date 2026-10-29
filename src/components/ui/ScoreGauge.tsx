"use client";

import React from "react";
import { getScoreColor } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showGrade?: boolean;
  grade?: string;
}

export function ScoreGauge({
  score,
  size = 140,
  strokeWidth = 10,
  label = "Visibility Score",
  showGrade = true,
  grade,
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  const colors = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.fill}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black tracking-tight text-slate-900 flex items-baseline">
            {score}
            <span className="text-xs font-semibold text-slate-400 ml-0.5">/100</span>
          </span>
          {showGrade && grade && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md border mt-0.5 ${colors.bg} ${colors.text} ${colors.border}`}
            >
              Grade {grade}
            </span>
          )}
        </div>
      </div>
      {label && <span className="text-xs font-semibold text-slate-600 mt-2 text-center">{label}</span>}
    </div>
  );
}
