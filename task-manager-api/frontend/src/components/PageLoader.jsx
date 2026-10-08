import { Spinner } from './Spinner.jsx';
import { cn, paperCard, gloss, emboss } from '../styles/classes.js';

/**
 * Meaningful Suspense fallback UI rendered while route chunks or heavy
 * components are being downloaded asynchronously.
 */
const PageLoader = ({ message = 'Loading component chunk...' }) => {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center p-6">
      <div
        className={cn(
          paperCard,
          gloss,
          'flex max-w-sm flex-col items-center p-8 text-center shadow-lg'
        )}
      >
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute h-14 w-14 animate-ping rounded-full bg-accent-500/15" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 border border-accent-200">
            <Spinner size="md" className="text-accent-600" />
          </div>
        </div>

        <h3 className={cn(emboss, 'font-display text-base font-semibold text-graphite-800')}>
          {message}
        </h3>
        <p className="mt-1 text-xs text-graphite-400">
          Code-split chunk is being retrieved on demand
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-500" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
