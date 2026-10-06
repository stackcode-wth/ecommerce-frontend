import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How do I track my order?', a: 'Open Track Order from the account menu and enter your order ID.' },
  { q: 'What is your return policy?', a: 'You can return items within 30 days of delivery.' },
  { q: 'Is shipping free?', a: 'Yes, shipping is free on orders over $50.' },
  { q: 'Is my payment secure?', a: 'Yes, all payments are 100% secure.' },
];

function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Answers to common questions.</p>

      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => (
          <div key={faq.q} className="rounded-xl border border-gray-200 bg-white dark:border-dark-border dark:bg-dark-surface">
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-white"
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === index && (
              <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;