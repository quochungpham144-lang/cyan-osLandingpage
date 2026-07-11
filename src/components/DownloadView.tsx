import { memo } from 'react';
import { Footer } from './Footer';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
  openPricingSection?: () => void;
  setShowApiSection?: (show: boolean) => void;
  copyToClipboard?: (val: string) => Promise<boolean>;
}

export const DownloadView = memo(({ isDarkMode, goToMainView, openPricingSection, setShowApiSection, copyToClipboard }: Props) => {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 pt-24 flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header matching AboutView / simplified home page header */}
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
              <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Pricing</button>
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

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-8 md:px-10 md:py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Download CYAN OS<span className="tm-symbol">™</span></h1>
          <p className="text-gray-400 mb-10 text-sm md:text-base">
            Click below to download the Cyan OS setup file.
          </p>

          <div className="mt-12">
            <a
              href="https://pub-2b9c36332bf24e9bb266cfdf0af3665d.r2.dev/CyanOS-1.0.0%20Setup.exe"
              download
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all hover:-translate-y-1 shadow-lg shadow-cyan-500/25"
            >
              Download CYAN OS
            </a>
          </div>
        </main>
      </div>

      {/* Footer component reuse */}
      <div className="mt-auto">
        <Footer
          setView={(v) => {
            if (v === 'main') goToMainView();
          }}
          openPricingSection={openPricingSection || (() => { })}
          setShowApiSection={setShowApiSection || (() => { })}
          copyToClipboard={copyToClipboard || (async () => false)}
        />
      </div>
    </div>
  );
});
