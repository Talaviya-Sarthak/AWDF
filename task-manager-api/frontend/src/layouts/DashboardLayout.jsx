import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

/**
 * Shared app shell: leather sidebar + metal header + routed content.
 * Carries the warm light-gray page background with soft radial washes.
 * The sidebar becomes a slide-in drawer on mobile.
 */
const PAGE_BACKGROUND = [
  'flex',
  'min-h-screen',
  'bg-background',
  'bg-[radial-gradient(1100px_500px_at_85%_-10%,rgba(59,130,246,0.07),transparent_60%),radial-gradient(900px_500px_at_-10%_110%,rgba(217,165,32,0.06),transparent_60%)]',
  'antialiased',
].join(' ');

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={PAGE_BACKGROUND}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-[1400px] flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
