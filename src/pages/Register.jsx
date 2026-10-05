import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

   
    if (Object.keys(newErrors).length > 0) return;

  
    console.log('Register (demo):', {
      name: formData.name,
      email: formData.email,
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-card-light p-6 dark:border-dark-border dark:bg-dark-surface">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Join us and start shopping.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
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
            className="w-full rounded-lg bg-brand py-3 font-medium text-white hover:bg-brand-dark"
          >
            Register
          </button>
        </form>

        {submitted && (
          <p className="mt-4 rounded-lg bg-brand-light px-3 py-2 text-sm text-brand dark:bg-dark-elevated">
            Demo only: the form is valid. Real registration will work once the
            backend is connected.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;