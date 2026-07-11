import { Server } from 'lucide-react';

interface ApiHeroProps {
  version: string;
  protocol: string;
  title: string;
  description: string;
  baseUrl: string;
}

export function ApiHero({ version, protocol, title, description, baseUrl }: ApiHeroProps) {
  return (
    <div className="mb-14 bg-white/80 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl dark:shadow-black/50 relative overflow-hidden backdrop-blur-md transition-colors duration-300">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-wrap items-center gap-2.5 mb-5 relative z-10">
        <span className="px-3 py-1 text-xs font-bold bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30 rounded-full font-mono shadow-sm">
          {version} API Reference
        </span>
        <span className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700/80 rounded-full">
          {protocol}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight relative z-10">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed relative z-10">
        {description}
      </p>
      <div className="mt-6 inline-flex items-center gap-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800/80 rounded-xl px-4 py-3 relative z-10 shadow-inner">
        <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
        <code className="text-xs sm:text-sm font-mono text-cyan-700 dark:text-cyan-300 font-medium">
          {baseUrl}
        </code>
      </div>
    </div>
  );
}
