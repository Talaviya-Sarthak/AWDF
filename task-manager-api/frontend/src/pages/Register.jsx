import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { cn, paperCard, gloss, inputInset, btnPrimary, emboss } from '../styles/classes.js';
import Button from '../components/Button.jsx';

/**
 * Register page — centered card with email/password form.
 */
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className={cn(paperCard, gloss, 'w-full max-w-md p-8')}>
        <div className="text-center mb-8">
          <h1 className={cn(emboss, 'font-display text-2xl font-bold text-graphite-800')}>
            Create account
          </h1>
          <p className="mt-2 text-sm text-graphite-500">
            Join TaskFlow and start managing your tasks
          </p>
        </div>

        {error && (
          <div
            className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-graphite-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" size={18} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={cn(inputInset, 'w-full pl-10 pr-4 py-3 text-sm')}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-graphite-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" size={18} />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(inputInset, 'w-full pl-10 pr-4 py-3 text-sm')}
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <p className="mt-1 text-xs text-graphite-400">At least 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-graphite-700 mb-1.5">
              Confirm password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" size={18} />
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(inputInset, 'w-full pl-10 pr-4 py-3 text-sm')}
                required
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className={cn(btnPrimary, 'w-full py-3')}
            size="lg"
            disabled={loading}
          >
            {loading ? 'Creating account...' : (
              <>
                <FiUserPlus size={18} />
                Create account
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-graphite-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-accent-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;