import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    
    console.log('Login (demo):', { email: formData.email });
    setSubmitted(true);
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
            className="w-full rounded-lg bg-brand py-3 font-medium text-white hover:bg-brand-dark"
          >
            Login
          </button>
        </form>

        {submitted && (
          <p className="mt-4 rounded-lg bg-brand-light px-3 py-2 text-sm text-brand dark:bg-dark-elevated">
            Demo only: the form is valid. Real login will work once the backend
            is connected.
          </p>
        )}

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