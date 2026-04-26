import { memo, useState, useEffect } from 'react';
import { Zap, Mic, Layers } from 'lucide-react';

interface Props {
  isVisible: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const SolutionSection = memo(({ isVisible, setRef }: Props) => {
  const [latency, setLatency] = useState(240);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(200 + Math.random() * 200));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="solution"
      ref={setRef('solution')}
      className={`py-24 px-6 relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-100/30 dark:bg-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 mb-6 border border-cyan-200 dark:border-cyan-800">
            The Solution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
            Engineered for Perfection
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We've solved the hardest problems in real-time translation so you can focus on the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {/* Feature 1: Ultra-Low Latency (Top Left - Large) */}
          <div className="md:col-span-2 md:row-span-1 group relative p-8 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10 h-full">
              <div className="flex-1">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Ultra-Low Latency</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-md">
                  Experience real-time conversations with latency in the 200–400ms range. Engineered for natural, fluid communication without the typical AI lag.
                </p>
              </div>

              {/* Latency Visualizer - Subtle Circle with Dynamic Value */}
              <div className="flex-shrink-0 w-full lg:w-auto flex items-center justify-center py-4 sm:py-0">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Subtle Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-cyan-500/10" />
                  {/* Slow Rotating Segment */}
                  <div className="absolute inset-0 rounded-full border-t-2 border-cyan-500/30 animate-spin" style={{ animationDuration: '8s' }} />

                  <div className="flex flex-col items-center">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 tabular-nums tracking-tighter">
                        {latency}
                      </span>
                      <span className="text-xs font-bold text-gray-400">ms</span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Ping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Human-Grade Voice (Right - Tall) */}
          <div className="md:col-span-1 md:row-span-2 group relative p-8 rounded-[2rem] bg-gradient-to-br from-gray-900 to-slate-800 text-white overflow-hidden shadow-2xl shadow-cyan-900/20 transition-transform duration-500 ">
            {/* Animated Background Mesh */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-[80px] group-hover:bg-cyan-600/30 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/20 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                <Mic className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Human-Grade Voice Output</h3>
              <p className="text-gray-400 leading-relaxed font-light mb-8">
                Our AI doesn't just translate words; it preserves emotion, tone, and personality. The result is a voice that sounds genuinely human, maintaining the speaker's intent and warmth in every conversation.
              </p>

              {/* Artistic Waveform Visual */}
              <div className="mt-auto flex flex-col gap-6">
                <div className="flex items-end justify-between gap-[2px] h-32 px-2">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const height = 20 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-gradient-to-t from-cyan-500 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          height: `${height}%`,
                          animation: `pulse ${1.5 + Math.random()}s ease-in-out infinite`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-cyan-500/50 uppercase">
                  <span>Natural Echo</span>
                  <span>Neural Sync</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 md:row-span-1 group relative p-8 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10 h-full">
              <div className="flex-1">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Seamless Platform Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-md">
                  Works effortlessly with Zoom, Teams, Meet, and all major communication platforms. One click to activate, zero setup required.
                </p>
              </div>

              {/* Platform Visuals */}
              <div className="flex-shrink-0 w-full lg:w-auto grid grid-cols-3 gap-3">
                {[
                  { name: 'Zoom', logo: 'https://www.vectorlogo.zone/logos/zoomus/zoomus-icon.svg' },
                  { name: 'Teams', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Microsoft_Teams.png' },
                  { name: 'Meet', logo: 'https://cloud.gmelius.com/public/logos/google/Google_Meet_Logo.svg' },
                  { name: 'Webex', logo: 'https://images.seeklogo.com/logo-png/37/2/cisco-webex-meeting-logo-png_seeklogo-372182.png' },
                  { name: 'Slack', logo: 'https://www.vectorlogo.zone/logos/slack/slack-icon.svg' },
                  { name: 'Discord', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-round-color-icon.png' }
                ].map((platform, i) => (
                  <div
                    key={platform.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center gap-2 shadow-sm group-hover:scale-105 transition-transform duration-300"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to initial if logo fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-lg text-[10px] font-bold text-gray-400';
                            fallback.innerText = platform.name[0];
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
