import { memo, useEffect, useState, useCallback } from "react";
import { User, Activity, CreditCard, Loader2, Key, Terminal, Trash2, Plus, Copy, Check, Shield, RefreshCw, ChevronLeft, ChevronRight, AlertCircle, ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { PricingPopUp } from "../components/PricingPopUp";

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

export interface UserSession {
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

export interface DashboardProps {
  userInfo: UserSession | null;
  isLoggedIn: boolean;
  goToMainView: () => void;
  startPlanCheckout: (planKey: PlanKey, method?: "paypal" | "crypto") => Promise<void>;
  checkoutBusy: boolean;
  setShowLoginModal: (show: boolean) => void;
  setView: (view: unknown) => void;
  openPricingSection: () => void;
  setShowApiSection: (show: boolean) => void;
  copyToClipboard: (text: string) => Promise<boolean>;
  showTeamContactForm: boolean;
  teamFormSubmitted: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
  setShowTeamContactForm: (fn: (prev: boolean) => boolean) => void;
  setTeamFormSubmitted: (v: boolean) => void;
  handleTeamContactSubmit: (e: React.FormEvent<HTMLFormElement> | unknown) => void;
}

export interface QuotaInfo {
  chars_percent?: number;
  chars_used?: number;
  chars_limit?: number;
  usage?: number;
  limit?: number;
  percent?: number;
  plan?: string;
  plan_display?: string;
  eleven_credits_used?: number;
  eleven_credits_limit?: number | string;
  minutes_used?: number;
  minutes_limit?: number;
  reset_date?: string;
  [key: string]: unknown;
}

export interface ApiKeyItem {
  id: string;
  name?: string;
  key_prefix?: string;
  is_active?: boolean;
  created_at?: string | number;
  last_used_at?: string | number;
  expires_at?: string | number;
  [key: string]: unknown;
}

export interface HistoryLogItem {
  id?: string | number;
  meta?: string | { confidence?: number; is_final?: boolean; [k: string]: unknown };
  language?: string;
  source_lang?: string;
  target_lang?: string;
  source_text?: string;
  text?: string;
  target_text?: string;
  chars?: number;
  characters?: number;
  created_at?: string | number;
  [key: string]: unknown;
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

interface DashboardSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: "overview" | "api_keys" | "history";
  setActiveTab: (tab: "overview" | "api_keys" | "history") => void;
  quota: QuotaInfo | null;
  setShowPricingModal: (show: boolean) => void;
  isHighestPlan?: boolean;
}

function DashboardSidebar({
  mobileOpen,
  setMobileOpen,
  activeTab,
  setActiveTab,
  quota,
  setShowPricingModal,
  isHighestPlan = false
}: DashboardSidebarProps) {
  const navItems: Array<{ id: "overview" | "api_keys" | "history"; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "overview", label: "Overview", icon: User },
    { id: "api_keys", label: "API Keys", icon: Key },
    { id: "history", label: "Logs & History", icon: Terminal }
  ];

  return (
    <>
      {/* Mobile Sub-bar for Sidebar toggle */}
      <div className="lg:hidden shrink-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex items-center justify-between z-30">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>{navItems.find((n) => n.id === activeTab)?.label || "Dashboard Navigation"}</span>
        </div>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="text-xs font-semibold text-gray-200 bg-slate-800 hover:bg-slate-750 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"
        >
          <span>{mobileOpen ? "Close Menu" : "Dashboard Menu"}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileOpen ? "rotate-180 text-cyan-400" : ""}`} />
        </button>
      </div>

      {/* Sidebar - Desktop relative in fixed flex layout, Mobile fixed drawer */}
      <aside
        className={`
        fixed inset-y-0 left-0 mt-16 md:mt-0 z-50 w-64 xl:w-72 bg-slate-950 border-r border-slate-800/80
        flex flex-col transition-transform duration-300 shadow-2xl lg:shadow-none
        lg:relative lg:inset-auto lg:h-full lg:shrink-0 lg:z-10 lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        

        {/* Navigation Section */}
        <div className="px-3 py-5 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2.5 px-3">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 text-left ${
                    active
                      ? "bg-cyan-500/15 text-cyan-400 font-bold border-l-2 border-cyan-400 pl-3 shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Stats & Quota Mini Bar */}
        <div className="px-5 py-4 border-t border-slate-800/80 bg-slate-900/40 space-y-3">
          {quota ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">TTS Quota</span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  {((quota.chars_percent || 0)).toFixed(0)}% Used
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    (quota.chars_percent || 0) > 90
                      ? "bg-red-500"
                      : (quota.chars_percent || 0) > 75
                      ? "bg-amber-400"
                      : "bg-cyan-400"
                  }`}
                  style={{ width: `${Math.min(100, quota.chars_percent || 0)}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500 font-mono flex justify-between">
                <span>{(quota.chars_used || 0).toLocaleString()}</span>
                <span>{(quota.chars_limit || 0).toLocaleString()} chars</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 font-medium">Checking quotas...</div>
          )}

          {isHighestPlan ? (
            <div className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-center flex flex-col gap-1.5">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-wide uppercase text-emerald-400">
                <span>Highest Plan Active</span>
              </div>
              <div className="text-[10px] text-gray-400 leading-tight">
                Need custom request?{" "}
                <a
                  href="mailto:contact@cyan-os.cc"
                  className="text-cyan-400 underline font-bold hover:text-cyan-300"
                >
                  contact@cyan-os.cc
                </a>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowPricingModal(true);
                setMobileOpen(false);
              }}
              className="w-full py-2 bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 hover:from-cyan-600/30 hover:to-cyan-500/30 border border-cyan-500/30 text-cyan-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Upgrade Subscription</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

export const Dashboard = memo(function Dashboard({
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
  trackEvent,
  setShowTeamContactForm,
  setTeamFormSubmitted,
  handleTeamContactSubmit
}: DashboardProps) {
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [loadingQuota, setLoadingQuota] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "api_keys" | "history">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [creatingKey, setCreatingKey] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<{ name: string; key: string } | null>(null);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // History state
  const [historyLogs, setHistoryLogs] = useState<HistoryLogItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);

  const fetchApiKeys = useCallback(async () => {
    if (!userInfo?.access_token) return;
    setLoadingKeys(true);
    setKeyError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/api-keys`, {
        headers: { Authorization: `Bearer ${userInfo.access_token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApiKeys(data.keys || []);
      } else {
        const err = await res.json().catch(() => ({}));
        setKeyError(err.message || "Failed to load API keys.");
      }
    } catch (error) {
      console.error("Failed to fetch API keys", error);
      setKeyError("Network error while loading API keys.");
    } finally {
      setLoadingKeys(false);
    }
  }, [userInfo?.access_token]);

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo?.access_token || creatingKey) return;
    setCreatingKey(true);
    setKeyError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/api-keys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newKeyName.trim() || "Production Server Key",
          expires_at: null
        })
      });
      const data = await res.json();
      if (res.ok) {
        setNewlyCreatedKey({ name: data.name || newKeyName || "API Key", key: data.key });
        setNewKeyName("");
        fetchApiKeys();
      } else {
        setKeyError(data.message || "Could not generate API key.");
      }
    } catch (error) {
      console.error("Failed to create API key", error);
      setKeyError("Network error while creating API key.");
    } finally {
      setCreatingKey(false);
    }
  };

  const handleRevokeApiKey = async (id: string) => {
    if (!userInfo?.access_token || revokingKeyId) return;
    setRevokingKeyId(id);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/api-keys/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userInfo.access_token}` }
      });
      if (res.ok) {
        setApiKeys((prev) => prev.filter((k) => k.id !== id));
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Failed to revoke key.");
      }
    } catch (error) {
      console.error("Failed to revoke API key", error);
    } finally {
      setRevokingKeyId(null);
    }
  };

  const fetchHistory = useCallback(async (page = 1) => {
    if (!userInfo?.access_token) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/history?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${userInfo.access_token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const payload = data.data || data;
        const itemsList =
          payload.items?.items ||
          payload.items ||
          payload.logs ||
          (Array.isArray(payload) ? payload : []);
        setHistoryLogs(Array.isArray(itemsList) ? itemsList : []);
        setHistoryTotal(
          payload.items?.total || payload.total || (Array.isArray(itemsList) ? itemsList.length : 0)
        );
        setHistoryPage(payload.items?.page || payload.page || page);
      }
    } catch (error) {
      console.error("Failed to fetch history logs", error);
    } finally {
      setLoadingHistory(false);
    }
  }, [userInfo?.access_token]);

  useEffect(() => {
    if (activeTab === "api_keys") {
      fetchApiKeys();
    } else if (activeTab === "history") {
      fetchHistory(historyPage);
    }
  }, [activeTab, fetchApiKeys, fetchHistory, historyPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
        const res = await fetch(`${BACKEND_URL}/api/v1/user/subscription`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const q = data.data || data;
          if (q && typeof q === "object") {
            if (typeof q.plan === "string") q.plan = q.plan.trim();
            if (typeof q.plan_display === "string") q.plan_display = q.plan_display.trim();
            if (typeof q.plan_key === "string") q.plan_key = q.plan_key.trim();
            if (q.usage !== undefined && q.chars_used === undefined) q.chars_used = Number(q.usage);
            if (q.limit !== undefined && q.chars_limit === undefined) q.chars_limit = Number(q.limit);
            if (q.chars_percent === undefined) {
              q.chars_percent = q.limit ? (Number(q.usage ?? q.chars_used ?? 0) / Number(q.limit)) * 100 : Number(q.percent ?? 0);
            }
          }
          setQuota(q);
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

  const rawPlan = (typeof quota?.plan === "string" ? quota.plan.trim() : null) || (typeof quota?.plan_key === "string" ? quota.plan_key.trim() : null) || (typeof quota?.plan_display === "string" ? quota.plan_display.trim() : null) || userInfo?.plan || "free";
  const currentPlanKey = typeof rawPlan === "string" ? rawPlan.trim().toLowerCase() : "free";
  const planDisplay = PLAN_DISPLAY[currentPlanKey] || quota?.plan_display || rawPlan;
  const isHighestPlan = currentPlanKey === "executive_pro_annual" || planDisplay.toLowerCase() === "executive annual" || planDisplay.toLowerCase() === "executive_pro_annual";

  return (
    <div
      className={`h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-100 flex flex-col overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "dark" : ""
      }`}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        /* Custom Sleek Scrollbars for Dashboard */
        .custom-scrollbar::-webkit-scrollbar,
        #dash-main-content::-webkit-scrollbar,
        aside::-webkit-scrollbar,
        pre::-webkit-scrollbar,
        div[class*="overflow"]::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track,
        #dash-main-content::-webkit-scrollbar-track,
        aside::-webkit-scrollbar-track,
        pre::-webkit-scrollbar-track,
        div[class*="overflow"]::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb,
        #dash-main-content::-webkit-scrollbar-thumb,
        aside::-webkit-scrollbar-thumb,
        pre::-webkit-scrollbar-thumb,
        div[class*="overflow"]::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.4);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover,
        #dash-main-content::-webkit-scrollbar-thumb:hover,
        aside::-webkit-scrollbar-thumb:hover,
        pre::-webkit-scrollbar-thumb:hover,
        div[class*="overflow"]::-webkit-scrollbar-thumb:hover {
          background-color: rgba(6, 182, 212, 0.75);
          border: 1px solid transparent;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb,
        .dark #dash-main-content::-webkit-scrollbar-thumb,
        .dark aside::-webkit-scrollbar-thumb,
        .dark pre::-webkit-scrollbar-thumb,
        .dark div[class*="overflow"]::-webkit-scrollbar-thumb {
          background-color: rgba(100, 116, 139, 0.45);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover,
        .dark #dash-main-content::-webkit-scrollbar-thumb:hover,
        .dark aside::-webkit-scrollbar-thumb:hover,
        .dark pre::-webkit-scrollbar-thumb:hover,
        .dark div[class*="overflow"]::-webkit-scrollbar-thumb:hover {
          background-color: rgba(34, 211, 238, 0.8);
        }

        /* Firefox fallback */
        #dash-main-content, aside, pre, div[class*="overflow"], .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.45) transparent;
        }
      `}</style>

      <Header
        scrolled={true}
        alwaysSolid={true}
        fixedLayout={true}
        fullWidth={true}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        goToMainView={goToMainView}
        navigateTo={(viewName) => {
          if (viewName === 'main') window.location.href = '/';
          else if (viewName === 'download') window.location.href = '/download';
          else if (viewName === 'api-docs') window.location.href = '/api-docs';
          else if (typeof setView === 'function') setView(viewName);
          else window.location.href = `/?view=${viewName}`;
        }}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        setShowLoginModal={setShowLoginModal}
        openPricingSection={openPricingSection}
        setShowApiSection={setShowApiSection}
        trackEvent={trackEvent}
      />

      {/* Main App Workspace: Fixed Sidebar on Left + Scrolling Content on Right */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative flex-col lg:flex-row">
        <DashboardSidebar
          mobileOpen={sidebarOpen}
          setMobileOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          quota={quota}
          setShowPricingModal={setShowPricingModal}
          isHighestPlan={isHighestPlan}
        />

        {/* Main Content Pane - ONLY THIS AREA SCROLLS */}
        <main id="dash-main-content" className="flex-1 h-full overflow-y-auto min-w-0 relative flex flex-col justify-between custom-scrollbar">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-8 w-full">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <span onClick={goToMainView} className="hover:text-white cursor-pointer transition-colors">Home</span>
                <span>›</span>
                <span className="text-gray-300 font-bold">Dashboard</span>
                <span>›</span>
                <span className="text-cyan-400 font-black tracking-wide uppercase">
                  {activeTab === "overview" && "Overview"}
                  {activeTab === "api_keys" && "API Keys"}
                  {activeTab === "history" && "Logs & History"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden sm:inline">Active Plan:</span>
                <span className="px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {planDisplay}
                </span>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
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
                    {userInfo?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">
                      {userInfo?.name || "User"}
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
                  <div className="space-y-6 relative z-10 animate-pulse">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex justify-between text-sm mb-2">
                        <div className="h-3 w-32 bg-slate-700/50 rounded-full"></div>
                        <div className="h-3 w-24 bg-slate-700/50 rounded-full"></div>
                      </div>
                      <div className="h-2 w-full bg-slate-800/50 rounded-full mt-4 border border-dashed border-white/5"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="h-2.5 w-24 bg-slate-700/50 rounded-full mb-3"></div>
                        <div className="h-6 w-20 bg-slate-700/50 rounded-lg"></div>
                      </div>
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="h-2.5 w-20 bg-slate-700/50 rounded-full mb-3"></div>
                        <div className="h-6 w-16 bg-slate-700/50 rounded-lg"></div>
                      </div>
                    </div>
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
                          className={`h-full rounded-full transition-all duration-1000 ${(quota.chars_percent || 0) > 90 ? "bg-red-500" : (quota.chars_percent || 0) > 75 ? "bg-amber-400" : "bg-cyan-500"} shadow-[0_0_10px_currentColor]`}
                          style={{ width: `${Math.min(100, quota.chars_percent || 0)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">ElevenLabs Credits</span>
                        <div className="text-lg font-black text-white font-mono flex items-baseline gap-1">
                          {quota.eleven_credits_used?.toLocaleString() || 0}
                          <span className="text-gray-500 font-medium text-xs">/ {quota.eleven_credits_limit?.toLocaleString() || "Unlimited"}</span>
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

              <div className="flex-1 flex flex-col justify-center items-center relative z-10 py-6">
                <div className="text-center w-full max-w-sm mx-auto">
                  <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-8 relative group overflow-hidden">
                    <span className="text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase block mb-3 relative z-10">Current Plan</span>
                    <div className="text-xs md:text-xl font-black text-cyan-400 tracking-widest uppercase relative z-10">
                      {planDisplay}
                    </div>
                  </div>

                  {isHighestPlan ? (
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl text-center flex flex-col gap-2">
                      <div className="inline-flex items-center justify-center gap-2 text-sm font-black tracking-wider uppercase text-emerald-400">
                        <span>You are already on the highest plan</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Need higher limits or a custom enterprise request? Contact us at{" "}
                        <a
                          href="mailto:contact@cyan-os.cc"
                          className="text-cyan-400 underline font-bold hover:text-cyan-300"
                        >
                          contact@cyan-os.cc
                        </a>
                      </p>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
        )}

        {/* API Keys Tab */}
        {activeTab === "api_keys" && (
          <div className="space-y-8 animate-fadeIn">
            {currentPlanKey === "free" && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-300 text-base">API Key Generation Restricted</h4>
                    <p className="text-sm text-amber-200/80 mt-1">
                      Generating API keys requires a paid subscription plan (<span className="text-white font-mono text-xs">basic</span>, <span className="text-white font-mono text-xs">pro</span>, or <span className="text-white font-mono text-xs">team</span>).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPricingModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all shrink-0"
                >
                  Upgrade Plan Now
                </button>
              </div>
            )}

            {newlyCreatedKey && (
              <div className="bg-cyan-950/80 border border-cyan-400/50 rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-cyan-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                    <Check className="w-5 h-5 text-emerald-400" />
                    API Key Created Successfully: {newlyCreatedKey.name}
                  </div>
                  <button
                    onClick={() => setNewlyCreatedKey(null)}
                    className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 px-2.5 py-1 rounded"
                  >
                    Close
                  </button>
                </div>
                <p className="text-xs text-amber-300 mb-4 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Please copy your API key right now. For security reasons, the full secret will never be displayed again.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-black/60 border border-cyan-500/30 rounded-xl p-3">
                  <code className="flex-1 font-mono text-sm text-cyan-300 break-all select-all">
                    {newlyCreatedKey.key}
                  </code>
                  <button
                    onClick={async () => {
                      const ok = await copyToClipboard(newlyCreatedKey.key);
                      if (ok) {
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black rounded-lg transition-all shrink-0"
                  >
                    {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedKey ? "Copied!" : "Copy Secret"}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Generate Key Form */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm lg:col-span-1 h-fit">
                <h4 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2 mb-4">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  Generate New Key
                </h4>
                <form onSubmit={handleCreateApiKey} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Key Name / Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Production Server Key"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      disabled={creatingKey || currentPlanKey === "free"}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                    />
                  </div>
                  {keyError && (
                    <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{keyError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={creatingKey || currentPlanKey === "free"}
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-yellow-300 border border-cyan-400 text-xs font-black tracking-wider uppercase rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {creatingKey ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
                        Generate API Key
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* API Keys List */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    <Key className="w-4 h-4 text-cyan-400" />
                    Active API Keys ({apiKeys.length})
                  </h4>
                  <button
                    onClick={fetchApiKeys}
                    disabled={loadingKeys}
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    title="Refresh keys"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingKeys ? "animate-spin" : ""}`} />
                  </button>
                </div>

                {loadingKeys ? (
                  <div className="space-y-3 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-16 bg-slate-900/50 rounded-xl border border-slate-700/40" />
                    ))}
                  </div>
                ) : apiKeys.length === 0 ? (
                  <div className="text-center py-12 bg-slate-900/30 rounded-xl border border-dashed border-slate-700/50">
                    <Key className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-400">No API keys created yet.</p>
                    <p className="text-xs text-gray-500 mt-1">Generate a key to authenticate direct API translation requests.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {apiKeys.map((key) => (
                      <div
                        key={key.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-white text-sm">{key.name || "API Key"}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              key.is_active !== false
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}>
                              {key.is_active !== false ? "Active" : "Revoked"}
                            </span>
                          </div>
                          <div className="font-mono text-xs text-cyan-400/90 mt-1 flex items-center gap-2">
                            <span>{key.key_prefix || "cyan_live"}••••••••••••••••••••••••••••••••••••••••</span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1.5 flex flex-wrap gap-4">
                            <span>Created: {new Date(key.created_at || Date.now()).toLocaleDateString()}</span>
                            {key.last_used_at && (
                              <span>Last used: {new Date(key.last_used_at).toLocaleString()}</span>
                            )}
                            {key.expires_at && (
                              <span>Expires: {new Date(key.expires_at).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleRevokeApiKey(key.id)}
                            disabled={revokingKeyId === key.id || key.is_active === false}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-lg transition-all disabled:opacity-40"
                          >
                            {revokingKeyId === key.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            Revoke
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Logs & History Tab */}
        {activeTab === "history" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Translation & API History ({historyTotal} requests)
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Real-time transaction logs of texts translated across your account.
                  </p>
                </div>
                <button
                  onClick={() => fetchHistory(historyPage)}
                  disabled={loadingHistory}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingHistory ? "animate-spin" : ""}`} />
                  Refresh Logs
                </button>
              </div>

              {loadingHistory ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-slate-900/50 rounded-xl border border-slate-700/40" />
                  ))}
                </div>
              ) : historyLogs.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-dashed border-slate-700/50">
                  <Terminal className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-400">No translation logs found.</p>
                  <p className="text-xs text-gray-500 mt-1">API and UI translation requests will appear here once you start generating translations.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-700/60 text-[11px] font-black uppercase tracking-wider text-gray-400">
                          <th className="py-3 px-4">Language / Type</th>
                          <th className="py-3 px-4">Input Text</th>
                          <th className="py-3 px-4">Output / Details</th>
                          <th className="py-3 px-4 text-right">Chars</th>
                          <th className="py-3 px-4 text-right">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/40 text-sm">
                        {historyLogs.map((log, idx) => {
                          let metaInfo = "";
                          try {
                            const parsedMeta = typeof log.meta === "string" ? JSON.parse(log.meta) : log.meta;
                            if (parsedMeta) {
                              const parts = [];
                              if (parsedMeta.confidence !== undefined) parts.push(`Conf: ${(parsedMeta.confidence * 100).toFixed(1)}%`);
                              if (parsedMeta.is_final !== undefined) parts.push(parsedMeta.is_final ? "Final" : "Interim");
                              metaInfo = parts.join(" • ");
                            }
                          } catch {
                            metaInfo = typeof log.meta === "string" ? log.meta : "";
                          }

                          const langDisplay = log.language
                            ? log.language.toUpperCase()
                            : log.source_lang || log.target_lang
                            ? `${(log.source_lang || "AUTO").toUpperCase()} → ${(log.target_lang || "EN").toUpperCase()}`
                            : "AUTO";

                          const sourceText = log.source_text || log.text || "—";
                          const targetText = log.target_text || metaInfo || "—";
                          const charCount = log.chars ?? log.characters ?? 0;

                          return (
                            <tr key={log.id || idx} className="hover:bg-slate-900/40 transition-colors">
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold font-mono">
                                  {langDisplay}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 max-w-xs truncate text-gray-200 font-medium" title={sourceText}>
                                {sourceText}
                              </td>
                              <td className="py-3.5 px-4 max-w-xs truncate text-cyan-200 font-medium" title={targetText}>
                                {targetText}
                              </td>
                              <td className="py-3.5 px-4 text-right font-mono text-xs text-gray-400">
                                {charCount ? charCount.toLocaleString() : "0"}
                              </td>
                              <td className="py-3.5 px-4 text-right whitespace-nowrap text-xs text-gray-500">
                                {log.created_at ? new Date(log.created_at).toLocaleString() : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {historyTotal > 10 && (
                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-4">
                      <div className="text-xs text-gray-400">
                        Showing page <span className="text-white font-bold">{historyPage}</span> of{" "}
                        <span className="text-white font-bold">{Math.ceil(historyTotal / 10)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const p = Math.max(1, historyPage - 1);
                            setHistoryPage(p);
                          }}
                          disabled={historyPage <= 1 || loadingHistory}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700 rounded-lg transition-colors disabled:opacity-40"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const maxP = Math.ceil(historyTotal / 10);
                            const p = Math.min(maxP, historyPage + 1);
                            setHistoryPage(p);
                          }}
                          disabled={historyPage >= Math.ceil(historyTotal / 10) || loadingHistory}
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-gray-300 border border-slate-700 rounded-lg transition-colors disabled:opacity-40"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
          </div>
        </main>
      </div>
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

export const DashboardView = Dashboard;
export default Dashboard;
