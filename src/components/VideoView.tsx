import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const VideoView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN OS REAL-TIME TRANSLATOR</div>
              <div className="text-xs text-gray-400">Experience Natural Voice</div>
            </div>
          </div>
          <button
            type="button"
            onClick={goToMainView}
            className="text-xs font-medium text-gray-400 hover:text-gray-100"
          >
            Back to site
          </button>
        </header>
        <main className="relative bg-gray-900/80 border border-cyan-500/40 rounded-2xl shadow-[0_0_45px_rgba(34,255,200,0.35)] px-6 py-6 md:px-8 md:py-8 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -left-32 w-80 h-80 bg-cyan-500/40 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4 pb-4 mb-6">
              <div>
                <div className="text-base md:text-lg font-semibold text-white">DEMO: ULTRA-LOW LATENCY AI TRANSLATION</div>
                <div className="mt-1 text-xs text-gray-400">
                  Electron CYAN – Experience natural voice translation without leaving this site
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-cyan-400/40 bg-black/90 shadow-[0_0_60px_rgba(34,255,200,0.4)]">
              <div className="relative pt-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/zffQKk-tCpo?autoplay=1&rel=0"
                  title="Electron CYAN - ULTRA-LOW LATENCY AI TRANSLATOR"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-4 text-xs md:text-sm text-gray-300">
              This video runs in an embedded player so visitors stay on cyan.ai while exploring how ultra-low
              latency translation works in real meetings.
            </p>
          </div>
        </main>
      </div>
    </div>
));
