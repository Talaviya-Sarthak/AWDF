import { memo } from 'react';
import { FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formatDueDate } from '../utils/format.js';
import {
  cn,
  paperCard,
  gloss,
  paperCardLift,
  badge,
  badgeGreen,
  badgeYellow,
  badgeRed,
  badgeBlue,
  statusDot,
  btnIcon,
  btnIconDanger,
  notebookAccent,
  accentHigh,
  accentMedium,
  accentLow,
} from '../styles/classes.js';

const STATUS_META = {
  pending: { label: 'Pending', badge: badgeYellow, dot: 'bg-status-yellow' },
  in_progress: { label: 'In Progress', badge: badgeBlue, dot: 'bg-status-blue' },
  completed: { label: 'Completed', badge: badgeGreen, dot: 'bg-status-green' },
};

const PRIORITY_META = {
  high: { label: 'High', badge: badgeRed, accent: accentHigh },
  medium: { label: 'Medium', badge: badgeYellow, accent: accentMedium },
  low: { label: 'Low', badge: badgeGreen, accent: accentLow },
};

const isOverdue = (task) => {
  if (task.status === 'completed' || !task.dueDate) return false;
  const due = new Date(`${task.dueDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(due.getTime()) && due < today;
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const status = STATUS_META[task.status] || STATUS_META.pending;
  const priority = PRIORITY_META[task.priority] || PRIORITY_META.medium;
  const isCompleted = task.status === 'completed';
  const overdue = isOverdue(task);

  return (
    <article className={cn(paperCard, gloss, paperCardLift, 'flex h-full flex-col p-5')}>
      {/* Colored priority spine */}
      <span className={cn(notebookAccent, priority.accent)} aria-hidden="true" />

      {/* Header: badges + actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={cn(badge, priority.badge)}>{priority.label}</span>
          <span className={cn(badge, status.badge)}>{status.label}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className={btnIcon}
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            <FiEdit2 />
          </button>
          <button
            type="button"
            className={cn(btnIcon, btnIconDanger)}
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3
        className={cn(
          'mt-3 line-clamp-2 text-base font-bold leading-snug',
          isCompleted ? 'text-graphite-400 line-through' : 'text-graphite-800'
        )}
      >
        {task.title}
      </h3>

      {/* Description — grows to fill the card so footers align */}
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-graphite-500">
        {task.description || 'No description provided.'}
      </p>

      {/* Footer: due date + status */}
      <div className="mt-4 flex items-center justify-between border-t border-paper-200 pt-3">
        <div
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium',
            overdue ? 'text-status-red' : 'text-graphite-500'
          )}
        >
          <FiClock aria-hidden="true" />
          <span>{formatDueDate(task.dueDate)}</span>
          {overdue && (
            <span className="ml-1 rounded-full bg-status-red/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-status-red">
              Overdue
            </span>
          )}
        </div>

        <span className={cn(statusDot, status.dot)} title={`Status: ${status.label}`} />
      </div>
    </article>
  );
};

export default memo(TaskCard);
