
import { DocsView } from './components/DocsView';
import { Footer } from './components/Footer';
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { SecurityView } from './components/SecurityView';
import { ServiceBillingPolicyView } from './components/ServiceBillingPolicyView';
import { HowItWorksView } from './components/HowItWorksView';
import { VideoView } from './components/VideoView';
import { AboutView } from './components/AboutView';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ApiSection } from './components/ApiSection';
import { EngineSection } from './components/EngineSection';
import { DevelopersSection } from './components/DevelopersSection';
import { RoiSection } from './components/RoiSection';
import { PlatformsSection } from './components/PlatformsSection';
import { ListingsSection } from './components/ListingsSection';
import { PricingSection } from './components/PricingSection';
import { FormEvent, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import {
  Zap,
  ArrowRight,
  ArrowUp,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

// Simple type declaration for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    google?: GoogleIdentity;
  }
}

export type PlanKey = 'free' | 'basic' | 'standard' | 'pro' | 'team' | 'executive_pro_annual'
export type PaymentMethod = 'paypal' | 'crypto'
export type AppView = 'main' | 'privacy' | 'terms' | 'security' | 'service_billing' | 'features' | 'video' | 'about' | 'docs'

type GoogleTokenResponse = {
  access_token?: string
  error?: string
  error_description?: string
}

type GoogleTokenClient = {
  requestAccessToken: (options?: { prompt?: string }) => void
}

