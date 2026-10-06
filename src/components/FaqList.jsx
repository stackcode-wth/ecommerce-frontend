import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FaqList({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.q}
          className="rounded-xl border border-gray-200 bg-white dark:border-dark-border dark:bg-dark-surface"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-white"
          >
            {faq.q}
            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === index && (
            <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqList;