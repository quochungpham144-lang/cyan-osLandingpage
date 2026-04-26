import { memo } from 'react';
import { Code, Mic, Zap, Clock, Layers, Shield } from 'lucide-react';

interface Props {
  showApiSection: boolean;
  setShowApiSection: (v: boolean) => void;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const ApiSection = memo(({ showApiSection, setShowApiSection, setRef }: Props) => (
  <section
    id="api"
    ref={setRef('api')}
    className={`py-20 px-6 bg-gradient-to-b from-white/50 via-cyan-50/35 to-white/45 dark:from-gray-900/60 dark:via-gray-900/60 dark:to-gray-900/55 backdrop-blur-sm transition-all duration-500 ${
      showApiSection ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
    }`}
    style={{ display: showApiSection ? 'block' : 'none' }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 bg-cyan-600/10 dark:bg-cyan-600/20 border border-cyan-600/30 dark:border-cyan-600/40 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
          <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">CYAN OS Lite API</span>
        </div>
        <button
          onClick={() => setShowApiSection(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">CYAN OS Lite API Overview</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
          Powerful Text-to-Speech API with Voice Cloning and Real-time Streaming
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Core Features */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">🎯 Core Features</h3>
          <div className="space-y-4">
            {[
              { icon: Mic, title: 'Multi-provider Text-to-Speech', desc: 'Azure, ElevenLabs, Google' },
              { icon: Zap, title: 'Voice Cloning from Audio Sample', desc: 'Create custom voice from 30s audio' },
              { icon: Clock, title: 'Real-time Streaming', desc: 'Fast playback with <400ms latency' },
              { icon: Layers, title: 'Chunked Processing', desc: 'Intelligent text segmentation for natural pauses and optimal voice quality' }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-gray-50 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 bg-cyan-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">🚀 API Endpoints</h3>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 font-mono text-sm">
            <div className="space-y-3">
              {[
                { method: 'POST', path: '/api/tts/speak', desc: '- Basic TTS' },
                { method: 'POST', path: '/api/tts/clone-and-speak', desc: '- Clone voice + speak' },
                { method: 'POST', path: '/api/tts/clone-and-stream', desc: '- Clone voice + stream' },
                { method: 'POST', path: '/api/tts/speak-chunked', desc: '- Fast chunked TTS' },
              ].map(({ method, path, desc }) => (
                <div key={path} className="flex items-center gap-2">
                  <span className="text-pink-400">{method}</span>
                  <span className="text-cyan-400">{path}</span>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">💰 Pricing Plans</h4>
            <div className="space-y-2">
              <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="font-bold text-gray-900 dark:text-gray-100">BASIC:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">$0.00010/request (TTS only)</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="font-bold text-gray-900 dark:text-gray-100">PRO:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">$79/month (all features, 500K requests)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Benefits */}
      <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-2 border-cyan-600/30 dark:border-cyan-400/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-cyan-600/10">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-cyan-600 dark:text-cyan-400">🎯 Features & User Benefits</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: 'For Developers',
              items: ['5 min integration vs 2 weeks self-build', 'Cost $0.0001/call vs $0.01/call', 'REST API with standard headers']
            },
            {
              icon: Shield,
              title: 'For Business',
              items: ['Brand consistency across platforms', '24/7 availability without staff', 'Save 80% voice actor costs']
            },
            {
              icon: Mic,
              title: 'For Content Creators',
              items: ['10x content production speed', 'Multi-language market expansion', 'Reduce 90% audio production time']
            }
          ].map(({ icon: Icon, title, items }) => (
            <div key={title} className="text-center">
              <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {items.map(item => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="mt-12 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 dark:from-cyan-600/20 dark:to-purple-600/20 rounded-2xl p-8 border border-cyan-600/30 dark:border-cyan-400/30">
          <h4 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">📊 ROI Calculator</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { value: '$100/hour', label: 'Manual recording' },
              { value: '$0.10/1000 chars', label: 'CYAN OS API', highlight: true },
              { value: 'Up to 80%', label: 'Potential cost reduction', green: true },
            ].map(({ value, label, highlight, green }) => (
              <div key={label}>
                <div className={`text-2xl font-bold mb-1 ${highlight ? 'text-cyan-600 dark:text-cyan-400' : green ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}`}>{value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
));
