import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  Zap,
  Globe,
  Clock,
  Code,
  Mic,
  CheckCircle,
  ArrowRight,
  Shield,
  Layers,
  TrendingDown,
  Sun,
  Moon
} from 'lucide-react';

// Simple type declaration for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type PlanKey = 'free' | 'basic' | 'standard' | 'pro' | 'team' | 'executive_pro_annual'
type PaymentMethod = 'paypal' | 'crypto'

interface SubscriptionRecord {
  id: string
  planKey: PlanKey
  status: 'PENDING' | 'ACTIVE' | 'CANCELLED'
  activatedAt?: string
}

interface CryptoPaymentResponse {
  ok?: boolean
  payment_url?: string
  payment_id?: string
  order_id?: string
  hosted?: boolean
  pay_address?: string
  pay_amount?: string
  pay_currency?: string
  error?: string
  raw?: string
  details?: {
    message?: string
    error?: string
  }
}

interface UserSession {
  id: string
  email: string
  name: string
  picture?: string
  provider: 'google' | 'email' | 'guest'
  access_token?: string
  plan?: PlanKey
  subscriptions?: SubscriptionRecord[]
}

const BACKEND_URL = 'https://translator-backend-pi.vercel.app'

const PLAN_PRICE: Record<PlanKey, string> = {
  free: '$0',
  basic: '$29/month',
  standard: '$59/month',
  pro: '$99/month',
  team: '$299/month',
  executive_pro_annual: '$699/year'
}

