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
              <div className="text-sm font-semibold text-cyan-300">CYAN OS REAL-TIME TRANSLATOR</div>
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
              <div className="text-base md:text-lg font-semibold text-white">TERMS OF SERVICE: CYAN OS REAL-TIME TRANSLATOR</div>
              <div className="mt-1 text-xs text-gray-400">Version: 1.02 – Updated: January 28, 2026</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. ACCEPTANCE OF TERMS</div>
              <p className="mt-1 text-gray-300">
                By accessing and using the CYAN OS utility (hereinafter referred to as the &quot;Service&quot;), you
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
                <li>
                  4.1. Taxes and Fees: You are responsible for all applicable sales, use, value-added, or other taxes
                  and duties imposed by any governmental authority on your purchase. All payments are exclusive of such
                  taxes.
                </li>
                <li>
                  4.2. Anti-Money Laundering (AML) Compliance: By using Cryptocurrency for payment, you represent and
                  warrant that (i) the funds used are not derived from any illegal activity; and (ii) you are not
                  located in a country that is subject to a U.S. Government embargo, or designated by the U.S.
                  Government as a "terrorist supporting" country; and (iii) you are not listed on any U.S. Government
                  list of prohibited or restricted parties (e.g., OFAC).
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
                <li>
                  11.1. Modification of Fees: CYAN OS reserves the right to change our subscription plans or adjust
                  pricing for our service or any components thereof in any manner and at any time as we may determine
                  in our sole and absolute discretion. Any price changes will take effect following notice to you via
                  email or through the Service.
                </li>
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
                <li>
                  12.1. Third-Party Dependency Disclaimer: The Service relies on third-party Application Programming
                  Interfaces (APIs) including, but not limited to, ElevenLabs, Microsoft Azure, and Google Cloud. CYAN
                  OS shall not be held liable for any service interruptions, data inaccuracies, or policy changes
                  initiated by these third-party providers. You acknowledge that our Service availability is contingent
                  upon the operational status of these external infrastructures.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">13. GOVERNING LAW AND JURISDICTION</div>
              <p className="mt-1 text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
                United States, without regard to its conflict of law principles. Any legal action or proceeding arising
                under these Terms will be brought exclusively in the federal or state courts located in the State of
                Delaware, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  13.1. Exclusive Forum: You and CYAN OS agree that all disputes, claims, controversies, or causes of
                  action arising out of or relating to these Terms or the Service shall be filed only in the federal or
                  state courts located in the State of Delaware.
                </li>
                <li>
                  13.2. Waiver of Objections: Each party irrevocably waives any objection based on improper venue,
                  forum non conveniens, or similar doctrine, and agrees not to challenge the enforceability of this
                  forum-selection provision except to the extent prohibited by applicable law.
                </li>
                <li>
                  13.3. Injunctive and Equitable Relief: Notwithstanding any other provision, CYAN OS may seek
                  temporary, preliminary, or permanent injunctive or equitable relief in any court of competent
                  jurisdiction to protect its intellectual property, confidential information, security posture, or
                  platform integrity.
                </li>
                <li>
                  13.4. Time Limitation on Claims: To the maximum extent permitted by law, any claim or cause of action
                  arising out of or related to the Service must be brought within one (1) year after the claim first
                  arose; otherwise, such claim is permanently barred.
                </li>
                <li>
                  13.5. International Use and Mandatory Rights: The Service is controlled and operated from the United
                  States. You are responsible for compliance with your local laws. Nothing in these Terms limits any
                  non-waivable consumer rights that apply under mandatory law in your jurisdiction.
                </li>
                <li>
                  13.6. Survival: This Section 13 survives any suspension, termination, or expiration of your account or
                  access to the Service.
                </li>
                <li>
                  13.7. Jury Trial Waiver: To the fullest extent permitted by applicable law, each party knowingly,
                  voluntarily, and irrevocably waives any right to a trial by jury in any action, proceeding, or
                  counterclaim arising out of or relating to these Terms or the Service.
                </li>
                <li>
                  13.8. Class Action Waiver: To the maximum extent permitted by law, all claims must be brought solely
                  in an individual capacity, and not as a plaintiff or class member in any purported class, collective,
                  consolidated, representative, or private attorney general proceeding.
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
));
