import { TableDef } from './types';

export function DataTable({ headers, rows, label }: TableDef) {
  return (
    <div className="my-5 overflow-x-auto custom-scrollbar rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm dark:shadow-lg dark:shadow-black/20">
      {label && (
        <div className="px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
          {label}
        </div>
      )}
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100/80 dark:bg-slate-950/90">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap border-b border-gray-200 dark:border-slate-800/80">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/80 dark:divide-slate-800/60">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'font-mono text-cyan-700 dark:text-cyan-300 font-medium text-xs sm:text-sm' : 'text-gray-700 dark:text-gray-300 text-xs sm:text-sm'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
