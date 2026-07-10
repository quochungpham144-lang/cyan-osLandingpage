import { memo, FormEvent, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PlanKey, PaymentMethod } from '../App';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  showTeamContactForm: boolean;
  teamFormSubmitted: boolean;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
  startPlanCheckout: (plan: PlanKey, method?: PaymentMethod) => void;
  setShowTeamContactForm: (fn: (prev: boolean) => boolean) => void;
  setTeamFormSubmitted: (v: boolean) => void;
  handleTeamContactSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const PricingPopUp = memo(({
  isOpen,
  onClose,
  showTeamContactForm,
  teamFormSubmitted,
  trackEvent,
  startPlanCheckout,
  setShowTeamContactForm,
  setTeamFormSubmitted,
  handleTeamContactSubmit,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const plans = [
    // 0: Free Plan
    (
      <div className="group bg-gray-900/80 backdrop-blur-md border-2 border-gray-700/50 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden h-full flex flex-col w-full max-w-md mx-auto">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-3xl"></div>
        <h3 className="text-xl font-bold mb-1 text-white relative z-10">Free</h3>
        <div className="text-3xl font-bold mb-1 text-white relative z-10">$0</div>
        <div className="text-gray-400 text-xs mb-4 relative z-10">Start with 20 minutes of Azure/Google WaveNet credits to experience ultra-low latency translation</div>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'free', button_name: 'get_started', price: 0 }); startPlanCheckout('free'); }}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-yellow-300 py-2.5 rounded-xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg relative z-10"
        >
          Get Started
        </button>
        <ul className="mt-4 space-y-1.5 flex-1">
          {['20 minutes free trial', '1 voice clone', 'Standard latency', 'Community support'].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    ),

    // 1: Basic Plan
    (
      <div className="group bg-gray-900/80 backdrop-blur-md border-2 border-gray-700/50 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden h-full flex flex-col w-full max-w-md mx-auto">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl"></div>
        <h3 className="text-xl font-bold mb-1 text-white relative z-10">Basic</h3>
        <div className="text-gray-400 text-xs mb-3 relative z-10">Individual Use</div>
        <div className="text-3xl font-bold mb-1 text-white relative z-10">$29<span className="text-base font-normal text-gray-500">/month</span></div>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'basic', button_name: 'get_started', price: 29 }); startPlanCheckout('basic', 'paypal'); }}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-yellow-300 py-2.5 rounded-xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg relative z-10"
        >
          Get Started
        </button>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'basic', button_name: 'pay_with_crypto', price: 29 }); startPlanCheckout('basic', 'crypto'); }}
          className="w-full mt-2 border border-cyan-500/40 text-cyan-300 py-2 rounded-xl text-xs font-semibold hover:bg-cyan-900/20 transition-all relative z-10"
        >
          Pay with Crypto
        </button>
        <ul className="mt-4 space-y-1.5 flex-1">
          {['30 Translation Hours Per Month', '1 Device', 'Real-Time Translation', 'Standard Voice (Powered by Google WaveNet)', 'Personal Calls'].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    ),

    // 2: Standard Plan
    (
      <div className="group bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-2 border-orange-500 rounded-2xl p-5 pt-7 relative transition-all backdrop-blur-md overflow-visible h-full flex flex-col w-full max-w-md mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-orange-500/25 z-20 whitespace-nowrap text-center">
          🔥 MOST POPULAR
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-3xl"></div>
        <h3 className="text-xl font-bold mb-1 text-white relative z-10">Standard</h3>
        <div className="text-gray-300 text-xs mb-3 relative z-10">Power Users</div>
        <div className="text-3xl font-bold mb-1 text-white relative z-10">$59<span className="text-base font-normal text-gray-500">/month</span></div>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'standard', button_name: 'get_started', price: 59 }); startPlanCheckout('standard', 'paypal'); }}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-yellow-300 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg relative z-10"
        >
          Get Started
        </button>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'standard', button_name: 'pay_with_crypto', price: 59 }); startPlanCheckout('standard', 'crypto'); }}
          className="w-full mt-2 border border-orange-500/40 text-orange-300 py-2 rounded-xl text-xs font-semibold hover:bg-orange-900/20 transition-all relative z-10"
        >
          Pay with Crypto
        </button>
        <ul className="mt-4 space-y-1.5 flex-1">
          {['50 hours/month', '2 Devices', 'Premium Neural Voice (Powered by Microsoft Azure)', 'Freelance Consultant Meetings', 'Investor Briefings'].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    ),

    // 3: Pro Plan
    (
      <div className="group bg-gray-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-2xl p-5 pt-7 transition-all duration-300 relative overflow-visible h-full flex flex-col w-full max-w-md mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-cyan-500/25 z-20 whitespace-nowrap text-center">
          ⭐ RECOMMENDED
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-3xl"></div>
        <h3 className="text-xl font-bold mb-1 text-white relative z-10">Pro</h3>
        <div className="text-gray-400 text-xs mb-3 relative z-10">Small Business B2B</div>
        <div className="text-3xl font-bold mb-1 text-white relative z-10">$99<span className="text-base font-normal text-gray-500">/month</span></div>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'pro', button_name: 'get_started', price: 99 }); startPlanCheckout('pro', 'paypal'); }}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-yellow-300 py-2.5 rounded-xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg relative z-10"
        >
          Get Started
        </button>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'pro', button_name: 'pay_with_crypto', price: 99 }); startPlanCheckout('pro', 'crypto'); }}
          className="w-full mt-2 border border-cyan-500/40 text-cyan-300 py-2 rounded-xl text-xs font-semibold hover:bg-cyan-900/20 transition-all relative z-10"
        >
          Pay with Crypto
        </button>
        <ul className="mt-4 space-y-1.5 flex-1">
          {['100 hours/month', '5 Devices', 'Hyper-Accurate NMT (Azure-Backed Translation Engine)', 'Custom Glossary', 'ElevenLabs Boost: 50k High-Fidelity Character Credits/Month', 'Small Global Sales Teams', 'Product Demos', 'HR Interviews'].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    ),

    // 4: Team Plan
    (
      <div className="group bg-gray-900/80 backdrop-blur-md border-2 border-gray-700/50 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden h-full flex flex-col w-full max-w-md mx-auto">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl"></div>
        <h3 className="text-xl font-bold mb-1 text-white relative z-10">Team</h3>
        <div className="text-gray-400 text-xs mb-3 relative z-10">Corporate Use</div>
        <div className="text-3xl font-bold mb-1 text-white relative z-10">$299<span className="text-base font-normal text-gray-500">/month</span></div>
        <button
          onClick={() => {
            trackEvent('pricing_click', { plan: 'team', button_name: 'contact_sales', price: 299 });
            setTeamFormSubmitted(false);
            setShowTeamContactForm((prev) => !prev);
          }}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-yellow-300 py-2.5 rounded-xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg relative z-10"
        >
          Contact Sales
        </button>

        {showTeamContactForm && (
          <div className="mt-2 bg-gray-900 border border-cyan-700/40 rounded-xl p-3 shadow-xl relative z-10">
            <p className="text-xs text-gray-300 mb-2">
              Leave your work email and company. Form will be sent directly to Brevo.
            </p>
            <form
              action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg=="
              method="POST"
              target="brevo-submit-frame"
              className="space-y-2"
              onSubmit={handleTeamContactSubmit}
            >
              <input type="text" name="YOUR_NAME" placeholder="Your Name" className="w-full px-3 py-1.5 border border-gray-600 rounded-lg text-xs bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <input type="email" name="YOUR_EMAIL" placeholder="Work Email" className="w-full px-3 py-1.5 border border-gray-600 rounded-lg text-xs bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
              <input type="text" name="COMPANY" placeholder="Company" className="w-full px-3 py-1.5 border border-gray-600 rounded-lg text-xs bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
              <input type="hidden" name="PLAN" value="Team Plan - $299/month" />
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors">Submit to Brevo</button>
            </form>
            <iframe name="brevo-submit-frame" title="brevo-submit-frame" className="hidden" />
            {teamFormSubmitted && (
              <p className="mt-2 text-xs text-green-400">Submitted successfully. We received your info.</p>
            )}
          </div>
        )}
        <ul className="mt-4 space-y-1.5 flex-1">
          {['Unlimited Hours', 'Priority Support', 'Dedicated Account Manager', 'ElevenLabs Power Boost: 200k High-Fidelity Character Credits/Month', 'Team Reporting & Billing', 'Enterprise Board Meetings', 'Global Training Webinars', 'Multi-National Project Mgmt'].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    ),

    // 5: Executive Pro Annual
    (
      <div className="group bg-gradient-to-br from-purple-600/10 to-purple-600/5 border-2 border-purple-600 rounded-2xl p-5 pt-7 relative transition-all backdrop-blur-md overflow-visible h-full flex flex-col w-full max-w-md mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-purple-600/25 z-20 whitespace-nowrap text-center">
          ⭐ BEST VALUE
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl"></div>
        <h3 className="text-xl font-bold mb-1 text-white relative z-10">EXECUTIVE PRO ANNUAL</h3>
        <div className="text-gray-300 text-xs mb-3 relative z-10">High-Value B2B</div>
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <div className="text-3xl font-bold text-white">$699</div>
          <div className="text-base text-gray-500 line-through">$999</div>
          <div className="text-sm text-green-400 font-bold">/year</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg mb-4 text-center shadow-lg shadow-green-500/25 relative z-10">
          💰 SAVE $300 - KICKSTARTER EXCLUSIVE
        </div>
        <div className="text-gray-400 text-xs mb-4 relative z-10">Maximize Output: 200 Translation Hours Per Year</div>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'executive_pro_annual', button_name: 'claim_spot', price: 699 }); startPlanCheckout('executive_pro_annual', 'paypal'); }}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-yellow-300 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg relative z-10"
        >
          Claim Spot Now
        </button>
        <button
          onClick={() => { trackEvent('pricing_click', { plan: 'executive_pro_annual', button_name: 'pay_with_crypto', price: 699 }); startPlanCheckout('executive_pro_annual', 'crypto'); }}
          className="w-full mt-2 border border-purple-500/40 text-purple-300 py-2 rounded-xl text-xs font-semibold hover:bg-purple-900/20 transition-all relative z-10"
        >
          Pay with Crypto
        </button>
        <ul className="mt-4 space-y-1.5 flex-1">
          {['Dedicated Real-Time Proxy Access', 'ElevenLabs UNLIMITED + Customized Voice Cloning Capability', 'Priority 24/7 Technical and Integration Support', 'Billed Annually: No Monthly Fees'].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 py-4">
        <div className="relative w-full max-w-7xl rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl flex flex-col my-auto">
          <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[1010] p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors border border-gray-800 hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 px-4 mt-6">
          <h2 className="text-2xl font-bold mb-1 text-white">Upgrade Your Plan</h2>
          <p className="text-gray-400 text-sm">Swipe or use arrows to compare options</p>
        </div>

        <div className="relative flex items-center justify-center px-12">
          {/* Nav Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 lg:-left-4 z-20 p-2 bg-gray-900 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 rounded-full transition-all border border-gray-800 hover:border-cyan-500/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-stretch">
            {plans[currentIndex]}
            {plans[(currentIndex + 1) % plans.length]}
            {plans[(currentIndex + 2) % plans.length]}
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-0 lg:-right-4 z-20 p-2 bg-gray-900 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 rounded-full transition-all border border-gray-800 hover:border-cyan-500/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6 mb-6">
          {plans.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === idx ? 'bg-cyan-400 scale-125' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        </div>
      </div>
    </div>,
    document.body
  );
});
