import { memo, FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';
import { PlanKey, PaymentMethod } from '../App';

interface Props {
  showPricingSection: boolean;
  showTeamContactForm: boolean;
  teamFormSubmitted: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
  startPlanCheckout: (plan: PlanKey, method?: PaymentMethod) => void;
  setShowTeamContactForm: (fn: (prev: boolean) => boolean) => void;
  setTeamFormSubmitted: (v: boolean) => void;
  handleTeamContactSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const PricingSection = memo(({
  showPricingSection,
  showTeamContactForm,
  teamFormSubmitted,
  setRef,
  trackEvent,
  startPlanCheckout,
  setShowTeamContactForm,
  setTeamFormSubmitted,
  handleTeamContactSubmit,
}: Props) => (
  <section
    id="pricing"
    ref={setRef('pricing')}
    className={`py-20 px-6 bg-gradient-to-b from-white/60 dark:from-gray-900/60 to-gray-50/60 dark:to-gray-800/60 backdrop-blur-sm transition-all duration-320 ${
      showPricingSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
    }`}
    style={{ display: showPricingSection ? 'block' : 'none' }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Pricing Plans</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
          Flexible pricing for individuals, teams, and visionary founders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-2xl"></div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">Free</h3>
          <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white relative z-10">$0</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Start with 20 minutes of Azure/Google WaveNet credits to experience ultra-low latency translation</div>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'free', button_name: 'get_started', price: 0 }); startPlanCheckout('free'); }}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative z-10"
          >
            Get Started
          </button>
          <ul className="mt-6 space-y-2">
            {['20 minutes free trial', '1 voice clone', 'Standard latency', 'Community support'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Basic Plan */}
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-2xl"></div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">Basic</h3>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Individual Use</div>
          <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white relative z-10">$29<span className="text-lg font-normal text-gray-500">/month</span></div>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'basic', button_name: 'get_started', price: 29 }); startPlanCheckout('basic', 'paypal'); }}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative z-10"
          >
            Get Started
          </button>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'basic', button_name: 'pay_with_crypto', price: 29 }); startPlanCheckout('basic', 'crypto'); }}
            className="w-full mt-2 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all relative z-10"
          >
            Pay with Crypto
          </button>
          <ul className="mt-6 space-y-2">
            {['30 Translation Hours Per Month', '1 Device', 'Real-Time Translation', 'Standard Voice (Powered by Google WaveNet)', 'Personal Calls'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Standard Plan */}
        <div className="group bg-gradient-to-br from-orange-500/20 to-orange-500/5 dark:from-orange-500/20 dark:to-orange-500/5 border-2 border-orange-500 rounded-2xl p-6 pt-8 relative hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-1 transition-all backdrop-blur-md overflow-visible">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-orange-500/25 z-20 whitespace-nowrap text-center">
            🔥 MOST POPULAR
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-2xl"></div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">Standard</h3>
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-6 relative z-10">Power Users</div>
          <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white relative z-10">$59<span className="text-lg font-normal text-gray-500">/month</span></div>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'standard', button_name: 'get_started', price: 59 }); startPlanCheckout('standard', 'paypal'); }}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-yellow-300 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 relative z-10"
          >
            Get Started
          </button>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'standard', button_name: 'pay_with_crypto', price: 59 }); startPlanCheckout('standard', 'crypto'); }}
            className="w-full mt-2 border border-orange-500/40 text-orange-700 dark:text-orange-300 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all relative z-10"
          >
            Pay with Crypto
          </button>
          <ul className="mt-6 space-y-2">
            {['50 hours/month', '2 Devices', 'Premium Neural Voice (Powered by Microsoft Azure)', 'Freelance Consultant Meetings', 'Investor Briefings'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
        {/* Pro Plan */}
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 pt-8 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 relative overflow-visible">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-cyan-500/25 z-20 whitespace-nowrap text-center">
            ⭐ RECOMMENDED
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-2xl"></div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">Pro</h3>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Small Business B2B</div>
          <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white relative z-10">$99<span className="text-lg font-normal text-gray-500">/month</span></div>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'pro', button_name: 'get_started', price: 99 }); startPlanCheckout('pro', 'paypal'); }}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative z-10"
          >
            Get Started
          </button>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'pro', button_name: 'pay_with_crypto', price: 99 }); startPlanCheckout('pro', 'crypto'); }}
            className="w-full mt-2 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all relative z-10"
          >
            Pay with Crypto
          </button>
          <ul className="mt-6 space-y-2">
            {['100 hours/month', '5 Devices', 'Hyper-Accurate NMT (Azure-Backed Translation Engine)', 'Custom Glossary', 'ElevenLabs Boost: 50k High-Fidelity Character Credits/Month', 'Small Global Sales Teams', 'Product Demos', 'HR Interviews'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Team Plan */}
        <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-2xl"></div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">Team</h3>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Corporate Use</div>
          <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white relative z-10">$299<span className="text-lg font-normal text-gray-500">/month</span></div>
          <button
            onClick={() => {
              trackEvent('pricing_click', { plan: 'team', button_name: 'contact_sales', price: 299 });
              setTeamFormSubmitted(false);
              setShowTeamContactForm((prev) => !prev);
            }}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative z-10"
          >
            Contact Sales
          </button>

          {showTeamContactForm && (
            <div className="mt-4 bg-white/90 dark:bg-gray-900/80 border border-cyan-200 dark:border-cyan-700/40 rounded-xl p-4 shadow-xl relative z-10">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                Leave your work email and company. Form will be sent directly to Brevo.
              </p>
              <form
                action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg=="
                method="POST"
                target="brevo-submit-frame"
                className="space-y-2"
                onSubmit={handleTeamContactSubmit}
              >
                <input type="text" name="YOUR_NAME" placeholder="Your Name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <input type="email" name="YOUR_EMAIL" placeholder="Work Email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                <input type="text" name="COMPANY" placeholder="Company" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                <input type="hidden" name="PLAN" value="Team Plan - $299/month" />
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">Submit to Brevo</button>
              </form>
              <iframe name="brevo-submit-frame" title="brevo-submit-frame" className="hidden" />
              {teamFormSubmitted && (
                <p className="mt-2 text-xs text-green-600 dark:text-green-400">Submitted successfully. We received your info.</p>
              )}
            </div>
          )}
          <ul className="mt-6 space-y-2">
            {['Unlimited Hours', 'Priority Support', 'Dedicated Account Manager', 'ElevenLabs Power Boost: 200k High-Fidelity Character Credits/Month', 'Team Reporting & Billing', 'Enterprise Board Meetings', 'Global Training Webinars', 'Multi-National Project Mgmt'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Executive Pro Annual Plan */}
        <div className="group bg-gradient-to-br from-purple-600/20 to-purple-600/5 dark:from-purple-600/20 dark:to-purple-600/5 border-2 border-purple-600 rounded-2xl p-6 pt-8 relative hover:shadow-2xl hover:shadow-purple-600/25 hover:-translate-y-1 transition-all backdrop-blur-md overflow-visible">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-purple-600/25 z-20 whitespace-nowrap text-center">
            ⭐ BEST VALUE
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-2xl"></div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">EXECUTIVE PRO ANNUAL</h3>
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-6 relative z-10">High-Value B2B</div>
          <div className="flex items-baseline gap-2 mb-1 relative z-10">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">$699</div>
            <div className="text-lg text-gray-500 line-through">$999</div>
            <div className="text-sm text-green-600 dark:text-green-400 font-bold">/year</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-2 rounded-lg mb-4 text-center shadow-lg shadow-green-500/25 relative z-10">
            💰 SAVE $300 - KICKSTARTER EXCLUSIVE
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Maximize Output: 200 Translation Hours Per Year</div>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'executive_pro_annual', button_name: 'claim_spot', price: 699 }); startPlanCheckout('executive_pro_annual', 'paypal'); }}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-yellow-300 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-600/50 relative z-10"
          >
            Claim Spot Now
          </button>
          <button
            onClick={() => { trackEvent('pricing_click', { plan: 'executive_pro_annual', button_name: 'pay_with_crypto', price: 699 }); startPlanCheckout('executive_pro_annual', 'crypto'); }}
            className="w-full mt-2 border border-purple-500/40 text-purple-700 dark:text-purple-300 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all relative z-10"
          >
            Pay with Crypto
          </button>
          <ul className="mt-6 space-y-2">
            {['Dedicated Real-Time Proxy Access (Lowest-Latency Performance Guarantee)', 'ElevenLabs UNLIMITED + Customized Voice Cloning Capability', 'Priority 24/7 Technical and Integration Support', 'Billed Annually: No Monthly Fees'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
));
