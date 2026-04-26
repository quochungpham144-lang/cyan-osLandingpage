import { memo } from 'react';

export const ListingsSection = memo(() => (
  <section className="py-12 px-6 border-y border-gray-100 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center lg:items-start gap-1 flex-shrink-0">
          <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-600 dark:text-cyan-400 uppercase">Recognized By</span>
          <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">Featured on leading AI directories</h3>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 max-w-4xl">
          {[
            {
              name: 'Product Hunt',
              href: 'https://www.producthunt.com/products/cyan-ultra-low-latency-ai-translator',
              color: 'hover:border-[#DA552F] hover:bg-[#DA552F]/5',
              textColor: 'hover:text-[#DA552F]',
              icon: 'https://www.vectorlogo.zone/logos/producthunt/producthunt-icon.svg'
            },
            {
              name: 'NextGen Tools',
              href: 'https://www.nxgntools.com/tools/cyan-ultra-low-latency-ai-translator',
              color: 'hover:border-cyan-500 hover:bg-cyan-500/5',
              textColor: 'hover:text-cyan-600 dark:hover:text-cyan-400',
              icon: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg' // Fallback to tech icon
            },
            {
              name: 'DevHub',
              href: 'https://devhub.best/projects/cyan-ultra-low-latency-ai-translator',
              color: 'hover:border-purple-500 hover:bg-purple-500/5',
              textColor: 'hover:text-purple-600 dark:hover:text-purple-400',
              icon: 'https://www.vectorlogo.zone/logos/github/github-icon.svg' // Fallback to dev icon
            },
            {
              name: 'VibeRank',
              href: 'https://viberank.dev/apps/CYAN%3A%20Ultra-Low%20Latency%20AI%20Translator',
              color: 'hover:border-emerald-500 hover:bg-emerald-500/5',
              textColor: 'hover:text-emerald-600 dark:hover:text-emerald-400',
              icon: 'https://www.vectorlogo.zone/logos/discordapp/discordapp-icon.svg' // Fallback to community icon
            }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${item.color}`}
            >
              <div className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300">
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${item.name[0]}&background=random&color=fff&size=32`;
                  }}
                />
              </div>
              <span className={`text-xs font-semibold text-gray-500 dark:text-gray-400 transition-colors ${item.textColor}`}>
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
));
