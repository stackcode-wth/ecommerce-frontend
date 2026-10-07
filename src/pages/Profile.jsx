import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim().length < 2) {
      setError('Please enter your name');
      setSaved(false);
      return;
    }

    setError('');
    // TODO: backend ready hone par yahan PUT /api/users/me call hoga
    updateUser({ name: name.trim() });
    setSaved(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand dark:hover:text-accent">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          My Profile
        </span>
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-card-light px-6 py-8 dark:bg-dark-surface sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-brand/5 dark:border-accent/5" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:bg-accent/15 dark:text-accent">
              <UserRound size={14} aria-hidden="true" />
              Your account, your details
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              My <span className="text-brand dark:text-accent">Profile</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
              Manage your personal details and keep your account information up to date.
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm dark:border-dark-border dark:bg-dark-elevated">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-light/50 text-xl font-bold uppercase text-brand dark:bg-accent/15 dark:text-accent">
              {user.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-900 dark:text-white">{user.name}</p>
              <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand dark:text-accent">
                <ShieldCheck size={14} aria-hidden="true" />
                Account details
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-3xl sm:mt-12" aria-labelledby="profile-details">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand dark:text-accent">
            Personal information
          </p>
          <h2 id="profile-details" className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Your account details
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-dark-border dark:bg-dark-surface sm:p-7">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-5 dark:border-dark-border">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light/50 text-brand dark:bg-accent/15 dark:text-accent">
              <UserRound size={21} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Profile information</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Update the name associated with your account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <FormInput
              label="Full name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={error}
              placeholder="Your name"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-dark-bg shadow-sm transition hover:bg-accent/90 sm:w-auto"
            >
              Save Changes <ArrowRight size={17} aria-hidden="true" />
            </button>
            {saved && (
              <p role="status" className="rounded-xl bg-brand-light/30 px-4 py-3 text-sm font-medium text-brand dark:bg-dark-elevated dark:text-accent">
                Profile updated.
              </p>
            )}
          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 dark:border-dark-border">
            <button
              onClick={handleLogout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-stone-100 dark:border-dark-border dark:text-gray-200 dark:hover:bg-dark-elevated sm:w-auto"
            >
              <LogOut size={17} aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;