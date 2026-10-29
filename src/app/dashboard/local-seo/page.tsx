"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { MetricCard } from "@/ui/MetricCard";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ScoreGauge } from "@/ui/ScoreGauge";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import {
  MapPin,
  Star,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Layers,
  Compass,
  Sliders,
  Send,
  MessageSquare,
  HelpCircle,
  FileText,
  Calendar,
  Zap,
  Check,
  Copy,
  RotateCcw,
  Bot,
  Lock,
} from "lucide-react";

interface GridNodeData {
  r: number;
  c: number;
  label: string;
  direction: string;
  distanceMi: number;
  rank: number;
  isCenter: boolean;
  isTop3: boolean;
}

export default function LocalSeoDashboardPage() {
  const { workspace } = useWorkspace();
  const [activeTab, setActiveTab] = useState<
    "geogrid" | "profile" | "posts" | "reviews" | "qa" | "decision_engine"
  >("geogrid");

  // Geogrid state
  const [selectedKeyword, setSelectedKeyword] = useState(workspace.targetKeyword);
  const [radius, setRadius] = useState(5);
  const [selectedNode, setSelectedNode] = useState<GridNodeData | null>(null);

  // Profile Optimization state (Section 2.2 A)
  const [automationMode, setAutomationMode] = useState<"Auto" | "Approval">("Auto");
  const [profileSaved, setProfileSaved] = useState(false);
  const [primaryCategory, setPrimaryCategory] = useState("Solar Energy Contractor");
  const [secondaryCategories, setSecondaryCategories] = useState("HVAC, Electrical Engineer, Energy Equipment");
  const [businessDescription, setBusinessDescription] = useState(
    `${workspace.name} provides tier-1 commercial and residential sustainable energy engineering, battery storage, and turnkey solar installations across ${workspace.location}.`
  );
  const [operatingHours, setOperatingHours] = useState("Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM");

  // Content Posting state (Section 2.2 B)
  const [posts, setPosts] = useState([
    {
      id: "post_1",
      type: "Service Highlight",
      title: "Commercial Battery Storage Systems for Texas Industrial Facilities",
      content: "Ensure continuous power resilience during grid peak demand. Our micro-grid battery systems lower demand charges and keep operations online 24/7.",
      schedule: "Scheduled for Friday, 10:00 AM",
      status: "Scheduled",
      cta: "Learn More",
    },
    {
      id: "post_2",
      type: "Seasonal Offer",
      title: "Zero-Down Commercial Solar Consultation (Limited Fall Q4)",
      content: "Lock in maximum Federal Investment Tax Credits (ITC) before year-end. Schedule your site assessment with our senior NABCEP-certified engineers.",
      schedule: "Published Oct 18, 2026",
      status: "Published",
      cta: "Book Online",
    },
    {
      id: "post_3",
      type: "Customer FAQ",
      title: "How long does commercial solar installation take in Austin?",
      content: "From engineering feasibility stamps to city permitting and utility interconnection, full commissioning typically averages 45 to 60 days.",
      schedule: "Awaiting Manual Approval",
      status: "Pending Approval",
      cta: "Call Now",
    },
  ]);
  const [newPostTopic, setNewPostTopic] = useState("");
  const [generatingPost, setGeneratingPost] = useState(false);

  // Review Management state (Section 2.2 C)
  const [reviews, setReviews] = useState([
    {
      id: "rev_1",
      author: "David Vance",
      rating: 5,
      date: "2 days ago",
      text: "Outstanding engineering team. They installed our commercial rooftop solar array on schedule with zero interruption to our production line.",
      reply: "Thank you David! It was a pleasure working with your facilities team. We're proud to support your commercial sustainability goals.",
      replied: true,
    },
    {
      id: "rev_2",
      author: "Elena Rostova",
      rating: 5,
      date: "5 days ago",
      text: "Professional, fast, and transparent pricing. The energy monitoring dashboard is super intuitive.",
      reply: "Thank you for the review Elena! We appreciate your partnership and are glad the monitoring software is delivering value.",
      replied: true,
    },
    {
      id: "rev_3",
      author: "Marcus Brody",
      rating: 4,
      date: "1 week ago",
      text: "Great work overall on the battery backup. Permitting took a little longer than expected with the city, but the team kept us updated.",
      reply: "",
      replied: false,
    },
  ]);
  const [replyDraft, setReplyDraft] = useState<{ [id: string]: string }>({});
  const [reviewRequestPhone, setReviewRequestPhone] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  // Q&A Monitoring state (Section 2.2 D)
  const [questions, setQuestions] = useState([
    {
      id: "qa_1",
      question: "Do you offer emergency on-site service if an inverter faults on the weekend?",
      askedBy: "Facility Mgr (Austin)",
      date: "3 days ago",
      answer: "Yes, our certified technicians offer 24/7 priority emergency dispatch for all active commercial solar and battery storage contracts.",
      published: true,
    },
    {
      id: "qa_2",
      question: "Are your solar panels certified for high-wind hail resistance?",
      askedBy: "Property Owner",
      date: "Yesterday",
      answer: "All modules we deploy carry Class 4 Hail Impact Certification (UL 2218) and wind-load ratings exceeding 140 mph.",
      published: false,
    },
  ]);

  // AI Decision Engine state (Section 2.2 F)
  const [decisions, setDecisions] = useState([
    {
      id: "dec_1",
      priority: "High",
      zone: "North Outer Zone (Rank #9)",
      trigger: "Geo-grid detected rank drop from #4 to #9 in northern sector.",
      rootCause: "Local competitor added 14 new reviews mentioning 'commercial solar north austin'.",
      action: "Target 5 new customer review requests to clients in North Austin & publish dedicated North Austin project post.",
      status: "In Progress",
      impact: "+4 Rank Projected",
    },
    {
      id: "dec_2",
      priority: "Medium",
      zone: "HQ Center 3-Pack (Rank #1)",
      trigger: "Rank #1 maintained consistently for 30 consecutive days.",
      rootCause: "High review velocity and NAP consistency.",
      action: "Maintain weekly Google Business posting frequency and monitor Q&A for high-intent inquiries.",
      status: "Optimized",
      impact: "Protected Position",
    },
    {
      id: "dec_3",
      priority: "High",
      zone: "Southwest Sector (Rank #7)",
      trigger: "Low photo density compared to competitors in South Austin.",
      rootCause: "Competitors have 3x more geo-tagged installation photos uploaded.",
      action: "Upload 6 geo-tagged project photos of recent residential and commercial installations.",
      status: "Pending Approval",
      impact: "+3 Rank Projected",
    },
  ]);

  useEffect(() => {
    setSelectedKeyword(workspace.targetKeyword);
  }, [workspace.targetKeyword]);

  // Direction matrix names for 5x5 Grid
  const directionNames: { [key: string]: string } = {
    "-2,-2": "NW Outer",
    "-2,-1": "North Hub",
    "-2,0": "North Dist",
    "-2,1": "NE Sector",
    "-2,2": "NE Outer",
    "-1,-2": "West Gate",
    "-1,-1": "NW Inner",
    "-1,0": "North Core",
    "-1,1": "NE Inner",
    "-1,2": "East Gate",
    "0,-2": "West Outer",
    "0,-1": "West Core",
    "0,0": "HQ Center",
    "0,1": "East Core",
    "0,2": "East Outer",
    "1,-2": "SW Gate",
    "1,-1": "SW Inner",
    "1,0": "South Core",
    "1,1": "SE Inner",
    "1,2": "SE Gate",
    "2,-2": "SW Outer",
    "2,-1": "South Hub",
    "2,0": "South Dist",
    "2,1": "SE Sector",
    "2,2": "SE Outer",
  };

  // Mathematically computed distance-decay geo-grid nodes
  const gridNodes: GridNodeData[] = useMemo(() => {
    const isBranded =
      selectedKeyword.toLowerCase().includes(workspace.name.toLowerCase()) ||
      selectedKeyword.toLowerCase().includes("reviews");
    const baseAuthority = workspace.categoryScores.local || 60;
    const decayMultiplier = isBranded ? 0.05 : (100 - baseAuthority) / 25;

    const nodes: GridNodeData[] = [];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const isCenter = r === 0 && c === 0;
        const gridDist = Math.sqrt(r * r + c * c);
        const distanceMi = isCenter ? 0 : Math.round((gridDist / 2.828) * radius * 10) / 10;

        let rank = 1;
        if (!isCenter) {
          if (isBranded) {
            rank = 1;
          } else {
            const drop = Math.round(distanceMi * 0.85 * decayMultiplier);
            rank = Math.max(1, Math.min(20, 1 + drop));
          }
        }

        const key = `${r},${c}`;
        const dirLabel = directionNames[key] || `Node (${r},${c})`;

        nodes.push({
          r,
          c,
          label: isCenter ? `${workspace.name} (HQ)` : `${dirLabel}`,
          direction: isCenter ? "Physical Center" : `${distanceMi} mi ${dirLabel.split(" ")[0]}`,
          distanceMi,
          rank,
          isCenter,
          isTop3: rank <= 3,
        });
      }
    }
    return nodes;
  }, [radius, selectedKeyword, workspace]);

  const top3NodesCount = gridNodes.filter((n) => n.isTop3).length;
  const avgRank = (gridNodes.reduce((acc, n) => acc + n.rank, 0) / gridNodes.length).toFixed(1);
  const coveragePercent = Math.round((top3NodesCount / 25) * 100);

  // Handle post generation
  const handleGeneratePost = () => {
    if (!newPostTopic) return;
    setGeneratingPost(true);
    setTimeout(() => {
      const created = {
        id: `post_${Date.now()}`,
        type: "Service Highlight",
        title: `Expert Guide: ${newPostTopic}`,
        content: `At ${workspace.name}, we provide industry-leading ${newPostTopic.toLowerCase()} tailored to our local clients in ${workspace.location}. Contact our certified team today for immediate consultation.`,
        schedule: automationMode === "Auto" ? "Scheduled for Tomorrow, 9:00 AM" : "Awaiting Manual Approval",
        status: automationMode === "Auto" ? "Scheduled" : "Pending Approval",
        cta: "Call Now",
      };
      setPosts([created, ...posts]);
      setNewPostTopic("");
      setGeneratingPost(false);
    }, 600);
  };

  // Handle review reply submission
  const handleSubmitReply = (reviewId: string) => {
    const replyText = replyDraft[reviewId];
    if (!replyText) return;
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, reply: replyText, replied: true } : r
      )
    );
  };

  // Handle Q&A publishing
  const handlePublishAnswer = (qaId: string) => {
    setQuestions(
      questions.map((q) => (q.id === qaId ? { ...q, published: true } : q))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              GMB SEO & Local 3-Pack Automation
            </h1>
            <Badge variant="success">Google Business Profile Connected</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Automated Google Maps ranking intelligence, weekly AI posts, review replies, and Q&A monitoring for{" "}
            <strong className="text-slate-700">{workspace.name}</strong>.
          </p>
        </div>

        {/* Mode Selector Toggle (Section 2.1 Step 6 & Section 2.2 A) */}
        <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setAutomationMode("Auto")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              automationMode === "Auto"
                ? "bg-teal-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Auto Mode</span>
          </button>
          <button
            onClick={() => setAutomationMode("Approval")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              automationMode === "Approval"
                ? "bg-sky-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Approval Mode</span>
          </button>
        </div>
      </div>

      {/* Primary Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px text-xs font-bold">
        {[
          { id: "geogrid", label: "5x5 Geo-Grid Ranking", icon: Compass },
          { id: "profile", label: "Profile Optimization", icon: Sliders },
          { id: "posts", label: "Content Posting Schedule", icon: Calendar },
          { id: "reviews", label: "Review Management & Growth", icon: MessageSquare },
          { id: "qa", label: "Q&A Monitoring", icon: HelpCircle },
          { id: "decision_engine", label: "AI Decision Engine", icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-teal-600 text-teal-700 bg-teal-50/50 rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: 5X5 GEO-GRID RANKING HEATMAP (SECTION 2.2 E)
         ========================================================================= */}
      {activeTab === "geogrid" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Avg Local 3-Pack Rank"
              value={`#${avgRank}`}
              score={Math.max(0, Math.min(100, Math.round((20 - Number(avgRank)) * 5.2)))}
              subtitle={`Across ${radius}.0 mi radius (${25} geo-nodes)`}
              icon={<MapPin className="w-4 h-4 text-teal-600" />}
              badge={Number(avgRank) <= 3 ? "Top 3 Dominant" : Number(avgRank) <= 6 ? "Competitive" : "Expanding Reach"}
            />

            <MetricCard
              title="GBP Profile Health Score"
              value={`${workspace.localVisibilityScore} / 100`}
              score={workspace.localVisibilityScore}
              subtitle={workspace.nap.hasLocalBusinessSchema ? "LocalBusiness Schema Validated" : "Action Needed"}
              icon={<Star className="w-4 h-4 text-amber-600" />}
            />

            <MetricCard
              title="NAP Consistency Score"
              value={`${workspace.localVisibilityScore >= 70 ? 94 : 76}%`}
              score={workspace.localVisibilityScore >= 70 ? 94 : 76}
              subtitle="Name, address, web signals matched"
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
            />

            <MetricCard
              title="Top 3 Coverage Area"
              value={`${coveragePercent}%`}
              score={coveragePercent}
              subtitle={`${top3NodesCount} of 25 grid nodes ranked #1-#3`}
              icon={<Building className="w-4 h-4 text-sky-600" />}
            />
          </div>

          {/* Grid Visualizer & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                    <Compass className="w-4 h-4 text-teal-600" /> 5x5 Proximity Ranking Heatmap
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Keyword: <strong className="text-slate-900">"{selectedKeyword}"</strong> • Location: <strong className="text-slate-900">{workspace.location}</strong>
                  </span>
                </div>

                {/* Radius Slider */}
                <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 min-w-[75px]">
                    Radius: <span className="text-teal-700">{radius} mi</span>
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="accent-teal-600 cursor-pointer w-28 sm:w-36 h-2 bg-slate-200 rounded-lg"
                  />
                  <span className="text-[10px] font-bold text-slate-400">25 mi</span>
                </div>
              </div>

              {/* Grid 25 Nodes */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 max-w-xl mx-auto space-y-4">
                <div className="grid grid-cols-5 gap-3">
                  {gridNodes.map((node, i) => {
                    const isSelected = selectedNode?.r === node.r && selectedNode?.c === node.c;
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedNode(node)}
                        title={`${node.label} (${node.distanceMi} mi) - Rank #${node.rank}`}
                        className={`h-16 rounded-2xl flex flex-col items-center justify-center font-black transition-all duration-200 hover:scale-105 cursor-pointer select-none relative ${
                          isSelected ? "ring-3 ring-teal-500 ring-offset-2 scale-105" : ""
                        } ${
                          node.isCenter
                            ? "bg-gradient-to-tr from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20"
                            : node.rank === 1
                            ? "bg-emerald-500 text-white shadow-xs"
                            : node.rank <= 3
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : node.rank <= 7
                            ? "bg-amber-50 text-amber-800 border border-amber-300"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}
                      >
                        <span className="text-base font-black flex items-center gap-0.5">
                          {node.isCenter ? <>⭐ <span className="text-xs">HQ</span></> : `#${node.rank}`}
                        </span>
                        <span
                          className={`text-[8px] font-bold tracking-tight truncate max-w-[48px] ${
                            node.isCenter || node.rank === 1 ? "text-white/90" : "text-slate-500"
                          }`}
                        >
                          {node.isCenter ? "Center" : `${node.distanceMi}mi`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Heatmap Legend */}
                <div className="flex flex-wrap items-center justify-around gap-2 text-xs text-slate-600 pt-4 border-t border-slate-200 font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Rank #1
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 border border-emerald-400" /> Rank #2-#3
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Rank #4-#7
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Rank #8+
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" /> HQ Center
                  </span>
                </div>
              </div>

              {/* Node Inspector */}
              {selectedNode && (
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-teal-950 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-700" />
                      <span>Node: {selectedNode.label} ({selectedNode.direction})</span>
                    </div>
                    <div className="text-xs text-teal-800">
                      Google Maps 3-Pack Rank: <strong>#{selectedNode.rank}</strong> • Distance: <strong>{selectedNode.distanceMi} miles</strong> from physical address.
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-xs font-bold text-teal-800 hover:text-teal-950 px-2 py-1 rounded bg-white border border-teal-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* NAP & Local Schema Status Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                    <Building className="w-4 h-4 text-sky-600" /> Verified NAP Signals
                  </h3>
                  <Badge variant={workspace.nap.hasLocalBusinessSchema ? "success" : "warning"} size="sm">
                    {workspace.nap.hasLocalBusinessSchema ? "Schema Active" : "Audit Finding"}
                  </Badge>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold text-[11px]">Business Name</span>
                    <div className="font-bold text-slate-900 text-sm">{workspace.nap.businessName}</div>
                    <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Exact match across {workspace.nap.directoryCount} web sources
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold text-[11px]">Physical Address & Region</span>
                    <div className="font-bold text-slate-900">{workspace.nap.address}</div>
                    <div className="text-[10px] text-slate-600 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600 shrink-0" /> Target Proximity: {workspace.location}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold text-[11px]">Phone & Local Listing</span>
                    <div className="font-bold text-slate-900">{workspace.nap.phone}</div>
                    <div className={`text-[10px] font-bold flex items-center gap-1 ${
                      workspace.nap.hasLocalBusinessSchema ? "text-emerald-700" : "text-amber-700"
                    }`}>
                      {workspace.nap.hasLocalBusinessSchema ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                      )}
                      {workspace.nap.schemaStatus}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/free-tools/local-business-schema-generator">
                    <Button variant="secondary" size="sm" className="w-full justify-between">
                      <span>Generate Local Schema Free</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: PROFILE OPTIMIZATION & AUTO/APPROVAL MODE (SECTION 2.2 A)
         ========================================================================= */}
      {activeTab === "profile" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
          {/* CRITICAL GOOGLE POLICY REQUIREMENT BANNER */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold">Official Google Business Profile API Rule:</strong>
              <p className="text-amber-800 leading-relaxed">
                Changes to business categories, services, attributes, description, and hours are automatically synced or proposed depending on your active mode. 
                <strong className="text-amber-950 font-bold"> Name, address, and primary category changes ALWAYS require manual approval in either mode</strong> to safeguard listing verification.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Google Business Profile Data Synchronization
                </h3>
                <span className="text-xs text-slate-500">
                  Mode: <strong className="text-teal-700">{automationMode} Mode Active</strong>
                </span>
              </div>
              <Badge variant="teal">{automationMode === "Auto" ? "Auto-Fixed by AI" : "Review Before Publish"}</Badge>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Primary Category (Locked - Requires Manual Approval)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={primaryCategory}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 font-medium cursor-not-allowed"
                  />
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold whitespace-nowrap">
                    Approval Locked
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Secondary Categories (Auto-Optimized)</label>
                <input
                  type="text"
                  value={secondaryCategories}
                  onChange={(e) => setSecondaryCategories(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Business Description (750 chars max)</label>
                <textarea
                  rows={3}
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Operating Hours</label>
                <input
                  type="text"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {profileSaved ? "✓ Profile synchronization saved" : "Changes will sync via GBP OAuth API"}
              </span>
              <Button
                onClick={() => {
                  setProfileSaved(true);
                  setTimeout(() => setProfileSaved(false), 2500);
                }}
                variant="primary"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
              >
                {automationMode === "Auto" ? "Sync & Auto-Apply Changes" : "Submit Proposal for Approval"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CONTENT POSTING SCHEDULE (SECTION 2.2 B)
         ========================================================================= */}
      {activeTab === "posts" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl">
          {/* Post Generator Header */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  AI-Powered GBP Content Scheduler
                </h3>
                <p className="text-xs text-slate-500">
                  Rotating weekly schedule: <strong className="text-teal-700">Service Highlights • Seasonal Offers • FAQs • Behind-the-Scenes</strong>
                </p>
              </div>
              <Badge variant="teal">Rotating Schedule Active</Badge>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newPostTopic}
                onChange={(e) => setNewPostTopic(e.target.value)}
                placeholder="Enter post topic (e.g. Commercial battery backup, emergency service, winter discount)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Button
                onClick={handleGeneratePost}
                disabled={generatingPost || !newPostTopic}
                variant="primary"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white shrink-0 font-bold"
              >
                {generatingPost ? "Drafting Post..." : "Generate AI Post →"}
              </Button>
            </div>
          </div>

          {/* Posts Stream */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold">
                      {post.type}
                    </span>
                    <span className="text-slate-400 font-medium">• {post.schedule}</span>
                  </div>
                  <Badge
                    variant={
                      post.status === "Published"
                        ? "success"
                        : post.status === "Scheduled"
                        ? "teal"
                        : "warning"
                    }
                    size="sm"
                  >
                    {post.status}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{post.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">CTA Button: <strong>{post.cta}</strong></span>
                  {post.status === "Pending Approval" && (
                    <Button
                      onClick={() =>
                        setPosts(
                          posts.map((p) =>
                            p.id === post.id ? { ...p, status: "Scheduled", schedule: "Approved & Scheduled" } : p
                          )
                        )
                      }
                      variant="primary"
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Approve & Schedule Post
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: REVIEW MANAGEMENT & GROWTH (SECTION 2.2 C)
         ========================================================================= */}
      {activeTab === "reviews" && (
        <div className="space-y-8 animate-in fade-in duration-200 max-w-5xl">
          {/* Review Growth System (Automated Customer Requests) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-teal-950 font-heading flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Automated 5-Star Review Growth System
              </h3>
              <p className="text-xs text-teal-800 mt-0.5">
                Send post-service SMS review invitations directly to completed clients with your verified Google Review link.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={reviewRequestPhone}
                onChange={(e) => setReviewRequestPhone(e.target.value)}
                placeholder="Enter customer mobile or email (e.g. +1 512 555-0192)..."
                className="flex-1 px-4 py-2 rounded-xl bg-white border border-teal-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Button
                onClick={() => {
                  if (reviewRequestPhone) {
                    setRequestSent(true);
                    setReviewRequestPhone("");
                    setTimeout(() => setRequestSent(false), 3000);
                  }
                }}
                variant="primary"
                size="sm"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold"
              >
                Send Review Request →
              </Button>
            </div>

            {requestSent && (
              <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Review request sent via SMS with tracked review landing link!</span>
              </div>
            )}
          </div>

          {/* Incoming Reviews Stream & AI Replies */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Incoming Google Reviews & AI Response Stream
            </h3>

            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="text-slate-400">• {rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  "{rev.text}"
                </p>

                {rev.replied ? (
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs space-y-1">
                    <span className="font-bold text-teal-950 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" /> Published Business Reply:
                    </span>
                    <p className="text-teal-800 leading-relaxed">{rev.reply}</p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800">
                      AI-Drafted Response (Awaiting Confirmation):
                    </span>
                    <textarea
                      rows={2}
                      defaultValue={`Thank you ${rev.author} for your feedback! We appreciate your patience with the city permitting and are thrilled you are happy with the backup installation.`}
                      onChange={(e) =>
                        setReplyDraft({ ...replyDraft, [rev.id]: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-teal-500"
                    />
                    <Button
                      onClick={() => handleSubmitReply(rev.id)}
                      variant="primary"
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                    >
                      Publish Reply to Google Maps
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: Q&A MONITORING (SECTION 2.2 D)
         ========================================================================= */}
      {activeTab === "qa" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Listing Q&A Monitoring & Instant Responses
              </h3>
              <p className="text-xs text-slate-500">
                Detects community questions submitted on Google Maps and drafts verified owner answers.
              </p>
            </div>
            <Badge variant="teal">2 Questions Detected</Badge>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    Asked by <strong className="text-slate-700">{q.askedBy}</strong> • {q.date}
                  </span>
                  <Badge variant={q.published ? "success" : "warning"} size="sm">
                    {q.published ? "Answer Published" : "Draft Answer Ready"}
                  </Badge>
                </div>

                <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>"{q.question}"</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs space-y-1">
                  <span className="font-bold text-teal-950">Verified Owner Answer:</span>
                  <p className="text-teal-800 leading-relaxed">{q.answer}</p>
                </div>

                {!q.published && (
                  <Button
                    onClick={() => handlePublishAnswer(q.id)}
                    variant="primary"
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                  >
                    Publish Official Answer →
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: AI DECISION ENGINE (SECTION 2.2 F)
         ========================================================================= */}
      {activeTab === "decision_engine" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <Bot className="w-4 h-4 text-teal-600" /> Weekly AI Decision Engine
              </h3>
              <p className="text-xs text-slate-500">
                Combines geo-grid proximity decay + review velocity + audit signals into a prioritized action plan.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Weekly Run: <strong className="text-teal-700">Refreshed Today</strong>
            </span>
          </div>

          <div className="space-y-4">
            {decisions.map((dec) => (
              <div
                key={dec.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                      {dec.zone}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dec.priority === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-teal-50 text-teal-700 border border-teal-200"
                    }`}>
                      {dec.priority} Priority
                    </span>
                  </div>
                  <span className="font-bold text-emerald-700 text-xs">{dec.impact}</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-slate-600">
                    <strong className="text-slate-900">Trigger:</strong> {dec.trigger}
                  </div>
                  <div className="text-slate-600">
                    <strong className="text-slate-900">Root Cause:</strong> {dec.rootCause}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium leading-relaxed">
                    <strong className="text-teal-700">Prescribed Action:</strong> {dec.action}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-400 font-medium">Status: <strong className="text-slate-700">{dec.status}</strong></span>
                  <Button
                    onClick={() =>
                      setDecisions(
                        decisions.map((d) =>
                          d.id === dec.id ? { ...d, status: "Executed & Verified" } : d
                        )
                      )
                    }
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                  >
                    Mark Executed & Log Result
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
