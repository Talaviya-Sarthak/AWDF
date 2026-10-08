import { NavLink } from 'react-router-dom';
import { FiGrid, FiCheckSquare, FiFolder, FiMail, FiX } from 'react-icons/fi';
import {
  cn,
  leatherSidebar,
  logoBadge,
  navItem,
  navItemActive,
  leatherPatch,
  btnIcon,
} from '../styles/classes.js';

/**
 * Navigation items for the leather sidebar.
 */
const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: <FiGrid />, end: true },
  { to: '/tasks', label: 'Tasks', icon: <FiCheckSquare />, end: false },
  { to: '/projects', label: 'Projects', icon: <FiFolder />, end: false },
  { to: '/contact', label: 'Contact', icon: <FiMail />, end: false },
];

const navClassName = ({ isActive }) => cn(navItem, isActive && navItemActive);

/**
 * Dark graphite leather sidebar.
 *
 * On desktop it is fixed on the left; on mobile it slides in as an overlay
 * drawer controlled by `open` / `onClose`.
 */
const Sidebar = ({ open, onClose }) => (
  <>
    {/* Mobile backdrop */}
    <div
      className={cn(
        'fixed inset-0 z-40 bg-graphite-950/60 backdrop-blur-sm transition-opacity lg:hidden',
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={onClose}
    />

    <aside
      className={cn(
        leatherSidebar,
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-200 lg:static lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
        <div className="flex items-center gap-3">
          <div className={logoBadge} aria-hidden="true">
            <FiCheckSquare />
          </div>
          <div>
            <p className="font-display text-base font-bold text-paper-100">
              TaskFlow
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper-300/50">
              Workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          className={cn(btnIcon, 'lg:hidden')}
          onClick={onClose}
          aria-label="Close navigation"
        >
          <FiX />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-6" aria-label="Main">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navClassName}
            onClick={onClose}
          >
            <span className="text-[17px]" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Leather patch widget */}
    
    </aside>
  </>
);

export default Sidebar;
