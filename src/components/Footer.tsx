import { memo } from 'react';
import { Copy, ArrowRight } from 'lucide-react';
import { AppView } from '../App';

interface Props {
  setView: (view: AppView) => void;
  openPricingSection: () => void;
  setShowApiSection: (show: boolean) => void;
  copyToClipboard: (text: string) => Promise<boolean>;
}

export const Footer = memo(({ setView, openPricingSection, setShowApiSection, copyToClipboard }: Props) => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-24  px-6 relative overflow-hidden backdrop-blur-sm border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mb-20">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-bold">CYAN</span>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">ULTRA-LOW LATENCY AI TRANSLATOR</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Next-generation ultra-low latency AI translation for global communication. Built for speed and accuracy.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-white mb-5 text-base">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    openPricingSection();
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setShowApiSection(true);
                    setTimeout(
                      () => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }),
                      100
                    );
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  API Reference
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-white mb-5 text-base">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li>
                <div className="space-y-2 pt-2">
                  <span className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Contact</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-gray-400">contact@cyan-os.cc</span>
                    <button
                      type="button"
                      onClick={async () => { await copyToClipboard('contact@cyan-os.cc'); }}
                      className="p-1.5 rounded bg-gray-800 border border-gray-700 text-cyan-400 hover:bg-gray-700 transition-colors"
                      aria-label="Copy contact email"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
            <h4 className="font-bold text-white mb-5 text-base">Legal</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-3 text-sm text-gray-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Terms of Use
                </button>
              </li>
              <li className="col-span-2 md:col-span-1">
                <button
                  type="button"
                  onClick={() => {
                    setView('security');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Security
                </button>
              </li>
              <li className="col-span-2 md:col-span-1">
                <button
                  type="button"
                  onClick={() => {
                    setView('service_billing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Service &amp; Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800/50 pt-12 pb-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                openPricingSection();
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-cyan-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              className="w-full sm:w-auto bg-slate-800/80 backdrop-blur-md text-cyan-100 border border-cyan-400/20 px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-all duration-300 flex flex-col items-center gap-0.5 text-xs shadow-xl"
            >
              <span className="text-sm">Download CYAN</span>
              <span className="text-[10px] text-cyan-400/60 uppercase tracking-widest font-bold">Private Beta</span>
            </button>
          </div>
          <div className="text-center md:text-right text-sm text-gray-400">
            &copy; 2026 CYAN ULTRA-LOW LATENCY AI TRANSLATOR. All rights reserved.
          </div>
        </div>
      </div>
      {/* Blinkit Style Faded Background Text */}
      <div className="absolute bottom-1 sm:-bottom-10 lg:-bottom-10 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.03] dark:text-white/[0.02] select-none pointer-events-none whitespace-nowrap tracking-tighter leading-none z-0 uppercase">
        CYAN-OS
      </div>
    </footer>
  );
});
