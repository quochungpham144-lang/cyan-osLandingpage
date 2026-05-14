import { memo } from 'react';
import { Code, ArrowRight } from 'lucide-react';

interface Props {
  goToMainView: () => void;
}

export const DocsView = memo(({ goToMainView }: Props) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100 pt-24">
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
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
    <div className="relative max-w-6xl mx-auto px-4 py-8 lg:py-12">

                      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] gap-6 lg:gap-8">
                        <div className="space-y-6">
                          <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-cyan-900/40">
                            <h2 className="text-lg font-semibold text-cyan-300 mb-3">
                              1. End-to-End Streaming Flow (Client ⇄ CYAN OS<span className="tm-symbol">™</span> Lite ⇄ Providers)
                            </h2>
                            <p className="text-xs md:text-sm text-slate-300 mb-3">
                              CYAN OS<span className="tm-symbol">™</span> desktop client and browser extension stream raw audio to a local Electron core, which
                              bridges to CYAN OS<span className="tm-symbol">™</span> Lite running in the cloud. CYAN OS<span className="tm-symbol">™</span> Lite then orchestrates provider calls
                              (STT, translation, TTS) while keeping latency under 400ms whenever possible.
                            </p>
                            <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 font-mono text-[10px] md:text-xs text-slate-200 overflow-x-auto">
                              <div className="text-cyan-400 mb-1">Streaming pipeline</div>
                              <pre className="whitespace-pre leading-relaxed">
{`Mic / Virtual Device
  ↓  PCM chunks (48kHz → 16kHz noise-gated)
Electron Core
  ↓  /api/stt/stream (CYAN OS<span className="tm-symbol">™</span> Lite)
  ↓  Provider STT (Google/Azure) → partial + final transcripts
  ↓  /api/translate (CYAN OS<span className="tm-symbol">™</span> Lite with glossary & caching)
  ↓  /api/tts/speak-stream (chunked TTS)
  ↓  PCM / MPEG chunks → local player

Typical one-way latency: 200–400ms (network + provider + local render).`}
                              </pre>
                            </div>
                          </section>

                          <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-cyan-900/40">
                            <h2 className="text-lg font-semibold text-cyan-300 mb-3">
                              2. TTS Routing: Local ONNX Piper vs Cloud Voices
                            </h2>
                            <p className="text-xs md:text-sm text-slate-300 mb-3">
                              For text-to-speech, CYAN OS<span className="tm-symbol">™</span> uses a hybrid strategy: a local ONNX model (Piper) for instant
                              preview, and high-quality cloud voices (Google WaveNet, Azure Neural, ElevenLabs) for the
                              main stream. This keeps the experience responsive while still delivering natural voices.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 text-[10px] md:text-xs font-mono text-slate-200">
                                <div className="text-cyan-400 mb-1">Preview vs full stream</div>
                                <pre className="whitespace-pre leading-relaxed">
{`text = user_message
snippet = first_5_words(text)

Piper (local ONNX)
  ↓  synthesize(snippet)
  ↓  22.05kHz → 16kHz PCM
  ↓  play instantly in ear`}
                                </pre>
                                <p className="mt-2 text-[10px] text-slate-400">
                                  Piper is optimized for low CPU and fast startup. It gives the user an immediate sense
                                  of the target voice and language while the cloud stream is being prepared.
                                </p>
                              </div>
                              <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 text-[10px] md:text-xs font-mono text-slate-200">
                                <div className="text-cyan-400 mb-1">Cloud TTS routing (WaveNet, Azure, ElevenLabs)</div>
                                <pre className="whitespace-pre leading-relaxed">
{`if plan == "free":
  engine = "google_wavenet"
elif plan == "pro":
  engine = "azure_neural" or "elevenlabs"

/api/tts/speak-stream(engine, language, text)
  ↓  provider streams audio chunks
  ↓  CYAN OS<span className="tm-symbol">™</span> Lite forwards chunks to client
  ↓  audio watermark injected before output`}
                                </pre>
                                <p className="mt-2 text-[10px] text-slate-400">
                                  The gateway chooses the engine based on plan, language, and health checks. If a cloud
                                  provider fails, CYAN OS<span className="tm-symbol">™</span> Lite can fall back or temporarily rely more on ONNX voices.
                                </p>
                              </div>
                            </div>
                          </section>

                          <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-cyan-900/40">
                            <h2 className="text-lg font-semibold text-cyan-300 mb-3">
                              3. Forensic Audio Watermarking
                            </h2>
                            <p className="text-xs md:text-sm text-slate-300 mb-3">
                              To protect generated audio, CYAN OS<span className="tm-symbol">™</span> inserts a lightweight PCM watermark before it reaches the
                              client&apos;s output device. This watermark is inaudible to human ears but can be detected
                              by our forensic tools if the audio is recorded and used elsewhere.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 text-[10px] md:text-xs font-mono text-slate-200">
                                <div className="text-cyan-400 mb-1">Watermark injection (concept)</div>
                                <pre className="whitespace-pre leading-relaxed">
{`for each PCM16 frame:
  base = tts_frame[i]
  mark = watermark_pattern[i % pattern_len]
  output[i] = clamp16(base + mark)`}
                                </pre>
                                <p className="mt-2 text-[10px] text-slate-400">
                                  Pattern is short, pseudo-random, and repeated so it survives resampling and light
                                  compression. Detection happens server-side when needed.
                                </p>
                              </div>
                              <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 text-[10px] md:text-xs text-slate-200">
                                <div className="text-cyan-400 mb-1">Security goals</div>
                                <ul className="space-y-1 list-disc list-inside">
                                  <li>Make AI-generated audio traceable without hurting UX.</li>
                                  <li>Keep overhead &lt; 1% CPU on typical machines.</li>
                                  <li>Survive common transformations (volume, resample, trimming).</li>
                                </ul>
                              </div>
                            </div>
                          </section>

                          <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-cyan-900/40">
                            <h2 className="text-lg font-semibold text-cyan-300 mb-3">
                              4. RapidAPI &amp; Ocean / Blockchain Gateways
                            </h2>
                            <p className="text-xs md:text-sm text-slate-300 mb-3">
                              CYAN OS<span className="tm-symbol">™</span> Lite is also exposed as a standalone API product via RapidAPI and blockchain-based
                              marketplaces such as Ocean. This lets developers integrate the same infrastructure you see
                              in the desktop client directly into their own apps.
                            </p>
                            <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 text-[10px] md:text-xs font-mono text-slate-200 mb-3">
                              <div className="text-cyan-400 mb-1">RapidAPI (REST gateway)</div>
                              <pre className="whitespace-pre leading-relaxed">
{`POST https://cyan-os-lite.p.rapidapi.com/api/tts/speak-stream
Headers:
  X-RapidAPI-Key: YOUR_KEY
  Content-Type: application/json

Body:
  {
    "text": "Hello world",
    "language": "en-US",
    "voice_id": "default",
    "streaming": true
  }`}
                              </pre>
                            </div>
                            <div className="rounded-xl bg-slate-950/90 border border-slate-700/80 p-4 text-[10px] md:text-xs font-mono text-slate-200">
                              <div className="text-cyan-400 mb-1">Ocean / blockchain integration (concept)</div>
                              <pre className="whitespace-pre leading-relaxed">
{`Consumer dApp
  ↓  buys access token / data NFT
Ocean Gateway
  ↓  attaches usage token to request
CYAN OS<span className="tm-symbol">™</span> Lite
  ↓  validates token → routes to providers
  ↓  streams audio back to consumer`}
                              </pre>
                              <p className="mt-2 text-[10px] text-slate-400">
                                  This pattern allows usage-based pricing and on-chain revenue splits, while CYAN OS<span className="tm-symbol">™</span> Lite
                                  remains the high-performance execution layer.
                                </p>
                            </div>
                          </section>
                        </div>

                        <aside className="space-y-4">
                          <div className="rounded-2xl border border-cyan-500/50 bg-slate-900/80 p-4 shadow-xl shadow-cyan-900/50">
                            <h3 className="text-sm font-semibold text-cyan-300 mb-2">CYAN OS<span className="tm-symbol">™</span> Runtime Snapshot</h3>
                            <div className="text-[10px] md:text-xs font-mono text-slate-200 space-y-1">
                              <div>Latency: &lt;400ms p50 (target)</div>
                              <div>Languages: 36+ (STT + TTS)</div>
                              <div>Routing: Google, Azure, ElevenLabs, local ONNX</div>
                              <div>Caching: semantic + session glossary</div>
                              <div>Watermark: PCM-level, inaudible</div>
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
                            <h3 className="text-sm font-semibold text-slate-100 mb-2">When to use what</h3>
                            <ul className="text-[11px] text-slate-300 space-y-1.5">
                              <li>
                                <span className="font-semibold text-cyan-300">CYAN OS<span className="tm-symbol">™</span> Desktop:</span> quickest way to use
                                realtime translation in meetings.
                              </li>
                              <li>
                                <span className="font-semibold text-cyan-300">CYAN OS<span className="tm-symbol">™</span> Lite API:</span> when you need
                                backend-only integration with your own UI.
                              </li>
                              <li>
                                <span className="font-semibold text-cyan-300">RapidAPI / Ocean:</span> when you want
                                marketplace billing, keys, and usage dashboards managed externally.
                              </li>
                            </ul>
                          </div>
                          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                goToMainView();
                              }}
                              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-black hover:bg-cyan-500 transition-colors"
                            >
                              <ArrowRight className="w-3 h-3 rotate-180" />
                              <span>Back to main site</span>
                            </button>
                            <p className="text-[11px] text-slate-400">
                              All information on this page is a high-level overview. Implementation details may change as
                              providers and routing logic evolve.
                            </p>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </div>
));
