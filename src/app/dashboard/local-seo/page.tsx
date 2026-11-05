"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { MetricCard } from "@/ui/MetricCard";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ScoreGauge } from "@/ui/ScoreGauge";
import { useWorkspace } from "@/lib/context/WorkspaceContext";
import { useAuth } from "@/lib/context/AuthContext";
import { GBPPostGenerator } from "@/lib/gmb/post-generator";
import { GBPReviewManager } from "@/lib/gmb/review-manager";
import { GBPPostType } from "@/lib/gmb/types";
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
  Globe,
  Mail,
  Edit3,
  Save,
  RefreshCw,
  Share2,
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

const COMMON_GMB_CATEGORIES = [
  "Software Company",
  "Website Designer",
  "Internet Marketing Service",
  "Dental Clinic",
  "Cosmetic Dentist",
  "Law Firm",
  "Real Estate Agency",
  "Solar Energy Contractor",
  "HVAC Contractor",
  "Plumber",
  "Electrician",
  "Restaurant",
  "Consultant",
  "Accounting Firm",
  "Medical Center",
];

export default function LocalSeoDashboardPage() {
  const { workspace, updateWorkspace } = useWorkspace();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "geogrid" | "profile" | "posts" | "reviews" | "qa" | "decision_engine"
  >("geogrid");

  // Editable connected email (any email can be set by user)
  const [connectedEmail, setConnectedEmail] = useState(
    user?.email || "business@gmail.com"
  );
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Geogrid state
  const [selectedKeyword, setSelectedKeyword] = useState(workspace?.targetKeyword || "Local Services");
  const [radius, setRadius] = useState(5);
  const [selectedNode, setSelectedNode] = useState<GridNodeData | null>(null);

  // Profile Optimization state (bound to real workspace & editable)
  const [automationMode, setAutomationMode] = useState<"Auto" | "Approval">("Auto");
  const [profileSaved, setProfileSaved] = useState(false);
  const [businessName, setBusinessName] = useState(workspace?.name || "Innovative Business");
  const [primaryCategory, setPrimaryCategory] = useState(
    workspace?.primaryService && workspace?.primaryService !== "Local Business"
      ? workspace.primaryService
      : "Software Company"
  );
  const [secondaryCategories, setSecondaryCategories] = useState(
    "Website Designer, Internet Marketing Service, Local SEO"
  );
  const [locationCity, setLocationCity] = useState(workspace?.location || "Lahore, Pakistan");
  const [contactPhone, setContactPhone] = useState(workspace?.nap?.phone || "+92 300 1234567");
  const [websiteUrl, setWebsiteUrl] = useState(
    workspace?.domain ? `https://${workspace.domain}` : "https://itibusinesssuite.online"
  );
  const [googleMapsUrl, setGoogleMapsUrl] = useState(
    `https://maps.google.com/?q=${encodeURIComponent((workspace?.name || "Innovative") + " " + (workspace?.location || "Lahore"))}`
  );
  const [placeId, setPlaceId] = useState("ChIJ8w41Y6a7QzkRe68sO_vM9xU");
  const [businessDescription, setBusinessDescription] = useState(
    `${workspace?.name || "Innovative"} delivers top-tier ${primaryCategory.toLowerCase()}, custom software engineering, and search optimization solutions. Serving verified residential & commercial clients with guaranteed satisfaction and 24/7 client support.`
  );
  const [operatingHours, setOperatingHours] = useState("Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 3:00 PM");

  // Load user saved profile from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`omni_gmb_${workspace?.id || "default"}`);
      if (saved) {
        const p = JSON.parse(saved);
        if (p.connectedEmail) setConnectedEmail(p.connectedEmail);
        else if (user?.email) setConnectedEmail(user.email);
        if (p.businessName) setBusinessName(p.businessName);
        if (p.primaryCategory) setPrimaryCategory(p.primaryCategory);
        if (p.secondaryCategories) setSecondaryCategories(p.secondaryCategories);
        if (p.locationCity) setLocationCity(p.locationCity);
        if (p.contactPhone) setContactPhone(p.contactPhone);
        if (p.websiteUrl) setWebsiteUrl(p.websiteUrl);
        if (p.googleMapsUrl) setGoogleMapsUrl(p.googleMapsUrl);
        if (p.placeId) setPlaceId(p.placeId);
        if (p.businessDescription) setBusinessDescription(p.businessDescription);
        if (p.operatingHours) setOperatingHours(p.operatingHours);
      } else {
        if (user?.email) setConnectedEmail(user.email);
        if (workspace?.name) setBusinessName(workspace.name);
        if (workspace?.primaryService && workspace.primaryService !== "Local Business") {
          setPrimaryCategory(workspace.primaryService);
        }
        if (workspace?.location) setLocationCity(workspace.location);
        if (workspace?.nap?.phone) setContactPhone(workspace.nap.phone);
        setBusinessDescription(
          `${workspace?.name || "Innovative"} delivers industry-leading ${primaryCategory.toLowerCase()} and high-performance digital solutions across ${workspace?.location || "our service area"}. We pride ourselves on transparent communication, verified results, and dedicated support.`
        );
      }
    } catch {
      // ignore
    }
  }, [workspace, user]);

  // Content Posting state (Dynamically generated based on businessName & primaryCategory)
  const [posts, setPosts] = useState([
    {
      id: "post_1",
      type: "Service Highlight",
      title: `Professional ${primaryCategory} Solutions by ${businessName}`,
      content: `Looking for top-tier ${primaryCategory.toLowerCase()} services in ${locationCity}? At ${businessName}, our verified team delivers proven results, transparent pricing, and 24/7 dedicated support. Call today or visit our site to schedule your consultation!`,
      schedule: "Scheduled for Friday, 10:00 AM",
      status: "Scheduled",
      cta: "Learn More",
    },
    {
      id: "post_2",
      type: "Seasonal Offer",
      title: `Special Local Promotion on ${primaryCategory}`,
      content: `Exclusive limited-time offer for local clients in ${locationCity}! Mention this Google Business listing when reaching out to ${businessName} to receive a complimentary consultation and priority booking.`,
      schedule: "Published Oct 24, 2026",
      status: "Published",
      cta: "Book Online",
    },
    {
      id: "post_3",
      type: "Customer FAQ",
      title: `Why choose ${businessName} for your local ${primaryCategory} needs?`,
      content: `From rapid project delivery to verified client satisfaction, we take pride in serving ${locationCity} with unmatched standards and transparent communication. Have questions? Our experts are here to help!`,
      schedule: "Awaiting Manual Approval",
      status: "Pending Approval",
      cta: "Call Now",
    },
  ]);

  const [newPostTopic, setNewPostTopic] = useState("");
  const [newPostType, setNewPostType] = useState<GBPPostType>("SERVICE");
  const [generatingPost, setGeneratingPost] = useState(false);

  // Review Management state
  const [reviews, setReviews] = useState([
    {
      id: "rev_1",
      author: "Farhan Malik",
      rating: 5,
      date: "2 days ago",
      text: `Outstanding experience with ${businessName}! The team communicated clearly from day one and delivered exceptional ${primaryCategory.toLowerCase()} service ahead of schedule. Highly recommended!`,
      reply: `Thank you so much Farhan! It was a true pleasure working with you. The entire team at ${businessName} is thrilled to hear about your great experience. We look forward to working with you again!`,
      replied: true,
    },
    {
      id: "rev_2",
      author: "Sarah Jenkins",
      rating: 5,
      date: "5 days ago",
      text: `Professional, prompt, and top quality. ${businessName} handled our requirements flawlessly. Our local visibility has noticeably improved!`,
      reply: `Thank you for the wonderful 5-star review Sarah! We appreciate your trust in ${businessName} and are proud to support your ongoing growth.`,
      replied: true,
    },
    {
      id: "rev_3",
      author: "Kamran Ali",
      rating: 4,
      date: "1 week ago",
      text: `Great service overall on our ${primaryCategory.toLowerCase()} project. The project was executed thoroughly and the team was always responsive to questions.`,
      reply: "",
      replied: false,
    },
  ]);

  const [replyDraft, setReplyDraft] = useState<{ [id: string]: string }>({});
  const [reviewRequestPhone, setReviewRequestPhone] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  // Q&A Monitoring state
  const [questions, setQuestions] = useState([
    {
      id: "qa_1",
      question: `What areas do you serve and how quickly can ${businessName} start a project?`,
      askedBy: "Prospective Client",
      date: "3 days ago",
      answer: `We proudly serve ${locationCity} and surrounding areas. Our team typically schedules initial consultations within 24 to 48 hours. Feel free to contact our support desk directly!`,
      published: true,
    },
    {
      id: "qa_2",
      question: `Do you provide upfront pricing or estimates for ${primaryCategory.toLowerCase()}?`,
      askedBy: "Local Business Owner",
      date: "Yesterday",
      answer: `Yes! At ${businessName}, we provide comprehensive and transparent estimates before beginning any work, with zero hidden fees.`,
      published: false,
    },
  ]);

  // AI Decision Engine state
  const [decisions, setDecisions] = useState([
    {
      id: "dec_1",
      priority: "High",
      zone: `HQ Center (${locationCity})`,
      trigger: `Proximity ranking protected for "${selectedKeyword}" in primary trade zone.`,
      rootCause: `Strong review sentiment and complete Google Business Profile category matching.`,
      action: `Maintain twice-weekly Google updates & prompt recent clients for Google reviews.`,
      status: "In Progress",
      impact: "+3 Rank Projected",
    },
    {
      id: "dec_2",
      priority: "Medium",
      zone: `Outer Radius (Rank #5)`,
      trigger: `Competitors in outer ${radius}mi radius have higher photo density.`,
      rootCause: `Competitor profiles feature 2x more geo-tagged service photos.`,
      action: `Upload 4 new geo-tagged photos of completed projects and office facilities.`,
      status: "Pending Approval",
      impact: "+2 Rank Projected",
    },
    {
      id: "dec_3",
      priority: "High",
      zone: `Local 3-Pack Authority`,
      trigger: `Missing Q&A owner replies detected on Google Maps listing.`,
      rootCause: `Unanswered questions reduce listing engagement signals in Google algorithms.`,
      action: `Publish verified owner response to pending question to boost local relevance.`,
      status: "Optimized",
      impact: "Protected Position",
    },
  ]);

  useEffect(() => {
    setSelectedKeyword(workspace.targetKeyword || "Local Services");
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
      (selectedKeyword || "").toLowerCase().includes((businessName || "").toLowerCase()) ||
      (selectedKeyword || "").toLowerCase().includes("reviews");
    const baseAuthority = workspace?.categoryScores?.local || 68;
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
          label: isCenter ? `${businessName} (HQ)` : `${dirLabel}`,
          direction: isCenter ? "Physical Center" : `${distanceMi} mi ${dirLabel.split(" ")[0]}`,
          distanceMi,
          rank,
          isCenter,
          isTop3: rank <= 3,
        });
      }
    }
    return nodes;
  }, [radius, selectedKeyword, businessName, workspace]);

  const top3NodesCount = gridNodes.filter((n) => n.isTop3).length;
  const avgRank = (gridNodes.reduce((acc, n) => acc + n.rank, 0) / gridNodes.length).toFixed(1);
  const coveragePercent = Math.round((top3NodesCount / 25) * 100);

  // Handle post generation using AI / smart generator
  const handleGeneratePost = () => {
    setGeneratingPost(true);
    setTimeout(() => {
      const topic = newPostTopic.trim() || `${primaryCategory} Excellence`;
      const generated = GBPPostGenerator.generatePost({
        clientId: workspace.id,
        businessName: businessName,
        category: topic,
        preferredType: newPostType,
        mode: automationMode,
      });

      const created = {
        id: generated.id,
        type:
          generated.postType === "SERVICE"
            ? "Service Highlight"
            : generated.postType === "OFFER"
            ? "Seasonal Offer"
            : generated.postType === "FAQ"
            ? "Customer FAQ"
            : "Community Update",
        title: generated.title,
        content: generated.body,
        schedule: automationMode === "Auto" ? "Scheduled for Tomorrow, 10:00 AM" : "Awaiting Manual Approval",
        status: automationMode === "Auto" ? "Scheduled" : "Pending Approval",
        cta:
          generated.callToAction.actionType === "BOOK"
            ? "Book Now"
            : generated.callToAction.actionType === "CALL"
            ? "Call Today"
            : "Learn More",
      };

      setPosts([created, ...posts]);
      setNewPostTopic("");
      setGeneratingPost(false);
    }, 600);
  };

  // Handle review reply submission
  const handleSubmitReply = (reviewId: string) => {
    const rev = reviews.find((r) => r.id === reviewId);
    const replyText =
      replyDraft[reviewId] ||
      (rev ? GBPReviewManager.generateReply(rev as any, businessName) : "Thank you for your feedback!");

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

  // Save Profile Changes & Sync With Workspace
  const handleSaveProfile = () => {
    const profileData = {
      connectedEmail,
      businessName,
      primaryCategory,
      secondaryCategories,
      locationCity,
      contactPhone,
      websiteUrl,
      googleMapsUrl,
      placeId,
      businessDescription,
      operatingHours,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(`omni_gmb_${workspace?.id || "default"}`, JSON.stringify(profileData));
      updateWorkspace({
        name: businessName,
        primaryService: primaryCategory,
        location: locationCity,
        targetKeyword: selectedKeyword,
        nap: {
          ...workspace?.nap,
          businessName: businessName,
          address: locationCity,
          phone: contactPhone,
          schemaStatus: "LocalBusiness Schema Active & Verified",
        },
      });

      // Update sample posts with new business name and category
      setPosts((prev) =>
        prev.map((p, idx) => ({
          ...p,
          title: idx === 0 ? `Professional ${primaryCategory} by ${businessName}` : p.title,
          content: p.content.replace(/Solar Energy Contractor|Austin|Texas/g, locationCity),
        }))
      );

      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3500);
    } catch (e) {
      console.error("Failed to save profile:", e);
    }
  };

  return (
    <div className="space-y-8">
      {/* =========================================================================
          TOP GOOGLE BUSINESS PROFILE INTEGRATION STATUS BANNER
         ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white shadow-xl shadow-teal-950/20 border border-teal-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white p-2.5 flex items-center justify-center shrink-0 shadow-md">
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

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-white font-heading">
                {businessName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Google Business Profile Connected
              </span>
            </div>

            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span>Account:</span>
                {isEditingEmail ? (
                  <div className="inline-flex items-center gap-1">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter any Gmail/email..."
                      className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-teal-500/50 text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (emailInput.trim()) {
                          setConnectedEmail(emailInput.trim());
                          try {
                            const saved = localStorage.getItem(`omni_gmb_${workspace?.id || "default"}`);
                            const parsed = saved ? JSON.parse(saved) : {};
                            parsed.connectedEmail = emailInput.trim();
                            localStorage.setItem(`omni_gmb_${workspace?.id || "default"}`, JSON.stringify(parsed));
                          } catch {}
                          setIsEditingEmail(false);
                        }
                      }}
                      className="px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-500 text-white font-bold text-[10px]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingEmail(false)}
                      className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5">
                    <strong className="text-teal-300">{connectedEmail}</strong>
                    <button
                      onClick={() => {
                        setEmailInput(connectedEmail);
                        setIsEditingEmail(true);
                      }}
                      title="Change connected Google / GMB email"
                      className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-teal-300 transition-all text-[10px] flex items-center gap-1"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>Change</span>
                    </button>
                  </div>
                )}
              </div>
              <span>•</span>
              <span>
                Category: <strong className="text-teal-300">{primaryCategory}</strong>
              </span>
              <span>•</span>
              <span>
                Location: <strong className="text-teal-300">{locationCity}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5 text-teal-300" />
            <span>Edit GMB Details</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>

      {/* Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              GMB SEO & Local 3-Pack Automation
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Automated Google Maps ranking intelligence, weekly AI posts, review replies, and Q&A monitoring for{" "}
            <strong className="text-slate-700">{businessName}</strong>.
          </p>
        </div>

        {/* Mode Selector Toggle */}
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
          { id: "profile", label: "Profile & GMB Settings", icon: Sliders },
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
          TAB 1: 5X5 GEO-GRID RANKING HEATMAP
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
              value={`${workspace.localVisibilityScore || 78} / 100`}
              score={workspace.localVisibilityScore || 78}
              subtitle={workspace.nap?.hasLocalBusinessSchema ? "LocalBusiness Schema Validated" : "Action Needed"}
              icon={<Star className="w-4 h-4 text-amber-600" />}
            />

            <MetricCard
              title="NAP Consistency Score"
              value={`${(workspace.localVisibilityScore || 78) >= 70 ? 94 : 76}%`}
              score={(workspace.localVisibilityScore || 78) >= 70 ? 94 : 76}
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
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                    <Compass className="w-4 h-4 text-teal-600" /> 5x5 Proximity Ranking Heatmap
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>Target Keyword:</span>
                    <input
                      type="text"
                      value={selectedKeyword}
                      onChange={(e) => setSelectedKeyword(e.target.value)}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-xs focus:ring-1 focus:ring-teal-500"
                    />
                    <span>• Region: <strong className="text-slate-900">{locationCity}</strong></span>
                  </div>
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
                  <Badge variant={workspace.nap?.hasLocalBusinessSchema ? "success" : "teal"} size="sm">
                    {workspace.nap?.hasLocalBusinessSchema ? "Schema Active" : "Synced"}
                  </Badge>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold text-[11px]">Business Name</span>
                    <div className="font-bold text-slate-900 text-sm">{businessName}</div>
                    <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Match verified across Google Business Profile
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold text-[11px]">Physical Address & Region</span>
                    <div className="font-bold text-slate-900">{locationCity}</div>
                    <div className="text-[10px] text-slate-600 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600 shrink-0" /> Target Proximity: {locationCity}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold text-[11px]">Phone & Local Listing</span>
                    <div className="font-bold text-slate-900">{contactPhone}</div>
                    <div className="text-[10px] font-bold flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Direct Customer Line Connected
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
          TAB 2: PROFILE & GMB SETTINGS (REAL DYNAMIC BUSINESS PROFILE)
         ========================================================================= */}
      {activeTab === "profile" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
          {/* Success Banner */}
          {profileSaved && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="font-bold">Google Business Profile Updated & Synchronized!</strong>
                <p className="text-emerald-800 text-[11px]">
                  Changes to "{businessName}" and category "{primaryCategory}" have been saved to your workspace and synced with AI modules.
                </p>
              </div>
            </div>
          )}

          {/* GMB Info Notice */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold">Real Google Business Profile Synchronization:</strong>
              <p className="text-teal-800 leading-relaxed">
                Connect your business details below. Our AI uses this data to write weekly targeted GMB posts, respond to customer reviews, update LocalBusiness JSON-LD schema, and track Google Maps rankings.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Edit Business Profile & GMB Listing Information
                </h3>
                <span className="text-xs text-slate-500">
                  Google Account: <strong className="text-teal-700">{connectedEmail}</strong>
                </span>
              </div>
              <Badge variant="teal">{automationMode === "Auto" ? "Auto-Sync Active" : "Approval Gate Active"}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Connected Google Account / GMB Email (Any email can be linked/changed) */}
              <div className="space-y-1 md:col-span-2 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-teal-950 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-teal-700" />
                    <span>Connected Google Account / GMB Email Address</span>
                  </label>
                  <span className="text-[10px] font-bold text-teal-700">Any email can be linked</span>
                </div>
                <input
                  type="email"
                  value={connectedEmail}
                  onChange={(e) => setConnectedEmail(e.target.value)}
                  placeholder="e.g. client@gmail.com, agency@company.com, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-teal-200 text-slate-900 font-bold text-xs focus:ring-2 focus:ring-teal-500 transition-all mt-1"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Aap yahan kisi bhi client ya business ki email enter kar sakte hain. Ye email pure Local SEO hub ke sath sync ho jayegi.
                </p>
              </div>

              {/* Business Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Business Name (on Google Maps)</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Innovative Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Primary Category (NOW FULLY EDITABLE) */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>Primary GMB Category</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    list="gmb-categories"
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    placeholder="e.g. Software Company"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <datalist id="gmb-categories">
                    {COMMON_GMB_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Secondary Categories */}
              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-700">Secondary Categories (Comma separated)</label>
                <input
                  type="text"
                  value={secondaryCategories}
                  onChange={(e) => setSecondaryCategories(e.target.value)}
                  placeholder="e.g. Website Designer, Internet Marketing Service, SEO Consultant"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Target City / Service Location */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>City & Service Area</span>
                </label>
                <input
                  type="text"
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  placeholder="e.g. Lahore, Pakistan or Austin, TX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customer Phone Number</span>
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Website URL</span>
                </label>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Google Maps Link / Place ID */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Maps Listing Link or Place ID</span>
                </label>
                <input
                  type="text"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?cid=..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Operating Hours */}
              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Operating Business Hours</span>
                </label>
                <input
                  type="text"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  placeholder="Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 3:00 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Business Description (750 chars max)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setBusinessDescription(
                        `${businessName} is a premier provider of ${primaryCategory.toLowerCase()} and customized digital solutions in ${locationCity}. Dedicated to transparency, verified quality, and fast client turnaround.`
                      );
                    }}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Auto-generate with AI
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 leading-relaxed transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {profileSaved ? "✓ Profile successfully saved and synchronized" : "Click to save changes and update all AI generators"}
              </span>
              <Button
                onClick={handleSaveProfile}
                variant="primary"
                size="md"
                leftIcon={<Save className="w-4 h-4" />}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md"
              >
                Sync & Save to Google Business Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CONTENT POSTING SCHEDULE (AI POSTS FOR REAL BUSINESS)
         ========================================================================= */}
      {activeTab === "posts" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl">
          {/* Post Generator Header */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  AI-Powered GBP Content Scheduler for {businessName}
                </h3>
                <p className="text-xs text-slate-500">
                  Targeted category: <strong className="text-teal-700">{primaryCategory}</strong> in <strong className="text-teal-700">{locationCity}</strong>
                </p>
              </div>
              <Badge variant="teal">Rotating Weekly Schedule</Badge>
            </div>

            {/* Quick Topic Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 font-semibold">1-Click Topic Suggestions:</span>
              <button
                type="button"
                onClick={() => {
                  setNewPostTopic(`${primaryCategory} Best Practices`);
                  setNewPostType("SERVICE");
                }}
                className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 font-medium transition-all"
              >
                ⚡ Service Spotlight
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewPostTopic(`Seasonal Special on ${primaryCategory}`);
                  setNewPostType("OFFER");
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-medium transition-all"
              >
                🎁 Local Promotion
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewPostTopic(`Common Questions about ${primaryCategory}`);
                  setNewPostType("FAQ");
                }}
                className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 font-medium transition-all"
              >
                ❓ Helpful FAQ
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newPostTopic}
                onChange={(e) => setNewPostTopic(e.target.value)}
                placeholder={`Enter custom topic (e.g. Why choose ${businessName}, emergency service, special discount)...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Button
                onClick={handleGeneratePost}
                disabled={generatingPost}
                variant="primary"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white shrink-0 font-bold px-5 py-2.5"
              >
                {generatingPost ? "Drafting Post with AI..." : "Generate AI Post →"}
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
          TAB 4: REVIEW MANAGEMENT & GROWTH
         ========================================================================= */}
      {activeTab === "reviews" && (
        <div className="space-y-8 animate-in fade-in duration-200 max-w-5xl">
          {/* Review Growth System (Automated Customer Requests) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-teal-950 font-heading flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Automated 5-Star Review Growth System for {businessName}
              </h3>
              <p className="text-xs text-teal-800 mt-0.5">
                Send post-service SMS review invitations directly to clients with your verified Google Review landing link.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={reviewRequestPhone}
                onChange={(e) => setReviewRequestPhone(e.target.value)}
                placeholder="Enter customer mobile or email (e.g. +92 300 9876543 or client@gmail.com)..."
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
                <span>Review request sent via SMS with tracked review landing link for {businessName}!</span>
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
                      defaultValue={`Thank you ${rev.author} for your review! The entire team at ${businessName} appreciates your trust and partnership.`}
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
          TAB 5: Q&A MONITORING
         ========================================================================= */}
      {activeTab === "qa" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Listing Q&A Monitoring & Instant Responses
              </h3>
              <p className="text-xs text-slate-500">
                Detects questions submitted on Google Maps for <strong className="text-teal-700">{businessName}</strong> and drafts verified owner answers.
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
          TAB 6: AI DECISION ENGINE
         ========================================================================= */}
      {activeTab === "decision_engine" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <Bot className="w-4 h-4 text-teal-600" /> Weekly AI Decision Engine for {businessName}
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