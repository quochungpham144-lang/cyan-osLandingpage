import { memo } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sparkles } from 'lucide-react';
import { UserSession } from '../App';

interface Props {
  isDarkMode: boolean;
  setIsDarkMode?: (val: boolean) => void;
  goToMainView: () => void;
  setView?: (view: any) => void;
  isLoggedIn?: boolean;
  userInfo?: UserSession | null;
  saveSession?: (session: UserSession | null) => void;
  setShowLoginModal?: (show: boolean) => void;
  openPricingSection?: () => void;
  setShowApiSection?: (show: boolean) => void;
  copyToClipboard?: (val: string) => Promise<boolean>;
}

const WindowsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-10.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" />
  </svg>
);

export const DownloadView = memo(({
  isDarkMode,
  setIsDarkMode,
  goToMainView,
  setView,
  isLoggedIn = false,
  userInfo = null,
  saveSession,
  setShowLoginModal,
  openPricingSection,
  setShowApiSection,
  copyToClipboard,
}: Props) => {
  const handleThemeToggle = (nextVal: boolean) => {
    if (setIsDarkMode) {
      setIsDarkMode(nextVal);
    } else {
      localStorage.setItem('theme', nextVal ? 'dark' : 'light');
      if (nextVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new CustomEvent('theme-change', { detail: nextVal }));
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 via-cyan-50/20 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Full Header matching YC SaaS layout with live theme switch */}
      <Header
        scrolled={true}
        isDarkMode={isDarkMode}
        setIsDarkMode={handleThemeToggle}
        goToMainView={goToMainView}
        navigateTo={(v) => {
          if (setView) setView(v as any);
          else if (v === 'home') goToMainView();
        }}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        saveSession={saveSession}
        setShowLoginModal={setShowLoginModal}
        openPricingSection={openPricingSection}
        setShowApiSection={setShowApiSection}
        alwaysSolid={true}
      />

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 w-full flex flex-col items-center justify-center text-center">
        {/* Top Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold text-xs md:text-sm shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Cyan OS™ Native Desktop Bridge — Private Beta
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 max-w-2xl">
          Download <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">CYAN OS</span><span className="tm-symbol">™</span> for Windows
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-10 leading-relaxed font-normal">
          Ultra-low latency (<span className="font-semibold text-cyan-600 dark:text-cyan-400">&lt;400ms</span>) real-time AI voice translation natively on your desktop.
        </p>

        {/* Big Gradient CTA Button with Windows Icon */}
        <a
          href="https://pub-2b9c36332bf24e9bb266cfdf0af3665d.r2.dev/CyanOS-1.0.0%20Setup.exe"
          download
          className="inline-flex items-center justify-center gap-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-9 py-5 rounded-xl font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
        >
          <WindowsIcon className="w-6 h-6 text-white shrink-0" />
          <span>Download for Windows</span>
        
        </a>

        {/* Windows Compatibility Badge */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100/80 dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
            <WindowsIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>Compatible with <strong className="text-gray-900 dark:text-white">Windows 10</strong> &amp; <strong className="text-gray-900 dark:text-white">Windows 11</strong> (64-bit)</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer
          setView={(v) => {
            if (setView) setView(v);
            else if (v === 'main') goToMainView();
          }}
          openPricingSection={openPricingSection || (() => { })}
          setShowApiSection={setShowApiSection || (() => { })}
          copyToClipboard={copyToClipboard || (async () => false)}
        />
      </div>
    </div>
  );
});