type GoogleIdentity = {
  accounts?: {
    oauth2?: {
      initTokenClient: (config: {
        client_id: string
        scope: string
        callback: (resp: GoogleTokenResponse) => void | Promise<void>
      }) => GoogleTokenClient
    }
  }
}

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
const GOOGLE_CLIENT_ID =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_GOOGLE_CLIENT_ID ||
  '464363772737-silqko8n7qq49f1ikg5o23t33ds4nh11.apps.googleusercontent.com'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showApiSection, setShowApiSection] = useState(false);
  const [showRoiSection, setShowRoiSection] = useState(false);
  const [showPricingSection, setShowPricingSection] = useState(false);
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
  const googleIdentityLoaderRef = useRef<Promise<void> | null>(null);
  const googleTokenClientRef = useRef<GoogleTokenClient | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [midDevMenuOpen, setMidDevMenuOpen] = useState(false);
  const [view, setView] = useState<AppView>('main');
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [mobileEarlyEmail, setMobileEarlyEmail] = useState('');
  const [mobileEarlySubmitted, setMobileEarlySubmitted] = useState(false);
  const [clickPulse, setClickPulse] = useState<{ x: number; y: number; id: number } | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!clickPulse) return;
    const timer = window.setTimeout(() => setClickPulse(null), 500);
    return () => window.clearTimeout(timer);
  }, [clickPulse]);

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
      picture: '/logoCYAN.png',
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

  const LoadingFallback = memo(() => (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center">
      <div className="text-cyan-400 text-lg">Loading...</div>
    </div>
  ));

  const privacyView = <PrivacyView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

  const termsView = <TermsView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

  const securityView = <SecurityView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

  const serviceBillingView = <ServiceBillingPolicyView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

  const howItWorksView = <HowItWorksView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

  const videoView = <VideoView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

  const aboutView = <AboutView isDarkMode={isDarkMode} goToMainView={goToMainView} />;

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

  const openPricingSection = useCallback(() => {
    setShowPricingSection(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  const openRoiSection = useCallback(() => {
    setShowRoiSection(true);
    setIsVisible((prev) => ({ ...prev, roi: true }));
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    } catch (e) {
      void e
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
      picture: '/logoCYAN.png',
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

  const ensureGoogleIdentity = useCallback(() => {
    if (window.google?.accounts?.oauth2) {
      return Promise.resolve();
    }

    if (googleIdentityLoaderRef.current) {
      return googleIdentityLoaderRef.current;
    }

    googleIdentityLoaderRef.current = new Promise<void>((resolve, reject) => {
      const existing = document.getElementById('google-identity-service') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('google_identity_load_failed')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-identity-service';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('google_identity_load_failed'));
      document.head.appendChild(script);
    });

    return googleIdentityLoaderRef.current;
  }, []);

  const startGoogleLoginWithGis = useCallback(async () => {
    await ensureGoogleIdentity();

    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2) {
      throw new Error('google_identity_unavailable');
    }

    if (!googleTokenClientRef.current) {
      googleTokenClientRef.current = oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: async (resp: GoogleTokenResponse) => {
          const token = String(resp.access_token || '');
          if (!token) {
            trackEvent('oauth_error', { provider: 'google', error: String(resp.error || 'no_access_token') });
            setCheckoutMessage(String(resp.error_description || resp.error || 'Google login failed. Please try again.'));
            setShowLoginModal(true);
            return;
          }

          await handleGoogleCallback(token);
        }
      });
    }

    googleTokenClientRef.current.requestAccessToken({ prompt: 'consent' });
  }, [ensureGoogleIdentity, handleGoogleCallback, trackEvent]);

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

  // Draggable floating buttons functionality (all devices)
  useEffect(() => {
    const floatingButtons = document.getElementById('floating-buttons');
    if (!floatingButtons) return;

    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    const dragStart = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchstart') {
        const touch = (e as TouchEvent).touches[0];
        initialX = touch.clientX - xOffset;
        initialY = touch.clientY - yOffset;
      } else {
        const mouse = e as MouseEvent;
        initialX = mouse.clientX - xOffset;
        initialY = mouse.clientY - yOffset;
      }

      const target = e.target as HTMLElement;
      if (target === floatingButtons || target.closest('#floating-buttons')) {
        isDragging = true;
      }
    };

    const dragEnd = () => {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        e.preventDefault();

        let clientX, clientY;
        if (e.type === 'touchmove') {
          clientX = (e as TouchEvent).touches[0].clientX;
          clientY = (e as TouchEvent).touches[0].clientY;
        } else {
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        }

        currentX = clientX - initialX;
        currentY = clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        // Constrain to viewport
        const rect = floatingButtons.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - 32; // 32px padding from right
        const maxY = window.innerHeight - rect.height - 32; // 32px padding from bottom

        const constrainedX = Math.max(0, Math.min(currentX, maxX));
        const constrainedY = Math.max(0, Math.min(currentY, maxY));

        floatingButtons.style.transform = `translate(${constrainedX}px, ${constrainedY}px)`;
      }
    };

    // Add event listeners
    floatingButtons.addEventListener('touchstart', dragStart, { passive: false });
    floatingButtons.addEventListener('touchend', dragEnd, { passive: false });
    floatingButtons.addEventListener('touchmove', drag, { passive: false });
    floatingButtons.addEventListener('mousedown', dragStart, { passive: false });
    document.addEventListener('mouseup', dragEnd, { passive: false });
    document.addEventListener('mousemove', drag, { passive: false });

    return () => {
      // Cleanup event listeners
      floatingButtons.removeEventListener('touchstart', dragStart);
      floatingButtons.removeEventListener('touchend', dragEnd);
      floatingButtons.removeEventListener('touchmove', drag);
      floatingButtons.removeEventListener('mousedown', dragStart);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('mousemove', drag);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const oauthError = urlParams.get('error') || hashParams.get('error');
    const oauthErrorDescription = urlParams.get('error_description') || hashParams.get('error_description');
    const oauthCode = urlParams.get('code');
    const oauthState = urlParams.get('state');
    const accessToken = hashParams.get('access_token');

    const clearUrl = () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    };

    const completeCodeFlow = async () => {
      const storedVerifier = window.localStorage.getItem('cyan_google_oauth_verifier') || '';
      const storedState = window.localStorage.getItem('cyan_google_oauth_state') || '';
      window.localStorage.removeItem('cyan_google_oauth_verifier');
      window.localStorage.removeItem('cyan_google_oauth_state');

      if (!storedVerifier || !storedState || !oauthState || storedState !== oauthState) {
        trackEvent('oauth_error', { provider: 'google', error: 'state_mismatch' });
        setCheckoutMessage('Google login failed. Please try again.');
        setShowLoginModal(true);
        clearUrl();
        return;
      }

      const tokenBody = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        code: oauthCode || '',
        code_verifier: storedVerifier,
        redirect_uri: window.location.origin,
        grant_type: 'authorization_code'
      });

      try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: tokenBody.toString()
        });

        const tokenData = await tokenResponse.json();
        const token = String(tokenData?.access_token || '');
        if (!token) {
          trackEvent('oauth_error', { provider: 'google', error: 'token_exchange_failed' });
          setCheckoutMessage(String(tokenData?.error_description || tokenData?.error || 'Google login failed. Please try again.'));
          setShowLoginModal(true);
          clearUrl();
          return;
        }

        await handleGoogleCallback(token);
        clearUrl();
      } catch {
        trackEvent('oauth_error', { provider: 'google', error: 'token_exchange_failed' });
        setCheckoutMessage('Google login failed. Please try again.');
        setShowLoginModal(true);
        clearUrl();
      }
    };

    if (oauthCode) {
      void completeCodeFlow();
      return;
    }

    if (accessToken) {
      void handleGoogleCallback(accessToken);
      clearUrl();
      return;
    }

    if (oauthError) {
      trackEvent('oauth_error', { provider: 'google', error: oauthError });
      setCheckoutMessage(String(oauthErrorDescription || oauthError));
      setShowLoginModal(true);
      clearUrl();
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
        const updates: { [key: string]: boolean } = {};
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updates[entry.target.id] = true;
          }
        });
        if (Object.keys(updates).length > 0) {
          setIsVisible((prev) => ({ ...prev, ...updates }));
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  }, []);

  function goToMainView() {
    setView('main');
    window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
    window.requestAnimationFrame(() => {
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previous;
    });
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <>
        {/* Navigation */}
        <nav className={`fixed top-0 w-full transition-all duration-300 z-[100] ${scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm py-2 sm:py-3'
          : 'bg-transparent py-4 sm:py-6 border-b-2 border-gray-200/60 dark:border-slate-700/50'
          }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CYAN</span>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 sm:block hidden">ULTRA-LOW LATENCY AI TRANSLATOR</div>
              </div>
            </div>

            <div className="desktop-nav-links hidden sm:flex items-center gap-2 sm:gap-4 flex-wrap">
              <a href="#hero" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Home</a>
              <a href="#solution" className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Solution</a>
              <a href="#engine" className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Engine</a>
              <a href="#platforms" className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Platforms</a>
              <a href="#developers" onClick={(e) => { e.preventDefault(); document.getElementById('developers')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Developers</a>
              <a href="#api" onClick={(e) => { e.preventDefault(); setShowApiSection(true); setTimeout(() => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">API</a>
              <a href="#roi" onClick={(e) => { e.preventDefault(); openRoiSection(); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">ROI</a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); openPricingSection(); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Pricing</a>
              <a href="#footer" onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Contact</a>

              <div className="ml-4 flex items-center gap-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-white"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <div className="relative group">
                  <button
                    onClick={() => {
                      trackEvent('cta_click', { button_name: 'early_access_nav', location: 'navigation' });
                    }}
                    className="bg-cyan-600 dark:bg-cyan-600 text-yellow-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-cyan-700 transition-all"
                  >
                    Early Access
                  </button>

                  <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">Join the Waitlist</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">Get exclusive updates and priority access.</p>
                      <form action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg==" method="POST" className="space-y-3">
                        <input type="text" name="FIRSTNAME" placeholder="Your Name" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm" />
                        <input type="email" name="EMAIL" placeholder="Your Email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm" />
                        <button type="submit" className="w-full bg-cyan-600 text-yellow-300 py-2 rounded-lg font-bold hover:bg-cyan-700 transition-all text-sm shadow-lg shadow-cyan-600/20">Join Waitlist</button>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center font-medium">500+ members • No spam</div>
                      </form>
                    </div>
                  </div>
                </div>

                {isLoggedIn && userInfo ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAccountMenuOpen((open) => !open)}
                      className="flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 px-2 py-1 transition-colors"
                    >
                      <img src={userInfo.picture || '/logoCYAN.png'} alt={userInfo.name} className="w-6 h-6 rounded-full" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-[13px]">{userInfo.name}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-[13px] font-bold text-cyan-600 dark:text-cyan-400 px-2"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Account/Login Button */}
              {isLoggedIn && userInfo ? (
                <div className="relative sm:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileAccountOpen((open) => !open)}
                    className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm"
                    aria-label="Open account menu"
                  >
                    <img
                      src={userInfo.picture || '/logoCYAN.png'}
                      alt={userInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {mobileAccountOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl py-2.5 z-[135]">
                      <div className="px-4 pb-2 border-b border-gray-100 dark:border-slate-800">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{userInfo.name}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="inline-flex items-center rounded-full bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                            {userInfo.plan || 'free'}
                          </span>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                            {PLAN_PRICE[userInfo.plan || 'free']}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 pt-3 flex flex-col gap-2">
                        <a
                          href="#pricing"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileAccountOpen(false);
                            openPricingSection();
                          }}
                          className="text-sm text-cyan-600 dark:text-cyan-400 font-bold hover:text-cyan-700"
                        >
                          Upgrade Plan
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            saveSession(null);
                            setMobileAccountOpen(false);
                          }}
                          className="text-left text-sm text-red-500 font-bold"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="sm:hidden px-3 py-1.5 rounded-lg bg-cyan-600 text-yellow-300 text-xs font-bold shadow-md"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-white"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`sm:hidden fixed inset-0 z-[150] h-screen bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">CYAN</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-white h-[100vh] px-6 py-8 flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Home</a>
                  <a href="#solution" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Solution</a>
                  <a href="#engine" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Engine</a>
                  <a href="#platforms" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Platforms</a>
                  <a href="#developers" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); document.getElementById('developers')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-lg font-bold text-gray-900 dark:text-white">Developers</a>
                  <a href="#api" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setShowApiSection(true); setTimeout(() => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-lg font-bold text-gray-900 dark:text-white">API</a>
                  <a href="#roi" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openRoiSection(); }} className="text-lg font-bold text-gray-900 dark:text-white">ROI</a>
                  <a href="#pricing" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openPricingSection(); }} className="text-lg font-bold text-gray-900 dark:text-white">Pricing</a>
                  <a href="#footer" onClick={() => { setMobileMenuOpen(false); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-lg font-bold text-gray-900 dark:text-white">Contact</a>
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackEvent('cta_click', { button_name: 'early_access_mobile' });
                    }}
                    className="w-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 py-4 rounded-xl font-bold text-center border border-cyan-200 dark:border-cyan-800"
                  >
                    Email Early Access
                  </button>

                  {isLoggedIn && userInfo ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                        <img src={userInfo.picture || '/logoCYAN.png'} alt={userInfo.name} className="w-12 h-12 rounded-full shadow-sm" />
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{userInfo.name}</div>
                          <div className="text-sm text-gray-500">{userInfo.email}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          saveSession(null);
                          setMobileMenuOpen(false);
                        }}
                        className="text-center text-red-500 font-bold py-3 text-lg"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowLoginModal(true);
                      }}
                      className="w-full bg-cyan-600 text-yellow-300 py-4 rounded-xl font-bold text-xl shadow-xl shadow-cyan-600/20"
                    >
                      Join / Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Floating Controls */}
        {/* <div
          id="floating-buttons"
          className="fixed bottom-0 sm:bottom-10 right-4 sm:right-8 z-30 flex flex-col sm:items-end items-center gap-3 cursor-move select-none"
          style={{ touchAction: 'none' }}
        >
          <a
            href="#pricing"
            onClick={() => {
              trackEvent('cta_click', {
                button_name: 'floating_get_started',
                location: 'floating_button',
                destination: 'pricing_section'
              });
              openPricingSection();
            }}
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 px-7 py-3.5 rounded-full font-bold shadow-xl ring-2 ring-cyan-300/60 hover:from-cyan-700 hover:to-cyan-800 dark:hover:from-cyan-700 dark:hover:to-cyan-800 hover:shadow-cyan-500/60 transition-all duration-300 flex items-center gap-2 hover:scale-110 pointer-events-auto"
            style={{ pointerEvents: 'auto' }}
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent('cta_click', {
                button_name: 'download_cyan',
                location: 'floating_button'
              });
            }}
            className="bg-slate-900/85 dark:bg-slate-900/90 text-cyan-100 border border-cyan-400/45 px-4 py-2 rounded-full font-medium shadow-md hover:bg-slate-800 hover:border-cyan-400/70 transition-all duration-300 flex flex-col items-start sm:items-center gap-0.5 text-[11px] sm:text-sm hover:scale-105 pointer-events-auto"
            style={{ pointerEvents: 'auto' }}
          >
            <span className="leading-tight text-[13px] sm:text-sm">Download CYAN</span>
            <span className="leading-tight text-[10px] text-cyan-200/90">
              Currently in Private Beta.
            </span>
          </button>
        </div> */}

        {/* Scroll to Top Button */}
        {scrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 left-4 sm:left-8 z-[110] p-3.5 sm:p-4 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 shadow-2xl hover:shadow-cyan-500/20 hover:scale-110 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        <div key={view} className="page-fade-in">
          {view === 'privacy'
            ? privacyView
            : view === 'terms'
              ? termsView
              : view === 'security'
                ? securityView
                : view === 'service_billing'
                  ? serviceBillingView
                : view === 'features'
                  ? howItWorksView
                  : view === 'video'
                    ? videoView
                    : view === 'about'
                      ? aboutView
                      : view === 'docs'
                        ? <DocsView goToMainView={goToMainView} />
                        : (
                          <div
                            className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50/25 to-cyan-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
                            onMouseDown={(event) => {
                              if (typeof window !== 'undefined' && !window.matchMedia('(pointer:fine)').matches) return;
                              setClickPulse({ x: event.clientX, y: event.clientY, id: Date.now() });
                            }}
                          >
                            {/* Tech Grid Background
                            <div className="fixed inset-0 pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/75 via-cyan-100/25 to-white/28 dark:from-slate-900/0 dark:via-slate-900/0 dark:to-slate-950/0"></div>
                              <a
                                href="#pricing"
                                onClick={() => {
                                  trackEvent('cta_click', {
                                    button_name: 'floating_get_started',
                                    location: 'floating_button',
                                    destination: 'pricing_section'
                                  });
                                  openPricingSection();
                                }}
                                className="bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 text-yellow-300 px-7 py-3.5 rounded-full font-bold shadow-xl ring-2 ring-cyan-300/60 hover:from-cyan-700 hover:to-cyan-800 dark:hover:from-cyan-700 dark:hover:to-cyan-800 hover:shadow-cyan-500/60 transition-all duration-300 flex items-center gap-2 hover:scale-110 pointer-events-auto"
                                style={{ pointerEvents: 'auto' }}
                              >
                                Get Started Free <ArrowRight className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  trackEvent('cta_click', {
                                    button_name: 'download_cyan',
                                    location: 'floating_button'
                                  });
                                  // TODO: cập nhật link download khi desktop app sẵn sàng
                                }}
                                className="bg-slate-900/85 dark:bg-slate-900/90 text-cyan-100 border border-cyan-400/45 px-4 py-2 rounded-full font-medium shadow-md hover:bg-slate-800 hover:border-cyan-400/70 transition-all duration-300 flex flex-col items-start sm:items-center gap-0.5 text-[11px] sm:text-sm hover:scale-105 pointer-events-auto"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <span className="leading-tight text-[13px] sm:text-sm">Download CYAN</span>
                                <span className="leading-tight text-[10px] text-cyan-200/90">
                                  Currently in Private Beta. Sign up to request early access.
                                </span>
                              </button>
                            </div> */}

                            {/* Navigation */}
                            <nav className={`fixed top-0 w-full transition-all duration-300 z-[100] ${scrolled
                              ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm py-2 sm:py-3'
                              : 'bg-transparent py-4 sm:py-6'
                              }`}>
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="text-left">
                                    <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CYAN</span>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400 sm:block hidden">ULTRA-LOW LATENCY AI TRANSLATOR</div>
                                  </div>
                                </div>

                                <div className="desktop-nav-links hidden sm:flex items-center gap-2 sm:gap-4 flex-wrap">
                                  <a href="#hero" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Home</a>
                                  <a href="#solution" className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Solution</a>
                                  <a href="#engine" className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Engine</a>
                                  <a href="#platforms" className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Platforms</a>
                                  <a href="#developers" onClick={(e) => { e.preventDefault(); document.getElementById('developers')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Developers</a>
                                  <a href="#api" onClick={(e) => { e.preventDefault(); setShowApiSection(true); setTimeout(() => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">API</a>
                                  <a href="#roi" onClick={(e) => { e.preventDefault(); openRoiSection(); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">ROI</a>
                                  <a href="#pricing" onClick={(e) => { e.preventDefault(); openPricingSection(); }} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Pricing</a>
                                  <a href="#footer" onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })} className="text-[13px] font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-gray-600 dark:text-gray-300 px-1">Contact</a>

                                  <div className="ml-4 flex items-center gap-4">
                                    <button
                                      onClick={() => setIsDarkMode(!isDarkMode)}
                                      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-white"
                                      aria-label="Toggle dark mode"
                                    >
                                      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    </button>

                                    <div className="relative group">
                                      <button
                                        onClick={() => {
                                          trackEvent('cta_click', { button_name: 'early_access_nav', location: 'navigation' });
                                        }}
                                        className="bg-cyan-600 dark:bg-cyan-600 text-yellow-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-cyan-700 transition-all"
                                      >
                                        Early Access
                                      </button>

                                      <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-4">
                                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Join the Waitlist</h3>
                                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">Get exclusive updates and priority access.</p>
                                          <form action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg==" method="POST" className="space-y-3">
                                            <input type="text" name="FIRSTNAME" placeholder="Your Name" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm" />
                                            <input type="email" name="EMAIL" placeholder="Your Email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm" />
                                            <button type="submit" className="w-full bg-cyan-600 text-yellow-300 py-2 rounded-lg font-bold hover:bg-cyan-700 transition-all text-sm shadow-lg shadow-cyan-600/20">Join Waitlist</button>
                                            <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center font-medium">500+ members • No spam</div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>

                                    {isLoggedIn && userInfo ? (
                                      <div className="relative">
                                        <button
                                          type="button"
                                          onClick={() => setAccountMenuOpen((open) => !open)}
                                          className="flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 px-2 py-1 transition-colors"
                                        >
                                          <img src={userInfo.picture || '/logoCYAN.png'} alt={userInfo.name} className="w-6 h-6 rounded-full" />
                                          <span className="text-gray-700 dark:text-gray-300 font-medium text-[13px]">{userInfo.name}</span>
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="text-[13px] font-bold text-cyan-600 dark:text-cyan-400 px-2"
                                      >
                                        Join
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Mobile Account/Login Button */}
                                  {isLoggedIn && userInfo ? (
                                    <div className="relative sm:hidden">
                                      <button
                                        type="button"
                                        onClick={() => setMobileAccountOpen((open) => !open)}
                                        className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm"
                                        aria-label="Open account menu"
                                      >
                                        <img
                                          src={userInfo.picture || '/logoCYAN.png'}
                                          alt={userInfo.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>

                                      {mobileAccountOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl py-2.5 z-[135]">
                                          <div className="px-4 pb-2 border-b border-gray-100 dark:border-slate-800">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{userInfo.name}</p>
                                            <div className="mt-1 flex items-center justify-between">
                                              <span className="inline-flex items-center rounded-full bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                                                {userInfo.plan || 'free'}
                                              </span>
                                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                                {PLAN_PRICE[userInfo.plan || 'free']}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="px-4 pt-3 flex flex-col gap-2">
                                            <a
                                              href="#pricing"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setMobileAccountOpen(false);
                                                openPricingSection();
                                              }}
                                              className="text-sm text-cyan-600 dark:text-cyan-400 font-bold hover:text-cyan-700"
                                            >
                                              Upgrade Plan
                                            </a>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                saveSession(null);
                                                setMobileAccountOpen(false);
                                              }}
                                              className="text-left text-sm text-red-500 font-bold"
                                            >
                                              Logout
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setShowLoginModal(true)}
                                      className="sm:hidden px-3 py-1.5 rounded-lg bg-cyan-600 text-yellow-300 text-xs font-bold shadow-md"
                                    >
                                      Login
                                    </button>
                                  )}

                                  <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-white"
                                    aria-label="Toggle dark mode"
                                  >
                                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                  </button>
                                  <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white transition-colors"
                                  >
                                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                  </button>
                                </div>
                              </div>

                              {/* Mobile Sidebar */}
                              {/* Mobile Sidebar - Full Screen from Left */}
                              <div
                                className={`sm:hidden fixed inset-0 z-[150] h-screen bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                              >
                                <div className="flex flex-col h-full">
                                  {/* Sidebar Header */}
                                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
                                        <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover" />
                                      </div>
                                      <span className="text-xl font-bold text-gray-900 dark:text-white">CYAN</span>
                                    </div>
                                    <button
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-white"
                                    >
                                      <X className="w-6 h-6" />
                                    </button>
                                  </div>

                                  {/* Sidebar Content */}
                                  <div className="flex-1 overflow-y-auto bg-white h-[100vh] px-6 py-8 flex flex-col justify-between">
                                    <div className="flex flex-col gap-6">
                                      <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Home</a>
                                      <a href="#solution" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Solution</a>
                                      <a href="#engine" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Engine</a>
                                      <a href="#platforms" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white">Platforms</a>
                                      <a href="#developers" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); document.getElementById('developers')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-lg font-bold text-gray-900 dark:text-white">Developers</a>
                                      <a href="#api" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setShowApiSection(true); setTimeout(() => document.getElementById('api')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-lg font-bold text-gray-900 dark:text-white">API</a>
                                      <a href="#roi" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openRoiSection(); }} className="text-lg font-bold text-gray-900 dark:text-white">ROI</a>
                                      <a href="#pricing" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openPricingSection(); }} className="text-lg font-bold text-gray-900 dark:text-white">Pricing</a>
                                      <a href="#footer" onClick={() => { setMobileMenuOpen(false); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-lg font-bold text-gray-900 dark:text-white">Contact</a>
                                    </div>

                                    <div className="mt-auto  pt-4 flex flex-col gap-2">
                                      <button
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          trackEvent('cta_click', { button_name: 'early_access_mobile' });
                                        }}
                                        className="w-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 py-4 rounded-xl font-bold text-center border border-cyan-200 dark:border-cyan-800"
                                      >
                                        Email Early Access
                                      </button>

                                      {isLoggedIn && userInfo ? (
                                        <div className="flex flex-col gap-4">
                                          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                            <img src={userInfo.picture || '/logoCYAN.png'} alt={userInfo.name} className="w-12 h-12 rounded-full shadow-sm" />
                                            <div>
                                              <div className="text-lg font-bold text-gray-900 dark:text-white">{userInfo.name}</div>
                                              <div className="text-sm text-gray-500">{userInfo.email}</div>
                                            </div>
                                          </div>
                                          <button
                                            onClick={() => {
                                              saveSession(null);
                                              setMobileMenuOpen(false);
                                            }}
                                            className="text-center text-red-500 font-bold py-3 text-lg"
                                          >
                                            Logout
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setMobileMenuOpen(false);
                                            setShowLoginModal(true);
                                          }}
                                          className="w-full bg-cyan-600 text-yellow-300 py-4 rounded-xl font-bold text-xl shadow-xl shadow-cyan-600/20"
                                        >
                                          Join / Login
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </nav>

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

                            <HeroSection
                              setView={setView}
                              openPricingSection={openPricingSection}
                              trackEvent={trackEvent}
                              setRef={setRef}
                            />

                            {/* Problem Section */}
                            <ProblemSection isVisible={isVisible.problem} setRef={setRef} />

                            {/* Solution Section */}
                            <SolutionSection isVisible={isVisible.solution} setRef={setRef} />

                            {/* CYAN OS Lite API Section - Hidden by default */}
                            <ApiSection showApiSection={showApiSection} setShowApiSection={setShowApiSection} setRef={setRef} />

                            <EngineSection isVisible={isVisible.engine} setRef={setRef} />

                            {/* Developers Section */}
                            <DevelopersSection isVisible={isVisible.developers} trackEvent={trackEvent} setRef={setRef} />

                            {/* ROI Section */}
                            <RoiSection isVisible={isVisible.roi} showRoiSection={showRoiSection} setRef={setRef} />

                            <PlatformsSection isVisible={isVisible.platforms} setRef={setRef} />

                            <ListingsSection />

                            {/* Pricing Section - Hidden */}
                            <PricingSection
                              showPricingSection={showPricingSection}
                              showTeamContactForm={showTeamContactForm}
                              teamFormSubmitted={teamFormSubmitted}
                              setRef={setRef}
                              trackEvent={trackEvent}
                              startPlanCheckout={startPlanCheckout}
                              setShowTeamContactForm={setShowTeamContactForm}
                              setTeamFormSubmitted={setTeamFormSubmitted}
                              handleTeamContactSubmit={handleTeamContactSubmit}
                            />


                            {/* Login/Register Modal */}
                            {showLoginModal && (
                              <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex justify-center items-start p-4 pt-16 overflow-y-auto">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[88vh] overflow-y-auto">
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
                                      <img src="/logoCYAN.png" alt="CYAN Logo" className="w-full h-full object-cover rounded" />
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
                                      onClick={async () => {
                                        trackEvent('oauth_click', {
                                          provider: 'google',
                                          action: isLoginMode ? 'login' : 'register'
                                        });

                                        try {
                                          await startGoogleLoginWithGis();
                                          return;
                                        } catch (error) {
                                          const message = error instanceof Error ? error.message : 'Google login failed. Please try again.';
                                          setCheckoutMessage(message);
                                          setShowLoginModal(true);
                                          trackEvent('oauth_error', { provider: 'google', error: message });
                                          return;
                                        }
                                      }}
                                      className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                    >
                                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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
                              <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
                                <div className="max-w-md w-full bg-slate-900/95 border border-slate-700 text-[11px] md:text-xs text-gray-200 rounded-full px-3 py-2 shadow-xl flex items-center gap-2 md:gap-3">
                                  <div className="flex-1 leading-tight">
                                    <div className="font-semibold text-gray-100 text-[11px] md:text-xs">Cookies &amp; data</div>
                                    <p className="text-[10px] md:text-[11px] text-gray-300">We use cookies to keep you signed in and measure usage. Privacy Policy.</p>
                                  </div>
                                  <div className="flex items-center gap-1 md:gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (typeof window !== 'undefined') {
                                          window.localStorage.setItem('cyan_cookie_consent', 'necessary');
                                        }
                                        setShowCookieBanner(false);
                                      }}
                                      className="px-2 md:px-3 py-1 rounded-full text-[10px] md:text-[11px] border border-slate-600 text-gray-200 hover:bg-slate-800 transition-colors"
                                    >
                                      Necessary
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
                                      className="px-2 md:px-3 py-1 rounded-full text-[10px] md:text-[11px] bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setView('privacy');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }}
                                      className="px-2 py-1 rounded-full text-[10px] md:text-[11px] text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                      Policy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            <Footer
                              setView={setView}
                              openPricingSection={openPricingSection}
                              setShowApiSection={setShowApiSection}
                              copyToClipboard={copyToClipboard}
                            />
                          </div>
                        )
          }
        </div>
      </>
    </Suspense>
  );
}

export default App;
