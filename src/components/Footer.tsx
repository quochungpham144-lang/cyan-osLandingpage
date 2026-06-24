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
                <span className="text-xl font-bold flex items-baseline">
                  CYAN OS<span className="tm-symbol">™</span>
                </span>
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
                <a
                  href="/features"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('features');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    openPricingSection();
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('docs');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#api"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowApiSection(true);
                    setTimeout(
                      () => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }),
                      100
                    );
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-white mb-5 text-base">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('about');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/video"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('video');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Demo Video
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setView('leadership');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Teams
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    // Logic for Blog
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    // Logic for Careers
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-white mb-5 text-base">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('privacy');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('terms');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/security"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('security');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Security Policy
                </a>
              </li>
              <li>
                <a
                  href="/service_billing"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('service_billing');
                  }}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Service &amp; Refund Policy
                </a>
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
            <a
              href="https://pub-2b9c36332bf24e9bb266cfdf0af3665d.r2.dev/CyanOS-Setup.exe"
              download
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-400/20 px-8 py-3 rounded-full font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex flex-col items-center gap-0.5 text-xs shadow-xl"
            >
              <span className="text-sm font-bold">Download CYAN OS<span className="tm-symbol">™</span></span>
              <span className="text-[10px] text-cyan-100/80 uppercase tracking-widest font-bold">Private Beta</span>
            </a>
          </div>
          <p className="text-center md:text-right text-gray-500 text-[10px] flex items-center justify-center md:justify-end">
            &copy; 2026 CYAN OS<span className="tm-symbol">™</span>, Inc. Ultra-Low Latency AI Translator. All rights reserved.
          </p>
        </div>
      </div>
      {/* Blinkit Style Faded Background Text */}
      <div className="absolute bottom-1 sm:-bottom-10 lg:-bottom-10 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.03] dark:text-white/[0.02] select-none pointer-events-none whitespace-nowrap tracking-tighter leading-none z-0 uppercase">
        CYANOS
      </div>
    </footer>
  );
});
