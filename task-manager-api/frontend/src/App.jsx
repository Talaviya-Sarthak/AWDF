import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Inner routes component — separates auth logic from provider setup.
 */
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-accent-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public auth routes — redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Protected routes — require authentication */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Catch-all — redirect to login if not authenticated, else dashboard */}
      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  );
};

/**
 * Application root — wraps everything in AuthProvider.
 */
const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
