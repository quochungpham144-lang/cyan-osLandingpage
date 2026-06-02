import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
  toggleDarkMode: () => void;
}

export const LeadershipView = memo(({ isDarkMode, goToMainView, toggleDarkMode }: Props) => (   
  <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
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
    <div className="min-h-screen pt-24 bg-gradient-to-b from-emerald-50 via-emerald-50/25 to-cyan-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">CYAN OS</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Leadership & Vision</div>
            </div>
          </div>
          <button
            type="button"
            onClick={goToMainView}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            Back to site
          </button>
        </header>

        <main className="text-center">
          <div className="mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Leadership & Vision
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl"> 
              Building the future of global communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">        
            {/* Quoc Hung Pham */}
            <div className="flex flex-col items-center">
              <div className="relative mb-10 group">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-cyan-500/50 p-2 relative z-10 overflow-hidden bg-white dark:bg-gray-900 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-shadow duration-500">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQE0zZOefLjE8A/profile-displayphoto-scale_400_400/B56Z0NlYk8KYAk-/0/1774049399283?e=1779926400&v=beta&t=ztVq3EM1CK4vBkuaLBg7ULDotXpF2ob5jV1sQRxyhGo"
                    alt="Quoc Hung Pham"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quoc Hung Pham</h2>
              <p className="text-cyan-600 dark:text-cyan-400 font-bold mb-6">Founder & Lead AI Engineer</p>
              <div className="space-y-4 max-w-sm text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed px-4">
                <p>Product Management Lead for Blockchain & AI Infrastructure</p>
                <p>Specialist in Market Making (MM) & Liquidity Strategies</p>  
                <div className="flex justify-center pt-4">
                  <a
                    href="https://www.linkedin.com/in/quoc-hung-pham-7b1023191/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-widest pt-2">Hanoi, Vietnam</p>
              </div>
            </div>

            {/* Tulika Anand */}
            <div className="flex flex-col items-center">
              <div className="relative mb-10 group">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-cyan-500/50 p-2 relative z-10 overflow-hidden bg-white dark:bg-gray-900 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-shadow duration-500">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQEPlzOn9dprng/profile-displayphoto-shrink_400_400/B4DZbFGIH2GwAk-/0/1747063441083?e=1779926400&v=beta&t=5kC5frwQjQ69EbZG9bFsJ08HUUPlUEv-W629MBVV3D8"
                    alt="Tulika Anand"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tulika Anand</h2>
              <p className="text-cyan-600 dark:text-cyan-400 font-bold mb-6">CTO</p>
              <div className="space-y-4 max-w-sm text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed px-4">
                <p>Data science and machine learning specialist | Computer Science at KIET and Data Science at IIT Guwahati ('28) | Leads model optimization, pipeline engineering, and all technical execution.</p>
                <div className="flex justify-center pt-4">
                  <a
                    href="https://www.linkedin.com/in/tulika-anand-643332311/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-widest pt-2">Uttar Pradesh, India</p>
              </div>
            </div>

            {/* Raphael Enriquez */}
            <div className="flex flex-col items-center">
              <div className="relative mb-10 group">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-cyan-500/50 p-2 relative z-10 overflow-hidden bg-white dark:bg-gray-900 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-shadow duration-500">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQFAERQCXltxIA/profile-displayphoto-crop_800_800/B56Ztgsx7kJ8AM-/0/1766853911525?e=1779926400&v=beta&t=RBBUJJSk3WWKk5DxCWLIWtpwO0Qxtms2oX3gBeld-pA"
                    alt="Raphael Enriquez"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Raphael Enriquez</h2>
              <p className="text-cyan-600 dark:text-cyan-400 font-bold mb-6">Operations Advisor</p>
              <div className="space-y-4 max-w-sm text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed px-4">
                <p>Web3 Marketer | AI x Crypto | GTM & Narrative Leadership || Polytechnic University of the Philippines</p>
                <div className="flex justify-center pt-4">
                  <a
                    href="http://linkedin.com/in/raph-enriquez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-widest pt-2">Manila, Philippines</p>
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-900/50 border border-cyan-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl">     
            <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4">Our Commitment</div>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
              "At Electron Cyan, we aren't just building a translator. We're building a bridge for human potential, ensuring that language is never again a barrier to innovation, negotiation, or trust."
            </p>
          </div>
        </main>

        <footer className="mt-32 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-xs pb-16">
          <p>&copy; 2026 ELECTRON CYAN. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </div>
  </div>
));