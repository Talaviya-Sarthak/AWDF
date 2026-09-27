import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { cn, paperCard, gloss, inputInset, btnPrimary, emboss } from '../styles/classes.js';
import Button from '../components/Button.jsx';

/**
 * Login page — centered card with email/password form.
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className={cn(paperCard, gloss, 'w-full max-w-md p-8')}>
        <div className="text-center mb-8">
          <h1 className={cn(emboss, 'font-display text-2xl font-bold text-graphite-800')}>
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-graphite-500">
            Sign in to your TaskFlow account
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Signing in...' : (
              <>
                <FiLogIn size={18} />
                Sign in
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-graphite-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-accent-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;