import { memo } from 'react';

interface Props {
  isDarkMode: boolean;
  goToMainView: () => void;
}

export const TermsView = memo(({ isDarkMode, goToMainView }: Props) => (
  <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN AI REAL-TIME TRANSLATOR</div>
              <div className="text-xs text-gray-400">Terms of Service</div>
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
              <div className="text-base md:text-lg font-semibold text-white">TERMS OF SERVICE: CYAN AI REAL-TIME TRANSLATOR</div>
              <div className="mt-1 text-xs text-gray-400">Version: 1.02 – Updated: January 28, 2026</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. ACCEPTANCE OF TERMS</div>
              <p className="mt-1 text-gray-300">
                By accessing and using the CYAN AI utility (hereinafter referred to as the &quot;Service&quot;), you
                agree to be bound by these Terms. If you are using the Service on behalf of an organization, you agree
                to these Terms on behalf of that organization.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">2. DESCRIPTION OF SERVICE</div>
              <p className="mt-1 text-gray-300">
                CYAN provides an ultra-low latency, real-time AI translation solution, utilizing third-party API
                infrastructures including ElevenLabs, Microsoft Azure, and Google Cloud AI through our decentralized
                proxy network.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">3. FAIR USE POLICY</div>
              <p className="mt-1 text-gray-300">
                To manage high API costs and maintain system stability:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Executive Pro Plan Limit ($699): Each account is granted 200 hours of audio processing per year.</li>
                <li>Technology Allocation: Customers receive priority access for up to 40 hours of ElevenLabs Premium technology (including voice cloning).</li>
                <li>Fallback Mechanism: Upon exceeding the 40-hour Premium limit, the system will automatically switch to High-Quality Standard models (Azure/Google) for the remaining duration to ensure uninterrupted service.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">4. PAYMENT TERMS (PAYPAL &amp; CRYPTOCURRENCY)</div>
              <p className="mt-1 text-gray-300">
                We offer two primary payment methods:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>PayPal/Credit Card: Payments are processed in compliance with PayPal&apos;s security regulations.</li>
                <li>
                  Cryptocurrency (Stablecoins - USDT/USDC): Transactions are processed via Blockchain networks (Solana,
                  Polygon, Ethereum). Users are responsible for network fees (Gas fees) and ensuring the correct wallet
                  address and network are used as required by the system.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">5. REFUND POLICY - CRITICAL NOTICE</div>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>PayPal/Credit Card: Refunds will only be considered within 24 hours of purchase, provided the total translation usage time does not exceed 30 minutes.</li>
                <li>
                  Cryptocurrency (Crypto/Stablecoin): Due to the irreversible nature of Blockchain transactions, all
                  Crypto payments are NON-REFUNDABLE under any circumstances. By choosing to pay via Crypto, you
                  acknowledge and accept this risk.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">6. VOICE COPYRIGHT &amp; CONTENT</div>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  Voice Cloning: Users represent and warrant that they hold legal ownership or have obtained written
                  consent from the voice owner before using the cloning feature. CYAN assumes no liability for
                  unauthorized impersonation.
                </li>
                <li>
                  Prohibitions: Using CYAN to create fraudulent content (Deepfakes), hate speech, or content that
                  violates current laws is strictly prohibited.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">7. DATA PRIVACY</div>
              <p className="mt-1 text-gray-300">
                We implement a Zero-Retention policy: Conversation content is neither stored nor recorded after the
                translation session concludes. Cloned voice data is encrypted and remains the sole property of the user.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">8. LIMITATION OF LIABILITY</div>
              <p className="mt-1 text-gray-300">
                CYAN does not guarantee 100% accuracy of translated content due to the inherent nature of AI technology.
                We shall not be held liable for any business losses arising from the use of the service.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">9. ACCOUNT REGISTRATION &amp; ELIGIBILITY</div>
              <p className="mt-1 text-gray-300">
                By creating an account, you represent that you are at least 18 years old, or are otherwise legally
                capable of entering into binding contracts in your jurisdiction, and that all registration information
                you provide is accurate and kept up to date.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Organizational Use: If you register on behalf of a company or entity, you confirm that you have authority to bind that entity to these Terms.</li>
                <li>Account Security: You are responsible for safeguarding your login credentials and for all activities that occur under your account.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">10. LICENSE GRANT &amp; OWNERSHIP</div>
              <p className="mt-1 text-gray-300">
                Subject to your compliance with these Terms, CYAN grants you a limited, non-exclusive, non-transferable,
                and revocable license to access and use the Service for lawful business or personal purposes.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Ownership: All rights, title, and interest in and to the Service, including software, models, and branding, remain with CYAN and its licensors.</li>
                <li>No Reverse Engineering: You may not reverse engineer, decompile, or attempt to extract source code or underlying models except where permitted by law.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">11. SERVICE AVAILABILITY &amp; MODIFICATIONS</div>
              <p className="mt-1 text-gray-300">
                CYAN aims to provide a stable, high-availability translation service but does not guarantee uninterrupted
                or error-free operation.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Changes: We may modify, suspend, or discontinue parts of the Service (including plans and features) with reasonable notice where practicable.</li>
                <li>Abuse &amp; Misuse: We reserve the right to suspend or terminate accounts involved in abuse, fraud, or violations of these Terms or applicable law.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">12. DISCLAIMERS &amp; LIMITATION OF LIABILITY</div>
              <p className="mt-1 text-gray-300">
                To the maximum extent permitted by law, the Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, whether express or implied.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Exclusions: CYAN disclaims any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
                <li>Liability Cap: To the extent permitted by law, CYAN&apos;s aggregate liability arising out of or relating to the Service will not exceed the amounts you have paid for the Service in the six (6) months preceding the event giving rise to the claim.</li>
                <li>Indirect Damages: CYAN is not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">13. GOVERNING LAW, DISPUTES &amp; CHANGES TO TERMS</div>
              <p className="mt-1 text-gray-300">
                These Terms are governed by the laws of the Socialist Republic of Vietnam, without regard to conflict of
                laws principles, while respecting any mandatory consumer protection rights that apply in your own country.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Dispute Resolution: Any dispute arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the competent courts in Vietnam, unless otherwise required by mandatory local law.</li>
                <li>Changes to Terms: We may update these Terms from time to time. Material changes will be communicated via the Service or by email where appropriate, and your continued use of the Service after such changes constitutes acceptance of the updated Terms.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
));
