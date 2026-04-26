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
              <div className="text-sm font-semibold text-cyan-300">CYAN AI TRANSLATOR</div>
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
              <div className="text-base md:text-lg font-semibold text-white">PRIVACY POLICY: CYAN AI TRANSLATOR</div>
              <div className="mt-1 text-xs text-gray-400">Effective Date: January 28, 2026</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. ZERO-RETENTION POLICY</div>
              <p className="mt-1 text-gray-300">
                Given the real-time nature of CYAN&apos;s translation services, we adhere to the highest security standards:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Audio Data: We do not record, store, or monitor any of your audio data.</li>
                <li>Streaming Mechanism: Audio is streamed to partner APIs (ElevenLabs/Azure) and is immediately deleted after conversion into translated text/voice.</li>
                <li>Text Data: Translated text content exists only temporarily in volatile memory (RAM) for display purposes and is cleared once the session ends.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">2. VOICE CLONING DATA</div>
              <p className="mt-1 text-gray-300">
                For customers utilizing the Customized Voice Cloning feature:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Sample Data: Audio files uploaded for voice training are encrypted using military-grade standards (AES-256).</li>
                <li>User Control: You maintain full authority to delete your Voice Clone at any time via the Dashboard.</li>
                <li>Permanent Deletion: Upon deletion, all associated data is permanently removed from our servers and partner APIs.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">3. THIRD-PARTY DATA PROVIDERS</div>
              <p className="mt-1 text-gray-300">
                To deliver high-quality services, CYAN integrates with leading AI infrastructures. By using CYAN, you also agree to the privacy policies of these partners:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>ElevenLabs: For high-quality speech synthesis processing.</li>
                <li>Microsoft Azure &amp; Google Cloud: For Speech-to-Text (STT) and Neural Machine Translation (NMT) processing.</li>
                <li>Anonymization: We ensure that only anonymized data (excluding personal information such as names or emails) is transmitted to these APIs.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">4. PAYMENT SECURITY</div>
              <p className="mt-1 text-gray-300">
                We utilize PayPal for payment processing. CYAN never accesses or stores your credit card numbers, CVV codes, or bank account information. All transactions are conducted directly on PayPal&apos;s secure infrastructure.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">5. USER RIGHTS (GDPR &amp; CCPA COMPLIANCE)</div>
              <p className="mt-1 text-gray-300">
                Regardless of your location, CYAN is committed to complying with international security standards:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Right to be Forgotten: You may request the deletion of your entire account and associated data at any time.</li>
                <li>Right of Access: You may request an export of your payment history and account configuration data.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">6. CATEGORIES OF DATA WE PROCESS</div>
              <p className="mt-1 text-gray-300">
                In addition to audio and translated text, CYAN may process limited categories of personal data necessary to operate the Service:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Account Information: Email address, name, and authentication identifiers used to create and manage your account.</li>
                <li>Billing &amp; Transaction Data: Subscription plan information, invoices, and payment status (processed via PayPal or crypto providers).</li>
                <li>Technical &amp; Usage Data: Device information, IP address, timestamps, and basic analytics used to secure and improve the Service.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">7. LEGAL BASES FOR PROCESSING</div>
              <p className="mt-1 text-gray-300">
                Where applicable privacy laws such as GDPR or CCPA apply, CYAN relies on the following legal bases:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Performance of a Contract: To provide and maintain the translation and voice cloning services you have requested.</li>
                <li>Legitimate Interests: To secure the platform, prevent abuse, and improve product performance, balanced against your privacy rights.</li>
                <li>Consent: For specific optional features or marketing communications where we explicitly request your consent.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">8. COOKIES, ANALYTICS &amp; THIRD-PARTY SERVICES</div>
              <p className="mt-1 text-gray-300">
                Our web properties may use cookies, local storage, and similar technologies to remember your preferences,
                secure access to the Service, and measure product performance.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Authentication &amp; Sessions: We may use cookies and browser storage to keep you signed in, manage session security, and support OAuth-based login flows (including sign-in with Google).</li>
                <li>Analytics: We may use analytics providers (such as Google Analytics) to collect aggregated, pseudonymous usage statistics about how users from different regions interact with the Service.</li>
                <li>Cookie Control: You can control or disable cookies through your browser settings; however, some core features (such as login and personalization) may not function correctly without them.</li>
                <li>Service Providers: Hosting, logging, monitoring, and authentication providers may process limited technical data solely on our behalf and under contractual data protection terms.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">9. DATA RETENTION, INTERNATIONAL TRANSFERS &amp; CONTACT</div>
              <p className="mt-1 text-gray-300">
                Non-audio account and billing information is retained only for as long as necessary to provide the Service, comply with legal obligations, and resolve disputes.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>International Transfers: Where data is transferred across borders, we rely on appropriate safeguards such as contractual clauses or equivalent mechanisms.</li>
                <li>Policy Updates: We may update this Privacy Policy from time to time; material changes will be communicated through the Service or by email where appropriate.</li>
                <li>Contact: For privacy-related questions or requests, you may contact our team via the support channel provided on the CYAN website.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">10. REGION-SPECIFIC RIGHTS (EU/US/OTHER)</div>
              <p className="mt-1 text-gray-300">
                CYAN is based in Vietnam and offers services globally in multiple languages. Depending on where you live,
                additional data protection rights may apply on top of this Policy:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>EU/EEA &amp; UK: Where GDPR or equivalent laws apply, you may have rights to access, rectify, erase, restrict, or object to certain processing, as well as data portability and the right to lodge a complaint with your local supervisory authority.</li>
                <li>US Residents: In certain US states, you may have rights to access, delete, or opt out of specific types of data processing, subject to applicable state privacy laws.</li>
                <li>Other Regions: We will honor any mandatory data protection rights granted to you under the laws of your country or region, in addition to the commitments stated in this Policy.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
));
