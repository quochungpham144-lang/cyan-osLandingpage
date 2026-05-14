import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const AboutView = memo(({ isDarkMode, goToMainView }: Props) => (
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
    <div className="max-w-4xl mx-auto px-6 py-10">
      <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
            <div>
              <div className="text-base md:text-lg font-semibold text-white">ABOUT CYAN OS<span className="tm-symbol">™</span> LITE</div>
              <div className="mt-1 text-xs text-gray-400">
                Real-time AI voice translation designed for natural negotiation and live meetings
              </div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">What is CYAN OS<span className="tm-symbol">™</span> Lite?</div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> Lite is a real-time AI translator that sits next to your calls, meetings, and webinars and turns
                your voice into another language in well under a second. It is built on top of a lightweight runtime
                layer we call CYAN OS<span className="tm-symbol">™</span>, which orchestrates providers such as ElevenLabs, Microsoft Azure, and Google
                Wavenet to keep latency in the 200–400ms range while staying cost-efficient.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Why we focus on natural voice</div>
              <p className="mt-1 text-gray-300">
                Most translation tools are optimised for captions, not for how human conversations actually feel. CYAN OS<span className="tm-symbol">™</span>
                Lite is tuned for voice-first experiences where tone, pacing, and micro-pauses matter: negotiations,
                investor calls, sales demos, and high-stakes one-on-ones. Partner engines such as ElevenLabs are used so
                that translated speech sounds warm and expressive instead of robotic.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Built for negotiation and live meetings</div>
              <p className="mt-1 text-gray-300">
                In a real negotiation, a 2–3 second delay can kill the flow of trust. CYAN OS<span className="tm-symbol">™</span> Lite streams translation
                in very small chunks so that your counterpart hears the first words in under half a second. This makes
                cross-language calls, board meetings, and customer support sessions feel closer to a native
                conversation, not a relay race between you and a distant interpreter.
              </p>
              <p className="mt-2 text-gray-300">
                The desktop client integrates with existing tools: you can route audio from Zoom, Meet, or Teams into
                CYAN OS<span className="tm-symbol">™</span> and send translated speech back to headphones, speakers, or a virtual microphone that remote
                participants can select as their audio source.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">CYAN OS<span className="tm-symbol">™</span> Lite vs. full CYAN OS<span className="tm-symbol">™</span></div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> Lite focuses on a streamlined, opinionated path: ultra-low latency voice translation with
                sensible defaults. It exposes the same real-time pipeline we use internally, but without requiring
                teams to manage complex routing, watermarking, or multi-region deployments. The full CYAN OS<span className="tm-symbol">™</span> stack
                extends these ideas for enterprise deployments and deeper integrations.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Who is it for?</div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> Lite is built for founders, operators, and teams who need to sound like themselves in another
                language when it matters most. Typical scenarios include:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Sales professionals conducting demos for international prospects.</li>
                <li>Product managers and engineering leads running global stand-ups.</li>
                <li>Executives negotiating high-stakes deals across borders.</li>
                <li>HR teams conducting interviews in multiple languages.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Voice, privacy, and control</div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> follows a zero-retention philosophy for live sessions: audio is streamed for processing and then
                discarded rather than archived. For users on higher tiers, CYAN OS<span className="tm-symbol">™</span> Lite can be combined with customised
                voices so that translated speech still feels like your own, subject to strict consent and copyright
                rules around voice cloning.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <div className="text-lg font-bold text-white mb-6">CORE TEAM</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Quoc Hung Pham */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 p-1 mb-4 relative overflow-hidden bg-gray-800">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQE0zZOefLjE8A/profile-displayphoto-scale_400_400/B56Z0NlYk8KYAk-/0/1774049399283?e=1779926400&v=beta&t=ztVq3EM1CK4vBkuaLBg7ULDotXpF2ob5jV1sQRxyhGo"
                      alt="Quoc Hung Pham"
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all"
                    />
                    <a href="https://www.linkedin.com/in/quochungpham144/" target="_blank" rel="noopener noreferrer" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="font-bold text-sm text-white">Quoc Hung Pham</div>
                  <div className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">Founder & Lead Engineer</div>
                </div>

                {/* Tulika Anand */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 p-1 mb-4 relative overflow-hidden bg-gray-800">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4D03AQEPlzOn9dprng/profile-displayphoto-shrink_400_400/B4DZbFGIH2GwAk-/0/1747063441083?e=1779926400&v=beta&t=5kC5frwQjQ69EbZG9bFsJ08HUUPlUEv-W629MBVV3D8"
                      alt="Tulika Anand"
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all"
                    />
                    <a href="https://www.linkedin.com/in/tulika-anand-a651a2217/" target="_blank" rel="noopener noreferrer" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="font-bold text-sm text-white">Tulika Anand</div>
                  <div className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">CTO</div>
                </div>

                {/* Raphael Enriquez */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 p-1 mb-4 relative overflow-hidden bg-gray-800">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQFAERQCXltxIA/profile-displayphoto-crop_800_800/B56Ztgsx7kJ8AM-/0/1766853911525?e=1779926400&v=beta&t=RBBUJJSk3WWKk5DxCWLIWtpwO0Qxtms2oX3gBeld-pA"
                      alt="Raphael Enriquez"
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all"
                    />
                    <a href="https://www.linkedin.com/in/raphaelenriquez/" target="_blank" rel="noopener noreferrer" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="font-bold text-sm text-white">Raphael Enriquez</div>
                  <div className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">Advisor</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
));
