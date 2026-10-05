import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

 
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-light text-lg hover:bg-brand hover:text-white dark:bg-dark-elevated dark:hover:bg-dark-hover"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;