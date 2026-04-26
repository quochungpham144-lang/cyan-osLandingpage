import { memo } from 'react';
import { Layers, Mic, Zap, Shield, Code } from 'lucide-react';

interface Props {
  isVisible: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const EngineSection = memo(({ isVisible, setRef }: Props) => (
  <section
    id="engine"
    ref={setRef('engine')}
    className={`py-20 px-6 bg-gradient-to-b from-white/50 via-cyan-50/35 to-white/45 dark:from-gray-900/60 dark:via-gray-900/60 dark:to-gray-900/55 backdrop-blur-sm transition-all duration-320 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Enterprise-Grade Infrastructure</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
          Scalable architecture designed for global deployment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="space-y-6">
            {[
              {
                icon: Layers,
                title: 'Multi-Provider TTS',
                desc: 'Intelligent routing across ElevenLabs, GoogleWavenet, and Azure for maximum reliability',
                pillClass: 'from-cyan-500/20 to-sky-500/20 border-cyan-400/50 text-cyan-700 dark:text-cyan-200 dark:border-cyan-300/40',
                cardBorderClass: 'border-cyan-300/70 dark:border-cyan-400/40'
              },
              {
                icon: Mic,
                title: 'Voice Cloning',
                desc: 'Create custom voice profiles from just 30 seconds of audio with 98% accuracy',
                pillClass: 'from-purple-500/20 to-fuchsia-500/20 border-purple-400/50 text-purple-700 dark:text-purple-200 dark:border-purple-300/40',
                cardBorderClass: 'border-purple-300/70 dark:border-purple-400/40'
              },
              {
                icon: Zap,
                title: 'Real-time Streaming',
                desc: "Stream audio as it's generated with chunked processing for zero perceived latency",
                pillClass: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/50 text-emerald-700 dark:text-emerald-200 dark:border-emerald-300/40',
                cardBorderClass: 'border-emerald-300/70 dark:border-emerald-400/40'
              },
              {
                icon: Shield,
                title: 'Chunked Processing',
                desc: 'Intelligent text segmentation for natural pauses and optimal voice quality',
                pillClass: 'from-indigo-500/20 to-blue-500/20 border-indigo-400/50 text-indigo-700 dark:text-indigo-200 dark:border-indigo-300/40',
                cardBorderClass: 'border-indigo-300/70 dark:border-indigo-400/40'
              }
            ].map((feature, idx) => (
              <div key={idx} className={`flex gap-4 items-start bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-md p-5 rounded-xl border ${feature.cardBorderClass} hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-glow/10 transition-all`}>
                <div className="w-12 h-12 bg-cyan-glow dark:bg-cyan-glow rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-gray-900 dark:text-gray-900" />
                </div>
                <div>
                  <h3 className={`inline-flex rounded-full px-3 py-1 text-xs md:text-sm font-bold mb-2 border bg-gradient-to-r ${feature.pillClass}`}>{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0D1117] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-500/10 min-h-[400px] lg:min-h-0">
          {/* Terminal Header */}
          <div className="bg-[#161B22] px-4 sm:px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs font-medium text-gray-400 font-mono flex items-center gap-2 truncate max-w-[120px] sm:max-w-none">
                <Code className="w-3.5 h-3.5 hidden sm:block" />
                pipeline_v4.ts
              </span>
            </div>
            <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[9px] sm:text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex-shrink-0">
              Live
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-8 font-mono text-xs sm:text-sm flex-grow flex flex-col gap-4 sm:gap-6 overflow-hidden">
            <div className="space-y-2 pb-2">
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">01</span>
                <span className="break-all sm:break-normal text-gray-300">
                  <span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">NeuralEngine</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-300">'@cyan/core'</span>;
                </span>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">02</span>
                <span className="text-gray-300"> </span>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">03</span>
                <span className="break-all sm:break-normal text-gray-300">
                  <span className="text-purple-400">export interface</span> <span className="text-yellow-200">PipelineConfig</span> {'{'}
                </span>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">04</span>
                <span className="break-all sm:break-normal text-gray-300 ml-4">
                  <span className="text-blue-300">latencyThreshold</span>: <span className="text-orange-300">number</span> = <span className="text-orange-300">200</span>;
                </span>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">05</span>
                <span className="break-all sm:break-normal text-gray-300 ml-4">
                  <span className="text-blue-300">dynamicRouting</span>: <span className="text-orange-300">boolean</span> = <span className="text-orange-300">true</span>;
                </span>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">06</span>
                <span className="break-all sm:break-normal text-gray-300 ml-4">
                  <span className="text-blue-300">providerStrategy</span>: <span className="text-green-300">'performance' | 'cost'</span>;
                </span>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <span className="text-gray-600 select-none w-4 flex-shrink-0">07</span>
                <span className="text-gray-300">{'}'}</span>
              </div>
            </div>

            {/* Simulated Log Output */}
            <div className="mt-2 sm:mt-4 p-3 sm:p-4 rounded-xl bg-black/40 border border-gray-800/50 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest flex-shrink-0">
                <span className="w-1.5 h-1.5 sm:w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Processing Feed
              </div>
              <div className="space-y-2 text-[10px] sm:text-[11px] overflow-y-auto pr-1 custom-scrollbar">
                <div className="flex gap-2 sm:gap-3">
                  <span className="text-cyan-600 flex-shrink-0">[INFO]</span>
                  <span className="text-gray-400 break-words">Initializing global_edge_node::tokyo-01</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="text-cyan-600 flex-shrink-0">[INFO]</span>
                  <span className="text-gray-400 break-words">ElevenLabs WebSocket established (24ms)</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="text-green-500 flex-shrink-0">[OKAY]</span>
                  <span className="text-gray-300 break-words">Buffer synchronized at 48kHz / 16-bit</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <span className="text-yellow-500 flex-shrink-0">[SYNC]</span>
                  <span className="text-gray-400 break-words">Processing chunk #724 — Latency: 218ms</span>
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <span className="text-cyan-600 flex-shrink-0">[DATA]</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="w-1 h-3 bg-cyan-500/40 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Footer / Status Bar */}
          <div className="bg-[#161B22] px-4 sm:px-6 py-3 border-t border-gray-800 flex items-center justify-between text-[9px] sm:text-[11px] font-medium font-mono text-gray-500">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500" />
                <span className="hidden xs:inline">Stable</span>
              </span>
              <span>CPU: 12%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">UTF-8</span>
              <span className="text-cyan-500">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));
