import { memo, useState } from 'react';
import { Code, Layers, Shield, Zap } from 'lucide-react';

interface Props {
  isVisible: boolean;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const DevelopersSection = memo(({ isVisible, trackEvent, setRef }: Props) => {
  const [activeTab, setActiveTab] = useState('curl');

  const snippets = {
    curl: [
      { line: '01', content: <><span className="text-purple-400">curl</span> <span className="text-gray-400">--request</span> POST \</> },
      { line: '02', content: <><span className="text-gray-400 ml-4">--url</span> <span className="text-green-300">'https://api.cyan-os.com/v1/stream'</span> \</> },
      { line: '03', content: <><span className="text-gray-400 ml-4">--header</span> <span className="text-green-300">'Authorization: Bearer YOUR_KEY'</span> \</> },
      { line: '04', content: <><span className="text-gray-400 ml-4">--header</span> <span className="text-green-300">'Content-Type: application/json'</span> \</> },
      { line: '05', content: <><span className="text-gray-400 ml-4">--data</span> <span className="text-gray-300">'{'{'}</span></> },
      { line: '06', content: <><span className="text-blue-300 ml-8">"text"</span><span className="text-gray-300">:</span> <span className="text-green-300">"Accelerating global communication."</span><span className="text-gray-300">,</span></> },
      { line: '07', content: <><span className="text-blue-300 ml-8">"voice_id"</span><span className="text-gray-300">:</span> <span className="text-green-300">"ultra_low_latency_01"</span><span className="text-gray-300">,</span></> },
      { line: '08', content: <><span className="text-blue-300 ml-8">"stream"</span><span className="text-gray-300">:</span> <span className="text-orange-300">true</span></> },
      { line: '09', content: <><span className="text-gray-300 ml-4">{'}'}'</span></> }
    ],
    javascript: [
      { line: '01', content: <><span className="text-purple-400">const</span> <span className="text-blue-300">response</span> <span className="text-gray-300">=</span> <span className="text-purple-400">await</span> <span className="text-yellow-200">fetch</span>(<span className="text-green-300">'https://api.cyan-os.com/v1/stream'</span>, {'{'} </> },
      { line: '02', content: <><span className="text-blue-300 ml-4">method</span><span className="text-gray-300">:</span> <span className="text-green-300">'POST'</span>,</> },
      { line: '03', content: <><span className="text-blue-300 ml-4">headers</span><span className="text-gray-300">:</span> {'{'} </> },
      { line: '04', content: <><span className="text-green-300 ml-8">'Authorization'</span><span className="text-gray-300">:</span> <span className="text-green-300">'Bearer YOUR_KEY'</span>,</> },
      { line: '05', content: <><span className="text-green-300 ml-8">'Content-Type'</span><span className="text-gray-300">:</span> <span className="text-green-300">'application/json'</span></> },
      { line: '06', content: <><span className="text-gray-300 ml-4">{'}'}</span>,</> },
      { line: '07', content: <><span className="text-blue-300 ml-4">body</span><span className="text-gray-300">:</span> <span className="text-blue-300">JSON</span>.<span className="text-yellow-200">stringify</span>({'{'}</> },
      { line: '08', content: <><span className="text-blue-300 ml-8">text</span><span className="text-gray-300">:</span> <span className="text-green-300">"Accelerating global communication."</span>,</> },
      { line: '09', content: <><span className="text-blue-300 ml-8">voice_id</span><span className="text-gray-300">:</span> <span className="text-green-300">"ultra_low_latency_01"</span></> },
      { line: '10', content: <><span className="text-gray-300 ml-4">{'}'}</span>)</> },
      { line: '11', content: <><span className="text-gray-300">{'}'}</span>);</> }
    ],
    python: [
      { line: '01', content: <><span className="text-purple-400">import</span> <span className="text-gray-300">requests</span></> },
      { line: '02', content: <><span className="text-gray-300"> </span></> },
      { line: '03', content: <><span className="text-blue-300">url</span> <span className="text-gray-300">=</span> <span className="text-green-300">"https://api.cyan-os.com/v1/stream"</span></> },
      { line: '04', content: <><span className="text-blue-300">payload</span> <span className="text-gray-300">=</span> {'{'}</> },
      { line: '05', content: <><span className="text-green-300 ml-4">"text"</span><span className="text-gray-300">:</span> <span className="text-green-300">"Accelerating global communication."</span>,</> },
      { line: '06', content: <><span className="text-green-300 ml-4">"voice_id"</span><span className="text-gray-300">:</span> <span className="text-green-300">"ultra_low_latency_01"</span></> },
      { line: '07', content: <><span className="text-gray-300">{'}'}</span></> },
      { line: '08', content: <><span className="text-blue-300">headers</span> <span className="text-gray-300">=</span> {'{'}<span className="text-green-300">"Authorization"</span>: <span className="text-green-300">"Bearer YOUR_KEY"</span>{'}'}</> },
      { line: '09', content: <><span className="text-gray-300"> </span></> },
      { line: '10', content: <><span className="text-blue-300">response</span> <span className="text-gray-300">=</span> <span className="text-gray-300">requests</span>.<span className="text-yellow-200">post</span>(url, json=payload, headers=headers)</> }
    ]
  };

  return (
    <section
      id="developers"
      ref={setRef('developers')}
      className={`py-20 px-6 bg-gradient-to-b from-emerald-50/70 via-cyan-100/45 to-white/55 dark:from-gray-900/60 dark:via-gray-900/60 dark:to-gray-800/60 backdrop-blur-sm transition-all duration-320 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-600/10 dark:bg-cyan-600/20 border border-cyan-600/30 dark:border-cyan-600/40 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
            <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Developer API</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Built for Developers</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Simple, powerful API that scales from prototype to production
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://rapidapi.com/quochungpham144/api/cyan-os-lite"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', { button_name: 'rapidapi_cyan_os_lite', location: 'developer_api' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-900 text-sm hover:bg-cyan-100 dark:bg-slate-900 dark:text-cyan-100 dark:hover:bg-cyan-800 border border-cyan-500/80 shadow-sm transition-colors"
            >
              <img src="/tap-search-icon.svg" alt="Tap to view API" className="w-4 h-4" />
              <span>View API on RapidAPI</span>
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D1117] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-500/10">
            {/* Terminal Header */}
            <div className="bg-[#161B22] px-4 sm:px-6 h-12 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-4 sm:gap-8 h-full">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono font-medium h-full">
                  {['curl', 'javascript', 'python'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`h-full flex items-center transition-colors border-b-2 ${activeTab === tab ? 'text-cyan-400 border-cyan-400' : 'text-gray-500 hover:text-gray-300 border-transparent'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-gray-500 font-mono hidden xs:block">
                POST /v1/stream
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-8 font-mono text-xs sm:text-sm bg-[#0D1117] min-h-[320px]">
              <div className="space-y-1">
                {snippets[activeTab as keyof typeof snippets].map((row, i) => (
                  <div key={`${activeTab}-${i}`} className="flex gap-4 sm:gap-6 group">
                    <span className="text-gray-700 select-none w-4 flex-shrink-0 text-right">{row.line}</span>
                    <span className="text-gray-300 break-all sm:break-normal">{row.content}</span>
                  </div>
                ))}
              </div>

              {/* Response Section */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Response: 200 OK (242ms)
                </div>
                <div className="text-gray-400 text-[11px] leading-relaxed italic">
                  // Returns a chunked binary stream of high-fidelity neural audio...
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Avg Latency', value: '240ms', icon: Zap },
              { label: 'Reliability', value: '99.99%', icon: Shield },
              { label: 'Integrations', value: 'Any Platform', icon: Layers }
            ].map((stat, idx) => (
              <div key={idx} className="group p-5 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
