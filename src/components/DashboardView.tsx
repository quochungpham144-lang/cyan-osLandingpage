import { memo, useEffect, useState } from "react";
import { ArrowLeft, User, Activity, CreditCard, Loader2 } from "lucide-react";
import { Footer } from "./Footer";
import { PricingPopUp } from "./PricingPopUp";

export type PlanKey =
  | "free"
  | "basic"
  | "standard"
  | "pro"
  | "team"
  | "executive_pro_annual";

interface SubscriptionRecord {
  id: string;
  planKey: PlanKey;
  status: "PENDING" | "ACTIVE" | "CANCELLED";
  activatedAt?: string;
}

interface UserSession {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: "google" | "email" | "guest";
  access_token?: string;
  legacy_token?: string;
  plan?: PlanKey;
  subscriptions?: SubscriptionRecord[];
}

interface DashboardViewProps {
  userInfo: UserSession | null;
  isLoggedIn: boolean;
  goToMainView: () => void;
  startPlanCheckout: (planKey: PlanKey, method?: "paypal" | "crypto") => Promise<void>;
  checkoutBusy: boolean;
  setShowLoginModal: (show: boolean) => void;
  setView: (view: any) => void;
  openPricingSection: () => void;
  setShowApiSection: (show: boolean) => void;
  copyToClipboard: (text: string) => Promise<boolean>;
  showTeamContactForm: boolean;
  teamFormSubmitted: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
  setShowTeamContactForm: (fn: (prev: boolean) => boolean) => void;
  setTeamFormSubmitted: (v: boolean) => void;
  handleTeamContactSubmit: (e: any) => void;
}

const BACKEND_URL =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ?.VITE_BACKEND_URL || "";

const PLAN_DISPLAY: Record<string, string> = {
  free: "Free Plan",
  basic: "Basic Monthly",
  standard: "Standard Monthly",
  pro: "Pro Monthly",
  team: "Team Monthly",
  executive_pro_annual: "Executive Annual"
};

