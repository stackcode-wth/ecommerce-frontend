import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import FormInput from '../components/FormInput';
import { registerWithCredentials } from '../services/api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors((currentErrors) => ({
      ...currentErrors,
      [event.target.name]: undefined,
      submit: undefined,
    }));
    setSuccessMessage('');
  };

  const validate = () => {
    const newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await registerWithCredentials(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
      );
      setSuccessMessage('Account created successfully. Please log in.');
    } catch (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        submit: error.message || 'Unable to create your account. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-accent/15 dark:text-accent">
              <UserRound size={14} aria-hidden="true" />
              Your shopping starts here
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Make yourself <span className="text-brand dark:text-accent">at home</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Create an account to keep track of orders, save your favorites, and enjoy a smoother shopping experience.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              Quick, simple, and secure sign up
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm dark:border-dark-border dark:bg-dark-elevated sm:p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <LockKeyhole size={23} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Add your details to get started.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {errors.submit && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
                  {errors.submit}
                </p>
              )}
              {successMessage && (
                <p role="status" className="rounded-xl bg-brand-light/30 px-4 py-3 text-sm text-brand dark:bg-dark-surface dark:text-accent">
                  {successMessage}{' '}
                  <Link to="/login" className="font-semibold underline">
                    Log in
                  </Link>
                </p>
              )}
              <FormInput
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your name"
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="At least 6 characters"
              />
              <FormInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Type the password again"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
                {!isSubmitting && <ArrowRight size={17} aria-hidden="true" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand hover:underline dark:text-accent">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;