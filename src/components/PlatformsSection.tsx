import { memo } from 'react';
import { Globe, Layers, Mic, Shield } from 'lucide-react';

interface Props {
  isVisible: boolean;
  setRef: (id: string) => (el: HTMLElement | null) => void;
}

export const PlatformsSection = memo(({ isVisible: _isVisible, setRef }: Props) => (
  <section id="platforms" ref={setRef('platforms')} className="py-16 px-6 bg-gradient-to-b from-emerald-50/65 via-cyan-100/45 to-white/55 dark:from-gray-900/60 dark:via-gray-900/60 dark:to-gray-900/55 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
        <div>
          <div className="text-xs font-semibold tracking-[0.25em] text-gray-500 dark:text-gray-400 uppercase">
            For Platforms
          </div>
          <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Drop CYAN into the tools you already use
          </h3>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl">
            CYAN plugs straight into your existing meeting, streaming and collaboration tools via a
            lightweight extension, so you do not have to change your workflow.
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
          <p className="inline-block rounded-2xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 dark:from-cyan-500/20 dark:to-blue-500/20 border border-cyan-400/40 dark:border-cyan-300/30 px-4 py-3 text-gray-700 dark:text-cyan-100 shadow-sm">
            Most everyday platforms work out of the box through the CYAN extension. For more advanced
            setups, you can still route audio via virtual devices when you need to.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Layers,
            title: 'Desktop & OS',
            subtitle: 'Windows, macOS',
            description: 'Use CYAN alongside any desktop app. The audio engine runs on your machine, not only in the browser.',
            bgClass: 'bg-gradient-to-br from-slate-900 to-slate-800',
            borderClass: 'border-slate-700/80',
            titleClass: 'text-white',
            subtitleClass: 'text-slate-200',
            descClass: 'text-slate-200'
          },
          {
            icon: Globe,
            title: 'Video Meetings',
            subtitle: 'Zoom, Google Meet, Microsoft Teams, Gather, Whereby',
            description: 'Drop CYAN into your daily standups, customer calls and webinars without changing your meeting links.',
            bgClass: 'bg-gradient-to-br from-cyan-600 to-sky-500',
            borderClass: 'border-cyan-400/80',
            titleClass: 'text-white',
            subtitleClass: 'text-cyan-50/80',
            descClass: 'text-cyan-50/90'
          },
          {
            icon: Mic,
            title: 'Streaming & Creators',
            subtitle: 'Twitch and local recording tools',
            description: 'Feed CYAN into Twitch or your recording pipeline using the CYAN extension or optional system routing.',
            bgClass: 'bg-gradient-to-br from-purple-600 to-pink-500',
            borderClass: 'border-pink-400/80',
            titleClass: 'text-white',
            subtitleClass: 'text-pink-50/80',
            descClass: 'text-pink-50/90'
          },
          {
            icon: Shield,
            title: 'Contact Centers',
            subtitle: 'Call center, BPO and SIP tools',
            description: 'Use CYAN as a translation layer on top of your existing voice infrastructure and call flows.',
            bgClass: 'bg-gradient-to-br from-emerald-600 to-teal-500',
            borderClass: 'border-emerald-400/80',
            titleClass: 'text-white',
            subtitleClass: 'text-emerald-50/80',
            descClass: 'text-emerald-50/90'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col h-full rounded-2xl border backdrop-blur-md p-4 shadow-sm hover:shadow-lg hover:border-cyan-300/80 transition-all ${item.bgClass} ${item.borderClass}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${item.titleClass}`}>{item.title}</div>
                <div className={`text-xs ${item.subtitleClass}`}>{item.subtitle}</div>
              </div>
            </div>
            <p className={`text-xs leading-relaxed ${item.descClass}`}>{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs md:text-sm text-gray-600 dark:text-gray-400">
        Integrated with the tools you already use today: Zoom, Google Meet, Microsoft Teams, Discord,
        Slack, Twitch, Gather and Whereby.
      </div>
    </div>
  </section>
));
