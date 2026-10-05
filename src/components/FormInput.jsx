function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:bg-dark-elevated dark:text-white ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;