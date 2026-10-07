import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import { loginWithCredentials } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors((currentErrors) => ({
      ...currentErrors,
      [event.target.name]: undefined,
      submit: undefined,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.password === '') {
      newErrors.password = 'Please enter your password';
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
      const response = await loginWithCredentials(formData.email, formData.password);
      login(
        { name: formData.email.split('@')[0], email: formData.email },
        response.token,
      );
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        submit: error.message || 'Unable to log in. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-card-light p-6 dark:border-dark-border dark:bg-dark-surface">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Login to continue shopping.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {errors.submit && (
            <p role="alert" className="text-sm text-red-600">
              {errors.submit}
            </p>
          )}
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
            placeholder="Your password"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-brand py-3 font-medium text-white hover:bg-brand-dark"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          New here?{' '}
          <Link
            to="/register"
            className="font-medium text-brand hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;