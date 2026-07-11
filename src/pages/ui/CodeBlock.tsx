import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  label?: string;
}

export function CodeBlock({ code, language, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 my-4 text-sm shadow-md dark:shadow-lg dark:shadow-black/40 bg-slate-950/95">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="font-mono text-xs font-medium text-cyan-400 uppercase tracking-wider">
          {label ? `${language} — ${label}` : language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/60"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto custom-scrollbar font-mono text-gray-200 leading-relaxed bg-slate-950/90 text-xs sm:text-sm whitespace-pre">
        {code}
      </pre>
    </div>
  );
}
