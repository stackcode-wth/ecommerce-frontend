import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && passwordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/15 dark:bg-dark-elevated dark:text-white dark:focus:border-accent dark:focus:ring-accent/15 ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passwordVisible}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-gray-400 dark:hover:bg-dark-surface dark:hover:text-white"
          >
            {passwordVisible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        )}
      </div>

      {error && <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;