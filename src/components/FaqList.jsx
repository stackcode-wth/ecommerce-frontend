import { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';

function FaqList({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <article
          key={faq.q}
          className={`overflow-hidden rounded-2xl border bg-white transition-colors dark:bg-dark-surface ${
            openIndex === index
              ? 'border-brand/40 shadow-sm dark:border-accent/50'
              : 'border-gray-200/80 dark:border-dark-border'
          }`}
        >
          <button
            type="button"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            onClick={() => toggle(index)}
            className="flex w-full items-center gap-4 px-4 py-4 text-left text-gray-900 transition-colors hover:bg-card-light/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent dark:text-white dark:hover:bg-dark-elevated/60 sm:px-5"
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              openIndex === index
                ? 'bg-accent text-dark-bg'
                : 'bg-brand-light/50 text-brand dark:bg-dark-elevated dark:text-brand-light'
            }`}>
              <CircleHelp size={19} aria-hidden="true" />
            </span>
            <span className="flex-1 font-semibold">{faq.q}</span>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={`shrink-0 text-gray-500 transition-transform dark:text-gray-400 ${
                openIndex === index ? 'rotate-180 text-brand dark:text-accent' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div id={`faq-answer-${index}`} className="border-t border-gray-100 px-4 pb-5 pl-[4.5rem] pt-4 dark:border-dark-border sm:px-5 sm:pl-[4.75rem]">
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default FaqList;