import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api.js';

/**
 * AuthContext — manages authentication state across the app.
 *
 * Provides:
 *   - user: currently logged-in user object (or null)
 *   - token: JWT string (or null)
 *   - login(email, password): authenticate and store credentials
 *   - register(email, password): create account and log in
 *   - logout(): clear credentials and redirect
 *   - loading: true while initial session restore is in progress
 */
const AuthContext = createContext(null);

/**
 * Internal hook to read the context — throws if used outside provider.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

/**
 * Provider component — wraps the app and restores session from localStorage.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore session from localStorage on mount.
   * Also validates the token by calling /api/auth/me.
   */
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          const { data } = await authApi.me();
          setUser(data.data);
          localStorage.setItem('user', JSON.stringify(data.data));
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  /**
   * Log in — calls backend, stores token + user, updates state.
   */
  const login = useCallback(async (email, password) => {
    const { data } = await authApi.login({ email, password });
    const { token: newToken, user: newUser } = data.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    return newUser;
  }, []);

  /**
   * Register — calls backend, then logs in automatically.
   */
  const register = useCallback(async (email, password) => {
    await authApi.register({ email, password });
    return login(email, password);
  }, [login]);

  /**
   * Log out — clears storage, state, and redirects to login.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};