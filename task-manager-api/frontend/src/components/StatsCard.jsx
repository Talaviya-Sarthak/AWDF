import { cn, paperCard, gloss, iconTile, iconTileBlue, iconTileGreen, iconTileYellow, iconTileRed, iconTileGray, emboss } from '../styles/classes.js';

/**
 * Statistics card on a paper surface with an embossed icon tile.
 * `tone` controls the icon color: blue | green | yellow | red | gray.
 */
const TONE_CLASSES = {
  blue: iconTileBlue,
  green: iconTileGreen,
  yellow: iconTileYellow,
  red: iconTileRed,
  gray: iconTileGray,
};

const StatsCard = ({ label, value, icon, tone = 'blue', subtitle }) => {
  const tileClasses = TONE_CLASSES[tone] || TONE_CLASSES.blue;

  return (
    <div className={cn(paperCard, gloss, 'relative overflow-hidden p-5')}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-graphite-400">
            {label}
          </p>
          <p className={cn(emboss, 'mt-2 text-4xl font-bold tabular-nums text-graphite-800')}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-2 truncate text-xs text-graphite-400">{subtitle}</p>
          )}
        </div>

        <div className={cn(iconTile, tileClasses)} aria-hidden="true">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
