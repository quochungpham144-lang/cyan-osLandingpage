import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const AboutView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN OS LITE</div>
              <div className="text-xs text-gray-400">About the ultra-low latency voice translator</div>
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
        <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
            <div>
              <div className="text-base md:text-lg font-semibold text-white">ABOUT CYAN OS LITE</div>
              <div className="mt-1 text-xs text-gray-400">
                Real-time AI voice translation designed for natural negotiation and live meetings
              </div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">What is CYAN OS Lite?</div>
              <p className="mt-1 text-gray-300">
                CYAN OS Lite is a real-time AI translator that sits next to your calls, meetings, and webinars and turns
                your voice into another language in well under a second. It is built on top of a lightweight runtime
                layer we call CYAN OS, which orchestrates providers such as ElevenLabs, Microsoft Azure, and Google
                Wavenet to keep latency in the 200–400ms range while staying cost-efficient.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Why we focus on natural voice</div>
              <p className="mt-1 text-gray-300">
                Most translation tools are optimised for captions, not for how human conversations actually feel. CYAN
                OS Lite is tuned for voice-first experiences where tone, pacing, and micro-pauses matter: negotiations,
                investor calls, sales demos, and high-stakes one-on-ones. Partner engines such as ElevenLabs are used so
                that translated speech sounds warm and expressive instead of robotic.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Built for negotiation and live meetings</div>
              <p className="mt-1 text-gray-300">
                In a real negotiation, a 2–3 second delay can kill the flow of trust. CYAN OS Lite streams translation
                in very small chunks so that your counterpart hears the first words in under half a second. This makes
                cross-language calls, board meetings, and customer support sessions feel closer to a native
                conversation, not a relay race between you and a distant interpreter.
              </p>
              <p className="mt-2 text-gray-300">
                The desktop client integrates with existing tools: you can route audio from Zoom, Meet, or Teams into
                CYAN and send translated speech back to headphones, speakers, or a virtual microphone that remote
                participants can select as their audio source.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">CYAN OS Lite vs. full CYAN OS</div>
              <p className="mt-1 text-gray-300">
                CYAN OS Lite focuses on a streamlined, opinionated path: ultra-low latency voice translation with
                sensible defaults. It exposes the same real-time pipeline we use internally, but without requiring
                teams to manage complex routing, watermarking, or multi-region deployments. The full CYAN OS stack
                extends these ideas for enterprise deployments and deeper integrations.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Who is it for?</div>
              <p className="mt-1 text-gray-300">
                CYAN OS Lite is built for founders, operators, and teams who need to sound like themselves in another
                language when it matters most. Typical scenarios include:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Negotiating with international partners or suppliers without a human interpreter on the call.</li>
                <li>Pitching to investors in a language you are not fully fluent in.</li>
                <li>Running support or success calls where empathy and tone of voice are critical.</li>
                <li>Hosting webinars and live trainings for audiences across multiple regions.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Voice, privacy, and control</div>
              <p className="mt-1 text-gray-300">
                CYAN follows a zero-retention philosophy for live sessions: audio is streamed for processing and then
                discarded rather than archived. For users on higher tiers, CYAN OS Lite can be combined with customised
                voices so that translated speech still feels like your own, subject to strict consent and copyright
                rules around voice cloning.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
));
