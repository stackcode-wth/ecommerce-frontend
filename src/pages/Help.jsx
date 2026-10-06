import { Link } from 'react-router-dom';
import FaqList from '../components/FaqList';
import { faqs } from '../data/faqs';

function Help() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Answers to common questions.</p>

      <div className="mt-6">
        <FaqList faqs={faqs.slice(0, 4)} />
      </div>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        <Link to="/faqs" className="text-brand hover:underline">View all FAQs</Link>
        {' '}or{' '}
        <Link to="/contact" className="text-brand hover:underline">contact us</Link>
        {' '}if you still need help.
      </p>
    </div>
  );
}

export default Help;