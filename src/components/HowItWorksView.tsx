import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const HowItWorksView = memo(({ isDarkMode, goToMainView }: Props) => (
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
              <div className="text-base md:text-lg font-semibold text-white">HOW CYAN OS<span className="tm-symbol">™</span> REAL-TIME TRANSLATOR WORKS</div>
              <div className="mt-1 text-xs text-gray-400">From your microphone to translated speech in under a second</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. REAL-TIME TRANSLATION PIPELINE</div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> is designed to sit next to your meetings, calls, and webinars as a low-latency translation layer.
                The high-level pipeline is:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Your voice is captured from microphone or virtual audio device.</li>
                <li>Audio is streamed in small chunks to our secure backend and partner models.</li>
                <li>Speech is recognized, translated, and converted into the target language text.</li>
                <li>Translated text is synthesized back into natural speech and streamed to your output.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">2. AUDIO CAPTURE AND INPUT</div>
              <p className="mt-1 text-gray-300">
                The CYAN OS<span className="tm-symbol">™</span> desktop client captures audio in real time:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Input sources can be your microphone, system audio, or a virtual cable from Zoom, Meet, or Teams.</li>
                <li>Audio is chunked into very short segments so we do not wait for entire sentences.</li>
                <li>Each chunk is immediately forwarded for processing to keep latency low.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">3. SPEECH RECOGNITION AND TRANSLATION</div>
              <p className="mt-1 text-gray-300">
                Inside the backend, CYAN OS<span className="tm-symbol">™</span> coordinates multiple AI services:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Speech recognition turns your source-language audio into text.</li>
                <li>Machine translation converts that text into the target language you selected.</li>
                <li>Quality and latency are tuned per language pair so that meetings remain natural.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">4. TEXT-TO-SPEECH AND STREAMING OUTPUT</div>
              <p className="mt-1 text-gray-300">
                After translation, CYAN OS<span className="tm-symbol">™</span> turns the text back into speech and streams it:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Partner engines such as ElevenLabs and Azure are used for high-quality voices.</li>
                <li>Audio is streamed as soon as the first words are ready, not after the whole sentence finishes.</li>
                <li>You can route the translated audio to speakers, headphones, or a virtual output device for remote participants.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">5. VOICE CLONING AND PERSONALIZATION</div>
              <p className="mt-1 text-gray-300">
                For Executive Pro users, CYAN OS<span className="tm-symbol">™</span> supports customized voice cloning:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>You provide a short, legally compliant audio sample of your own voice.</li>
                <li>A dedicated model is created so the translated output sounds like you, not a generic voice.</li>
                <li>We enforce strict rules against cloning public figures and require proof of consent where needed.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">6. LATENCY AND QUALITY OPTIMIZATION</div>
              <p className="mt-1 text-gray-300">
                The entire system is tuned for ultra-low latency while staying stable in real meetings:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Streaming instead of batch requests to avoid long pauses in conversation.</li>
                <li>Fallback models and routing logic keep the service running even under heavy load.</li>
                <li>Adaptive chunking balances responsiveness with natural-sounding speech.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">7. PRIVACY, SECURITY, AND COMPLIANCE</div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> was built with privacy-first constraints:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Zero-retention design for live translation sessions.</li>
                <li>No call recording or long-term storage of conversation content.</li>
                <li>Region-aware policies to respect users in Vietnam, EU, US, and other jurisdictions.</li>
              </ul>
              <p className="mt-2 text-gray-300">
                For full details, please review the dedicated Privacy Policy and Security pages in the footer.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">8. TYPICAL USE CASES</div>
              <p className="mt-1 text-gray-300">
                CYAN OS<span className="tm-symbol">™</span> is optimized for real-world, high-stakes communication where human interpreters are expensive or unavailable:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Founders pitching to international investors in a different language.</li>
                <li>Live webinars and online courses reaching audiences across multiple regions.</li>
                <li>Remote teams running daily standups or support calls across time zones and languages.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">9. TECHNICAL EXPECTATIONS FOR DEVELOPERS</div>
              <p className="mt-1 text-gray-300">
                For engineering teams integrating CYAN OS<span className="tm-symbol">™</span> into production workflows, it is important to treat the numbers on the landing page as realistic targets, not hard SLAs:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Latency: Typical end-to-end response from speech input to first translated audio is in the 200–400ms range, depending on network conditions, provider routing, and language pairs.</li>
                <li>Reliability: Success rate is designed to stay around 99% in normal conditions, but you should still implement retries and fallbacks in your client.</li>
                <li>Cost: The “up to 80% cost reduction” figure assumes a comparison with traditional human voiceover or manual translation workflows; actual savings vary by usage pattern and provider mix.</li>
              </ul>
              <p className="mt-2 text-gray-300">
                When building on CYAN OS<span className="tm-symbol">™</span> or the public API, we recommend instrumenting your own latency and error metrics so you can tune timeouts, backoff strategies, and user experience for your specific region and infrastructure.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
));
