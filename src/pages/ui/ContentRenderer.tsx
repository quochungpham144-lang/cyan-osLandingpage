import { ContentBlock } from './types';
import { CodeBlock } from './CodeBlock';
import { DataTable } from './DataTable';

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export function ContentRenderer({ blocks }: ContentRendererProps) {
  const renderBlock = (block: ContentBlock, i: number) => {
    if (block.type === 'paragraph') {
      return (
        <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: block.text }} />
      );
    }
    if (block.type === 'heading') {
      return (
        <h3 key={i} className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2 flex items-center gap-2 border-l-2 border-cyan-500 pl-2.5">
          {block.text}
        </h3>
      );
    }
    if (block.type === 'code') {
      return <CodeBlock key={i} code={block.code!} language={block.language!} label={block.label} />;
    }
    if (block.type === 'callout') {
      return (
        <div
          key={i}
          className={`border-l-4 rounded-r-xl p-4 shadow-sm ${
            block.variant === 'warning'
              ? 'bg-orange-500/10 border-orange-500 text-orange-900 dark:text-orange-200 border-t border-b border-r border-orange-500/20'
              : 'bg-cyan-500/10 border-cyan-500 text-cyan-900 dark:text-cyan-200 border-t border-b border-r border-cyan-500/20'
          }`}
        >
          <p className="text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: block.text }}></p>
        </div>
      );
    }
    if (block.type === 'steps') {
      return (
        <ol key={i} className="space-y-3 list-none bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-xl p-5">
          {block.items?.map((item, si) => (
            <li key={si} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs flex items-center justify-center font-bold mt-0.5 shadow-inner">
                {si + 1}
              </span>
              <span className="pt-0.5" dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ol>
      );
    }
    if (block.type === 'table') {
      return <DataTable key={i} headers={block.headers!} rows={block.rows!} label={block.label} />;
    }
    return null;
  };

  const hasCode = blocks.some(b => b.type === 'code');
  if (!hasCode) {
    return (
      <div className="space-y-4 max-w-4xl">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    );
  }

  // Group blocks into rows each time a new heading starts, creating 2-column layout with short-right-side sticky
  const rows: { left: ContentBlock[]; right: ContentBlock[] }[] = [];
  let current: { left: ContentBlock[]; right: ContentBlock[] } = { left: [], right: [] };

  blocks.forEach(block => {
    if (block.type === 'heading' && (current.left.length > 0 || current.right.length > 0)) {
      rows.push(current);
      current = { left: [], right: [] };
    }
    if (block.type === 'code') {
      current.right.push(block);
    } else {
      current.left.push(block);
    }
  });
  if (current.left.length > 0 || current.right.length > 0) {
    rows.push(current);
  }

  return (
    <div className="space-y-8 my-6">
      {rows.map((row, ri) => {
        if (row.right.length === 0) {
          return (
            <div key={ri} className="space-y-4 max-w-4xl">
              {row.left.map((b, bi) => renderBlock(b, bi))}
            </div>
          );
        }
        return (
          <div key={ri} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (long text/steps, stretches row height) */}
            <div className="lg:col-span-7 space-y-4">
              {row.left.map((b, bi) => renderBlock(b, bi))}
            </div>
            {/* Right Column Grid Wrapper */}
            <div className="lg:col-span-5">
              {/* Inner Sticky Container (short right side sticks at top-6 until long left finishes) */}
              <div className="space-y-4 lg:sticky lg:top-6 lg:z-10">
                {row.right.map((b, bi) => renderBlock(b, bi))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
