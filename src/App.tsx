import { FormEvent, useEffect, useRef, useState } from 'react';
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
    gtag?: any;
  }
}

function App() {
  const CANONICAL_PROD_ORIGIN = 'https://cyan-os-landingpage.vercel.app';

  const getStoredSession = () => {
    const raw = localStorage.getItem('user_session');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialSession));
  const [userInfo, setUserInfo] = useState<any>(initialSession);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const { origin, hostname, pathname, search, hash } = window.location;
    const isVercelHost = hostname.endsWith('.vercel.app');
    const isCanonicalHost = origin === CANONICAL_PROD_ORIGIN;

    if (isVercelHost && !isCanonicalHost) {
      window.location.replace(`${CANONICAL_PROD_ORIGIN}${pathname}${search}${hash}`);
    }
  }, []);

  // API connection functions
  const checkBackendConnection = async () => {
    try {
      const response = await fetch('https://translator-backend-pi.vercel.app/api/health');
      const data = await response.json();
      console.log('Backend connection:', data);
      return data.ok;
    } catch (error) {
      console.error('Backend connection failed:', error);
      return false;
    }
  };

  const handleEmailAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('EMAIL') || '').trim();
    const fullName = String(formData.get('FIRSTNAME') || '').trim();

    if (!email) return;

    const displayName = fullName || email.split('@')[0] || 'User';
    const sessionData = {
      id: `email-${email.toLowerCase()}`,
      email,
      name: displayName,
      picture: '/logoCyan.jpg',
      provider: 'email'
    };

    localStorage.setItem('user_session', JSON.stringify(sessionData));
    setIsLoggedIn(true);
    setUserInfo(sessionData);
    setShowLoginModal(false);

    trackEvent('email_auth_success', {
      action: isLoginMode ? 'login' : 'register',
      user_email: email
    });
  };

  // Handle Google OAuth callback (Frontend Direct - Token flow)
  const handleGoogleCallback = async (accessToken: string) => {
    try {
      // Get user info directly from Google using access token
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const userData = await userResponse.json();

      // Create simple session
      const sessionData = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        access_token: accessToken
      };

      // Store session
      localStorage.setItem('user_session', JSON.stringify(sessionData));

      // Update state
      setIsLoggedIn(true);
      setUserInfo(sessionData);

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
  };

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
  }, []);

  // Check backend on mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  // Analytics tracking functions
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  // Track page views (used for analytics)
  const trackPageView = (path: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-BRJN71L7VV', { page_path: path });
    }
  };

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

  return (
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
              {/* Login/User Section */}
              {isLoggedIn && userInfo ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={userInfo.picture} 
                      alt={userInfo.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {userInfo.name}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('user_session');
                      setIsLoggedIn(false);
                      setUserInfo(null);
                      trackEvent('logout', {
                        provider: 'google'
                      });
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    Logout
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
                  location: 'hero_section'
                });
              }}
              className="bg-cyan-600 dark:bg-cyan-600 text-yellow-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all hover:scale-105"
            >
              Experience Natural Voice
            </button>
            <button className="bg-gray-100 dark:bg-slate-700/80 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all backdrop-blur-sm">
              Learn More
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { icon: Clock, label: '<200ms', desc: 'Translation Latency' },
              { icon: Globe, label: '+36', desc: 'Languages Supported' },
              { icon: TrendingDown, label: '99.9%', desc: 'Cost Reduction' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-slate-800/60 backdrop-blur-md border border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:scale-105">
                <stat.icon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-3 mx-auto" />
                <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">{stat.label}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.desc}</div>
              </div>
            ))}
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
                  Experience real-time conversations with virtually no delay. Our proprietary Deep Tech architecture guarantees the lowest possible latency on the market. This is achieved using our advanced neural processing and Dedicated Real-Time Proxy, delivering consistent results, typically under 200ms.
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
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cost reduction</div>
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
                <span className="text-gray-400">// Latency: &lt;200ms to first byte</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Response Time', value: '<200ms' },
                { label: 'Success Rate', value: '99.99%' },
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
                SAVE 99.9%
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
            <div className="bg-gray-50 dark:bg-slate-800/60 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Free</h3>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">$0</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">Start with 20 minutes of Azure/Google WaveNet credits to experience ultra-low latency translation</div>
              <button className="w-full bg-cyan-600 dark:bg-cyan-600 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all">
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
            <div className="bg-gray-50 dark:bg-slate-800/60 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Basic</h3>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">Individual Use</div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">$29</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">/month</div>
              <button className="w-full bg-cyan-600 dark:bg-cyan-600 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all">
                Get Started
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
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 dark:from-orange-500/20 dark:to-orange-500/5 border-2 border-orange-500 rounded-2xl p-6 relative hover:shadow-2xl hover:shadow-orange-500/20 transition-all backdrop-blur-md">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Standard</h3>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-6">Power Users</div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">$59</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-6">/month</div>
              <button 
                onClick={() => {
                  trackEvent('pricing_click', {
                    plan: 'standard',
                    button_name: 'get_started',
                    price: 59
                  });
                }}
                className="w-full bg-cyan-600 dark:bg-cyan-600 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all hover:scale-105"
              >
                Get Started
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
            <div className="bg-gray-50 dark:bg-slate-800/60 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Pro</h3>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">Small Business B2B</div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">$99</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">/month</div>
              <button className="w-full bg-cyan-600 dark:bg-cyan-600 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all">
                Get Started
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
            <div className="bg-gray-50 dark:bg-slate-800/60 backdrop-blur-md border-2 border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all relative">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Team</h3>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">Corporate Use</div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">$299</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">/month</div>
              <button 
                onClick={() => {
                  trackEvent('pricing_click', {
                    plan: 'team',
                    button_name: 'contact_sales',
                    price: 299
                  });
                  setShowTeamContactForm(!showTeamContactForm);
                }}
                className="w-full bg-cyan-600 dark:bg-cyan-600 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-cyan-700 dark:hover:bg-cyan-700 transition-all"
              >
                Contact Sales
              </button>
              
              {/* Team Contact Form */}
              {showTeamContactForm && (
                <div className="absolute left-0 right-0 top-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Contact Sales Team</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Get custom pricing for your team</p>
                  </div>
                  <form 
                    action="https://a072605e.sibforms.com/serve/MUIFAI1nyV2qSAKSJGAspKvR0KiSgiYLdxeXxiqY6AgJQUt3pOresHoQgavDvKQ8Y7jrxfGZngDjEgEjPaU7EwbuEqhSFITodewdb1SPUwLDO67w-WzCb0UYX8qSD9pk8j97gy1kM9XbpHjsa7asCp6_kuv-YyWhFTNfMSr138l9fl17lxbpbAgVfg3eKQICoYGmIumYYmbAi-A0Eg=="
                    method="POST"
                    target="_blank"
                  >
                    <input 
                      type="text" 
                      name="YOUR_NAME" 
                      placeholder="Your Name" 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required 
                    />
                    <input 
                      type="email" 
                      name="YOUR_EMAIL" 
                      placeholder="Your Email" 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required 
                    />
                    <input 
                      type="text" 
                      name="COMPANY" 
                      placeholder="Company Name" 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required 
                    />
                    <input 
                      type="hidden" 
                      name="PLAN" 
                      value="Team Plan - $299/month" 
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-semibold transition-colors"
                    >
                      Send Request
                    </button>
                  </form>
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
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 dark:from-purple-600/20 dark:to-purple-600/5 border-2 border-purple-600 rounded-2xl p-6 relative hover:shadow-2xl hover:shadow-purple-600/20 transition-all backdrop-blur-md">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                ⭐ PREMIUM
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">EXECUTIVE PRO ANNUAL</h3>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-6">High-Value B2B</div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">$699</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-6">$999/year</div>
              <div className="text-orange-500 dark:text-orange-400 text-sm font-bold mb-4">KICKSTARTER EXCLUSIVE - $300 OFF RETAIL PRICE</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-6">Maximize Output: 200 Translation Hours Per Year</div>
              <button 
                onClick={() => {
                  trackEvent('pricing_click', {
                    plan: 'executive_pro_annual',
                    button_name: 'claim_spot',
                    price: 699
                  });
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-purple-600/50"
              >
                Claim Spot Now
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
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
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
