"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  Code2,
  Copy,
  Check,
  Download,
  Sparkles,
  ArrowLeft,
  Building,
  MapPin,
  Phone,
  Globe,
  DollarSign,
  Compass,
  LocateFixed,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export default function LocalBusinessSchemaGeneratorPage() {
  const [businessType, setBusinessType] = useState("ProfessionalService");
  const [name, setName] = useState("Apex Solutions");
  const [url, setUrl] = useState("https://apexsolutions.com");
  const [telephone, setTelephone] = useState("+1 (555) 234-5678");
  const [streetAddress, setStreetAddress] = useState("100 Main Street, Suite 400");
  const [city, setCity] = useState("Austin");
  const [state, setState] = useState("TX");
  const [postalCode, setPostalCode] = useState("78701");
  const [country, setCountry] = useState("US");
  const [latitude, setLatitude] = useState("30.2672");
  const [longitude, setLongitude] = useState("-97.7431");
  const [priceRange, setPriceRange] = useState("$$$");
  const [copied, setCopied] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationDetectedMsg, setLocationDetectedMsg] = useState<string | null>(null);
  const [autoFilledDomain, setAutoFilledDomain] = useState<string | null>(null);

  // Auto-fill from active audit or authenticated workspace
  useEffect(() => {
    try {
      const activeAuditRaw = localStorage.getItem("omni_active_audit");
      if (activeAuditRaw) {
        const audit = JSON.parse(activeAuditRaw);
        if (audit && audit.domain) {
          const bizName =
            audit.businessName ||
            audit.rawData?.businessNameDetected ||
            audit.domain.replace(/\..*$/, "").toUpperCase();
          setName(bizName);
          setUrl(audit.url.startsWith("http") ? audit.url : `https://${audit.domain}`);
          setAutoFilledDomain(audit.domain);

          if (audit.rawData?.phonesFound?.[0]) {
            setTelephone(audit.rawData.phonesFound[0]);
          }

          if (audit.rawData?.addressDetected) {
            setStreetAddress(audit.rawData.addressDetected);
          } else if (audit.location && audit.location !== "Local Service Area") {
            setStreetAddress(`${audit.location} Office`);
            setCity(audit.location.split(",")[0]?.trim() || "Austin");
          }
          return;
        }
      }

      const authUserRaw = localStorage.getItem("omni_auth_user");
      if (authUserRaw) {
        const authUser = JSON.parse(authUserRaw);
        if (authUser.businessName) setName(authUser.businessName);
        if (authUser.domain) {
          setUrl(`https://${authUser.domain}`);
          setAutoFilledDomain(authUser.domain);
        }
        return;
      }

      // Default sample
      setAutoFilledDomain(null);
      setName("Apex Solutions");
      setUrl("https://apexsolutions.com");
      setStreetAddress("100 Main Street, Suite 400");
      setCity("Austin");
      setState("TX");
      setPostalCode("78701");
      setCountry("US");
      setLatitude("30.2672");
      setLongitude("-97.7431");
      setBusinessType("ProfessionalService");
    } catch {
      // Ignore
    }
  }, []);

  // 1-Click Real Device/Office GPS Geolocation Detection
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsDetectingLocation(true);
    setLocationDetectedMsg(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        setLatitude(lat);
        setLongitude(lng);
        setIsDetectingLocation(false);
        setLocationDetectedMsg(`GPS coordinates detected: (${lat}, ${lng})`);
        setTimeout(() => setLocationDetectedMsg(null), 4000);
      },
      (error) => {
        setIsDetectingLocation(false);
        alert(`Location permission denied or unavailable: ${error.message}`);
      }
    );
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": businessType,
    "name": name,
    "image": `${url}/logo.png`,
    "@id": `${url}#business`,
    "url": url,
    "telephone": telephone,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": streetAddress,
      "addressLocality": city,
      "addressRegion": state,
      "postalCode": postalCode,
      "addressCountry": country,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "15:00",
      },
    ],
  };

  const schemaString = JSON.stringify(schemaJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${schemaString}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`<script type="application/ld+json">\n${schemaString}\n</script>`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${name.toLowerCase().replace(/\s+/g, "-")}-schema.jsonld`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb & Dashboard Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/local-seo"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-xs font-bold text-teal-800 transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to Local SEO Dashboard</span>
              </Link>

              <Link
                href="/free-tools"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors hidden sm:inline"
              >
                (View All Free Tools)
              </Link>
            </div>

            {autoFilledDomain && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Auto-filled from Active Workspace: {autoFilledDomain}
              </span>
            )}
          </div>

          {/* Tool Hero Header */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <Code2 className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
                LocalBusiness JSON-LD Schema Generator
              </h1>
              <Badge variant="success">100% Free</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Generate Google-validated LocalBusiness structured data to trigger rich snippets in Google Search, Google Maps 3-Pack, and establish clear entity signals for ChatGPT and Perplexity citations.
            </p>
          </div>

          {/* Info Card explaining Headquarter vs Device Coordinates */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Important Google Maps & Schema Standard:</span>
              <p className="text-[11px] leading-relaxed text-amber-800">
                In Local SEO, <strong>Latitude & Longitude</strong> must represent the <strong>Physical Office / Headquarters / Service Hub</strong> of your business where services are based (not a website visitor's temporary device location). If you are currently at your office, you can click <strong>"Auto-Detect My Office GPS"</strong> below to fetch exact coordinates!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Building className="w-4 h-4 text-teal-600" /> Business Details
                </h2>
                <span className="text-[11px] text-slate-500 font-medium">Schema.org v23 Compliant</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business Type
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      <option value="ProfessionalService">ProfessionalService (Energy/Tech/Consulting)</option>
                      <option value="Organization">Organization (Corporate HQ)</option>
                      <option value="LocalBusiness">LocalBusiness (General)</option>
                      <option value="Store">Store / Retail Outlet</option>
                      <option value="HomeAndConstructionBusiness">Home & Construction / Solar</option>
                      <option value="MedicalBusiness">Medical / Health Clinic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / Support Line
                    </label>
                    <input
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="+92-300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Street Address / HQ Location
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. Building 14, Commercial Area"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Islamabad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      State / Region
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Federal / Punjab"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 44000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Geo Coordinates with Auto-Detect Button */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-emerald-600" /> Physical Geo Coordinates
                    </span>

                    <button
                      type="button"
                      onClick={handleDetectGPS}
                      disabled={isDetectingLocation}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-[11px] font-bold text-slate-700 transition-colors shadow-2xs active:scale-95"
                    >
                      <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isDetectingLocation ? "Detecting GPS..." : "Auto-Detect My Office GPS"}</span>
                    </button>
                  </div>

                  {locationDetectedMsg && (
                    <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {locationDetectedMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Latitude
                      </label>
                      <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="33.6844"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Longitude
                      </label>
                      <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="73.0479"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Code Output Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                    <Code2 className="w-4 h-4 text-emerald-600" /> Generated JSON-LD Code
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Valid schema.org
                  </span>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed border border-slate-800 shadow-inner">
                    <code>{`<script type="application/ld+json">\n${schemaString}\n</script>`}</code>
                  </pre>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Paste this snippet inside the <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">&lt;head&gt;</code> of your website.
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button onClick={handleDownload} variant="secondary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download
                  </Button>

                  <Button
                    onClick={handleCopy}
                    variant="gradient"
                    size="sm"
                    leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copied ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
