import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { cn, modalShell, modalBackdrop, btnIcon, emboss } from '../styles/classes.js';

/**
 * Floating modal with a blurred backdrop.
 *
 * - Closes on backdrop click or the Escape key.
 * - Locks body scroll while open.
 * - Renders nothing when `open` is false.
 */
const Modal = ({ open, title, onClose, children, footer }) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={cn(modalBackdrop, 'absolute inset-0 bg-graphite-950/60 backdrop-blur-sm')}
        onClick={onClose}
      />

      <div className={cn(modalShell, 'relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto')}>
        <div className="flex items-center justify-between border-b border-paper-200 px-6 pb-4 pt-5">
          <h3 className={cn(emboss, 'font-display text-lg font-bold text-graphite-800')}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={btnIcon}
            aria-label="Close dialog"
          >
            <FiX />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 rounded-b-[20px] border-t border-paper-200 bg-paper-100/60 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
