import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import PageLoader from './components/PageLoader.jsx';
import { lazyWithMinDelay } from './utils/lazyWithDelay.js';

/**
 * Route-based Code Splitting (React.lazy + Suspense)
 *
 * Each route is bundled into an isolated JavaScript chunk and loaded on demand.
 * Supplementary Problem 2: Wrapped with lazyWithMinDelay(..., 300) to ensure
 * a smooth fallback presentation without flickering on fast connections.
 */
const Dashboard = lazyWithMinDelay(() => import('./pages/Dashboard.jsx'), 300);
const Tasks = lazyWithMinDelay(() => import('./pages/Tasks.jsx'), 300);
const Projects = lazyWithMinDelay(() => import('./pages/Projects.jsx'), 300);
const Contact = lazyWithMinDelay(() => import('./pages/Contact.jsx'), 300);
const Login = lazyWithMinDelay(() => import('./pages/Login.jsx'), 300);
const Register = lazyWithMinDelay(() => import('./pages/Register.jsx'), 300);
const NotFound = lazyWithMinDelay(() => import('./pages/NotFound.jsx'), 300);

/**
 * Inner routes component — handles authentication state and route suspense.
 */
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader message="Authenticating session..." />;
  }

  return (
    <Suspense fallback={<PageLoader message="Loading page module..." />}>
      <Routes>
        {/* Public auth routes — redirect to dashboard if already authenticated */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Protected workspace routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Global Catch-all */}
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </Suspense>
  );
};

/**
 * Application root — wraps route tree in AuthProvider.
 */
const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
