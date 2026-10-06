import FaqList from '../components/FaqList';
import { faqs } from '../data/faqs';

function FAQs() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <div className="mt-6">
        <FaqList faqs={faqs} />
      </div>
    </div>
  );
}

export default FAQs;