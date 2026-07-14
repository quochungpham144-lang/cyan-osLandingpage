import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown, Server } from 'lucide-react';
import { NavItem } from './types';

interface ApiSidebarProps {
  scrolled?: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeId: string;
  allNavItems: NavItem[];
  scrollTo: (id: string) => void;
  version: string;
  baseUrl: string;
}

export function ApiSidebar({
  mobileOpen,
  setMobileOpen,
  activeId,
  allNavItems,
  scrollTo,
  version,
  baseUrl
}: ApiSidebarProps) {
  const [healthStatus, setHealthStatus] = useState<{
    loading: boolean;
    online: boolean;
    message?: string;
    database?: string;
  }>({ loading: true, online: false });

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/health` : "https://api.cyan-os.cc/api/v1/health";
        const res = await fetch(url, { method: "GET" });
        const data = await res.json().catch(() => ({}));
        if (isMounted) {
          if (res.ok && !data.error && (data.status === 200 || data.data?.status === "ok")) {
            setHealthStatus({
              loading: false,
              online: true,
              message: data.message || "Service is running",
              database: data.data?.database || "connected"
            });
          } else {
            setHealthStatus({
              loading: false,
              online: false,
              message: data.message || "Service Unavailable"
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          setHealthStatus({
            loading: false,
            online: false,
            message: "Offline / Unreachable"
          });
        }
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [baseUrl]);

  return (
    <>
      {/* Mobile Sub-bar for Table of Contents toggle */}
      <div className="lg:hidden shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between z-30">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Table of Contents</span>
        </div>
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-750 px-3 py-1 rounded-lg border border-gray-300 dark:border-slate-700 flex items-center gap-1.5 shadow-sm"
        >
          <span>{mobileOpen ? 'Close Menu' : 'Browse Sections'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''}`} />
        </button>
      </div>

      {/* Sidebar - Desktop relative in fixed flex layout, Mobile fixed drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800
        flex flex-col transition-transform duration-300 shadow-2xl lg:shadow-none
        lg:relative lg:inset-auto lg:h-full lg:shrink-0 lg:z-10 lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="hidden lg:flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-800/60 bg-gray-50/80 dark:bg-slate-900/30">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span className="font-bold text-gray-900 dark:text-white text-base tracking-tight">API Reference</span>
            {version && <span className="text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold px-2 py-0.5 rounded-full border border-cyan-500/20">{version}</span>}
          </div>
         
        </div>

        <div className="px-3 py-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 px-3">
            Sections Index
          </div>
          <nav className="space-y-1">
            {allNavItems.map(item => {
              const active = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-sm transition-all duration-150 text-left ${
                    active
                      ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-semibold border-l-2 border-cyan-500 pl-3'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800/30 font-medium'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 dark:border-slate-800/80 bg-gray-50/80 dark:bg-slate-900/40 space-y-3 shrink-0">
          {/* Live Endpoint Health Check Status */}
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm mb-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${healthStatus.loading ? 'bg-amber-400 animate-pulse' : healthStatus.online ? 'bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`} />
                API Status
              </span>
              <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                healthStatus.loading
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : healthStatus.online
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400'
              }`}>
                {healthStatus.loading ? 'Checking...' : healthStatus.online ? 'Operational' : 'Offline'}
              </span>
            </div>
            {!healthStatus.loading && healthStatus.online && (
              <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                <span>DB: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{healthStatus.database}</span></span>
                <span className="truncate max-w-[110px] text-gray-400 dark:text-gray-500" title={healthStatus.message}>{healthStatus.message}</span>
              </div>
            )}
            {!healthStatus.loading && !healthStatus.online && (
              <div className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-slate-800/80 text-[10px] text-red-500 dark:text-red-400 font-mono truncate">
                {healthStatus.message}
              </div>
            )}
          </div>

          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono leading-relaxed px-0.5">
            <div className="text-gray-700 dark:text-gray-300 font-bold mb-1 flex items-center gap-1.5">
              <Server className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              Base API URL
            </div>
            <span className="text-cyan-600 dark:text-cyan-400/90 break-all">{baseUrl}</span>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
