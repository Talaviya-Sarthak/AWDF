import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FiBell, FiMenu, FiLogOut, FiUser } from 'react-icons/fi';
import { formatToday } from '../utils/format.js';
import { cn, metalBar, metalText, avatar, btnIcon, btnGhost } from '../styles/classes.js';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Page titles shown in the metal top bar, keyed by pathname.
 */
const PAGE_META = {
  '/': { title: 'Dashboard', subtitle: 'Your productivity overview' },
  '/tasks': { title: 'Tasks', subtitle: 'Manage and organize your work' },
  '/projects': { title: 'Projects', subtitle: 'Workspace initiatives & roadmaps' },
  '/contact': { title: 'Contact & Support', subtitle: 'Get in touch with our team' },
};

/**
 * Get initials from email or name.
 */
const getInitials = (email) => {
  if (!email) return 'U';
  const namePart = email.split('@')[0];
  const parts = namePart.split('.');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return namePart.slice(0, 2).toUpperCase();
};

/**
 * Brushed-metal top navigation.
 * Shows the hamburger menu on mobile, the current page title, today's date
 * and a notification/avatar cluster with user menu.
 */
const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const meta = PAGE_META[location.pathname] || {
    title: 'TaskFlow',
    subtitle: 'Workspace',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={cn(metalBar, 'sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-3 sm:px-8')}>
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className={cn(btnIcon, 'lg:hidden')}
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <FiMenu />
        </button>

        <div className="min-w-0">
          <h1 className={cn(metalText, 'truncate font-display text-lg font-bold text-graphite-800')}>
            {meta.title}
          </h1>
          <p className={cn(metalText, 'truncate text-xs text-graphite-500')}>
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className={cn(metalText, 'hidden text-sm font-medium text-graphite-600 md:block')}>
          {formatToday()}
        </span>

        <button type="button" className={btnIcon} aria-label="Notifications">
          <FiBell />
        </button>

        {user ? (
          <div className="relative" ref={dropdownRef} id="user-menu">
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <div className={avatar} title={user.email} aria-hidden="true">
                {getInitials(user.email)}
              </div>
              <span className="hidden sm:block text-sm font-medium text-graphite-700">
                {user.email.split('@')[0]}
              </span>
              <FiUser className="text-graphite-400" size={16} />
            </button>

            {!isOpen ? null : (
              <div
                id="user-dropdown"
                className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-paper-200 bg-white shadow-lg overflow-hidden z-50 animate-fade-in"
                role="menu"
              >
                <div className="px-4 py-3 border-b border-paper-200 bg-paper-100/60">
                  <p className="text-xs font-medium text-graphite-500">Signed in as</p>
                  <p className="text-sm text-graphite-800 truncate">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className={cn(btnGhost, 'w-full justify-start px-4 py-2 text-sm text-graphite-700 hover:bg-red-50 hover:text-red-600')}
                  role="menuitem"
                >
                  <FiLogOut className="mr-2" size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={avatar} title="Guest" aria-hidden="true">
            GD
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
