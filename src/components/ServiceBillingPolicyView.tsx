import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const ServiceBillingPolicyView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
    <div className="max-w-4xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold text-cyan-300">CYAN OS SERVICE &amp; BILLING POLICY</div>
            <div className="text-xs text-gray-400">SLA + Refund &amp; Cancellation</div>
          </div>
        </div>
        <button
          type="button"
          onClick={goToMainView}
          className="text-xs font-medium text-gray-400 hover:text-gray-100"
        >
          Back to site
        </button>
      </header>

      <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
        <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
          <div>
            <div className="text-base md:text-lg font-semibold text-white">CYAN OS SERVICE &amp; BILLING POLICY</div>
            <div className="mt-1 text-xs text-gray-400">Version: 1.02 - Updated: January 28, 2026</div>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <div className="font-semibold text-white">1. SERVICE LEVEL AGREEMENT (SLA)</div>
            <p className="mt-1 text-gray-300">
              This Service Level Agreement defines CYAN OS operational performance commitments for paid plans,
              specifically Executive Pro and Enterprise users.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">1.1. Performance Metrics and Latency</div>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Target Latency: CYAN OS targets 200ms to 500ms processing latency for 95% of translation requests (P95).</li>
              <li>Orchestration Reliability: The platform uses intelligent routing to switch between providers (ElevenLabs, Azure, Google) in under 100ms if a provider degrades or fails.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">1.2. Uptime Commitment</div>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Monthly Service Availability: 99.5% uptime commitment.</li>
              <li>Scheduled Maintenance: Planned maintenance windows are announced at least 24 hours in advance via dashboard notice or email and are excluded from downtime calculations.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">1.3. Support Response Process</div>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Priority 1 (Critical): Complete service outage - first response within 4 business hours.</li>
              <li>Priority 2 (High): Single-feature failure or significant latency increase - first response within 12 business hours.</li>
              <li>Support Channels: Requests are processed only through the official ticketing system or dedicated Pro support email.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">1.4. SLA Exclusions</div>
            <p className="mt-1 text-gray-300">SLA commitments do not apply in the following cases:</p>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>User-side network issues or local ISP outages.</li>
              <li>User hardware incompatibility (for example microphone or sound card issues).</li>
              <li>Force majeure events, including natural disasters, international submarine cable disruptions, or broad cloud-provider incidents.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">2. REFUND AND CANCELLATION POLICY</div>
            <p className="mt-1 text-gray-300">
              This policy is designed to ensure fairness between users and the pre-committed AI infrastructure costs
              CYAN OS pays to technology partners.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white">2.1. Refund Principles by Payment Method</div>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Cryptocurrency (USDT/USDC): Due to blockchain settlement and network gas costs, all crypto payments are final and non-refundable. Users are strongly encouraged to use Trial or Lite plans before upgrading via crypto.</li>
              <li>Fiat Gateways (PayPal/Stripe): Refund requests are evaluated under strict technical criteria to prevent API abuse and resource exploitation.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">2.2. Refund Eligibility</div>
            <p className="mt-1 text-gray-300">A refund request is considered only if all conditions below are met:</p>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>The request is submitted to Support within 48 hours of successful payment.</li>
              <li>The account has not exceeded 15,000 translated characters or 30 minutes of live conversation usage.</li>
              <li>A confirmed CYAN OS-side technical fault exists and cannot be resolved within 24 hours, as validated by engineering.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">2.3. Dispute Resolution Process</div>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Step 1: User submits a refund ticket with supporting evidence (screenshots, logs, or error codes).</li>
              <li>Step 2: Operations reviews system logs to verify usage volume and failure context.</li>
              <li>Step 3: A decision is provided within 3 to 5 business days. If approved, the refund is processed net of third-party transaction fees (typically 3% to 5%).</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white">2.4. Cancellation and Termination</div>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Users may disable auto-renewal at any time through the dashboard.</li>
              <li>After cancellation, Pro features remain active until the final second of the current billing cycle.</li>
              <li>No prorated refund is issued for unused time remaining in a monthly or annual cycle.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
));
