import { Section } from './types';
import { ContentRenderer } from './ContentRenderer';
import { EndpointBlock } from './EndpointBlock';

interface SectionBlockProps {
  section: Section;
}

export function SectionBlock({ section }: SectionBlockProps) {
  return (
    <section id={section.id} className="scroll-mt-28 pt-14 pb-8 border-t border-gray-200 dark:border-slate-800/80">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{section.label}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-4xl">{section.description}</p>

      {section.content && <ContentRenderer blocks={section.content} />}
      {section.endpoints && section.endpoints.map(ep => <EndpointBlock key={ep.id} ep={ep} />)}
    </section>
  );
}
