import { useState } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Layers,
  Cpu,
  LayoutGrid,
  LineChart,
  FileText,
  Terminal,
  Sparkles,
  Users,
  BookOpen,
  Shield,
  DollarSign,
  ChevronRight,
  LogOut,
  Download,
} from "lucide-react";
import { UserSession } from "../App";

export interface HeaderProps {
  scrolled: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  goToMainView?: () => void;
  navigateTo?: (view: string) => void;
  isLoggedIn?: boolean;
  userInfo?: UserSession | null;
  saveSession?: (session: UserSession | null) => void;
  setShowLoginModal?: (show: boolean) => void;
  openPricingSection?: () => void;
  setShowApiSection?: (show: boolean) => void;
  openRoiSection?: () => void;
  trackEvent?: (eventName: string, properties?: Record<string, unknown>) => void;
  alwaysSolid?: boolean;
  fixedLayout?: boolean;
  fullWidth?: boolean;
}

const PLAN_PRICE: Record<string, string> = {
  free: "$0",
  basic: "$29/month",
  standard: "$59/month",
  pro: "$99/month",
  team: "$299/month",
  executive_pro_annual: "$699/year",
};

export function Header({
  scrolled,
  isDarkMode,
  setIsDarkMode,
  goToMainView,
  navigateTo,
  isLoggedIn = false,
  userInfo = null,
  saveSession,
  setShowLoginModal,
  openPricingSection,
  setShowApiSection,
  openRoiSection,
  trackEvent,
  alwaysSolid = false,
  fixedLayout = false,
  fullWidth = false,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  const handleLogoClick = () => {
    if (goToMainView) goToMainView();
    else window.location.href = "/";
  };

  const handleSectionClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      if (navigateTo) navigateTo("main");
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  const handleApiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
    const el = document.getElementById("api");
    if (el) {
      if (navigateTo) navigateTo("main");
      if (setShowApiSection) setShowApiSection(true);
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.location.href = "/#api";
    }
  };

  const handleRoiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
    if (openRoiSection) {
      if (navigateTo) navigateTo("main");
      openRoiSection();
    } else {
      const el = document.getElementById("roi");
      if (el) {
        if (navigateTo) navigateTo("main");
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      } else {
        window.location.href = "/#roi";
      }
    }
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
    if (openPricingSection) {
      if (navigateTo) navigateTo("main");
      openPricingSection();
    } else {
      const el = document.getElementById("pricing");
      if (el) {
        if (navigateTo) navigateTo("main");
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      } else {
        window.location.href = "/#pricing";
      }
    }
  };

  const handleViewNav = (e: React.MouseEvent, viewName: string) => {
    e.preventDefault();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
    if (navigateTo) {
      navigateTo(viewName);
    } else {
      window.location.href = `/${viewName === "main" ? "" : viewName}`;
    }
  };

  return (
    <nav
      className={`${
        fixedLayout
          ? "relative w-full shrink-0 z-[100]"
          : "fixed top-0 w-full transition-all duration-300 z-[100]"
      } ${
        scrolled || alwaysSolid
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm py-2.5 sm:py-2.5"
          : "bg-white py-4 sm:py-2.5 border-b-2 border-gray-200/60 dark:border-slate-700/50"
      }`}
    >
      <div className={`${fullWidth ? "w-full px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6"} flex items-center justify-between`}>
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/logoCYAN.png"
              alt="CYAN Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left leading-tight">
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-baseline">
              CYAN OS<span className="tm-symbol">™</span>
            </span>
          </div>
        </div>
        {/* Desktop Clean Navigation with Submenus (Hidden below lg) - Shifted right next to buttons */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto mr-4">
          {/* Product Submenu */}
          <div className="group relative py-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              <span>Product</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
              <div className="w-[460px] p-2.5 grid grid-cols-2 gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-gray-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl">
                <a
                  href="#solution"
                  onClick={(e) => handleSectionClick(e, "solution")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Enterprise Suite
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Multi-agent orchestration
                    </div>
                  </div>
                </a>

                <a
                  href="#engine"
                  onClick={(e) => handleSectionClick(e, "engine")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Neural Engine
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Ultra-low latency compute
                    </div>
                  </div>
                </a>

                <a
                  href="#platforms"
                  onClick={(e) => handleSectionClick(e, "platforms")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Platform Runtimes
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Unity, Unreal & Web SDKs
                    </div>
                  </div>
                </a>

                <a
                  href="#roi"
                  onClick={handleRoiClick}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <LineChart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      ROI Calculator
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Simulate cost reductions
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Developers Submenu */}
          <div className="group relative py-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              <span>Developers</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
              <div className="w-[360px] p-2.5 space-y-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-gray-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl">
                <a
                  href="/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors flex items-center gap-2">
                      API Reference
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                        Interactive
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Full REST & WebSocket schemas
                    </div>
                  </div>
                </a>

               

                <a
                  href="/download"
                  onClick={(e) => handleViewNav(e, "download")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item border-t border-gray-100 dark:border-slate-800/60 mt-1 pt-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Download Sandbox IDE
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Local CLI & development toolkit
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Resources Submenu */}
          <div className="group relative py-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              <span>Resources</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
              <div className="w-[340px] p-2.5 space-y-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-gray-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl">
                <a
                  href="/?view=leadership"
                  onClick={(e) => handleViewNav(e, "leadership")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Leadership & Vision
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Research manifesto & team
                    </div>
                  </div>
                </a>

                <a
                  href="/?view=docs"
                  onClick={(e) => handleViewNav(e, "docs")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Guides & Tutorials
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Onboarding walkthroughs
                    </div>
                  </div>
                </a>

                <a
                  href="#footer"
                  onClick={(e) => handleSectionClick(e, "footer")}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors group/item border-t border-gray-100 dark:border-slate-800/60 mt-1 pt-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                      Enterprise Contact
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      Custom SLAs & dedicated inquiries
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Direct Pricing Link */}
          <a
            href="#pricing"
            onClick={handlePricingClick}
            className="px-3 py-2 rounded-xl text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* Right Side Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full bg-gray-100/80 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all shadow-sm border border-gray-200/50 dark:border-slate-700/50"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Try CYAN OS Button */}
          <a
            href="/download"
            onClick={(e) => handleViewNav(e, "download")}
            className="bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200/80 dark:border-cyan-800/80 px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Try CYAN OS</span>
          </a>

          {/* Login or Dashboard Area */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleViewNav(e, "dashboard")}
                className="bg-cyan-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-cyan-700 shadow-md shadow-cyan-600/20 transition-all"
              >
                Dashboard
              </button>

              {userInfo && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMobileAccountOpen((open) => !open)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 p-1 pl-2 transition-all shadow-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-xs max-w-[100px] truncate">
                      {userInfo.name?.split(" ")[0] || "Account"}
                    </span>
                    <img
                      src={userInfo.picture || "/logoCYAN.png"}
                      alt={userInfo.name || "User"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  </button>

                  {mobileAccountOpen && (
                    <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl py-3 z-[135]">
                      <div className="px-4 pb-2.5 border-b border-gray-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {userInfo.name || "User"}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {userInfo.email}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex items-center rounded-full bg-cyan-600/15 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                            {userInfo.plan || "free"}
                          </span>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {PLAN_PRICE[userInfo.plan || "free"]}
                          </span>
                        </div>
                      </div>
                      <div className="px-3 pt-2.5 flex flex-col gap-1">
                        <a
                          href="#pricing"
                          onClick={handlePricingClick}
                          className="flex items-center justify-between px-3 py-2 rounded-full text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors"
                        >
                          <span>Upgrade Plan</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            if (saveSession) saveSession(null);
                            setMobileAccountOpen(false);
                          }}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-full text-xs text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              {/* Early Access Waitlist Trigger */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (trackEvent) {
                      trackEvent("cta_click", {
                        button_name: "early_access_nav",
                        location: "navigation",
                      });
                    }
                  }}
                  className="bg-cyan-600 text-yellow-300 px-4 py-2 rounded-full text-xs font-bold hover:bg-cyan-700 shadow-md shadow-cyan-600/20 transition-all flex items-center gap-1.5"
                >
                  <span>Early Access</span>
                </button>

                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                    Join the Priority Waitlist
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3.5">
                    Get early SDK access & developer updates.
                  </p>
                  <form
                    action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg=="
                    method="POST"
                    className="space-y-2.5 flex flex-col"
                  >
                    <input
                      type="text"
                      name="FIRSTNAME"
                      placeholder="Your Name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white text-xs outline-none"
                    />
                    <input
                      type="email"
                      name="EMAIL"
                      placeholder="Your Email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white text-xs outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-cyan-600 text-white font-bold py-2 rounded-xl hover:bg-cyan-700 transition-colors text-xs shadow-md"
                    >
                      Subscribe Now
                    </button>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center font-medium">
                      500+ members • No spam guaranteed
                    </div>
                  </form>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={() => {
                  if (setShowLoginModal) setShowLoginModal(true);
                  else window.location.href = "/?login=true";
                }}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile / Tablet Controls (< lg) */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick CTA or Login on Mobile */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                if (setShowLoginModal) setShowLoginModal(true);
                else window.location.href = "/?login=true";
              }}
              className="px-3 py-1.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold shadow-sm"
            >
              Login
            </button>
          )}

          {/* Dark Mode Toggle on Mobile Navbar */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200/50 dark:border-slate-700/50"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[9999] transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Ultra-Professional Responsive Sidebar Drawer (< lg) */}
      <div
        className={`lg:hidden fixed top-0 bottom-0 right-0 w-[320px] h-screen max-w-[85vw] z-[10000] bg-white dark:bg-slate-950 border-l border-gray-200/80 dark:border-slate-800/80 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200/60 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src="/logoCYAN.png"
                  alt="CYAN Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-baseline">
                CYAN OS<span className="text-cyan-500 text-xs ml-0.5">™</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Body - Clean Grouped Submenus & Cards */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {/* Group 1: Product & Solutions */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 px-2">
                Product & Solutions
              </div>
              <div className="grid grid-cols-1 gap-1.5 bg-gray-50/80 dark:bg-slate-900/60 p-2 rounded-2xl border border-gray-200/60 dark:border-slate-800/80">
                <a
                  href="#solution"
                  onClick={(e) => handleSectionClick(e, "solution")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Enterprise Suite
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Multi-agent AI orchestration
                    </div>
                  </div>
                </a>

                <a
                  href="#engine"
                  onClick={(e) => handleSectionClick(e, "engine")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Neural Engine
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Ultra-low latency compute
                    </div>
                  </div>
                </a>

                <a
                  href="#platforms"
                  onClick={(e) => handleSectionClick(e, "platforms")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Platform Ecosystem
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Unity, Unreal & Web SDKs
                    </div>
                  </div>
                </a>

                <a
                  href="#roi"
                  onClick={handleRoiClick}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <LineChart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      ROI Calculator
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Simulate cost reductions
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Group 2: Developers & API */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 px-2">
                Developers & Gateways
              </div>
              <div className="grid grid-cols-1 gap-1.5 bg-gray-50/80 dark:bg-slate-900/60 p-2 rounded-2xl border border-gray-200/60 dark:border-slate-800/80">
                <a
                  href="/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      Interactive API Docs
                      
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Endpoint schemas & Ocean protocols
                    </div>
                  </div>
                </a>

                <a
                  href="#api"
                  onClick={handleApiClick}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Direct API Gateways
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Rate limits, auth keys & SDKs
                    </div>
                  </div>
                </a>

                <a
                  href="/download"
                  onClick={(e) => handleViewNav(e, "download")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Download Sandbox IDE
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Local CLI & developer workspace
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Group 3: Resources & Pricing */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 px-2">
                Resources & Pricing
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-gray-50/80 dark:bg-slate-900/60 p-2 rounded-2xl border border-gray-200/60 dark:border-slate-800/80">
                <a
                  href="#pricing"
                  onClick={handlePricingClick}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Pricing Plans
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Transparent enterprise tiers
                    </div>
                  </div>
                </a>

                <a
                  href="/?view=leadership"
                  onClick={(e) => handleViewNav(e, "leadership")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Leadership
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Vision & manifesto
                    </div>
                  </div>
                </a>

                <a
                  href="/?view=docs"
                  onClick={(e) => handleViewNav(e, "docs")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Guides & Docs
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Tutorials & setup
                    </div>
                  </div>
                </a>

                <a
                  href="#footer"
                  onClick={(e) => handleSectionClick(e, "footer")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Contact Us
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Support & SLAs
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Drawer Bottom Action Bar */}
          <div className="px-4 py-4 border-t border-gray-200/60 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 space-y-3">
            {isLoggedIn && userInfo ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
                  <img
                    src={userInfo.picture || "/logoCYAN.png"}
                    alt={userInfo.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {userInfo.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {userInfo.email}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => handleViewNav(e, "dashboard")}
                    className="w-full bg-cyan-600 text-white py-2.5 rounded-xl font-bold text-xs text-center shadow-md shadow-cyan-600/20"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      if (saveSession) saveSession(null);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 py-2.5 rounded-xl font-bold text-xs text-center border border-red-200 dark:border-red-900/50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="/download"
                  onClick={(e) => handleViewNav(e, "download")}
                  className="w-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 py-3 rounded-xl font-bold text-xs text-center border border-cyan-200 dark:border-cyan-800/80 hover:bg-cyan-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try CYAN OS</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (setShowLoginModal) setShowLoginModal(true);
                    else window.location.href = "/?login=true";
                  }}
                  className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold text-xs text-center shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 transition-colors"
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
