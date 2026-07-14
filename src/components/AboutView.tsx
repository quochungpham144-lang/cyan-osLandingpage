import { memo } from "react";

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const AboutView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div
    className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 pt-24 ${isDarkMode ? "dark" : ""}`}
  >
    <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={goToMainView}
          >
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/logoCYAN.png"
                alt="CYAN Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white flex items-baseline">
                CYAN OS<span className="tm-symbol">™</span>
              </span>
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                ULTRA-LOW LATENCY AI TRANSLATOR
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Solution
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Engine
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Platforms
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Developers
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              API
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              ROI
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={goToMainView}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={goToMainView}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Back to site
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={goToMainView}
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
            >
              Back to site
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div className="max-w-4xl mx-auto px-6 py-10">
      <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xs px-6 py-6 md:px-8 md:py-8">
        <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
          <div>
            <div className="text-base md:text-lg font-semibold text-white">
              ABOUT CYAN OS<span className="tm-symbol">™</span> LITE
            </div>
            <div className="mt-1 text-xs text-gray-400">
              Real-time AI voice translation designed for natural negotiation
              and live meetings
            </div>
          </div>
        </div>
        <div className="space-y-5 text-sm leading-relaxed">
          <div>
            <div className="font-semibold text-white">
              What is CYAN OS<span className="tm-symbol">™</span> Lite?
            </div>
            <p className="mt-1 text-gray-300">
              CYAN OS<span className="tm-symbol">™</span> Lite is a real-time AI
              translator that sits next to your calls, meetings, and webinars
              and turns your voice into another language in well under a second.
              It is built on top of a lightweight runtime layer we call CYAN OS
              <span className="tm-symbol">™</span>, which orchestrates providers
              such as ElevenLabs, Microsoft Azure, and Google Wavenet to keep
              latency in the 200–400ms range while staying cost-efficient.
            </p>
          </div>
          <div>
            <div className="font-semibold text-white">
              Why we focus on natural voice
            </div>
            <p className="mt-1 text-gray-300">
              Most translation tools are optimised for captions, not for how
              human conversations actually feel. CYAN OS
              <span className="tm-symbol">™</span>
              Lite is tuned for voice-first experiences where tone, pacing, and
              micro-pauses matter: negotiations, investor calls, sales demos,
              and high-stakes one-on-ones. Partner engines such as ElevenLabs
              are used so that translated speech sounds warm and expressive
              instead of robotic.
            </p>
          </div>
          <div>
            <div className="font-semibold text-white">
              Built for negotiation and live meetings
            </div>
            <p className="mt-1 text-gray-300">
              In a real negotiation, a 2–3 second delay can kill the flow of
              trust. CYAN OS<span className="tm-symbol">™</span> Lite streams
              translation in very small chunks so that your counterpart hears
              the first words in under half a second. This makes cross-language
              calls, board meetings, and customer support sessions feel closer
              to a native conversation, not a relay race between you and a
              distant interpreter.
            </p>
            <p className="mt-2 text-gray-300">
              The desktop client integrates with existing tools: you can route
              audio from Zoom, Meet, or Teams into CYAN OS
              <span className="tm-symbol">™</span> and send translated speech
              back to headphones, speakers, or a virtual microphone that remote
              participants can select as their audio source.
            </p>
          </div>
          <div>
            <div className="font-semibold text-white">
              CYAN OS<span className="tm-symbol">™</span> Lite vs. full CYAN OS
              <span className="tm-symbol">™</span>
            </div>
            <p className="mt-1 text-gray-300">
              CYAN OS<span className="tm-symbol">™</span> Lite focuses on a
              streamlined, opinionated path: ultra-low latency voice translation
              with sensible defaults. It exposes the same real-time pipeline we
              use internally, but without requiring teams to manage complex
              routing, watermarking, or multi-region deployments. The full CYAN
              OS<span className="tm-symbol">™</span> stack extends these ideas
              for enterprise deployments and deeper integrations.
            </p>
          </div>
          <div>
            <div className="font-semibold text-white">Who is it for?</div>
            <p className="mt-1 text-gray-300">
              CYAN OS<span className="tm-symbol">™</span> Lite is built for
              founders, operators, and teams who need to sound like themselves
              in another language when it matters most. Typical scenarios
              include:
            </p>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>
                Sales professionals conducting demos for international
                prospects.
              </li>
              <li>
                Product managers and engineering leads running global stand-ups.
              </li>
              <li>Executives negotiating high-stakes deals across borders.</li>
              <li>HR teams conducting interviews in multiple languages.</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white">
              Voice, privacy, and control
            </div>
            <p className="mt-1 text-gray-300">
              CYAN OS<span className="tm-symbol">™</span> follows a
              zero-retention philosophy for live sessions: audio is streamed for
              processing and then discarded rather than archived. For users on
              higher tiers, CYAN OS<span className="tm-symbol">™</span> Lite can
              be combined with customised voices so that translated speech still
              feels like your own, subject to strict consent and copyright rules
              around voice cloning.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800">
            <div className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-6">
              THE TEAM
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-800 border border-gray-700 mb-4 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
                  <img
                    src="/hung.jpg"
                    alt="Quoc Hung Pham"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-white text-sm md:text-base">
                  Quoc Hung Pham
                </div>
                <div className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
                  Core Team
                </div>
                <a
                  href="https://www.linkedin.com/in/quoc-hung-pham-7b1023191/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              {/* Team Member 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-800 border border-gray-700 mb-4 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
                  <img
                    src="/raph.jpg"
                    alt="Raphael Enriquez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-white text-sm md:text-base">
                  Raphael Enriquez
                </div>
                <div className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
                  Core Team
                </div>
                <a
                  href="http://linkedin.com/in/raph-enriquez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              {/* Team Member 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gray-800 border border-gray-700 mb-4 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
                  <img
                    src="/tulika.jpeg"
                    alt="Tulika Anand"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-white text-sm md:text-base">
                  Tulika Anand
                </div>
                <div className="text-cyan-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
                  Core Team
                </div>
                <a
                  href="https://www.linkedin.com/in/tulika-anand-643332311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-10 bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-4">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                Mission Focus: CYAN OS LITE
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                The team is dedicated to perfecting CYAN OS Lite, ensuring that
                ultra-low latency translation remains accessible and
                high-performing for our core user base of negotiators, founders,
                and global operators.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
));
