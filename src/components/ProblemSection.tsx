import { memo } from 'react';
import { Globe, Clock, Mic } from 'lucide-react';

interface Props {
  isVisible: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const ProblemSection = memo(({ isVisible, setRef }: Props) => (
  <section
    id="problem"
    ref={setRef('problem')}
    className={`py-20 px-6 bg-gradient-to-b from-white/50 via-cyan-50/40 to-white/45 dark:from-gray-900/60 dark:via-gray-900/60 dark:to-gray-900/55 backdrop-blur-sm transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">The Challenges We Solve</h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Breaking down the barriers that prevent seamless global communication
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Globe,
            title: 'COMMUNICATION GAPS',
            desc: 'Language barriers create misunderstandings and lost opportunities in critical business conversations, limiting global collaboration and growth potential.',
            pillClass: 'from-pink-500/20 to-rose-500/20 border-pink-400/50 text-pink-700 dark:text-pink-200 dark:border-pink-300/40',
            cardBorderClass: 'border-pink-300/70 dark:border-pink-400/40'
          },
          {
            icon: Clock,
            title: 'TIME DELAYS',
            desc: 'Traditional translation methods slow down meetings and decision-making, causing frustration and reducing productivity in time-sensitive situations.',
            pillClass: 'from-amber-500/20 to-orange-500/20 border-amber-400/50 text-amber-700 dark:text-amber-200 dark:border-amber-300/40',
            cardBorderClass: 'border-amber-300/70 dark:border-amber-400/40'
          },
          {
            icon: Mic,
            title: 'UNNATURAL VOICES',
            desc: 'Robotic, monotone AI voices diminish the human connection and emotional nuance essential for building trust in professional relationships.',
            pillClass: 'from-violet-500/20 to-fuchsia-500/20 border-violet-400/50 text-violet-700 dark:text-violet-200 dark:border-violet-300/40',
            cardBorderClass: 'border-violet-300/70 dark:border-violet-400/40'
          }
        ].map((challenge, idx) => (
          <div key={idx} className={`bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200/80 dark:border-slate-800/80 rounded-2xl p-8 ${challenge.cardBorderClass} hover:border-cyan-500/50 dark:hover:border-cyan-400/50 shadow-sm hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-300`}>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 shadow-sm">
              <challenge.icon className="w-6 h-6" />
            </div>
            <h3 className={`inline-flex rounded-full px-3.5 py-1 text-xs sm:text-sm font-bold mb-3 border bg-gradient-to-r ${challenge.pillClass}`}>{challenge.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{challenge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
));
