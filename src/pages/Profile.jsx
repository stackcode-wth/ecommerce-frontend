import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-xl font-bold uppercase text-white">
            {user.name.charAt(0)}
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
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
            className="w-full rounded-lg bg-brand py-3 font-medium text-white hover:bg-brand-dark"
          >
            Save Changes
          </button>
          {saved && <p className="text-sm text-brand">Profile updated.</p>}
        </form>

        <button
          onClick={handleLogout}
          className="mt-4 w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-stone-100 dark:border-dark-border dark:text-gray-200 dark:hover:bg-dark-elevated"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;