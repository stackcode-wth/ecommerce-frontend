import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react';

const initialForm = { name: '', email: '', message: '' };

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 00000 00000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'support@m&mshop.com',
  },
  {
    icon: Clock,
    label: 'Working hours',
    value: 'Mon - Sat, 9 AM - 6 PM',
  },
];

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
    'mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15 dark:border-dark-border dark:bg-dark-elevated dark:text-white dark:focus:border-accent dark:focus:ring-accent/15';

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Contact Us
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-dark-elevated dark:text-accent">
              <Headphones size={14} aria-hidden="true" />
              We are happy to help
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Lets get in <span className="text-brand dark:text-accent">touch</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Have a question about an order or need a hand? Send us a message and our team will get back to you.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/60 text-brand dark:bg-accent/15 dark:text-accent">
              <MessageSquare size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Fill out the form below with a few details, and we will be in touch.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand dark:text-accent">
              <Clock size={16} aria-hidden="true" />
              Mon - Sat, 9 AM - 6 PM
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid items-start gap-6 md:mt-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
            Contact details
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            We are here for you
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Reach out through any of the options below, or send us a message using the form.
          </p>

          <div className="mt-6 space-y-3">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <article
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 dark:border-dark-border dark:bg-dark-surface sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-amber-700 dark:bg-accent/15 dark:text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{label}</h3>
                  <p className="mt-1 break-words text-sm text-gray-600 dark:text-gray-300">{value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-dark-border dark:bg-dark-surface sm:p-7"
          noValidate
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Write to us</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Fields marked below are required.
          </p>

          <div className="mt-5">
            <label htmlFor="contact-name" className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={inputClass}
            />
            {errors.name && <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="contact-email" className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Email address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={inputClass}
            />
            {errors.email && <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="text-sm font-medium text-gray-800 dark:text-gray-200">
              How can we help?
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a little about what you need..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={`${inputClass} resize-y`}
            />
            {errors.message && <p id="contact-message-error" role="alert" className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90 sm:w-auto"
          >
            Send Message <ArrowRight size={18} aria-hidden="true" />
          </button>

          {submitted && (
            <p role="status" className="mt-4 rounded-xl bg-brand-light/30 px-4 py-3 text-sm font-medium text-brand dark:bg-dark-elevated dark:text-accent">
              Thanks! We will contact you soon.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Contact;
