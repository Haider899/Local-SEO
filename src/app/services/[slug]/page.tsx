"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { QuoteModal } from "@/components/marketing/QuoteModal";
import { getServiceBySlug } from "@/lib/data/services";
import {
  Globe,
  Bot,
  TrendingUp,
  Gamepad2,
  Code2,
  Smartphone,
  Megaphone,
  Share2,
  Video,
  ShoppingBag,
  MapPin,
  ShieldAlert,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  Workflow,
  Layers,
  Send,
  Zap,
  ShieldCheck,
} from "lucide-react";

function renderServiceIcon(name: string, className = "w-8 h-8") {
  switch (name) {
    case "Globe":
      return <Globe className={className} />;
    case "Bot":
      return <Bot className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "Gamepad2":
      return <Gamepad2 className={className} />;
    case "Code2":
      return <Code2 className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "Megaphone":
      return <Megaphone className={className} />;
    case "Share2":
      return <Share2 className={className} />;
    case "Video":
      return <Video className={className} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "MapPin":
      return <MapPin className={className} />;
    case "ShieldAlert":
      return <ShieldAlert className={className} />;
    case "Database":
      return <Database className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = getServiceBySlug(slug);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Embedded form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("$5k - $15k");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center">
          <h1 className="text-2xl font-black text-slate-900">Service Not Found</h1>
          <p className="text-xs text-slate-500">The requested service specification could not be located.</p>
          <Link href="/services">
            <Button variant="primary">Return to Services Hub</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEmbeddedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "service_quote",
          name,
          email,
          phone,
          service: service.title,
          budget,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quote inquiry.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setFormError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight font-heading max-w-4xl mx-auto">
              {service.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
              >
                Get a Quote for {service.title}
              </Button>

              {service.isSaaSEntrypoint ? (
                <Link href="/pricing">
                  <Button variant="secondary" size="lg">
                    View SaaS Plans ($20 / $50 mo)
                  </Button>
                </Link>
              ) : (
                <Link href="/portfolio">
                  <Button variant="secondary" size="lg">
                    View Engineering Case Studies
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* SPECIAL SPOTLIGHT: If Local SEO, show SaaS Tool Callout */}
        {service.isSaaSEntrypoint && (
          <section className="py-12 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white border-y border-teal-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                    SaaS Tool & Automated Optimization
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading">
                    Prefer Automated Software? Try our GMB SEO SaaS Tool
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    Automate your Google Business Profile rankings starting at just <strong>$20/month</strong>. Includes weekly local posts, automatic review replies, Q&A monitoring, and 5x5 Geo-Grid ranking intelligence. Or upgrade to <strong>$50/month</strong> for full combined website SEO auditing.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <Link href="/pricing" className="w-full">
                    <Button variant="gradient" className="w-full" size="md">
                      View SaaS Packages ($20 / $50)
                    </Button>
                  </Link>
                  <Link href="/#audit-section" className="w-full">
                    <Button variant="secondary" className="w-full text-slate-900 bg-white" size="md">
                      Run Free SEO Health Check
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Outcomes & Architectural Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Outcomes Grid */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Measurable Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                  Guaranteed Technical & Business Outcomes
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Steps Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Execution Framework
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    How We Engineer and Deliver
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    A battle-tested 4-phase deployment methodology designed to prevent scope creep, ensure zero regression, and meet aggressive go-to-market timelines.
                  </p>
                </div>

                <div className="space-y-4">
                  {service.architectureSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5"
                    >
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal pl-6">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Deliverables */}
              <div className="lg:col-span-6 space-y-8">
                {/* Tech Stack Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-5">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-teal-400" />
                    <h3 className="text-base font-bold font-heading">
                      Standard Technology Stack
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tangible Deliverables Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Workflow className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Contractual Deliverables Included
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((deliv, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded "Get a Quote" Section */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Technical Discovery
                </span>
                <h2 className="text-3xl font-black text-slate-900 font-heading">
                  Request a Dedicated Scope & Quote
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Receive a detailed breakdown for <strong>{service.title}</strong> within 4 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Our lead software architect is reviewing your inquiry. We will contact you at <strong>{email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmbeddedSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Haider Raza"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="haider@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="$1k - $5k">$1,000 - $5,000</option>
                        <option value="$5k - $15k">$5,000 - $15,000</option>
                        <option value="$15k - $30k">$15,000 - $30,000</option>
                        <option value="$30k - $75k">$30,000 - $75,000</option>
                        <option value="$75k+">$75,000+ (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Notes & Objectives
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your objectives, target timeline, or existing software to replace..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Confidential NDA Guaranteed</span>
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={submitting}
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      {submitting ? "Sending Request..." : `Request Quote for ${service.title}`}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultService={service.title}
      />
    </div>
  );
}
