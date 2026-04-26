import { memo, useState, useRef, useCallback } from 'react';
import { Clock, Globe, TrendingDown } from 'lucide-react';
import { AppView } from '../App';

interface Props {
  setView: (v: AppView) => void;
  openPricingSection: () => void;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const HeroSection = memo(({ setView, openPricingSection, trackEvent, setRef }: Props) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <section
      id="hero"
      ref={(el) => {
        setRef('hero')(el);
        sectionRef.current = el;
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="sm:pt-28 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden group"
    >
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base Grid - very subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

        {/* Hover Highlight Glow */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`,
          }}
        />

        {/* Hover Grid Highlight */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          }}
        />
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Featured In Section */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div
            className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400"
          >
            Featured In
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 opacity-80 hover:opacity-100 transition-opacity">
            <a
              href="https://www.producthunt.com/products/cyan-ultra-low-latency-ai-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1136748&theme=light"
                alt="Product Hunt"
                loading="eager"
                decoding="async"
                className="h-7 sm:h-8 w-auto"
              />
            </a>
            <a
              href="https://www.nxgntools.com/tools/cyan-ultra-low-latency-ai-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <img
                src="https://www.nxgntools.com/api/embed/cyan-ultra-low-latency-ai-translator?type=FIND_US_ON&hideUpvotes=true"
                alt="NextGen Tools"
                loading="eager"
                decoding="async"
                className="h-7 sm:h-8 w-auto"
              />
            </a>
            <a
              href="https://devhub.best/projects/cyan-ultra-low-latency-ai-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <img
                src="/devhub-top1-dark.svg"
                alt="DevHub"
                loading="eager"
                decoding="async"
                className="h-7 sm:h-8 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-2">
          <div className="inline-flex items-center mb-8 px-4 py-2 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 rounded-full text-sm font-medium text-cyan-700 dark:text-cyan-300 backdrop-blur-sm shadow-sm">
            <img src="/logoCYAN.png" alt="CYAN Logo" className="w-4 h-4 mr-2.5 rounded-sm" />
            Powered by CYAN OS
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-[1.2] text-gray-900 dark:text-white">
            <span className="relative inline-block px-4 py-2 sm:px-6 sm:py-3 mb-2">
              {/* Speed Background - Aceternity Style */}
              <span className="absolute inset-0  backdrop-blur-[2px]" />

              {/* Moving Speed Streaks */}
              <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <span className="absolute top-1/4 -left-full w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-speed-streak" />
                <span className="absolute top-2/4 -left-full w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent animate-speed-streak [animation-delay:1.5s]" />
                <span className="absolute top-3/4 -left-full w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent animate-speed-streak [animation-delay:0.8s]" />
              </span>

              {/* Text with separate gradient */}
              <span className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                ULTRA-LOW LATENCY
              </span>
            </span>
            <br />
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              AI TRANSLATOR
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-cyan-600 dark:text-cyan-400 tracking-tight">
            FOR GLOBAL COMMUNICATION
          </h2>

          <p className="text-lg sm:text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Break language barriers in real-time meetings with impeccable clarity and natural voice.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center px-4 max-w-4xl mx-auto">
            <button
              onClick={() => {
                trackEvent('cta_click', { button_name: 'experience_natural_voice', location: 'hero_section', destination: 'video_demo' });
                setView('video');
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:from-emerald-600 hover:to-teal-700 transition-all hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/25"
            >
              Experience Natural Voice
            </button>

            <button
              onClick={() => {
                trackEvent('cta_click', { button_name: 'hero_get_started', location: 'hero_section' });
                openPricingSection();
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:from-cyan-700 hover:to-blue-700 transition-all hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/25"
            >
              Get Started Free
            </button>

            <button
              onClick={() => {
                trackEvent('cta_click', { button_name: 'learn_more', location: 'hero_section', destination: 'about_view' });
                setView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1 backdrop-blur-sm shadow-sm"
            >
              Learn More
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 max-w-5xl mx-auto px-4">
            {[
              { icon: Clock, label: '<400ms', desc: 'Translation Latency', color: 'text-amber-500 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/30' },
              { icon: Globe, label: '+36', desc: 'Languages Supported', color: 'text-cyan-500 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' },
              { icon: TrendingDown, label: 'Up to 80%', desc: 'Cost Reduction', color: 'text-emerald-500 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' }
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl border ${stat.border} rounded-3xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 md:mb-6 bg-gray-50 dark:bg-gray-800 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight">{stat.label}</div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

