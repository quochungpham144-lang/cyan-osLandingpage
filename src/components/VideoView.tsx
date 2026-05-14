import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const VideoView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 pt-24 ${isDarkMode ? 'dark' : ''}`}>
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
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">ULTRA-LOW LATENCY AI TRANSLATOR</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Home</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Solution</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Engine</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Platforms</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Developers</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">API</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">ROI</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Pricing</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Contact</button>
            <button
              onClick={goToMainView}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Back to site
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={goToMainView} className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
              Back to site
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div className="max-w-5xl mx-auto px-6 py-10">
      <main className="relative bg-gray-900/80 border border-cyan-500/40 rounded-2xl shadow-[0_0_45px_rgba(34,255,200,0.35)] px-6 py-6 md:px-8 md:py-8 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -left-32 w-80 h-80 bg-cyan-500/40 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4 pb-4 mb-6">
              <div>
                <div className="text-base md:text-lg font-semibold text-white">DEMO: ULTRA-LOW LATENCY AI TRANSLATION</div>
                <div className="font-semibold text-white flex items-center justify-center gap-1">
                  Electron CYAN OS<span className="tm-symbol">™</span> – Experience natural voice translation without leaving this site
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-cyan-400/40 bg-black/90 shadow-[0_0_60px_rgba(34,255,200,0.4)]">
              <div className="relative pt-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/zffQKk-tCpo?autoplay=1&rel=0"
                  title="Electron CYANOS™ - ULTRA-LOW LATENCY AI TRANSLATOR"
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