export const DashboardView = memo(function DashboardView({
  userInfo,
  isLoggedIn,
  goToMainView,
  startPlanCheckout,
  checkoutBusy,
  setShowLoginModal,
  setView,
  openPricingSection,
  setShowApiSection,
  copyToClipboard,
  showTeamContactForm,
  teamFormSubmitted,
  setRef,
  trackEvent,
  setShowTeamContactForm,
  setTeamFormSubmitted,
  handleTeamContactSubmit
}: DashboardViewProps) {
  const [quota, setQuota] = useState<any>(null);
  const [loadingQuota, setLoadingQuota] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      goToMainView();
      setShowLoginModal(true);
    }
  }, [isLoggedIn, goToMainView, setShowLoginModal]);

  useEffect(() => {
    if (!isLoggedIn || !userInfo?.access_token) {
        setLoadingQuota(false);
        return;
    }
    
    const fetchQuota = async () => {
        try {
            const token = userInfo.access_token;
            // Attempt to fetch from same quota API as the electron app uses
            const res = await fetch(`${BACKEND_URL}/api/v1/user/subscription`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setQuota(data.data || data);
            }
        } catch (error) {
            console.error("Failed to fetch quota", error);
        } finally {
            setLoadingQuota(false);
        }
    };
    fetchQuota();
  }, [isLoggedIn, userInfo]);

  if (!isLoggedIn) {
      return null;
  }

  const currentPlanKey = userInfo?.plan || "free";
  const planDisplay = quota?.plan_display || PLAN_DISPLAY[currentPlanKey] || currentPlanKey;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={goToMainView}>
              <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white flex items-baseline">
                  CYAN OS<span className="tm-symbol">™</span>
                </span>
              </div>
            </div>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tight">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-400">Manage your profile, quotas, and subscription plan.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
                {/* Profile Details */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -mr-32 -mt-32 rounded-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <h4 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2">
                            <User className="w-4 h-4 text-cyan-400" />
                            Identity
                        </h4>
                    </div>

                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl font-black text-cyan-400 border border-dashed border-cyan-500/30 shrink-0">
                            {userInfo?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div className="font-bold text-white text-xl">
                                {userInfo?.name || 'User'}
                            </div>
                            <div className="text-gray-400 text-sm mt-1">{userInfo?.email}</div>
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                Active Account
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quotas */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <h4 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2">
                            <Activity className="w-4 h-4 text-cyan-400" />
                            Quotas
                        </h4>
                    </div>
                    
                    {loadingQuota ? (
                         <div className="flex justify-center items-center py-8">
                            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                         </div>
                    ) : quota ? (
                        <div className="space-y-6 relative z-10">
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex justify-between text-sm mb-2 font-bold">
                                    <span className="text-gray-400 uppercase tracking-widest text-[10px]">Monthly TTS Generation</span>
                                    <span className="text-cyan-400 font-mono">
                                        {(quota.chars_used || 0).toLocaleString()} 
                                        <span className="text-gray-500"> / {(quota.chars_limit || 0).toLocaleString()} chars</span>
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-dashed border-white/5">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${(quota.chars_percent || 0) > 90 ? 'bg-red-500' : (quota.chars_percent || 0) > 75 ? 'bg-amber-400' : 'bg-cyan-500'} shadow-[0_0_10px_currentColor]`}
                                        style={{ width: `${Math.min(100, quota.chars_percent || 0)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">ElevenLabs Credits</span>
                                    <div className="text-lg font-black text-white font-mono flex items-baseline gap-1">
                                        {quota.eleven_credits_used?.toLocaleString() || 0} 
                                        <span className="text-gray-500 font-medium text-xs">/ {quota.eleven_credits_limit?.toLocaleString() || 'Unlimited'}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Time Used</span>
                                    <div className="text-lg font-black text-white font-mono flex items-baseline gap-1">
                                        {quota.minutes_used || 0} 
                                        <span className="text-gray-500 font-medium text-xs">/ {quota.minutes_limit || 0} min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-400 py-4">
                            Quota information is not available at the moment.
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Plan */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm flex flex-col">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[80px] -ml-32 -mb-32 rounded-full pointer-events-none" />

                <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
                    <h4 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-cyan-400" />
                        Plan Details
                    </h4>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center relative z-10 py-12">
                    <div className="text-center w-full max-w-sm mx-auto">
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-8 relative group overflow-hidden">
                            <span className="text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase block mb-3 relative z-10">Current Plan</span>
                            <div className="text-3xl font-black text-cyan-400 tracking-widest uppercase relative z-10">
                                {planDisplay}
                            </div>
                        </div>
                        
                        <p className="mb-6 text-[11px] text-gray-400 font-medium tracking-widest uppercase text-center">
                            Need more quota? Upgrade your plan.
                        </p>

                        <div className="mt-4">
                            <button 
                                onClick={() => setShowPricingModal(true)}
                                disabled={checkoutBusy}
                                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-yellow-300 shadow-md hover:from-cyan-500 hover:to-cyan-600 border border-cyan-400 text-sm font-black tracking-wider uppercase rounded-xl transition-all disabled:opacity-50"
                            >
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </div>

                {quota?.reset_date && (
                    <div className="mt-auto pt-6 border-t border-dashed border-gray-700/50 text-xs text-gray-400 uppercase tracking-widest font-bold flex flex-col gap-3 shrink-0">
                        <div className="flex items-center justify-between bg-slate-900/40 border border-slate-700/50 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                <span>Resets</span>
                            </div>
                            <span className="text-white bg-white/10 px-3 py-1 rounded-md">
                                {new Date(quota.reset_date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
      <Footer 
        setView={setView} 
        openPricingSection={openPricingSection} 
        setShowApiSection={setShowApiSection} 
        copyToClipboard={copyToClipboard} 
      />

      <PricingPopUp 
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        showTeamContactForm={showTeamContactForm}
        teamFormSubmitted={teamFormSubmitted}
        trackEvent={trackEvent}
        startPlanCheckout={startPlanCheckout}
        setShowTeamContactForm={setShowTeamContactForm}
        setTeamFormSubmitted={setTeamFormSubmitted}
        handleTeamContactSubmit={handleTeamContactSubmit}
      />
    </div>
  );
});
