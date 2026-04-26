import { memo } from 'react';
import { XCircle, CheckCircle2, TrendingDown, DollarSign, Zap } from 'lucide-react';

interface Props {
  isVisible: boolean;
  showRoiSection: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const RoiSection = memo(({ isVisible, showRoiSection, setRef }: Props) => (
  <section
    id="roi"
    ref={setRef('roi')}
    className={`py-24 px-6 relative overflow-hidden transition-all duration-700 ease-out ${
      showRoiSection
        ? isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
        : 'opacity-0 translate-y-8 pointer-events-none'
    }`}
    style={{ display: showRoiSection ? 'block' : 'none' }}
  >
    {/* Background Decorative Elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full" />
    </div>

    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
          <DollarSign className="w-3 h-3" /> Cost Efficiency
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Unmatched ROI
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Switch to <span className="font-semibold text-cyan-600 dark:text-cyan-400">CYAN-OS</span> and eliminate 99% of your traditional translation overhead.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Traditional Method */}
        <div className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/5">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <div className="mb-8">
            <div className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Traditional Method
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Manual Recording</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Voice Actor (per hour)', value: '$100-300', note: 'Unreliable scheduling' },
              { label: 'Studio Time', value: '$50-150/hr', note: 'Fixed location' },
              { label: 'Post-Production', value: '$75-200/hr', note: 'Manual editing' },
              { label: 'Timeline', value: '6-8 weeks', note: 'Slow iteration' },
            ].map(({ label, value, note }) => (
              <div key={label} className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{value}</span>
                </div>
                <span className="text-[10px] text-red-400/80 font-medium uppercase tracking-tighter">{note}</span>
              </div>
            ))}
            
            <div className="bg-red-50/50 dark:bg-red-950/20 rounded-2xl p-6 mt-6 border border-red-100 dark:border-red-900/30">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase mb-1">Estimated Cost</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">(per 10 hours of content)</div>
                </div>
                <div className="text-4xl font-black text-red-600 dark:text-red-500">$2,250+</div>
              </div>
            </div>
          </div>
        </div>

        {/* CYAN-OS Method */}
        <div className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-xl border-2 border-cyan-500/50 dark:border-cyan-400/40 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-[50px] rounded-full group-hover:bg-cyan-500/20 transition-all" />
          
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg shadow-cyan-500/40 animate-bounce">
              Save 99.8%
            </div>
          </div>

          <div className="mb-8">
            <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> CYAN-OS API
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Automated Pipeline</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Cost per 1k characters', value: '$0.10', note: 'Infinite scalability' },
              { label: 'Setup Time', value: '5 minutes', note: 'Instant integration' },
              { label: 'Processing Time', value: 'Real-time', note: 'Ultra-low latency' },
              { label: 'Timeline', value: 'Instant', note: 'Zero wait time' },
            ].map(({ label, value, note }) => (
              <div key={label} className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{value}</span>
                  </div>
                </div>
                <span className="text-[10px] text-cyan-500/80 font-bold uppercase tracking-tighter">{note}</span>
              </div>
            ))}
            
            <div className="bg-cyan-500 dark:bg-cyan-500 rounded-2xl p-6 mt-6 shadow-xl shadow-cyan-500/30">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs font-bold text-cyan-100 uppercase mb-1">Optimized Cost</div>
                  <div className="text-sm text-cyan-100/70">(per 10 hours of content)</div>
                </div>
                <div className="text-4xl font-black text-white">$2.50</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-white/80 dark:bg-gray-900/60 border border-cyan-200 dark:border-cyan-500/30 rounded-3xl p-10 md:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingDown className="w-32 h-32 text-cyan-500" />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-bold">
                <Zap className="w-4 h-4" /> Massive Annual Savings
              </div>
              <div className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
                $2,247.50
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                Saved <span className="text-cyan-600 dark:text-cyan-400 font-bold">per 10 hours</span> of content production
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 w-full flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">900x</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Cheaper</div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 hidden md:block" />
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">Instant</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Delivery</div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 hidden md:block" />
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

