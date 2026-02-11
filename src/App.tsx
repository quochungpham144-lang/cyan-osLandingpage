import { useEffect, useRef, useState } from 'react';
import {
  Zap,
  Globe,
  DollarSign,
  Clock,
  Code,
  Mic,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  TrendingDown
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

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

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Floating CTA Button */}
      <a
        href="#pricing"
        className="fixed bottom-8 right-8 z-50 bg-[#00FFFF] text-[#0F172A] px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all duration-300 flex items-center gap-2 hover:scale-105"
      >
        Get Started <ArrowRight className="w-4 h-4" />
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00FFFF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#0F172A]" />
            </div>
            <span className="text-xl font-bold">Cyan-OS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#solution" className="text-sm hover:text-[#00FFFF] transition-colors">Solution</a>
            <a href="#engine" className="text-sm hover:text-[#00FFFF] transition-colors">Engine</a>
            <a href="#developers" className="text-sm hover:text-[#00FFFF] transition-colors">Developers</a>
            <a href="#pricing" className="text-sm hover:text-[#00FFFF] transition-colors">Pricing</a>
            <button className="bg-[#00FFFF] text-[#0F172A] px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
              Login
            </button>
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
          <div className="inline-block mb-4 px-4 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-full text-sm font-medium text-[#00FFFF]">
            <Zap className="w-4 h-4 inline mr-2" />
            Powered by Cyan-OS Lite
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0F172A] to-[#00FFFF] bg-clip-text text-transparent">
            Global Communication<br />Powered by Cyan-OS Lite
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Real-time translation with <span className="text-[#00FFFF] font-semibold">&lt;200ms latency</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-[#00FFFF] text-[#0F172A] px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all hover:scale-105">
              Start Free Trial
            </button>
            <button className="bg-white text-[#0F172A] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-[#00FFFF] transition-all">
              View Documentation
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { icon: Clock, label: '<200ms', desc: 'Translation Latency' },
              { icon: Globe, label: '100+', desc: 'Languages Supported' },
              { icon: TrendingDown, label: '99.9%', desc: 'Cost Reduction' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl transition-all">
                <stat.icon className="w-10 h-10 text-[#00FFFF] mb-3 mx-auto" />
                <div className="text-3xl font-bold mb-1">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section
        id="problem"
        ref={setRef('problem')}
        className={`py-20 px-6 bg-white transition-all duration-1000 delay-200 ${
          isVisible.problem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Global Communication Crisis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Traditional translation methods are holding businesses back
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Language Barriers',
                desc: 'Companies lose millions in opportunities due to inability to communicate across 100+ languages in real-time',
                impact: '72% of global consumers prefer content in their native language'
              },
              {
                icon: Clock,
                title: 'Production Delays',
                desc: 'Traditional dubbing and translation takes weeks or months, causing massive time-to-market delays',
                impact: 'Average 6-8 weeks for professional translation'
              },
              {
                icon: DollarSign,
                title: 'Prohibitive Costs',
                desc: 'Manual recording and professional voice actors cost $100-300 per hour, making it impossible to scale',
                impact: '$100-300/hour for professional voice recording'
              }
            ].map((problem, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-[#00FFFF] transition-all">
                <problem.icon className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{problem.title}</h3>
                <p className="text-gray-600 mb-4">{problem.desc}</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  {problem.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="solution"
        ref={setRef('solution')}
        className={`py-20 px-6 bg-gradient-to-b from-white to-[#F8FAFC] transition-all duration-1000 delay-300 ${
          isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Cyan-OS Solution</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hybrid AI Pipeline for instant, natural translation
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border-2 border-[#00FFFF]/30 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {[
                { step: '1', title: 'Speech-to-Text', icon: Mic, desc: 'Real-time audio capture' },
                { step: '2', title: 'Neural Translation', icon: Sparkles, desc: 'Context-aware translation' },
                { step: '3', title: 'ElevenLabs TTS', icon: Zap, desc: 'Natural voice synthesis' }
              ].map((stage, idx) => (
                <div key={idx} className="flex-1">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00FFFF] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00FFFF]/30">
                      <stage.icon className="w-8 h-8 text-[#0F172A]" />
                    </div>
                    <div className="text-xs font-bold text-[#00FFFF] mb-2">STEP {stage.step}</div>
                    <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                    <p className="text-gray-600 text-sm">{stage.desc}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block text-center mt-8">
                      <ArrowRight className="w-8 h-8 text-[#00FFFF] mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Process translations in under 200ms with optimized AI pipelines' },
              { icon: Shield, title: 'Enterprise Grade', desc: '99.99% uptime SLA with bank-level security' },
              { icon: Globe, title: 'Global Scale', desc: 'Support 100+ languages with natural-sounding voices' },
              { icon: Layers, title: 'Intelligent Routing', desc: 'Automatic failover and multi-provider redundancy' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <feature.icon className="w-10 h-10 text-[#00FFFF] mb-3" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engine Section */}
      <section
        id="engine"
        ref={setRef('engine')}
        className={`py-20 px-6 bg-white transition-all duration-1000 delay-400 ${
          isVisible.engine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cyan-OS Lite API</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade voice cloning and streaming infrastructure
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
                  <div key={idx} className="flex gap-4 items-start bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <div className="w-12 h-12 bg-[#00FFFF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#0F172A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0F172A] rounded-2xl p-8 border-2 border-[#00FFFF]/30 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-3 text-gray-400 text-sm">Architecture Overview</span>
              </div>
              <div className="bg-[#1E293B] rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-[#00FFFF] mb-4">// Cyan-OS Lite Engine</div>
                <div className="text-gray-300">
                  <span className="text-purple-400">interface</span> <span className="text-yellow-300">Pipeline</span> {'{\n'}
                  <span className="ml-4 text-gray-400">// Step 1: Speech Recognition</span>{'\n'}
                  <span className="ml-4 text-blue-400">stt</span>: <span className="text-green-400">DeepgramAPI</span>{'\n'}
                  {'\n'}
                  <span className="ml-4 text-gray-400">// Step 2: Neural Translation</span>{'\n'}
                  <span className="ml-4 text-blue-400">translate</span>: <span className="text-green-400">GPT4</span>{'\n'}
                  {'\n'}
                  <span className="ml-4 text-gray-400">// Step 3: Voice Synthesis</span>{'\n'}
                  <span className="ml-4 text-blue-400">tts</span>: <span className="text-green-400">ElevenLabs</span>{'\n'}
                  {'\n'}
                  <span className="ml-4 text-gray-400">// Real-time streaming</span>{'\n'}
                  <span className="ml-4 text-blue-400">latency</span>: <span className="text-yellow-300">"&lt;200ms"</span>{'\n'}
                  {'}'}
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
        className={`py-20 px-6 bg-gradient-to-b from-white to-[#F8FAFC] transition-all duration-1000 delay-500 ${
          isVisible.developers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-full px-4 py-2 mb-4">
              <Code className="w-4 h-4 text-[#00FFFF]" />
              <span className="text-sm font-medium text-[#00FFFF]">Developer API</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Developers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, powerful API that scales from prototype to production
            </p>
          </div>

          <div className="bg-[#0F172A] rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#00FFFF]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">API Request Example</span>
            </div>

            <div className="bg-[#1E293B] rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-300">
                <span className="text-pink-400">POST</span> <span className="text-[#00FFFF]">/api/tts/clone-and-stream</span>{'\n\n'}

                <span className="text-gray-400">// Request Headers</span>{'\n'}
                <span className="text-purple-400">Authorization</span>: <span className="text-green-400">"Bearer YOUR_API_KEY"</span>{'\n'}
                <span className="text-purple-400">Content-Type</span>: <span className="text-green-400">"application/json"</span>{'\n\n'}

                <span className="text-gray-400">// Request Body</span>{'\n'}
                {'{\n'}
                <span className="ml-4 text-blue-400">"text"</span>: <span className="text-green-400">"Hello, welcome to Cyan-OS"</span>,{'\n'}
                <span className="ml-4 text-blue-400">"voice_id"</span>: <span className="text-green-400">"custom_voice_123"</span>,{'\n'}
                <span className="ml-4 text-blue-400">"language"</span>: <span className="text-green-400">"en-US"</span>,{'\n'}
                <span className="ml-4 text-blue-400">"streaming"</span>: <span className="text-yellow-300">true</span>{'\n'}
                {'}\n\n'}

                <span className="text-gray-400">// Response: Audio stream chunks</span>{'\n'}
                <span className="text-gray-400">// Latency: &lt;200ms to first byte</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Response Time', value: '<200ms' },
                { label: 'Success Rate', value: '99.99%' },
                { label: 'Concurrent Requests', value: 'Unlimited' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#00FFFF] mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section
        id="roi"
        ref={setRef('roi')}
        className={`py-20 px-6 bg-white transition-all duration-1000 delay-600 ${
          isVisible.roi ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Unmatched ROI</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how much you save by switching to Cyan-OS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Method */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-red-600 text-sm font-bold mb-2">TRADITIONAL METHOD</div>
                <h3 className="text-3xl font-bold text-red-700">Manual Recording</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Voice Actor (per hour)</span>
                  <span className="font-bold text-red-700">$100-300</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Studio Time</span>
                  <span className="font-bold text-red-700">$50-150/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Post-Production</span>
                  <span className="font-bold text-red-700">$75-200/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Timeline</span>
                  <span className="font-bold text-red-700">6-8 weeks</span>
                </div>
                <div className="border-t-2 border-red-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Cost (10 hours)</span>
                    <span className="text-3xl font-bold text-red-700">$2,250+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyan-OS Method */}
            <div className="bg-[#00FFFF]/10 border-2 border-[#00FFFF] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#00FFFF] text-[#0F172A] px-3 py-1 rounded-full text-xs font-bold">
                SAVE 99.9%
              </div>
              <div className="text-center mb-6">
                <div className="text-[#00FFFF] text-sm font-bold mb-2">CYAN-OS API</div>
                <h3 className="text-3xl font-bold text-[#0F172A]">Automated Pipeline</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cost per 1k characters</span>
                  <span className="font-bold text-[#00FFFF]">$0.10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Setup Time</span>
                  <span className="font-bold text-[#00FFFF]">5 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Processing Time</span>
                  <span className="font-bold text-[#00FFFF]">Real-time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Timeline</span>
                  <span className="font-bold text-[#00FFFF]">Instant</span>
                </div>
                <div className="border-t-2 border-[#00FFFF] pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Cost (10 hours)</span>
                    <span className="text-3xl font-bold text-[#00FFFF]">$2.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-[#00FFFF]/20 to-[#00FFFF]/10 border border-[#00FFFF] rounded-2xl p-8">
              <div className="text-5xl font-bold text-[#0F172A] mb-2">$2,247.50</div>
              <div className="text-xl text-gray-600">Saved per 10 hours of content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={setRef('pricing')}
        className={`py-20 px-6 bg-gradient-to-b from-white to-[#F8FAFC] transition-all duration-1000 delay-700 ${
          isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-1">$0</div>
              <div className="text-gray-600 text-sm mb-6">Perfect for testing</div>
              <button className="w-full bg-gray-100 text-[#0F172A] py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                Start Free
              </button>
              <ul className="mt-8 space-y-3">
                {['1,000 characters/month', '1 voice clone', 'Standard latency', 'Community support'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tier */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-1">$99</div>
              <div className="text-gray-600 text-sm mb-6">per month</div>
              <button className="w-full bg-[#0F172A] text-white py-3 rounded-lg font-semibold hover:bg-[#1E293B] transition-all">
                Get Started
              </button>
              <ul className="mt-8 space-y-3">
                {['100k characters/month', '5 voice clones', 'Priority processing', 'Email support', 'API access', 'Custom models'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Executive Tier */}
            <div className="bg-gradient-to-br from-[#00FFFF]/20 to-[#00FFFF]/5 border-2 border-[#00FFFF] rounded-2xl p-8 relative hover:shadow-2xl hover:shadow-[#00FFFF]/20 transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FFFF] text-[#0F172A] px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold mb-2">Executive Pro Annual</h3>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold">$699</span>
                <span className="text-gray-600 text-sm mb-1">/year</span>
              </div>
              <div className="text-[#00FFFF] text-sm mb-6 font-semibold">Save $489 vs monthly</div>
              <button className="w-full bg-[#00FFFF] text-[#0F172A] py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FFFF]/30 transition-all">
                Get Executive Pro
              </button>
              <ul className="mt-8 space-y-3">
                {[
                  'Unlimited characters',
                  'Unlimited voice clones',
                  '<200ms latency guarantee',
                  '24/7 priority support',
                  'Dedicated account manager',
                  'Custom integrations',
                  'SLA guarantee',
                  'Advanced analytics'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#00FFFF] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#0F172A]" />
                </div>
                <span className="text-xl font-bold">Cyan-OS</span>
              </div>
              <p className="text-gray-400 text-sm">
                Next-generation AI translation powered by Cyan-OS Lite
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2024 Cyan-OS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
