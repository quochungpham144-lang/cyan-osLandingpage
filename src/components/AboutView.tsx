import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const AboutView = memo(({ isDarkMode, goToMainView }: Props) => (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-emerald-50 via-emerald-50/25 to-cyan-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">CYAN OS LITE</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">About the ultra-low latency voice translator</div>
            </div>
          </div>
          <button
            type="button"
            onClick={goToMainView}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Back to site
          </button>
        </header>
        <main className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
            <div>
              <div className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">ABOUT CYAN OS LITE</div>
              <div className="mt-1 text-xs text-gray-400">
                Real-time AI voice translation designed for natural negotiation and live meetings
              </div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">What is CYAN OS Lite?</div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                CYAN OS Lite is a real-time AI translator that sits next to your calls, meetings, and webinars and turns
                your voice into another language in well under a second. It is built on top of a lightweight runtime
                layer we call CYAN OS, which orchestrates providers such as ElevenLabs, Microsoft Azure, and Google
                Wavenet to keep latency in the 200–400ms range while staying cost-efficient.
              </p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Why we focus on natural voice</div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                Most translation tools are optimised for captions, not for how human conversations actually feel. CYAN
                OS Lite is tuned for voice-first experiences where tone, pacing, and micro-pauses matter: negotiations,
                investor calls, sales demos, and high-stakes one-on-ones. Partner engines such as ElevenLabs are used so
                that translated speech sounds warm and expressive instead of robotic.
              </p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Built for negotiation and live meetings</div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                In a real negotiation, a 2–3 second delay can kill the flow of trust. CYAN OS Lite streams translation
                in very small chunks so that your counterpart hears the first words in under half a second. This makes
                cross-language calls, board meetings, and customer support sessions feel closer to a native
                conversation, not a relay race between you and a distant interpreter.
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                The desktop client integrates with existing tools: you can route audio from Zoom, Meet, or Teams into
                CYAN and send translated speech back to headphones, speakers, or a virtual microphone that remote
                participants can select as their audio source.
              </p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">CYAN OS Lite vs. full CYAN OS</div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                CYAN OS Lite focuses on a streamlined, opinionated path: ultra-low latency voice translation with
                sensible defaults. It exposes the same real-time pipeline we use internally, but without requiring
                teams to manage complex routing, watermarking, or multi-region deployments. The full CYAN OS stack
                extends these ideas for enterprise deployments and deeper integrations.
              </p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Who is it for?</div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                CYAN OS Lite is built for founders, operators, and teams who need to sound like themselves in another
                language when it matters most. Typical scenarios include:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Negotiating with international partners or suppliers without a human interpreter on the call.</li>
                <li>Pitching to investors in a language you are not fully fluent in.</li>
                <li>Running support or success calls where empathy and tone of voice are critical.</li>
                <li>Hosting webinars and live trainings for audiences across multiple regions.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Voice, privacy, and control</div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                CYAN follows a zero-retention philosophy for live sessions: audio is streamed for processing and then
                discarded rather than archived. For users on higher tiers, CYAN OS Lite can be combined with customised
                voices so that translated speech still feels like your own, subject to strict consent and copyright
                rules around voice cloning.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-800">
              <div className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-6">THE TEAM</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Team Member 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-800 border border-gray-700 mb-4 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D5603AQE0zZOefLjE8A/profile-displayphoto-scale_400_400/B56Z0NlYk8KYAk-/0/1774049399283?e=1779926400&v=beta&t=ztVq3EM1CK4vBkuaLBg7ULDotXpF2ob5jV1sQRxyhGo" 
                      alt="Quoc Hung Pham" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Quoc Hung Pham</div>
                  <div className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">Core Team</div>
                  <a 
                    href="https://www.linkedin.com/in/quoc-hung-pham-7b1023191/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>

                {/* Team Member 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-800 border border-gray-700 mb-4 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D5603AQFAERQCXltxIA/profile-displayphoto-crop_800_800/B56Ztgsx7kJ8AM-/0/1766853911525?e=1779926400&v=beta&t=RBBUJJSk3WWKk5DxCWLIWtpwO0Qxtms2oX3gBeld-pA" 
                      alt="Raphael Enriquez" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Raphael Enriquez</div>
                  <div className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">Core Team</div>
                  <a 
                    href="http://linkedin.com/in/raph-enriquez" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>

                {/* Team Member 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-800 border border-gray-700 mb-4 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4D03AQEPlzOn9dprng/profile-displayphoto-shrink_400_400/B4DZbFGIH2GwAk-/0/1747063441083?e=1779926400&v=beta&t=5kC5frwQjQ69EbZG9bFsJ08HUUPlUEv-W629MBVV3D8" 
                      alt="Tulika Anand" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Tulika Anand</div>
                  <div className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">Core Team</div>
                  <a 
                    href="https://www.linkedin.com/in/tulika-anand-643332311/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mt-10 bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Mission Focus: CYAN OS LITE</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The team is dedicated to perfecting CYAN OS Lite, ensuring that ultra-low latency translation remains accessible and high-performing for our core user base of negotiators, founders, and global operators.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
));