function App() {
  const CANONICAL_PROD_ORIGIN = 'https://cyan-os-landingpage.vercel.app';

  const getStoredSession = (): UserSession | null => {
    const raw = localStorage.getItem('user_session');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as UserSession;
      return {
        ...parsed,
        plan: parsed.plan || 'free',
        subscriptions: Array.isArray(parsed.subscriptions) ? parsed.subscriptions : []
      };
    } catch {
      localStorage.removeItem('user_session');
      return null;
    }
  };

  const initialSession = getStoredSession();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showApiSection, setShowApiSection] = useState(false);
  const [showTeamContactForm, setShowTeamContactForm] = useState(false);
  const [teamFormSubmitted, setTeamFormSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialSession));
  const [userInfo, setUserInfo] = useState<UserSession | null>(initialSession);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [cryptoCheckout, setCryptoCheckout] = useState<{
    planKey: PlanKey
    paymentId: string
    payCurrency: string
    payAmount: string
    payAddress: string
  } | null>(null);
  const [cryptoActivationBusy, setCryptoActivationBusy] = useState(false);
  const [autoOpenApp, setAutoOpenApp] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [view, setView] = useState<'main' | 'privacy' | 'terms' | 'security' | 'features' | 'video' | 'about'>('main');
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const saveSession = useCallback((session: UserSession | null) => {
    if (session) {
      localStorage.setItem('user_session', JSON.stringify(session));
      setUserInfo(session);
      setIsLoggedIn(true);
      return;
    }

    localStorage.removeItem('user_session');
    setUserInfo(null);
    setIsLoggedIn(false);
  }, []);

  const ensureSession = useCallback(() => {
    if (userInfo) return userInfo;

    const guestSession: UserSession = {
      id: `guest-${Date.now()}`,
      email: `guest-${Date.now()}@cyan.local`,
      name: 'Guest User',
      picture: '/logoCyan.jpg',
      provider: 'guest',
      plan: 'free',
      subscriptions: []
    };

    saveSession(guestSession);
    return guestSession;
  }, [saveSession, userInfo]);

  useEffect(() => {
    if (!userInfo?.id) return;
    if (userInfo.provider === 'guest') return;

    let cancelled = false;

    (async () => {
      try {
        const r = await fetch(`${BACKEND_URL}/api/user/quota?user_id=${encodeURIComponent(userInfo.id)}`);
        if (!r.ok) return;
        const data = (await r.json()) as { plan?: PlanKey };
        const backendPlan = data?.plan;
        if (!backendPlan) return;
        if (cancelled) return;
        if (userInfo.plan === backendPlan) return;

        saveSession({
          ...userInfo,
          plan: backendPlan
        });
      } catch (e) { void e }
    })();

    return () => {
      cancelled = true;
    };
  }, [userInfo, saveSession]);

  useEffect(() => {
    const { origin, hostname, pathname, search, hash } = window.location;
    const isVercelHost = hostname.endsWith('.vercel.app');
    const isCanonicalHost = origin === CANONICAL_PROD_ORIGIN;

    if (isVercelHost && !isCanonicalHost) {
      window.location.replace(`${CANONICAL_PROD_ORIGIN}${pathname}${search}${hash}`);
    }
  }, []);

  const checkBackendConnection = useCallback(async () => {
    try {
      const response = await fetch('https://translator-backend-pi.vercel.app/api/health');
      const data = await response.json();
      console.log('Backend connection:', data);
      return data.ok;
    } catch (error) {
      console.error('Backend connection failed:', error);
      return false;
    }
  }, []);

  const hasAnalyticsConsent = () => {
    if (typeof window === 'undefined') return false;
    const value = window.localStorage.getItem('cyan_cookie_consent');
    return value === 'all';
  };

  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
      window.gtag('event', eventName, parameters);
    }
  }, []);

  const trackPageView = useCallback((path: string) => {
    if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent()) {
      window.gtag('config', 'G-BRJN71L7VV', { page_path: path });
    }
  }, []);

  const privacyView = (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN AI TRANSLATOR</div>
              <div className="text-xs text-gray-400">Ultra-low latency AI translation</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView('main')}
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
                Given the real-time nature of Cyan&apos;s translation services, we adhere to the highest security standards:
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
                To deliver high-quality services, Cyan integrates with leading AI infrastructures. By using Cyan, you also agree to the privacy policies of these partners:
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
                We utilize PayPal for payment processing. Cyan never accesses or stores your credit card numbers, CVV codes, or bank account information. All transactions are conducted directly on PayPal&apos;s secure infrastructure.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">5. USER RIGHTS (GDPR &amp; CCPA COMPLIANCE)</div>
              <p className="mt-1 text-gray-300">
                Regardless of your location, Cyan is committed to complying with international security standards:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Right to be Forgotten: You may request the deletion of your entire account and associated data at any time.</li>
                <li>Right of Access: You may request an export of your payment history and account configuration data.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">6. CATEGORIES OF DATA WE PROCESS</div>
              <p className="mt-1 text-gray-300">
                In addition to audio and translated text, Cyan may process limited categories of personal data necessary to operate the Service:
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
                Where applicable privacy laws such as GDPR or CCPA apply, Cyan relies on the following legal bases:
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
                <li>Contact: For privacy-related questions or requests, you may contact our team via the support channel provided on the Cyan website.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">10. REGION-SPECIFIC RIGHTS (EU/US/OTHER)</div>
              <p className="mt-1 text-gray-300">
                Cyan is based in Vietnam and offers services globally in multiple languages. Depending on where you live,
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
  );

  const termsView = (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN AI REAL-TIME TRANSLATOR</div>
              <div className="text-xs text-gray-400">Terms of Service</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView('main')}
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
                By accessing and using the Cyan AI utility (hereinafter referred to as the &quot;Service&quot;), you
                agree to be bound by these Terms. If you are using the Service on behalf of an organization, you agree
                to these Terms on behalf of that organization.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">2. DESCRIPTION OF SERVICE</div>
              <p className="mt-1 text-gray-300">
                Cyan provides an ultra-low latency, real-time AI translation solution, utilizing third-party API
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
                  consent from the voice owner before using the cloning feature. Cyan assumes no liability for
                  unauthorized impersonation.
                </li>
                <li>
                  Prohibitions: Using Cyan to create fraudulent content (Deepfakes), hate speech, or content that
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
                Cyan does not guarantee 100% accuracy of translated content due to the inherent nature of AI technology.
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
                Subject to your compliance with these Terms, Cyan grants you a limited, non-exclusive, non-transferable,
                and revocable license to access and use the Service for lawful business or personal purposes.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Ownership: All rights, title, and interest in and to the Service, including software, models, and branding, remain with Cyan and its licensors.</li>
                <li>No Reverse Engineering: You may not reverse engineer, decompile, or attempt to extract source code or underlying models except where permitted by law.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">11. SERVICE AVAILABILITY &amp; MODIFICATIONS</div>
              <p className="mt-1 text-gray-300">
                Cyan aims to provide a stable, high-availability translation service but does not guarantee uninterrupted
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
                <li>Exclusions: Cyan disclaims any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
                <li>Liability Cap: To the extent permitted by law, Cyan&apos;s aggregate liability arising out of or relating to the Service will not exceed the amounts you have paid for the Service in the six (6) months preceding the event giving rise to the claim.</li>
                <li>Indirect Damages: Cyan is not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data.</li>
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
  );

  const securityView = (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN AI</div>
              <div className="text-xs text-gray-400">Dedicated Voice Copyright &amp; Cloning Policy</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView('main')}
            className="text-xs font-medium text-gray-400 hover:text-gray-100"
          >
            Back to site
          </button>
        </header>
        <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
            <div>
              <div className="text-base md:text-lg font-semibold text-white">
                CYAN AI: DEDICATED VOICE COPYRIGHT &amp; CLONING POLICY
              </div>
              <div className="mt-1 text-xs text-gray-400">Effective Date: January 28, 2026</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. LEGAL OWNERSHIP OF VOICE DATA</div>
              <p className="mt-1 text-gray-300">
                Cyan AI (the &quot;Company&quot;) recognizes that a person&apos;s voice is a core part of their
                personal identity and intellectual property.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  User-Provided Content: By uploading audio for the purpose of &quot;Voice Cloning,&quot; the User
                  represents and warrants that they are the legal owner of the voice or have obtained express, written,
                  and notarized consent from the owner of the voice.
                </li>
                <li>
                  Cyan’s Role: Cyan acts strictly as a Service Provider and a neutral processing platform. We do not
                  claim ownership over any voice models generated through our Service.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">2. VOICE CLONING COMPLIANCE &amp; CONSENT (VCC)</div>
              <p className="mt-1 text-gray-300">
                The use of the Customized Voice Cloning capability (available in the Executive Pro Plan) is strictly
                subject to the following conditions:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  The &quot;Self-Cloning&quot; Rule: Users are encouraged to clone only their own voices for
                  professional use in meetings and webinars.
                </li>
                <li>
                  Prohibition of Celebrity/Public Figure Cloning: Users are strictly prohibited from uploading audio of
                  celebrities, politicians, or any public figure for the purpose of voice cloning, regardless of whether
                  the source material is publicly available.
                </li>
                <li>
                  Verification Rights: Cyan reserves the right, at its sole discretion, to request proof of consent or
                  identity verification before activating a Customized Voice Clone.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">3. INTELLECTUAL PROPERTY RIGHTS (IPR)</div>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  Output Rights: Subject to the User’s compliance with these terms, the User owns the rights to the
                  translated audio output generated by the Service.
                </li>
                <li>
                  Model Training Data: Cyan does not use User-provided voice samples to train its core proprietary AI
                  models. Voice samples are used exclusively to generate a temporary or permanent voice profile for that
                  specific User&apos;s account.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">4. PROHIBITED USES &amp; &quot;DEEPFAKE&quot; PREVENTION</div>
              <p className="mt-1 text-gray-300">
                Cyan maintains a Zero-Tolerance Policy regarding the following activities:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  Impersonation with Malicious Intent: Using a cloned voice to commit fraud, gain unauthorized access
                  to financial accounts (Voice Biometrics fraud), or mislead any third party.
                </li>
                <li>
                  Defamation: Creating content that harms the reputation of any individual through synthetic voice
                  output.
                </li>
                <li>
                  Electoral Interference: Using the Service to create deceptive content related to elections or
                  political processes.
                </li>
                <li>
                  Violation of Publicity Rights: Any use that violates the &quot;Right of Publicity&quot; under
                  international laws.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">5. MONITORING AND ENFORCEMENT</div>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>
                  Automated Detection: Cyan utilizes advanced audio watermarking and metadata tracking (in
                  collaboration with providers like ElevenLabs) to identify synthetic speech generated by our platform.
                </li>
                <li>
                  Account Termination: Any violation of this Voice Copyright Policy will result in an immediate and
                  permanent ban from the Service without a refund.
                </li>
                <li>
                  Legal Cooperation: Cyan will cooperate fully with law enforcement agencies in any investigation
                  involving the misuse of our voice cloning technology for illegal activities.
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">6. INDEMNIFICATION</div>
              <p className="mt-1 text-gray-300">
                The User agrees to indemnify, defend, and hold harmless Cyan AI, its founders, and its technology
                partners (ElevenLabs, Azure, Google) from any and all claims, damages, or legal fees arising from the
                User’s unauthorized use of a third party’s voice.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">7. LIMITATION OF LIABILITY REGARDING THIRD-PARTY MODELS</div>
              <p className="mt-1 text-gray-300">
                Cyan utilizes third-party AI models (e.g., ElevenLabs) for voice synthesis. While Cyan implements its
                own safety layers, the User also agrees to be bound by the ElevenLabs Terms of Service regarding
                acceptable voice use. Any changes in third-party policies that restrict certain voices will be passed on
                to the User immediately.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">8. INCIDENT RESPONSE &amp; INVESTIGATION</div>
              <p className="mt-1 text-gray-300">
                If Cyan reasonably suspects that the voice cloning capabilities of the Service are being misused,
                we may take immediate steps to protect affected individuals and the integrity of the platform.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Initial Action: We may temporarily suspend or restrict access to specific voice models or user accounts while an investigation is conducted.</li>
                <li>Investigation: Cyan may review technical logs, consult with technology partners, and request additional information from the User.</li>
                <li>Outcome: Following investigation, Cyan may restore access, impose additional restrictions, or permanently terminate the account in line with this Policy and applicable law.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">9. USER COOPERATION &amp; APPEALS</div>
              <p className="mt-1 text-gray-300">
                Users agree to cooperate in good faith with Cyan&apos;s efforts to prevent abuse of voice technologies.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Information Requests: Cyan may request documentation or clarification to verify rights to a specific voice or use case.</li>
                <li>Appeal Process: If you believe your account or voice model has been restricted in error, you may contact support with relevant evidence for review.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">10. RELATIONSHIP TO PRIVACY &amp; SECURITY POLICIES</div>
              <p className="mt-1 text-gray-300">
                This Dedicated Voice Copyright &amp; Cloning Policy operates alongside Cyan&apos;s general Privacy
                Policy and Terms of Service.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Zero-Retention: Except where required for security or legal reasons, audio processed through the Service is subject to Cyan&apos;s zero-retention commitments described in the Privacy Policy.</li>
                <li>Policy Updates: Cyan may update this Policy periodically to reflect evolving legal, ethical, and technological standards in synthetic media and voice AI.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  const howItWorksView = (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN AI REAL-TIME TRANSLATOR</div>
              <div className="text-xs text-gray-400">How it works</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView('main')}
            className="text-xs font-medium text-gray-400 hover:text-gray-100"
          >
            Back to site
          </button>
        </header>
        <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
            <div>
              <div className="text-base md:text-lg font-semibold text-white">HOW CYAN AI REAL-TIME TRANSLATOR WORKS</div>
              <div className="mt-1 text-xs text-gray-400">From your microphone to translated speech in under a second</div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">1. REAL-TIME TRANSLATION PIPELINE</div>
              <p className="mt-1 text-gray-300">
                Cyan is designed to sit next to your meetings, calls, and webinars as a low-latency translation layer.
                The high-level pipeline is:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Your voice is captured from microphone or virtual audio device.</li>
                <li>Audio is streamed in small chunks to our secure backend and partner models.</li>
                <li>Speech is recognized, translated, and converted into the target language text.</li>
                <li>Translated text is synthesized back into natural speech and streamed to your output.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">2. AUDIO CAPTURE AND INPUT</div>
              <p className="mt-1 text-gray-300">
                The Cyan desktop client captures audio in real time:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Input sources can be your microphone, system audio, or a virtual cable from Zoom, Meet, or Teams.</li>
                <li>Audio is chunked into very short segments so we do not wait for entire sentences.</li>
                <li>Each chunk is immediately forwarded for processing to keep latency low.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">3. SPEECH RECOGNITION AND TRANSLATION</div>
              <p className="mt-1 text-gray-300">
                Inside the backend, Cyan coordinates multiple AI services:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Speech recognition turns your source-language audio into text.</li>
                <li>Machine translation converts that text into the target language you selected.</li>
                <li>Quality and latency are tuned per language pair so that meetings remain natural.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">4. TEXT-TO-SPEECH AND STREAMING OUTPUT</div>
              <p className="mt-1 text-gray-300">
                After translation, Cyan turns the text back into speech and streams it:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Partner engines such as ElevenLabs and Azure are used for high-quality voices.</li>
                <li>Audio is streamed as soon as the first words are ready, not after the whole sentence finishes.</li>
                <li>You can route the translated audio to speakers, headphones, or a virtual output device for remote participants.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">5. VOICE CLONING AND PERSONALIZATION</div>
              <p className="mt-1 text-gray-300">
                For Executive Pro users, Cyan supports customized voice cloning:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>You provide a short, legally compliant audio sample of your own voice.</li>
                <li>A dedicated model is created so the translated output sounds like you, not a generic voice.</li>
                <li>We enforce strict rules against cloning public figures and require proof of consent where needed.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">6. LATENCY AND QUALITY OPTIMIZATION</div>
              <p className="mt-1 text-gray-300">
                The entire system is tuned for ultra-low latency while staying stable in real meetings:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Streaming instead of batch requests to avoid long pauses in conversation.</li>
                <li>Fallback models and routing logic keep the service running even under heavy load.</li>
                <li>Adaptive chunking balances responsiveness with natural-sounding speech.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">7. PRIVACY, SECURITY, AND COMPLIANCE</div>
              <p className="mt-1 text-gray-300">
                Cyan was built with privacy-first constraints:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Zero-retention design for live translation sessions.</li>
                <li>No call recording or long-term storage of conversation content.</li>
                <li>Region-aware policies to respect users in Vietnam, EU, US, and other jurisdictions.</li>
              </ul>
              <p className="mt-2 text-gray-300">
                For full details, please review the dedicated Privacy Policy and Security pages in the footer.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">8. TYPICAL USE CASES</div>
              <p className="mt-1 text-gray-300">
                Cyan is optimized for real-world, high-stakes communication where human interpreters are expensive or unavailable:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Founders pitching to international investors in a different language.</li>
                <li>Live webinars and online courses reaching audiences across multiple regions.</li>
                <li>Remote teams running daily standups or support calls across time zones and languages.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">9. TECHNICAL EXPECTATIONS FOR DEVELOPERS</div>
              <p className="mt-1 text-gray-300">
                For engineering teams integrating Cyan into production workflows, it is important to treat the numbers on the landing page as realistic targets, not hard SLAs:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Latency: Typical end-to-end response from speech input to first translated audio is in the 200–400ms range, depending on network conditions, provider routing, and language pairs.</li>
                <li>Reliability: Success rate is designed to stay around 99% in normal conditions, but you should still implement retries and fallbacks in your client.</li>
                <li>Cost: The “up to 80% cost reduction” figure assumes a comparison with traditional human voiceover or manual translation workflows; actual savings vary by usage pattern and provider mix.</li>
              </ul>
              <p className="mt-2 text-gray-300">
                When building on Cyan OS or the public API, we recommend instrumenting your own latency and error metrics so you can tune timeouts, backoff strategies, and user experience for your specific region and infrastructure.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  const videoView = (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN AI REAL-TIME TRANSLATOR</div>
              <div className="text-xs text-gray-400">Experience Natural Voice</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView('main')}
            className="text-xs font-medium text-gray-400 hover:text-gray-100"
          >
            Back to site
          </button>
        </header>
        <main className="relative bg-gray-900/80 border border-cyan-500/40 rounded-2xl shadow-[0_0_45px_rgba(34,255,200,0.35)] px-6 py-6 md:px-8 md:py-8 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -left-32 w-80 h-80 bg-cyan-500/40 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4 pb-4 mb-6">
              <div>
                <div className="text-base md:text-lg font-semibold text-white">DEMO: ULTRA-LOW LATENCY AI TRANSLATION</div>
                <div className="mt-1 text-xs text-gray-400">
                  Electron Cyan – Experience natural voice translation without leaving this site
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-cyan-400/40 bg-black/90 shadow-[0_0_60px_rgba(34,255,200,0.4)]">
              <div className="relative pt-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/zffQKk-tCpo?autoplay=1&rel=0"
                  title="Electron Cyan - ULTRA-LOW LATENCY AI TRANSLATOR"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="mt-4 text-xs md:text-sm text-gray-300">
              This video runs in an embedded player so visitors stay on cyan.ai while exploring how ultra-low
              latency translation works in real meetings.
            </p>
          </div>
        </main>
      </div>
    </div>
  );

  const aboutView = (
    <div className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-cyan-300">CYAN OS LITE</div>
              <div className="text-xs text-gray-400">About the ultra-low latency voice translator</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView('main')}
            className="text-xs font-medium text-gray-400 hover:text-gray-100"
          >
            Back to site
          </button>
        </header>
        <main className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4 mb-6">
            <div>
              <div className="text-base md:text-lg font-semibold text-white">ABOUT CYAN OS LITE</div>
              <div className="mt-1 text-xs text-gray-400">
                Real-time AI voice translation designed for natural negotiation and live meetings
              </div>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <div className="font-semibold text-white">What is Cyan OS Lite?</div>
              <p className="mt-1 text-gray-300">
                Cyan OS Lite is a real-time AI translator that sits next to your calls, meetings, and webinars and turns
                your voice into another language in well under a second. It is built on top of a lightweight runtime
                layer we call Cyan OS, which orchestrates providers such as ElevenLabs, Microsoft Azure, and Google
                Wavenet to keep latency in the 200–400ms range while staying cost-efficient.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Why we focus on natural voice</div>
              <p className="mt-1 text-gray-300">
                Most translation tools are optimised for captions, not for how human conversations actually feel. Cyan
                OS Lite is tuned for voice-first experiences where tone, pacing, and micro-pauses matter: negotiations,
                investor calls, sales demos, and high-stakes one-on-ones. Partner engines such as ElevenLabs are used so
                that translated speech sounds warm and expressive instead of robotic.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Built for negotiation and live meetings</div>
              <p className="mt-1 text-gray-300">
                In a real negotiation, a 2–3 second delay can kill the flow of trust. Cyan OS Lite streams translation
                in very small chunks so that your counterpart hears the first words in under half a second. This makes
                cross-language calls, board meetings, and customer support sessions feel closer to a native
                conversation, not a relay race between you and a distant interpreter.
              </p>
              <p className="mt-2 text-gray-300">
                The desktop client integrates with existing tools: you can route audio from Zoom, Meet, or Teams into
                Cyan and send translated speech back to headphones, speakers, or a virtual microphone that remote
                participants can select as their audio source.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Cyan OS Lite vs. full Cyan OS</div>
              <p className="mt-1 text-gray-300">
                Cyan OS Lite focuses on a streamlined, opinionated path: ultra-low latency voice translation with
                sensible defaults. It exposes the same real-time pipeline we use internally, but without requiring
                teams to manage complex routing, watermarking, or multi-region deployments. The full Cyan OS stack
                extends these ideas for enterprise deployments and deeper integrations.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Who is it for?</div>
              <p className="mt-1 text-gray-300">
                Cyan OS Lite is built for founders, operators, and teams who need to sound like themselves in another
                language when it matters most. Typical scenarios include:
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Negotiating with international partners or suppliers without a human interpreter on the call.</li>
                <li>Pitching to investors in a language you are not fully fluent in.</li>
                <li>Running support or success calls where empathy and tone of voice are critical.</li>
                <li>Hosting webinars and live trainings for audiences across multiple regions.</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Voice, privacy, and control</div>
              <p className="mt-1 text-gray-300">
                Cyan follows a zero-retention philosophy for live sessions: audio is streamed for processing and then
                discarded rather than archived. For users on higher tiers, Cyan OS Lite can be combined with customised
                voices so that translated speech still feels like your own, subject to strict consent and copyright
                rules around voice cloning.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autoOpenApp') === '1') {
      setAutoOpenApp(true);
    }
  }, []);

  useEffect(() => {
    if (!autoOpenApp) return;
    if (!isLoggedIn || !userInfo) return;
    const deepLink = `cyanos://auth?userId=${userInfo.id}&plan=${userInfo.plan || 'free'}`;
    window.location.href = deepLink;
    trackEvent('open_in_app_auto', { userId: userInfo.id });
    setAutoOpenApp(false);
  }, [autoOpenApp, isLoggedIn, userInfo, trackEvent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autoOpenApp') === '1') {
      setAutoOpenApp(true);
    }
  }, []);

  const handleTeamContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setTeamFormSubmitted(true);
    setTimeout(() => form.reset(), 100);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = window.localStorage.getItem('cyan_cookie_consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const startPlanCheckout = async (planKey: PlanKey, method: PaymentMethod = 'paypal') => {
    if (planKey === 'free') {
      const session = ensureSession();
      saveSession({ ...session, plan: 'free' });
      setCheckoutMessage('Free plan activated. You can start immediately.');
      return;
    }

    setCheckoutBusy(true);
    setCheckoutMessage(null);

    try {
      const session = ensureSession();
      const returnUrl = `${window.location.origin}${window.location.pathname}?checkout=success`;
      const cancelUrl = `${window.location.origin}${window.location.pathname}?checkout=cancel`;

      if (method === 'crypto') {
        const cryptoReturnUrl = `${window.location.origin}${window.location.pathname}?crypto=success`;
        const cryptoCancelUrl = `${window.location.origin}${window.location.pathname}?crypto=cancel`;

        const response = await fetch(`${BACKEND_URL}/api/payment/now/plan/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: session.id,
            plan_key: planKey,
            return_url: cryptoReturnUrl,
            cancel_url: cryptoCancelUrl
          })
        });

        const raw = await response.text();
        let data: CryptoPaymentResponse | null = null;
        try {
          data = JSON.parse(raw);
        } catch {
          data = { raw };
        }
        const paymentUrl = String(data?.payment_url || '')
          .trim()
          .replace(/`/g, '');

        const payAddress = String(data?.pay_address || '').trim();
        const payAmount = String(data?.pay_amount || '').trim();
        const payCurrency = String(data?.pay_currency || '').trim();

        if (!response.ok) {
          const detailMessage =
            data?.details?.message ||
            data?.details?.error ||
            data?.error ||
            data?.raw ||
            'Unable to create crypto payment.';
          throw new Error(String(detailMessage));
        }

        localStorage.setItem(
          'pending_crypto_checkout',
          JSON.stringify({
            userId: session.id,
            planKey,
            paymentId: data?.payment_id || '',
            orderId: data?.order_id || '',
            hosted: Boolean(data?.hosted),
            createdAt: Date.now()
          })
        );

        trackEvent('checkout_started', { plan: planKey, method: 'crypto', price_label: PLAN_PRICE[planKey] });

        if (paymentUrl) {
          window.location.href = paymentUrl;
          return;
        }

        if (payAddress && payAmount && payCurrency) {
          setCryptoCheckout({
            planKey,
            paymentId: String(data?.payment_id || ''),
            payCurrency,
            payAmount,
            payAddress
          });
          return;
        }

        throw new Error('NOWPayments không trả về link/địa chỉ thanh toán hợp lệ.');
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/payment/subscription/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: session.id,
          plan_key: planKey,
          return_url: returnUrl,
          cancel_url: cancelUrl
        })
      });

      const data = await response.json();
      if (!response.ok || !data?.approval_url || !data?.subscription_id) {
        throw new Error(data?.error || 'Unable to create PayPal subscription.');
      }

      localStorage.setItem(
        'pending_checkout',
        JSON.stringify({
          userId: session.id,
          planKey,
          subscriptionId: data.subscription_id,
          createdAt: Date.now()
        })
      );

      trackEvent('checkout_started', { plan: planKey, method: 'paypal', price_label: PLAN_PRICE[planKey] });
      window.location.href = data.approval_url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Checkout failed.';
      setCheckoutMessage(message);
      trackEvent('checkout_failed', { plan: planKey, method, error: message });
    } finally {
      setCheckoutBusy(false);
    }
  };

  const copyToClipboard = useCallback(async (value: string) => {
    const text = String(value || '');
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) { void e
      try {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.focus();
        el.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(el);
        return ok;
      } catch (err) { void err; return false }
    }
  }, []);

  const checkAndActivateCryptoPayment = useCallback(async () => {
    const pendingRaw = localStorage.getItem('pending_crypto_checkout');
    if (!pendingRaw) {
      setCheckoutMessage('Missing crypto checkout session. Please retry from pricing.');
      return;
    }

    let pending: {
      userId: string
      planKey: PlanKey
      paymentId: string
      orderId: string
    };

    try {
      pending = JSON.parse(pendingRaw);
    } catch {
      setCheckoutMessage('Missing crypto checkout session. Please retry from pricing.');
      return;
    }

    setCryptoActivationBusy(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/payment/now/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: pending.userId,
          plan_key: pending.planKey,
          payment_id: pending.paymentId,
          order_id: pending.orderId
        })
      });

      const raw = await response.text();
      let data: CryptoPaymentResponse | null = null;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { raw };
      }

      if (response.status === 202) {
        setCheckoutMessage('Chưa nhận được thanh toán. Vui lòng đợi vài phút rồi bấm “Tôi đã thanh toán” lại.');
        return;
      }

      if (!response.ok || !data?.ok) {
        const detailMessage = data?.error || data?.raw || 'Crypto payment not active yet.';
        setCheckoutMessage(String(detailMessage));
        return;
      }

      const activeSession = ensureSession();
      const nextSubscriptions = [
        ...(activeSession.subscriptions || []).filter((s) => s.id !== pending.paymentId),
        {
          id: pending.paymentId,
          planKey: pending.planKey,
          status: 'ACTIVE',
          activatedAt: new Date().toISOString()
        }
      ] as SubscriptionRecord[];

      saveSession({
        ...activeSession,
        plan: pending.planKey,
        subscriptions: nextSubscriptions
      });

      setCryptoCheckout(null);
      setCheckoutMessage(`Crypto plan activated: ${PLAN_PRICE[pending.planKey]}.`);
      trackEvent('checkout_activated', { method: 'crypto', plan: pending.planKey, payment_id: pending.paymentId });
      localStorage.removeItem('pending_crypto_checkout');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not activate crypto payment.';
      setCheckoutMessage(message);
    } finally {
      setCryptoActivationBusy(false);
    }
  }, [ensureSession, saveSession, trackEvent]);

  const activateCryptoCheckoutFromUrl = useCallback(async () => {
    const query = new URLSearchParams(window.location.search);
    const cryptoState = query.get('crypto');
    const pendingRaw = localStorage.getItem('pending_crypto_checkout');

    if (!cryptoState) return;

    if (cryptoState === 'cancel') {
      setCheckoutMessage('Crypto checkout cancelled. You can try again anytime.');
      localStorage.removeItem('pending_crypto_checkout');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (!pendingRaw) {
      setCheckoutMessage('Missing crypto checkout session. Please retry from pricing.');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    try {
      const pending = JSON.parse(pendingRaw) as {
        userId: string
        planKey: PlanKey
        paymentId?: string
        orderId?: string
        hosted?: boolean
      };

      const hasPaymentId = Boolean(pending.paymentId)
      const activateEndpoint = hasPaymentId ? 'activate' : 'activate-order'
      const body = hasPaymentId
        ? {
            user_id: pending.userId,
            plan_key: pending.planKey,
            payment_id: pending.paymentId,
            order_id: pending.orderId
          }
        : {
            user_id: pending.userId,
            plan_key: pending.planKey,
            order_id: pending.orderId
          }

      const response = await fetch(`${BACKEND_URL}/api/payment/now/${activateEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.status === 202) {
        setCheckoutMessage('Chưa nhận được thanh toán. Vui lòng đợi vài phút rồi thử lại.');
        trackEvent('checkout_activation_pending', { method: 'crypto', plan: pending.planKey, payment_id: pending.paymentId || null });
        return;
      }

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || 'Crypto payment not active yet.');
      }

      const activeSession = ensureSession();
      const nextSubscriptions = [
        ...(activeSession.subscriptions || []).filter((s) => s.id !== pending.paymentId),
        {
          id: pending.paymentId,
          planKey: pending.planKey,
          status: 'ACTIVE',
          activatedAt: new Date().toISOString()
        }
      ] as SubscriptionRecord[];

      saveSession({
        ...activeSession,
        plan: pending.planKey,
        subscriptions: nextSubscriptions
      });

      setCheckoutMessage(`Crypto plan activated: ${PLAN_PRICE[pending.planKey]}.`);
      trackEvent('checkout_activated', { method: 'crypto', plan: pending.planKey, payment_id: pending.paymentId });
      localStorage.removeItem('pending_crypto_checkout');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not activate crypto payment.';
      setCheckoutMessage(message);
      trackEvent('checkout_activation_failed', { method: 'crypto', error: message });
    } finally {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [ensureSession, saveSession, trackEvent]);

  const activateCheckoutFromUrl = useCallback(async () => {
    const query = new URLSearchParams(window.location.search);
    const checkoutState = query.get('checkout');
    const subscriptionId = query.get('subscription_id') || query.get('token') || query.get('ba_token');
    const pendingRaw = localStorage.getItem('pending_checkout');

    if (!checkoutState && !subscriptionId) return;

    if (checkoutState === 'cancel') {
      setCheckoutMessage('Checkout cancelled. You can try again anytime.');
      localStorage.removeItem('pending_checkout');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (!pendingRaw || !subscriptionId) {
      setCheckoutMessage('Missing checkout session. Please retry from pricing.');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    try {
      const pending = JSON.parse(pendingRaw) as {
        userId: string
        planKey: PlanKey
      };

      const response = await fetch(`${BACKEND_URL}/api/payment/subscription/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: pending.userId,
          plan_key: pending.planKey,
          subscription_id: subscriptionId
        })
      });

      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || 'Payment not active yet.');
      }

      const activeSession = ensureSession();
      const nextSubscriptions = [
        ...(activeSession.subscriptions || []).filter((s) => s.id !== subscriptionId),
        {
          id: subscriptionId,
          planKey: pending.planKey,
          status: 'ACTIVE',
          activatedAt: new Date().toISOString()
        }
      ] as SubscriptionRecord[];

      saveSession({
        ...activeSession,
        plan: pending.planKey,
        subscriptions: nextSubscriptions
      });

      setCheckoutMessage(`Subscription activated: ${PLAN_PRICE[pending.planKey]}.`);
      trackEvent('checkout_activated', { plan: pending.planKey, subscription_id: subscriptionId });
      localStorage.removeItem('pending_checkout');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not activate subscription.';
      setCheckoutMessage(message);
      trackEvent('checkout_activation_failed', { error: message });
    } finally {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [ensureSession, saveSession, trackEvent]);

  const handleEmailAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('EMAIL') || '').trim();
    const fullName = String(formData.get('FIRSTNAME') || '').trim();

    if (!email) return;

    const displayName = fullName || email.split('@')[0] || 'User';
    const sessionData: UserSession = {
      id: `email-${email.toLowerCase()}`,
      email,
      name: displayName,
      picture: '/logoCyan.jpg',
      provider: 'email',
      plan: 'free',
      subscriptions: []
    };

    saveSession(sessionData);
    setShowLoginModal(false);

    trackEvent('email_auth_success', {
      action: isLoginMode ? 'login' : 'register',
      user_email: email
    });
  };

  // Handle Google OAuth callback (Frontend Direct - Token flow)
  const handleGoogleCallback = useCallback(async (accessToken: string) => {
    try {
      // Get user info directly from Google using access token
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const userData = await userResponse.json();

      // Create simple session
      const sessionData: UserSession = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        provider: 'google',
        plan: 'free',
        subscriptions: [],
        access_token: accessToken
      };

      saveSession(sessionData);

      // Close modal
      setShowLoginModal(false);

      // Track success
      trackEvent('oauth_success', {
        provider: 'google',
        user_email: userData.email
      });

      console.log('Google login successful:', userData);
    } catch (error) {
      console.error('OAuth callback error:', error);
      trackEvent('oauth_error', {
        provider: 'google',
        error: 'Frontend OAuth failed'
      });
    }
  }, [saveSession, trackEvent]);

  // Keep local storage in sync with current auth state
  useEffect(() => {
    activateCryptoCheckoutFromUrl();
    activateCheckoutFromUrl();
  }, [activateCheckoutFromUrl, activateCryptoCheckoutFromUrl]);

  // Keep local storage in sync with current auth state
  useEffect(() => {
    if (isLoggedIn && userInfo) {
      localStorage.setItem('user_session', JSON.stringify(userInfo));
      return;
    }

    localStorage.removeItem('user_session');
  }, [isLoggedIn, userInfo]);

  // Check for OAuth callback in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const accessToken = hashParams.get('access_token');
    const error = urlParams.get('error');

    if (accessToken) {
      // Handle OAuth callback with access token
      handleGoogleCallback(accessToken);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      console.error('OAuth error:', error);
      trackEvent('oauth_error', {
        provider: 'google',
        error: error
      });
    }
  }, [handleGoogleCallback, trackEvent]);

  // Check backend on mount
  useEffect(() => {
    checkBackendConnection();
    trackPageView(window.location.pathname);
  }, [checkBackendConnection, trackPageView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  };

  return view === 'privacy'
    ? privacyView
    : view === 'terms'
      ? termsView
      : view === 'security'
        ? securityView
        : view === 'features'
          ? howItWorksView
          : view === 'video'
            ? videoView
            : view === 'about'
              ? aboutView
              : (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/50 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>
      {/* Floating CTA Button */}
      <a
        href="#pricing"
        onClick={() => {
          trackEvent('cta_click', {
            button_name: 'floating_get_started',
            location: 'floating_button'
          });
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.classList.remove('hidden');
            pricingSection.style.display = 'block';
            setTimeout(() => pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
          }
        }}
        className="fixed bottom-8 right-8 z-50 bg-cyan-600 dark:bg-cyan-600 text-yellow-300 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-cyan-700 dark:hover:bg-cyan-700 hover:shadow-cyan-600/50 transition-all duration-300 flex items-center gap-2 hover:scale-105"
      >
        Get Started <ArrowRight className="w-4 h-4" />
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">CYAN</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">ULTRA-LOW LATENCY AI TRANSLATOR</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#solution" className="text-sm hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-2">Solution</a>
            <div className="relative group">
              <button className="text-sm hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 flex items-center gap-1 px-2">
                Developers <ArrowRight className="w-3 h-3 rotate-90" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a href="#api" onClick={(e) => { e.preventDefault(); setShowApiSection(true); setTimeout(() => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">API</a>
                <a href="#developers" onClick={(e) => { e.preventDefault(); document.getElementById('developers')?.scrollIntoView({ behavior: 'smooth' }); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Developer Docs</a>
                <a href="#roi" onClick={(e) => { e.preventDefault(); const roiSection = document.getElementById('roi'); if (roiSection) { roiSection.classList.remove('hidden'); roiSection.style.display = 'block'; setTimeout(() => roiSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); } }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">ROI Calculator</a>
              </div>
            </div>
            <a href="#engine" className="text-sm hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-2">Engine</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); const pricingSection = document.getElementById('pricing'); if (pricingSection) { pricingSection.classList.remove('hidden'); pricingSection.style.display = 'block'; setTimeout(() => pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); } }} className="text-sm hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-2">Pricing</a>
            
            {/* Email CTA in Navigation */}
            <div className="relative group">
              <button 
                onClick={() => {
                  trackEvent('cta_click', {
                    button_name: 'early_access_nav',
                    location: 'navigation'
                  });
                }}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Early Access
              </button>
              
              {/* Hover Email Form */}
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Get Early Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Join our waitlist for exclusive updates!</p>
                  
                  {/* Custom Email Form */}
                  <form 
                    action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg=="
                    method="POST"
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      name="FIRSTNAME"
                      placeholder="Your Name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <input
                      type="email"
                      name="EMAIL"
                      placeholder="Your Email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all text-sm"
                    >
                      Join Waitlist
                    </button>
                  </form>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                    500+ members • No spam
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-white"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
              {isLoggedIn && userInfo ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAccountMenuOpen((open) => !open)}
                      className="flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 px-2 py-1 transition-colors"
                    >
                      <img 
                        src={userInfo.picture || '/logoCyan.jpg'} 
                        alt={userInfo.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        {userInfo.name}
                      </span>
                    </button>

                    {accountMenuOpen && (
                      <div className="absolute right-0 top-11 min-w-[220px] rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-2 z-40">
                        <div className="px-3 pb-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Current plan</p>
                          <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 px-2.5 py-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wide">
                              {userInfo.plan || 'free'}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400">
                              {PLAN_PRICE[userInfo.plan || 'free']}
                            </span>
                          </p>
                        </div>
                        <div className="px-3 pt-2 border-t border-gray-100 dark:border-slate-800 flex justify-end">
                          <button 
                            type="button"
                            onClick={() => {
                              saveSession(null);
                              trackEvent('logout', {
                                provider: userInfo.provider
                              });
                              setAccountMenuOpen(false);
                            }}
                            className="text-[11px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const deepLink = `cyanos://auth?userId=${userInfo.id}&plan=${userInfo.plan || 'free'}`;
                      window.location.href = deepLink;
                      trackEvent('open_in_app', { userId: userInfo.id });
                    }}
                    className="ml-2 bg-gradient-to-r from-gray-800 to-black border border-gray-700 text-white px-2.5 py-1 rounded-md text-xs font-medium hover:border-cyan-500 transition-all flex items-center gap-1.5"
                  >
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Open in App
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    trackEvent('cta_click', {
                      button_name: 'login',
                      location: 'navigation'
                    });
                    setShowLoginModal(true);
                  }}
                  className="bg-cyan-600 dark:bg-cyan-600 text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all"
                >
                  Login
                </button>
              )}

      {(checkoutBusy || checkoutMessage) && (
        <div className="fixed bottom-24 right-6 z-50 max-w-sm rounded-xl border border-cyan-500/40 bg-white/95 dark:bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur">
          {checkoutBusy ? (
            <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Creating checkout session...</p>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words">{checkoutMessage}</p>
          )}
          {checkoutMessage && (
            <button
              onClick={() => setCheckoutMessage(null)}
              className="mt-2 text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {cryptoCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-white dark:bg-slate-900 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-cyan-500/20 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Thanh toán Crypto</div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">Mạng: BSC • Coin: {cryptoCheckout.payCurrency.toUpperCase()}</div>
              </div>
              <button
                onClick={() => setCryptoCheckout(null)}
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400"
              >
                Đóng
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-50/50 dark:bg-cyan-900/10 p-4">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">Số tiền cần gửi</div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div className="text-lg font-bold text-gray-900 dark:text-white break-all">{cryptoCheckout.payAmount}</div>
                  <button
                    onClick={async () => {
                      const ok = await copyToClipboard(cryptoCheckout.payAmount);
                      setCheckoutMessage(ok ? 'Đã copy số tiền.' : 'Copy thất bại.');
                    }}
                    className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-300"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-50/50 dark:bg-cyan-900/10 p-4">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">Địa chỉ nhận</div>
                <div className="mt-1 flex items-start justify-between gap-3">
                  <div className="text-sm font-mono text-gray-900 dark:text-white break-all">{cryptoCheckout.payAddress}</div>
                  <button
                    onClick={async () => {
                      const ok = await copyToClipboard(cryptoCheckout.payAddress);
                      setCheckoutMessage(ok ? 'Đã copy địa chỉ.' : 'Copy thất bại.');
                    }}
                    className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 dark:text-cyan-300"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-white dark:bg-slate-900 p-4">
                <div className="text-xs text-gray-600 dark:text-gray-300">Sau khi gửi xong, bấm nút bên dưới để hệ thống kiểm tra và kích hoạt gói.</div>
                <button
                  onClick={checkAndActivateCryptoPayment}
                  disabled={cryptoActivationBusy}
                  className="mt-3 w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all disabled:opacity-60"
                >
                  {cryptoActivationBusy ? 'Đang kiểm tra thanh toán...' : 'Tôi đã thanh toán'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={setRef('hero')}
        className={`pt-32 pb-20 px-6 transition-all duration-1000 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="text-base font-mono font-semibold uppercase tracking-[0.3em] text-[#22ff66]"
              style={{ textShadow: '0 0 10px rgba(34, 255, 102, 0.7)' }}
            >
              FEATURED IN
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://www.producthunt.com/products/cyan-ultra-low-latency-ai-translator?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-cyan-ultra-low-latency-ai-translator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm"
              >
                <img
                  alt="CYAN: Ultra-Low Latency AI Translator - Secure your $699ExecutiveProAnnual spot now.MinimalLatencyAI | Product Hunt"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1049078&amp;theme=light"
                  className="h-7 w-auto"
                />
              </a>
              <a
                href="https://www.nxgntools.com/tools/cyan-ultra-low-latency-ai-translator?utm_source=cyan-ultra-low-latency-ai-translator"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm"
              >
                <img
                  src="https://www.nxgntools.com/api/embed/cyan-ultra-low-latency-ai-translator?type=FIND_US_ON&hideUpvotes=true"
                  alt="NextGen Tools Badge - The #1 AI Tools Directory & Launch Platform"
                  className="h-7 w-auto"
                />
              </a>
              <a
                href="https://viberank.dev/apps/CYAN%3A%20Ultra-Low%20Latency%20AI%20Translator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm"
              >
                <img
                  src="https://viberank.dev/badge?app=CYAN%3A%20Ultra-Low%20Latency%20AI%20Translator&theme=dark"
                  alt="CYAN: Ultra-Low Latency AI Translator on VibeRank"
                  className="h-7 w-auto"
                />
              </a>
            </div>
          </div>
          <div className="mt-16">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 dark:bg-cyan-500/20 border border-cyan-500/30 dark:border-cyan-500/30 rounded-full text-sm font-medium text-cyan-600 dark:text-cyan-300 backdrop-blur-sm">
              <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-4 h-4 inline mr-2 rounded" />
              Powered by Cyan OS
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-cyan-600 dark:to-cyan-400 bg-clip-text text-transparent">
              ULTRA-LOW LATENCY AI TRANSLATOR
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-600 dark:text-cyan-300">FOR GLOBAL COMMUNICATION</h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-light">
              Break Language Barriers in Real-time Meetings with<br />Impeccable Clarity and Natural Voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  trackEvent('cta_click', {
                    button_name: 'experience_natural_voice',
                    location: 'hero_section',
                    destination: 'video_demo'
                  });
                  setView('video');
                }}
                className="bg-cyan-600 dark:bg-cyan-600 text-yellow-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all hover:scale-105"
              >
                Experience Natural Voice
              </button>
              <button
                onClick={() => {
                  trackEvent('cta_click', {
                    button_name: 'learn_more',
                    location: 'hero_section',
                    destination: 'about_view'
                  });
                  setView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gray-100 dark:bg-slate-700/80 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
              {[
                { icon: Clock, label: '<400ms', desc: 'Translation Latency' },
                { icon: Globe, label: '+36', desc: 'Languages Supported' },
                { icon: TrendingDown, label: 'Up to 80%', desc: 'Cost Reduction' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-slate-800/60 backdrop-blur-md border border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:scale-105">
                  <stat.icon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-3 mx-auto" />
                  <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">{stat.label}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

          {/* Problem Section */}
      <section
        id="problem"
        ref={setRef('problem')}
        className={`py-20 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-all duration-1000 delay-200 ${
          isVisible.problem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">The Challenges We Solve</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Breaking down the barriers that prevent seamless global communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'COMMUNICATION GAPS',
                desc: 'Language barriers create misunderstandings and lost opportunities in critical business conversations, limiting global collaboration and growth potential.'
              },
              {
                icon: Clock,
                title: 'TIME DELAYS',
                desc: 'Traditional translation methods slow down meetings and decision-making, causing frustration and reducing productivity in time-sensitive situations.'
              },
              {
                icon: Mic,
                title: 'UNNATURAL VOICES',
                desc: 'Robotic, monotone AI voices diminish the human connection and emotional nuance essential for building trust in professional relationships.'
              }
            ].map((challenge, idx) => (
              <div key={idx} className="bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <challenge.icon className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">{challenge.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="solution"
        ref={setRef('solution')}
        className={`py-20 px-6 bg-gray-50/60 dark:bg-gray-900/60 backdrop-blur-sm transition-all duration-1000 delay-300 ${
          isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Our Solution</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Experience the power of real-time AI translation with natural voice quality
            </p>
          </div>

          <div className="space-y-8">
            {/* Ultra-Low Latency Streaming */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-2 border-cyan-600/30 dark:border-cyan-400/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-cyan-600/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-cyan-600 dark:bg-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/30 animate-float">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Ultra-Low Latency Streaming</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Experience real-time conversations with latency that feels natural. Our optimized architecture is designed to minimize delay using advanced neural processing and a dedicated real-time proxy, typically achieving end-to-end response in the 200–400ms range depending on network conditions and language pairs.
                </p>
              </div>
            </div>

            {/* Natural Voice Output */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-2 border-cyan-600/30 dark:border-cyan-400/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-cyan-600/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-cyan-600 dark:bg-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/30 animate-float">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Natural Voice Output</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Preserve emotion and tone with AI voices that sound genuinely human, maintaining the speaker's intent and personality.
                </p>
              </div>
            </div>

            {/* Seamless Integration */}
            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-2 border-cyan-600/30 dark:border-cyan-400/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-cyan-600/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-cyan-600 dark:bg-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/30 animate-float">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Seamless Integration</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Works effortlessly with Zoom, Teams, Meet, and all major platforms. One click to activate, zero setup required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cyan OS Lite API Section - Hidden by default */}
      <section
        id="api"
        ref={setRef('api')}
        className={`py-20 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-all duration-500 ${
          showApiSection ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
        style={{ display: showApiSection ? 'block' : 'none' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 bg-cyan-600/10 dark:bg-cyan-600/20 border border-cyan-600/30 dark:border-cyan-600/40 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
              <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Cyan OS Lite API</span>
            </div>
            <button
              onClick={() => setShowApiSection(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Cyan OS Lite API Overview</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Powerful Text-to-Speech API with Voice Cloning and Real-time Streaming
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Core Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">🎯 Core Features</h3>
              <div className="space-y-4">
                {[
                  { icon: Mic, title: 'Multi-provider Text-to-Speech', desc: 'Azure, ElevenLabs, Google' },
                  { icon: Zap, title: 'Voice Cloning from Audio Sample', desc: 'Create custom voice from 30s audio' },
                  { icon: Clock, title: 'Real-time Streaming', desc: 'Fast playback with <400ms latency' },
                  { icon: Layers, title: 'Chunked Processing', desc: 'Efficient long text processing' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-gray-50 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 bg-cyan-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Endpoints */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">🚀 API Endpoints</h3>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 font-mono text-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">POST</span>
                    <span className="text-cyan-400">/api/tts/speak</span>
                    <span className="text-gray-400">- Basic TTS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">POST</span>
                    <span className="text-cyan-400">/api/tts/clone-and-speak</span>
                    <span className="text-gray-400">- Clone voice + speak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">POST</span>
                    <span className="text-cyan-400">/api/tts/clone-and-stream</span>
                    <span className="text-gray-400">- Clone voice + stream</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400">POST</span>
                    <span className="text-cyan-400">/api/tts/speak-chunked</span>
                    <span className="text-gray-400">- Fast chunked TTS</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">💰 Pricing Plans</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-gray-900 dark:text-gray-100">BASIC:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">$0.00010/request (TTS only)</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-gray-900 dark:text-gray-100">PRO:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">$79/month (all features, 500K requests)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Benefits */}
          <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-2 border-cyan-600/30 dark:border-cyan-400/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-cyan-600/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-cyan-600 dark:text-cyan-400">🎯 Features & User Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Developers */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">For Developers</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• 5 min integration vs 2 weeks self-build</li>
                  <li>• Cost $0.0001/call vs $0.01/call</li>
                  <li>• REST API with standard headers</li>
                </ul>
              </div>

              {/* Business */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">For Business</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Brand consistency across platforms</li>
                  <li>• 24/7 availability without staff</li>
                  <li>• Save 80% voice actor costs</li>
                </ul>
              </div>

              {/* Content Creators */}
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">For Content Creators</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• 10x content production speed</li>
                  <li>• Multi-language market expansion</li>
                  <li>• Reduce 90% audio production time</li>
                </ul>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="mt-12 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 dark:from-cyan-600/20 dark:to-purple-600/20 rounded-2xl p-8 border border-cyan-600/30 dark:border-cyan-400/30">
              <h4 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">📊 ROI Calculator</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$100/hour</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Manual recording</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">$0.10/1000 chars</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cyan OS API</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Up to 80%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Potential cost reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="engine"
        ref={setRef('engine')}
        className={`py-20 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-all duration-1000 delay-400 ${
          isVisible.engine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Enterprise-Grade Infrastructure</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Scalable architecture designed for global deployment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {[
                  {
                    icon: Layers,
                    title: 'Multi-Provider TTS',
                    desc: 'Intelligent routing across ElevenLabs, OpenAI, and Azure for maximum reliability'
                  },
                  {
                    icon: Mic,
                    title: 'Voice Cloning',
                    desc: 'Create custom voice profiles from just 30 seconds of audio with 98% accuracy'
                  },
                  {
                    icon: Zap,
                    title: 'Real-time Streaming',
                    desc: 'Stream audio as it\'s generated with chunked processing for zero perceived latency'
                  },
                  {
                    icon: Shield,
                    title: 'Chunked Processing',
                    desc: 'Intelligent text segmentation for natural pauses and optimal voice quality'
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-md p-5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:shadow-cyan-glow/10 transition-all">
                    <div className="w-12 h-12 bg-cyan-glow dark:bg-cyan-glow rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-gray-900 dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-8 border-2 border-cyan-600/30 dark:border-cyan-400/30 shadow-2xl shadow-cyan-600/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-3 text-gray-400 text-sm">Architecture Overview</span>
              </div>
              <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-cyan-600 mb-4">// Natural Voice AI Engine</div>
                <div className="text-gray-300">
                  <span className="text-purple-400">interface</span> <span className="text-yellow-300">NaturalVoicePipeline</span> {'{\n'}
                  <span className="ml-4 text-gray-400">// Advanced Neural Processing</span>{'\n'}
                  <span className="ml-4 text-blue-400">neuralProcessor</span>: <span className="text-green-400">AdvancedAI</span>{'\n'}
                  {'\n'}
                  <span className="ml-4 text-gray-400">// Real-Time Proxy</span>{'\n'}
                  <span className="ml-4 text-blue-400">realTimeProxy</span>: <span className="text-green-400">DedicatedInfra</span>{'\n'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section
        id="developers"
        ref={setRef('developers')}
        className={`py-20 px-6 bg-gradient-to-b from-white/60 dark:from-gray-900/60 to-gray-50/60 dark:to-gray-800/60 backdrop-blur-sm transition-all duration-1000 delay-500 ${
          isVisible.developers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-600/10 dark:bg-cyan-600/20 border border-cyan-600/30 dark:border-cyan-600/40 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
              <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Developer API</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">Built for Developers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Simple, powerful API that scales from prototype to production
            </p>
          </div>

          <div className="bg-gray-900 dark:bg-gray-950 rounded-3xl p-8 md:p-12 shadow-2xl shadow-cyan-600/10 border-2 border-cyan-600/20 dark:border-cyan-400/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">API Request Example</span>
            </div>

            <div className="bg-gray-800 dark:bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-300">
                <span className="text-pink-400">POST</span> <span className="text-cyan-600">/api/natural-voice/stream</span>{'\n\n'}

                <span className="text-gray-400">// Request Headers</span>{'\n'}
                <span className="text-purple-400">Authorization</span>: <span className="text-green-400">"Bearer YOUR_API_KEY"</span>{'\n'}
                <span className="text-purple-400">Content-Type</span>: <span className="text-green-400">"application/json"</span>{'\n\n'}

                <span className="text-gray-400">// Request Body</span>{'\n'}
                {'{\n'}
                <span className="ml-4 text-blue-400">"text"</span>: <span className="text-green-400">"Hello, welcome to Natural Voice AI"</span>,{'\n'}
                <span className="ml-4 text-blue-400">"voice_id"</span>: <span className="text-green-400">"natural_voice_123"</span>,{'\n'}
                <span className="ml-4 text-blue-400">"language"</span>: <span className="text-green-400">"en-US"</span>,{'\n'}
                <span className="ml-4 text-blue-400">"streaming"</span>: <span className="text-yellow-300">true</span>{'\n'}
                {'}\n\n'}

                <span className="text-gray-400">// Response: Natural audio stream</span>{'\n'}
                <span className="text-gray-400">// Latency: &lt;400ms typical to first audio</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Response Time', value: '<400ms' },
                { label: 'Success Rate', value: '~99%' },
                { label: 'Concurrent Requests', value: 'Unlimited' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-cyan-600/10 dark:bg-cyan-600/20 border border-cyan-600/30 dark:border-cyan-600/40 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section - Hidden */}
      <section
        id="roi"
        ref={setRef('roi')}
        className={`py-20 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm transition-all duration-1000 delay-600 hidden ${
          isVisible.roi ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Unmatched ROI</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              See how much you save by switching to Cyan-OS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Method */}
            <div className="bg-red-50/60 dark:bg-red-900/20 backdrop-blur-md border-2 border-red-200/50 dark:border-red-800/50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-red-600 dark:text-red-400 text-sm font-bold mb-2">TRADITIONAL METHOD</div>
                <h3 className="text-3xl font-bold text-red-700 dark:text-red-300">Manual Recording</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Voice Actor (per hour)</span>
                  <span className="font-bold text-red-700 dark:text-red-400">$100-300</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Studio Time</span>
                  <span className="font-bold text-red-700 dark:text-red-400">$50-150/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Post-Production</span>
                  <span className="font-bold text-red-700 dark:text-red-400">$75-200/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Timeline</span>
                  <span className="font-bold text-red-700 dark:text-red-400">6-8 weeks</span>
                </div>
                <div className="border-t-2 border-red-300/50 dark:border-red-700/50 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Total Cost (10 hours)</span>
                    <span className="text-3xl font-bold text-red-700 dark:text-red-400">$2,250+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyan-OS Method */}
            <div className="bg-cyan-glow/10 dark:bg-cyan-glow/20 backdrop-blur-md border-2 border-cyan-glow rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-cyan-glow/10">
              <div className="absolute top-4 right-4 bg-cyan-glow dark:bg-cyan-glow text-gray-900 dark:text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                SAVE up to 80%
              </div>
              <div className="text-center mb-6">
                <div className="text-cyan-600 dark:text-cyan-400 text-sm font-bold mb-2">CYAN-OS API</div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Automated Pipeline</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Cost per 1k characters</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">$0.10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Setup Time</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">5 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Processing Time</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">Real-time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Timeline</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">Instant</span>
                </div>
                <div className="border-t-2 border-cyan-glow/50 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Total Cost (10 hours)</span>
                    <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">$2.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-glow/20 to-cyan-glow/10 dark:from-cyan-glow/30 dark:to-cyan-glow/20 border border-cyan-glow/50 dark:border-cyan-glow/60 rounded-2xl p-8 backdrop-blur-md shadow-lg shadow-cyan-glow/10">
              <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">$2,247.50</div>
              <div className="text-xl text-gray-600 dark:text-gray-400">Saved per 10 hours of content</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="text-xs font-semibold tracking-[0.25em] text-gray-500 dark:text-gray-400 uppercase">
              Also listed on
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-900/70">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                Product Hunt
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-900/70">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                NextGen Tools
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-900/70">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                VibeRank
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Hidden */}
      <section
        id="pricing"
        ref={setRef('pricing')}
        className={`py-20 px-6 bg-gradient-to-b from-white/60 dark:from-gray-900/60 to-gray-50/60 dark:to-gray-800/60 backdrop-blur-sm transition-all duration-1000 delay-700 hidden ${
          isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
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
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'free', button_name: 'get_started', price: 0 });
                  startPlanCheckout('free');
                }}
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
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'basic', button_name: 'get_started', price: 29 });
                  startPlanCheckout('basic', 'paypal');
                }}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative z-10"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'basic', button_name: 'pay_with_crypto', price: 29 });
                  startPlanCheckout('basic', 'crypto');
                }}
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
                onClick={() => {
                  trackEvent('pricing_click', {
                    plan: 'standard',
                    button_name: 'get_started',
                    price: 59
                  });
                  startPlanCheckout('standard', 'paypal');
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-yellow-300 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 relative z-10"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'standard', button_name: 'pay_with_crypto', price: 59 });
                  startPlanCheckout('standard', 'crypto');
                }}
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
            <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-2xl"></div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative z-10">Pro</h3>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Small Business B2B</div>
              <div className="text-4xl font-bold mb-1 text-gray-900 dark:text-white relative z-10">$99<span className="text-lg font-normal text-gray-500">/month</span></div>
              <button
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'pro', button_name: 'get_started', price: 99 });
                  startPlanCheckout('pro', 'paypal');
                }}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25 relative z-10"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'pro', button_name: 'pay_with_crypto', price: 99 });
                  startPlanCheckout('pro', 'crypto');
                }}
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
                  trackEvent('pricing_click', {
                    plan: 'team',
                    button_name: 'contact_sales',
                    price: 299
                  });
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
                    <input
                      type="text"
                      name="YOUR_NAME"
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="email"
                      name="YOUR_EMAIL"
                      placeholder="Work Email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                    <input
                      type="text"
                      name="COMPANY"
                      placeholder="Company"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                    <input type="hidden" name="PLAN" value="Team Plan - $299/month" />
                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Submit to Brevo
                    </button>
                  </form>
                  <iframe name="brevo-submit-frame" title="brevo-submit-frame" className="hidden" />
                  {teamFormSubmitted && (
                    <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                      Submitted successfully. We received your info.
                    </p>
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
                onClick={() => {
                  trackEvent('pricing_click', {
                    plan: 'executive_pro_annual',
                    button_name: 'claim_spot',
                    price: 699
                  });
                  startPlanCheckout('executive_pro_annual', 'paypal');
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-yellow-300 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-600/50 relative z-10"
              >
                Claim Spot Now
              </button>
              <button
                onClick={() => {
                  trackEvent('pricing_click', { plan: 'executive_pro_annual', button_name: 'pay_with_crypto', price: 699 });
                  startPlanCheckout('executive_pro_annual', 'crypto');
                }}
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

      {/* Login/Register Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover rounded" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isLoginMode ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {isLoginMode ? 'Sign in to your CYAN account' : 'Join CYAN for ultra-low latency translation'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Google Sign-In Button */}
              <button
                type="button"
                onClick={() => {
                  trackEvent('oauth_click', {
                    provider: 'google',
                    action: isLoginMode ? 'login' : 'register'
                  });

                  // Direct Google OAuth for frontend (Token flow) - Production
                  const googleOAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
                    'client_id=464363772737-silqko8n7qq49f1ikg5o23t33ds4nh11.apps.googleusercontent.com&' +
                    'redirect_uri=' + encodeURIComponent(window.location.origin) + '&' +
                    'response_type=token&' +
                    'scope=openid%20email%20profile&' +
                    'prompt=consent';
                  
                  window.location.href = googleOAuthUrl;
                }}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form 
                onSubmit={handleEmailAuthSubmit}
                className="space-y-4"
              >
              {!isLoginMode && (
                <input
                  type="text"
                  name="FIRSTNAME"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                />
              )}
              
              <input
                type="email"
                name="EMAIL"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
              />
              
              <input
                type="password"
                name="PASSWORD"
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
              />
              
              {!isLoginMode && (
                <input
                  type="password"
                  name="CONFIRM_PASSWORD"
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                />
              )}
              
              <input
                type="hidden"
                name="FORM_TYPE"
                value={isLoginMode ? 'login' : 'register'}
              />
              
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoginMode ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            </div>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold ml-1"
                >
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Get started with:</p>
                <div className="flex justify-center space-x-4 text-xs text-gray-600 dark:text-gray-300">
                  <span>✓ 20min Free Trial</span>
                  <span>✓ No Credit Card</span>
                  <span>✓ Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCookieBanner && (
        <div className="fixed inset-x-0 bottom-0 z-40">
          <div className="max-w-7xl mx-auto px-4 pb-4">
            <div className="bg-slate-900/95 border border-slate-700 text-sm text-gray-200 rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="md:max-w-3xl">
                <div className="font-semibold text-gray-100 text-xs md:text-sm">Cookies &amp; data usage</div>
                <p className="mt-1 text-xs md:text-sm text-gray-300">
                  Cyan uses cookies and similar technologies to keep you signed in (including Google OAuth), secure your
                  session, and measure how users around the world interact with our product. You can learn more in our
                  Privacy Policy.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.localStorage.setItem('cyan_cookie_consent', 'necessary');
                    }
                    setShowCookieBanner(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs md:text-sm border border-slate-600 text-gray-200 hover:bg-slate-800 transition-colors"
                >
                  Necessary only
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.localStorage.setItem('cyan_cookie_consent', 'all');
                    }
                    setShowCookieBanner(false);
                    trackEvent('cookie_consent', { choice: 'all' });
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs md:text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2 py-1 rounded-lg text-xs md:text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src="/logoCyan.jpg" alt="CYAN Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-xl font-bold">CYAN</span>
                  <div className="text-xs text-gray-500">ULTRA-LOW LATENCY AI TRANSLATOR</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Next-generation ultra-low latency AI translation for global communication
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setView('features');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.classList.remove('hidden');
                        pricingSection.style.display = 'block';
                        setTimeout(
                          () => pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                          50
                        );
                      }
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setView('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setView('privacy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors"
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
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Terms of Use
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setView('security');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Security
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; 2024 Cyan ULTRA-LOW LATENCY AI TRANSLATOR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
