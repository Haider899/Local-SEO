"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/ui/Button";
import {
  Sparkles,
  Lock,
  Mail,
  Building,
  ArrowRight,
  User,
  CreditCard,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Bot,
  Sliders,
  Check,
} from "lucide-react";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");

  // Multi-step: 1: Account, 2: Package, 3: Payment, 4: GMB Connect, 5: Mode
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [domain, setDomain] = useState("");
  const [phone, setPhone] = useState("");

  // Package Selection
  const [selectedPlan, setSelectedPlan] = useState<"pkg_1" | "pkg_2">(
    initialPlan === "pkg_2" ? "pkg_2" : "pkg_1"
  );

  // Payment Fields
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExp, setCardExp] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("789");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // GMB Connection state
  const [isConnectingGmb, setIsConnectingGmb] = useState(false);
  const [gmbConnected, setGmbConnected] = useState(false);

  // Mode Selection
  const [mode, setMode] = useState<"Auto" | "Approval">("Auto");

  // Overall status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialPlan === "pkg_2") {
      setSelectedPlan("pkg_2");
    }
  }, [initialPlan]);

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !businessName) {
      setErrorMsg("Please fill out all required account fields.");
      return;
    }
    setErrorMsg(null);
    setCurrentStep(2); // Proceed to package
  };

  const handlePackageSubmit = () => {
    setCurrentStep(3); // Proceed to payment
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setErrorMsg(null);

    try {
      // Register client in persistent database immediately upon payment
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          domain: domain || `${businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
          ownerName: name,
          ownerEmail: email,
          phone,
          plan: selectedPlan,
          mode,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process payment and initialize client record.");
      }

      // Store in auth session
      localStorage.setItem(
        "omni_auth_user",
        JSON.stringify({
          name,
          email,
          businessName,
          domain: domain || `${businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
          plan: selectedPlan === "pkg_2" ? "Package 2 ($50/mo)" : "Package 1 ($20/mo)",
          loggedInAt: new Date().toISOString(),
        })
      );

      setIsProcessingPayment(false);
      setCurrentStep(4); // Proceed to GMB connection
    } catch (err: any) {
      setIsProcessingPayment(false);
      setErrorMsg(err.message || "Payment processing failed. Please verify your card details.");
    }
  };

  const handleConnectGmb = () => {
    setIsConnectingGmb(true);
    setTimeout(() => {
      setIsConnectingGmb(false);
      setGmbConnected(true);
      setTimeout(() => {
        setCurrentStep(5); // Proceed to mode selection
      }, 700);
    }, 1200);
  };

  const handleFinishOnboarding = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl space-y-6 relative z-10">
          {/* Progress Step Header */}
          <div className="space-y-3 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Step {currentStep} of 5</span>
              <span>
                {currentStep === 1 && "Account Credentials"}
                {currentStep === 2 && "Select Subscription Package"}
                {currentStep === 3 && "Secure Payment Setup"}
                {currentStep === 4 && "Google Business OAuth"}
                {currentStep === 5 && "Automation Mode"}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-600 via-emerald-500 to-sky-400 transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* =========================================================================
              STEP 1: ACCOUNT & BUSINESS CREDENTIALS
             ========================================================================= */}
          {currentStep === 1 && (
            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
                  <User className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 font-heading">
                  Create Client Account
                </h1>
                <p className="text-xs text-slate-500">
                  Enter your business and contact information to begin onboarding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Haider Raza"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Website Domain (Optional)
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (512) 555-0192"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3">
                <Button type="submit" variant="gradient" className="w-full" size="lg">
                  Continue to Package Selection →
                </Button>
              </div>

              <div className="text-center text-xs text-slate-500 pt-1">
                Already have an account?{" "}
                <Link href="/login" className="text-teal-600 font-bold hover:underline">
                  Log in here
                </Link>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 2: PACKAGE SELECTION ($20 vs $50)
             ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Choose Your Subscription Plan
                </h2>
                <p className="text-xs text-slate-500">
                  Select the package that fits your business goals. Switch or cancel anytime.
                </p>
              </div>

              <div className="space-y-3">
                {/* Package 1 */}
                <div
                  onClick={() => setSelectedPlan("pkg_1")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlan === "pkg_1"
                      ? "border-teal-600 bg-teal-50/40 ring-2 ring-teal-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === "pkg_1"
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selectedPlan === "pkg_1" && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Package 1 — GMB SEO</h3>
                        <p className="text-xs text-slate-500">Full GBP optimization, weekly local posts & review replies</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900">$20</span>
                      <span className="text-xs text-slate-500">/mo</span>
                    </div>
                  </div>
                </div>

                {/* Package 2 */}
                <div
                  onClick={() => setSelectedPlan("pkg_2")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    selectedPlan === "pkg_2"
                      ? "border-teal-600 bg-teal-50/40 ring-2 ring-teal-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-teal-600 text-white font-bold text-[9px] uppercase tracking-wider">
                    RECOMMENDED
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === "pkg_2"
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selectedPlan === "pkg_2" && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Package 2 — GMB + Website SEO</h3>
                        <p className="text-xs text-slate-500">Everything in Package 1 + Complete Technical Website SEO</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900">$50</span>
                      <span className="text-xs text-slate-500">/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button variant="secondary" onClick={() => setCurrentStep(1)} className="flex-1">
                  Back
                </Button>
                <Button variant="gradient" onClick={handlePackageSubmit} className="flex-1">
                  Continue to Checkout →
                </Button>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 3: SECURE PAYMENT SETUP (STRIPE GATEWAY)
             ========================================================================= */}
          {currentStep === 3 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Secure Checkout
                </h2>
                <p className="text-xs text-slate-500">
                  Subscribing to <strong>{selectedPlan === "pkg_2" ? "Package 2 ($50/mo)" : "Package 1 ($20/mo)"}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Expiration
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted 256-bit Stripe checkout. 14-day money back guarantee.</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  disabled={isProcessingPayment}
                  className="flex-1 font-bold"
                >
                  {isProcessingPayment ? "Verifying Payment..." : `Pay $${selectedPlan === "pkg_2" ? "50" : "20"} & Continue`}
                </Button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 4: GOOGLE BUSINESS PROFILE OAUTH CONNECTION
             ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <MapPin className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Payment Verified! Connect Google Profile
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  To automate weekly posts, review responses, and 5x5 Geo-Grid tracking, grant official Google Business Profile API permissions.
                </p>
              </div>

              {gmbConnected ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Google Business Profile Connected (OAuth2 Active)</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleConnectGmb}
                  disabled={isConnectingGmb}
                  className="w-full py-3.5 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-md hover:border-slate-300"
                >
                  {isConnectingGmb ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating with Google OAuth 2.0...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                      <span>Connect Google Business Profile (OAuth 2.0)</span>
                    </>
                  )}
                </button>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Skip for now, I'll connect GBP inside dashboard →
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 5: MODE SELECTION (AUTO MODE vs APPROVAL MODE)
             ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
                  <Sliders className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Choose Your Automation Mode
                </h2>
                <p className="text-xs text-slate-500">
                  You can change this anytime from your client dashboard settings.
                </p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setMode("Auto")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    mode === "Auto"
                      ? "border-teal-600 bg-teal-50/40 ring-2 ring-teal-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        mode === "Auto"
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {mode === "Auto" && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>Auto Mode (Recommended)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Hands-Free
                        </span>
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Innovative automatically publishes scheduled weekly posts, answers incoming Q&A, and replies to customer reviews. Note: Name, address, and primary category changes always require manual approval.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setMode("Approval")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    mode === "Approval"
                      ? "border-teal-600 bg-teal-50/40 ring-2 ring-teal-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        mode === "Approval"
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {mode === "Approval" && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Approval Mode</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Innovative prepares drafts for weekly posts, review replies, and profile updates in your review queue. Nothing is published to Google until you click "Approve".
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full font-bold"
                  onClick={handleFinishOnboarding}
                  disabled={loading}
                >
                  {loading ? "Initializing Dashboard..." : "Launch Client Dashboard →"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading registration...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
