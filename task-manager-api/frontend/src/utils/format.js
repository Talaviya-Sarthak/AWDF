/**
 * Date formatting helpers shared across the dashboard.
 * Kept in one place so every page renders dates consistently.
 */

/** Formats `YYYY-MM-DD` as e.g. "Aug 5, 2026". */
export const formatDueDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/** Formats an ISO timestamp as a short relative label (e.g. "3d ago"). */
export const formatRelativeDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

/** Formats today's date as a friendly headline, e.g. "Sunday, August 2, 2026". */
export const formatToday = () =>
  new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
