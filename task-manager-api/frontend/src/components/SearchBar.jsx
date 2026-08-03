import { FiSearch } from 'react-icons/fi';
import { cn, inputInset, iconEmboss } from '../styles/classes.js';

/**
 * Inset search input with an embossed magnifier icon.
 */
const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search tasks...',
  className = '',
}) => (
  <div className={cn('relative w-full', className)}>
    <FiSearch
      aria-hidden="true"
      className={cn(iconEmboss, 'absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite-400')}
    />
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label="Search tasks"
      className={cn(inputInset, 'w-full py-2.5 pl-10 pr-4 text-sm outline-none')}
    />
  </div>
);

export default SearchBar;
