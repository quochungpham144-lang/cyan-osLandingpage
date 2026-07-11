import { useState, useEffect, useCallback } from 'react';
import apiData from '../data/apiDocs.json';
import { Footer } from '../components/Footer';
import { AppView } from '../App';
import { Header } from '../components/Header';
import {
  Section,
  ApiSidebar,
  ApiHero,
  SectionBlock
} from './ui';

export default function ApiDocs() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('authentication');
  const sections = (apiData as { sections: Section[] }).sections;

  const allNavItems = sections.map(s => ({ id: s.id, label: s.label, icon: s.icon }));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const mainEl = document.getElementById("api-main-content");
    const handleScroll = () => {
      const scrollY = mainEl ? mainEl.scrollTop : window.scrollY;
      const scrollPos = scrollY + 140;
      let current = allNavItems[0].id;
      for (const item of allNavItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) current = item.id;
      }
      setActiveId(current);
    };

    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
      return () => mainEl.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [allNavItems]);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    const mainEl = document.getElementById("api-main-content");
    if (el && mainEl) {
      mainEl.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
    } else if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  }, []);

  const { meta: originalMeta } = apiData as { meta: { title: string; version: string; baseUrl: string; protocol: string; description: string }; sections: Section[] };
  const meta = {
    ...originalMeta,
    baseUrl: import.meta.env.VITE_API_BASE_URL || originalMeta.baseUrl
  };

  return (
    <div className={`h-screen bg-gradient-to-b from-emerald-50 via-emerald-50/25 to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-black text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        /* Custom Sleek Scrollbars for API Reference */
        .custom-scrollbar::-webkit-scrollbar,
        #api-main-content::-webkit-scrollbar,
        aside::-webkit-scrollbar,
        pre::-webkit-scrollbar,
        div[class*="overflow"]::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track,
        #api-main-content::-webkit-scrollbar-track,
        aside::-webkit-scrollbar-track,
        pre::-webkit-scrollbar-track,
        div[class*="overflow"]::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb,
        #api-main-content::-webkit-scrollbar-thumb,
        aside::-webkit-scrollbar-thumb,
        pre::-webkit-scrollbar-thumb,
        div[class*="overflow"]::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.4);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover,
        #api-main-content::-webkit-scrollbar-thumb:hover,
        aside::-webkit-scrollbar-thumb:hover,
        pre::-webkit-scrollbar-thumb:hover,
        div[class*="overflow"]::-webkit-scrollbar-thumb:hover {
          background-color: rgba(6, 182, 212, 0.75);
          border: 1px solid transparent;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb,
        .dark #api-main-content::-webkit-scrollbar-thumb,
        .dark aside::-webkit-scrollbar-thumb,
        .dark pre::-webkit-scrollbar-thumb,
        .dark div[class*="overflow"]::-webkit-scrollbar-thumb {
          background-color: rgba(100, 116, 139, 0.45);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover,
        .dark #api-main-content::-webkit-scrollbar-thumb:hover,
        .dark aside::-webkit-scrollbar-thumb:hover,
        .dark pre::-webkit-scrollbar-thumb:hover,
        .dark div[class*="overflow"]::-webkit-scrollbar-thumb:hover {
          background-color: rgba(34, 211, 238, 0.8);
        }

        /* Firefox fallback */
        #api-main-content, aside, pre, div[class*="overflow"], .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.4) transparent;
        }
        .dark #api-main-content, .dark aside, .dark pre, .dark div[class*="overflow"], .dark .custom-scrollbar {
          scrollbar-color: rgba(100, 116, 139, 0.45) transparent;
        }
      `}</style>

      {/* Shared Header 1 - Fixed Layout Top Bar */}
      <Header
        scrolled={true}
        alwaysSolid={true}
        fixedLayout={true}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        goToMainView={() => { window.location.href = '/'; }}
        navigateTo={(view) => {
          if (view === 'main') window.location.href = '/';
          else if (view === 'download') window.location.href = '/download';
          else window.location.href = `/?view=${view}`;
        }}
      />

      {/* Main App Workspace: Fixed Sidebar on Left + Scrolling Content on Right */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative flex-col lg:flex-row">
        {/* Sidebar & TOC toggle */}
        <ApiSidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          activeId={activeId}
          allNavItems={allNavItems}
          scrollTo={scrollTo}
          version={meta.version}
          baseUrl={meta.baseUrl}
        />

        {/* Main Content & Footer Column - ONLY THIS AREA SCROLLS */}
        <main id="api-main-content" className="flex-1 h-full overflow-y-auto min-w-0 relative flex flex-col justify-between custom-scrollbar">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 w-full">
            {/* Hero Section */}
            <ApiHero
              version={meta.version}
              protocol={meta.protocol}
              title={meta.title}
              description={meta.description}
              baseUrl={meta.baseUrl}
            />

            {/* Sections */}
            {sections.map(section => <SectionBlock key={section.id} section={section} />)}
          </div>

          {/* Footer Component reuse matching existing pages */}
          <div className="mt-20 border-t border-gray-200 dark:border-slate-800/80 w-full shrink-0">
            <Footer
              setView={(view: AppView) => {
                if (view === 'main') window.location.href = '/';
                else window.location.href = `/?view=${view}`;
              }}
              openPricingSection={() => {
                window.location.href = '/#pricing';
              }}
              setShowApiSection={() => {
                window.location.href = '/#api';
              }}
              copyToClipboard={async (text: string) => {
                try {
                  await navigator.clipboard.writeText(text);
                  return true;
                } catch {
                  return false;
                }
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
