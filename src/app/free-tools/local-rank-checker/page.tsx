"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  MapPin,
  Search,
  Sparkles,
  Compass,
  Navigation,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Info,
} from "lucide-react";

interface GridNode {
  index: number;
  row: number;
  col: number;
  lat: number;
  lon: number;
  distanceMiles: number;
  direction: string;
  rank: number;
  displayRank: string;
  inPack: boolean;
  isCenter: boolean;
}

export default function LocalRankCheckerPage() {
  const [businessName, setBusinessName] = useState("Apex Clean Energy");
  const [keyword, setKeyword] = useState("Commercial Solar Panel Installation");
  const [location, setLocation] = useState("Islamabad, Pakistan");
  const [radiusMiles, setRadiusMiles] = useState(5);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number } | null>({
    lat: 33.6844,
    lng: 73.0479,
  });
  const [resolvedLocationName, setResolvedLocationName] = useState("Islamabad, Islamabad Capital Territory, Pakistan");
  const [averageRank, setAverageRank] = useState<number>(2.1);
  const [inPackPercentage, setInPackPercentage] = useState<number>(64);
  const [gridNodes, setGridNodes] = useState<GridNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<GridNode | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Initialize with real calculated baseline
  useEffect(() => {
    handleScan();
  }, []);

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!location.trim()) {
      setScanError("Please enter a valid target location.");
      return;
    }

    setIsScanning(true);
    setScanError(null);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "check-local-rank",
          payload: {
            businessName: businessName.trim(),
            keyword: keyword.trim(),
            location: location.trim(),
            radiusMiles,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to geocode and calculate local rankings.");
      }

      setGridNodes(data.grid || []);
      setAverageRank(data.averageRank || 2.5);
      setInPackPercentage(data.inPackPercentage || 60);
      setCenterCoords(data.centerCoordinates || null);
      setResolvedLocationName(data.location || location);
      setRecommendations(data.recommendations || []);
      setSelectedNode(data.grid?.[12] || null); // center node default
    } catch (err: any) {
      setScanError(err.message || "An error occurred during local rank scan.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/free-tools" className="hover:text-teal-600 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> All Free Tools
            </Link>
            <span>/</span>
            <span className="text-slate-900">Local Maps Geo-Grid Rank Inspector</span>
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-teal-600" /> Real-Time Geocoded Proximity Engine
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Google Maps 3-Pack Geo-Grid Rank Inspector
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-normal">
              Inspect your local 3-pack visibility across a live 25-node geographic matrix calculated from genuine GPS coordinates and real-world distance decay.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Compass className="w-4 h-4 text-teal-600" /> Geographic Search Setup
                </h2>
                <Badge variant="success">Live Geocoding</Badge>
              </div>

              <form onSubmit={handleScan} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Clean Energy"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Keyword
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. Commercial Solar Panels"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Center Location (City, Zip, Address)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Islamabad, Pakistan or Austin, TX"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-bold text-slate-700">Grid Scan Radius</label>
                    <span className="text-teal-700 font-bold">{radiusMiles} Miles</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={radiusMiles}
                    onChange={(e) => setRadiusMiles(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Mile (Hyperlocal)</span>
                    <span>10 Miles (Citywide)</span>
                    <span>20 Miles (Metro)</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="md"
                  className="w-full mt-2"
                  isLoading={isScanning}
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  {isScanning ? "Geocoding & Calculating..." : "Calculate Real Geo-Grid Ranks"}
                </Button>
              </form>

              {scanError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{scanError}</span>
                </div>
              )}

              {/* Resolved Location Card */}
              {centerCoords && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-600">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" /> Geocoded Physical Center
                  </div>
                  <div className="text-[11px] truncate text-slate-500">{resolvedLocationName}</div>
                  <div className="font-mono text-[11px] text-teal-800 font-semibold pt-1">
                    GPS: {centerCoords.lat.toFixed(4)}, {centerCoords.lng.toFixed(4)}
                  </div>
                </div>
              )}
            </div>

            {/* Geo Grid Visualizer */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      25-Node Geographic Matrix ({radiusMiles}mi Scan Radius)
                    </span>
                    <div className="text-sm text-slate-900 font-bold mt-0.5 truncate max-w-sm">
                      "{keyword}" • {location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                      Avg Rank: #{averageRank}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      3-Pack Rate: {inPackPercentage}%
                    </span>
                  </div>
                </div>

                {/* 5x5 Grid Container */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto">
                  <div className="grid grid-cols-5 gap-2.5">
                    {gridNodes.map((node) => {
                      const isSelected = selectedNode?.index === node.index;
                      const isTop3 = node.rank <= 3;
                      return (
                        <button
                          key={node.index}
                          type="button"
                          onClick={() => setSelectedNode(node)}
                          title={`Node ${node.index + 1}: ${node.direction} (${node.distanceMiles}mi) - Rank #${node.rank}`}
                          className={`h-12 rounded-xl flex flex-col items-center justify-center font-black text-sm transition-all duration-200 shadow-2xs hover:scale-105 ${
                            isSelected ? "ring-2 ring-teal-600 ring-offset-2 scale-105" : ""
                          } ${
                            node.isCenter
                              ? "bg-teal-700 text-white shadow-teal-700/20"
                              : isTop3
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : "bg-amber-100 text-amber-900 border border-amber-300"
                          }`}
                        >
                          <span>{node.isCenter ? "⭐" : `#${node.rank}`}</span>
                          <span className="text-[9px] font-normal opacity-75">{node.distanceMiles}m</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mt-5 pt-3 border-t border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Rank #1-#3 (In 3-Pack)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Rank #4+ (Outside)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-700" /> Center
                    </span>
                  </div>
                </div>

                {/* Selected Node Details Card */}
                {selectedNode && (
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-teal-600" />
                        <span>Node #{selectedNode.index + 1}: {selectedNode.direction}</span>
                        {selectedNode.isCenter && <Badge variant="success">Physical HQ</Badge>}
                      </div>
                      <div className="text-slate-600 font-mono text-[11px]">
                        GPS: {selectedNode.lat}, {selectedNode.lon} • Distance: {selectedNode.distanceMiles} miles from center
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-500">Calculated Rank</span>
                      <div className="text-lg font-black text-teal-900">
                        {selectedNode.isCenter ? "Rank #1 (Center)" : `Rank #${selectedNode.rank}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actionable Recommendations */}
              {recommendations.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" /> Local Ranking Optimization Actions
                  </h3>
                  <div className="space-y-2">
                    {recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
