import { FiChevronDown } from 'react-icons/fi';
import { cn, inputInset } from '../styles/classes.js';

/**
 * Inset select with a custom chevron (replaces the native arrow).
 * `className` sizes the wrapper; the native select fills it.
 */
const Select = ({ className = '', children, ...rest }) => (
  <div className={cn('relative', className)}>
    <select
      className={cn(inputInset, 'w-full cursor-pointer appearance-none pr-9 outline-none')}
      {...rest}
    >
      {children}
    </select>
    <FiChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-graphite-500"
    />
  </div>
);

export default Select;
