import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const ServiceBillingPolicyView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 pt-24 ${isDarkMode ? 'dark' : ''}`}>
    <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={goToMainView}>
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white flex items-baseline">
                CYAN OS<span className="tm-symbol">™</span>
              </span>
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">ULTRA-LOW LATENCY AI TRANSLATOR</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Home</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Solution</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Engine</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Platforms</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Developers</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">API</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">ROI</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Pricing</button>
            <button onClick={goToMainView} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Contact</button>
            <button
              onClick={goToMainView}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Back to site
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={goToMainView} className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
              Back to site
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div className="max-w-4xl mx-auto px-6 py-10">
      <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
        <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
          <div>
            <div className="text-base md:text-lg font-semibold text-white">CYAN OS<span className="tm-symbol">™</span>: COMPREHENSIVE SERVICE &amp; REFUND POLICY</div>
            <div className="mt-1 text-xs text-gray-400">
              Document Control Number: COMP-SRP-2026-V1.02 | Effective Date: May 1, 2026
            </div>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <div className="font-semibold text-white">1. SCOPE OF AGREEMENT AND SERVICE DELIVERY FRAMEWORK</div>
            <p className="mt-1 text-gray-300">
              CYAN OS<span className="tm-symbol">™</span>, Inc. (hereinafter referred to as the &quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;), a legally incorporated entity in the State of Delaware, United States, operates the real-time AI translation, streaming, and customized voice-cloning utility hosted at cyan-os.cc and associated subdomains (collectively, the &quot;Service&quot;). This Service &amp; Refund Policy governing your cloud software subscription stands as an inseparable addendum to our primary Terms of Service.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">1.1. Instant Fulfillment Mechanics</div>
            <p className="mt-1 text-gray-300">
              Upon successful execution and settlement verification of any transaction through our integrated billing interfaces (Stripe Checkout API, PayPal Express, or verified Blockchain network transactions), cloud infrastructure compute node allocation occurs instantaneously. The proprietary CYAN OS<span className="tm-symbol">™</span> pipeline assigns immediate computing bandwidth to your account token, activating the full operational envelope of the designated tier (e.g., Executive Pro Plan).
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">1.2. Third-Party API Infrastructural Dependencies</div>
            <p className="mt-1 text-gray-300">
              The core computational and synthesis delivery engine of CYAN OS<span className="tm-symbol">™</span> is integrated via decentralized secure proxy networks with external Artificial Intelligence frameworks, specifically ElevenLabs Inc., Microsoft Azure Cognitive Services, and Google Cloud AI Platform. You explicitly acknowledge that CYAN OS<span className="tm-symbol">™</span>, Inc. acts as an architectural service provider and orchestrator. Consequently, the Company cannot guarantee uninterrupted server-side responsiveness and declines all liability for service latency degradation, API timeouts, neural voice rendering failures, or global infrastructure outages initiated or suffered by these foundational third-party provider platforms.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">2. COMPUTATIONAL RESOURCE ALLOCATION AND FAIR USE COMPLIANCE</div>
            <p className="mt-1 text-gray-300">
              To maintain cluster load balancing and mitigate systemic API billing volatility, strict processing thresholds are enforced at the hardware container level:
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">2.1. Annual Compute Quotas</div>
            <p className="mt-1 text-gray-300">
              The Executive Pro Plan ($699.00 USD per annum) provides a strict hardware allocation limit of 200 cumulative hours of real-time audio translation processing per fiscal subscription cycle.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">2.2. Tiered Technology Routing</div>
            <p className="mt-1 text-gray-300">
              Out of the allocated annual quota, a micro-allocation of up to forty (40) hours is explicitly provisioned for high-fidelity ElevenLabs Premium synthesis pipelines (including localized customized voice cloning models).
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">2.3. Automated Failover Protocol</div>
            <p className="mt-1 text-gray-300">
              The exact moment an account exceeds the forty (40) hour Premium ElevenLabs computational threshold, the backend system triggers an automated infrastructure failover. For the remaining duration of the annual billing term, your real-time translation pipelines will be routed without disruption to High-Quality Standard neural models (powered by Microsoft Azure and Google Cloud AI infrastructure). This dynamic allocation ensures 100% service uptime while maintaining structural operational cost-efficiency.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">3. REFUND ELIGIBILITY IN RELATION TO INBOUND GATEWAYS</div>
            <p className="mt-1 text-gray-300">
              Refund protocols, accounting chargeback resolutions, and financial transaction reversals are strictly segregated based on the intrinsic technical characteristics of the ingestion payment gateway utilized during check-out:
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">3.1. Credit Card and Fiat Processing Gateways (Stripe &amp; PayPal)</div>
            <div className="mt-2 space-y-3">
              <div>
                <div className="text-white font-medium">3.1.1. The Strict 24-Hour Regulatory Window</div>
                <p className="mt-1 text-gray-300">
                  To initiate a valid consideration for a financial refund, a formal written request must be submitted directly to our global infrastructure support apparatus at contact@cyan-os.cc within exactly twenty-four (24) chronological hours of the initial timestamp recorded on the Stripe or PayPal ledger.
                </p>
              </div>
              <div>
                <div className="text-white font-medium">3.1.2. Computational Usage Threshold Condition</div>
                <p className="mt-1 text-gray-300">
                  A refund will only be approved if the user’s account metrics, as registered within our immutable server infrastructure logs, demonstrate a total cumulative audio translation and data rendering processing time of less than or equal to thirty (30) minutes. If the account log files indicate thirty-one (31) minutes or more of processing time during that 24-hour window, the software service is deemed fully consumed, and all refund eligibility is permanently waived.
                </p>
              </div>
              <div>
                <div className="text-white font-medium">3.1.3. Administrative Deduction Clause</div>
                <p className="mt-1 text-gray-300">
                  Approved refunds via Stripe or PayPal will be remitted exclusively to the original credit card, bank account, or electronic wallet from which the funds originated. All approved reversals are subject to a mandatory administrative deduction equivalent to the non-reimbursable payment processor transaction fees levied by Stripe and PayPal.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white">3.2. Decentralized Ledger Architecture Transactions (Cryptocurrency Stablecoins - USDT / USDC)</div>
            <div className="mt-2 space-y-3">
              <div>
                <div className="text-white font-medium">3.2.1. Absolute Immutability and Non-Refundability</div>
                <p className="mt-1 text-gray-300">
                  Due to the irreversible, trustless, and immutable state architecture of decentralized blockchain ledger networks—specifically the Solana, Polygon, and Ethereum Virtual Machine (EVM) protocols—all cryptocurrency stablecoin transactions processed to CYAN OS<span className="tm-symbol">™</span>, Inc. are 100% ABSOLUTELY NON-REFUNDABLE AND NON-REVERSIBLE UNDER ANY CIRCUMSTANCES.
                </p>
              </div>
              <div>
                <div className="text-white font-medium">3.2.2. Total Assumption of Network Risk</div>
                <p className="mt-1 text-gray-300">
                  By electing to bypass traditional credit card processing and utilize cryptographic assets for payment, the User explicitly represents, warrants, and agrees that they assume all risks associated with decentralized transfers. CYAN OS<span className="tm-symbol">™</span>, Inc. bears no legal or financial liability for incorrect wallet destination input, block confirmation delays, faulty network bridge routing, smart contract failures, or variable gas/network fee fluctuations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white">4. FRAUD PREVENTION, SYSTEM DISPUTES, AND CHARGEBACK MITIGATION</div>
            <div className="mt-2 space-y-3">
              <div>
                <div className="text-white font-medium">4.1. Server Audit Log Primacy</div>
                <p className="mt-1 text-gray-300">
                  In the event of a commercial payment dispute, account audit, or formal chargeback claim initiated through a credit-issuing banking institution via Stripe or PayPal, CYAN OS<span className="tm-symbol">™</span>, Inc. relies on its internal database infrastructure logs as the single source of truth. These encrypted tracking metrics record connection IPs, session duration, and precise compute unit consumption.
                </p>
              </div>
              <div>
                <div className="text-white font-medium">4.2. Anti-Fraud Enforcement</div>
                <p className="mt-1 text-gray-300">
                  Any user who initiates an unauthorized or fraudulent credit card chargeback through their bank for a service that has already been verified as consumed via our database logs will have their account immediately and permanently terminated. The Company reserves the right to report such activities to Stripe&apos;s radar fraud prevention network and relevant consumer reporting agencies.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white">5. LIFECYCLE MANAGEMENT AND CANCELLATION CONDITIONS</div>
            <p className="mt-1 text-gray-300">
              Subscribers retain full, unrestricted autonomy to deactivate their automated recurring subscription mechanisms at any moment. This cancellation process can be executed directly via the secure User Dashboard interface or through the self-service Stripe Customer Billing Portal.
            </p>
            <p className="mt-2 text-gray-300">
              Following a successful cancellation request, your account will remain active, allowing full deployment of remaining data processing quotas until the official expiration date of the current active billing cycle.
            </p>
            <p className="mt-2 text-gray-300">
              CYAN OS<span className="tm-symbol">™</span>, Inc. does not issue partial, pro-rated, or segmented refunds for unused portions, remaining compute quotas, or early termination of a running annual billing cycle.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">6. MANDATORY BILLING SUPPORT CONTACT NODE</div>
            <p className="mt-1 text-gray-300">
              All administrative billing inquiries, corporate invoicing requests, or valid processing dispute documentations must be routed exclusively through our official support node at: contact@cyan-os.cc. No alternative communication channel (including LinkedIn messaging, public GitHub tickets, or third-party launch board forums) shall be recognized as a valid locus for filing an official refund application.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
));
