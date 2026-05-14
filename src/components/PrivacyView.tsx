import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const PrivacyView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> TRANSLATOR</div>
              <div className="text-xs text-gray-400">Ultra-low latency AI translation</div>
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
              <div className="text-base md:text-lg font-semibold text-white">PRIVACY POLICY: CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> TRANSLATOR</div>
              <div className="mt-1 text-xs text-gray-400">Effective Date: January 28, 2026</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. ZERO-RETENTION POLICY</div>
              <p className="mt-1 text-gray-300">
                Given the real-time nature of CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span>&apos;s translation services, we adhere to the highest security standards:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Immediate Deletion: Audio data and translated text are processed in volatile memory (RAM) and are not stored on our servers after the session ends.</li>
                <li>No Training on User Data: We do not use your private conversations to train or improve our AI models.</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white">2. DATA MINIMIZATION</div>
              <p className="mt-1 text-gray-300">
                We only collect the minimum information necessary to provide the service, such as temporary session
                tokens and basic account information (if you create an account).
              </p>
            </div>

            <div>
              <div className="font-semibold text-white">3. THIRD-PARTY DATA PROVIDERS</div>
              <p className="mt-1 text-gray-300">
                To deliver high-quality services, CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> integrates with leading AI infrastructures. By using CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span>, you also agree to the privacy policies of these partners:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>ElevenLabs (Voice Synthesis)</li>
                <li>Microsoft Azure (STT &amp; Translation)</li>
                <li>Google Cloud (STT &amp; Translation)</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white">4. PAYMENT SECURITY</div>
              <p className="mt-1 text-gray-300">
                We utilize PayPal for payment processing. CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> never accesses or stores your credit card numbers, CVV codes, or bank account information. All transactions are conducted directly on PayPal&apos;s secure infrastructure.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white">5. USER RIGHTS (GDPR &amp; CCPA COMPLIANCE)</div>
              <p className="mt-1 text-gray-300">
                Regardless of your location, CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> is committed to complying with international security standards:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Right to Access: You can request a copy of the limited data we hold about your account.</li>
                <li>Right to Erasure: You can request the permanent deletion of your account and associated metadata at any time.</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white">6. CATEGORIES OF DATA WE PROCESS</div>
              <p className="mt-1 text-gray-300">
                In addition to audio and translated text, CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> may process limited categories of personal data necessary to operate the Service:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Account Identifiers: Email address and encrypted passwords for registered users.</li>
                <li>Technical Logs: IP addresses and device identifiers used strictly for fraud prevention and security monitoring.</li>
                <li>Usage Metrics: Aggregated, non-identifiable data on session duration and language pairs used to optimize server resources.</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white">7. LEGAL BASES FOR PROCESSING</div>
              <p className="mt-1 text-gray-300">
                Where applicable privacy laws such as GDPR or CCPA apply, CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> relies on the following legal bases:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Contractual Necessity: To provide the translation services you have requested.</li>
                <li>Legitimate Interests: For security, fraud prevention, and platform stability.</li>
                <li>Consent: Where you have given explicit consent for specific features like customized voice cloning.</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white">8. DATA TRANSFERS</div>
              <p className="mt-1 text-gray-300">
                Your data may be processed in various regions depending on the proximity of AI infrastructure nodes
                (e.g., US, EU, or Asia). We ensure that all third-party providers comply with standard contractual
                clauses for data protection.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white">9. SECURITY MEASURES</div>
              <p className="mt-1 text-gray-300">
                We implement industry-standard encryption (AES-256) for data in transit. Our decentralized proxy
                network is monitored 24/7 to prevent unauthorized access.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white">10. REGION-SPECIFIC RIGHTS (EU/US/OTHER)</div>
              <p className="mt-1 text-gray-300">
                CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> is based in Vietnam and offers services globally in multiple languages. Depending on where you live,
                additional data protection rights may apply on top of this Policy:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>California (CCPA): You have the right to opt-out of the &quot;sale&quot; of personal information (Note: CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> does not sell your data).</li>
                <li>European Union (GDPR): You have the right to lodge a complaint with a supervisory authority if you believe your data is being mishandled.</li>
                <li>Contact: For privacy-related questions or requests, you may contact our team via the support channel provided on the CYAN<sup className="text-[0.6em] ml-0.5">OS</sup><span className="tm-symbol">™</span> website.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
));
