import { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const initialForm = { name: '', email: '', message: '' };

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    setSubmitted(true);
    setFormData(initialForm);
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-dark-border dark:bg-dark-elevated dark:text-white';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Have a question? Send us a message and we will get back to you.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
            <Phone size={20} className="mt-1 text-brand" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-sm">+91 00000 00000</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
            <Mail size={20} className="mt-1 text-brand" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm">support@m&mshop.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
            <Clock size={20} className="mt-1 text-brand" />
            <div>
              <p className="font-semibold">Working hours</p>
              <p className="text-sm">Mon - Sat, 9 AM - 6 PM</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input name="name" value={formData.name} onChange={handleChange}
              placeholder="Your name" className={inputClass} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              placeholder="Your email" className={inputClass} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <textarea name="message" rows={5} value={formData.message} onChange={handleChange}
              placeholder="Your message" className={inputClass} />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>
          <button type="submit"
            className="rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark">
            Send Message
          </button>
          {submitted && <p className="text-sm text-brand">Thanks! We will contact you soon.</p>}
        </form>
      </div>
    </div>
  );
}

export default Contact;