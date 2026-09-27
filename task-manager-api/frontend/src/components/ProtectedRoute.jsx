import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner } from '../components/Spinner.jsx';

/**
 * ProtectedRoute — wraps routes that require authentication.
 *
 * If user is not logged in, redirects to /login with the original
 * destination in `state` so we can send them back after login.
 * Shows a spinner while the auth state is being restored.
 */
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};