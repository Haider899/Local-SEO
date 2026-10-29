import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VisibilityGrade } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  ring: string;
  glow: string;
  fill: string;
} {
  if (score >= 85) {
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      ring: "ring-emerald-500/20",
      glow: "shadow-emerald-500/10",
      fill: "#059669",
    };
  }
  if (score >= 70) {
    return {
      text: "text-sky-700",
      bg: "bg-sky-50",
      border: "border-sky-200",
      ring: "ring-sky-500/20",
      glow: "shadow-sky-500/10",
      fill: "#0284c7",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      ring: "ring-amber-500/20",
      glow: "shadow-amber-500/10",
      fill: "#d97706",
    };
  }
  return {
    text: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    ring: "ring-rose-500/20",
    glow: "shadow-rose-500/10",
    fill: "#e11d48",
  };
}

export function getGradeColor(grade: VisibilityGrade): string {
  switch (grade) {
    case "A+":
    case "A":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "B":
      return "text-sky-700 bg-sky-50 border-sky-200";
    case "C":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "D":
    case "F":
      return "text-rose-700 bg-rose-50 border-rose-200";
    default:
      return "text-slate-700 bg-slate-50 border-slate-200";
  }
}

export function formatUrl(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}
