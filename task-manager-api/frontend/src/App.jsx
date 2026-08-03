import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Application routes.
 *
 * Every page renders inside the shared DashboardLayout (leather sidebar,
 * metal top bar and the page outlet).
 */
const App = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
