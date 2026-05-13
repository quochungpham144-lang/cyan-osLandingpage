import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const LeadershipView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
    <div className="min-h-screen pt-24 bg-gradient-to-b from-emerald-50 via-emerald-50/25 to-cyan-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-16">
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
