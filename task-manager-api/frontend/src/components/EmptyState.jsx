import { cn, paperCard, iconTile, iconTileGray, emboss } from '../styles/classes.js';

/**
 * Friendly empty state shown when there is nothing to display.
 */
const EmptyState = ({ icon, title, message, action }) => (
  <div className={cn(paperCard, 'flex flex-col items-center justify-center px-8 py-12 text-center')}>
    <div className={cn(iconTile, iconTileGray)} aria-hidden="true">
      {icon}
    </div>
    <h3 className={cn(emboss, 'mt-4 text-lg font-bold text-graphite-700')}>{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-graphite-400">{message}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
