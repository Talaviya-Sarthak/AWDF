import { useLocation } from 'react-router-dom';
import { FiBell, FiMenu } from 'react-icons/fi';
import { formatToday } from '../utils/format.js';
import { cn, metalBar, metalText, avatar, btnIcon } from '../styles/classes.js';

/**
 * Page titles shown in the metal top bar, keyed by pathname.
 */
const PAGE_META = {
  '/': { title: 'Dashboard', subtitle: 'Your productivity overview' },
  '/tasks': { title: 'Tasks', subtitle: 'Manage and organize your work' },
};

/**
 * Brushed-metal top navigation.
 * Shows the hamburger menu on mobile, the current page title, today's date
 * and a notification/avatar cluster.
 */
const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] || {
    title: 'TaskFlow',
    subtitle: 'Workspace',
  };

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

        <div className={avatar} title="Jordan Doe" aria-hidden="true">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;
