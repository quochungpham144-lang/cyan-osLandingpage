import React from 'react';
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

        <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-800/80 bg-gray-50/80 dark:bg-slate-900/40">
          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono leading-relaxed">
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
