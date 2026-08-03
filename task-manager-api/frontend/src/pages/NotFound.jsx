import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCompass } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import { cn, paperCard, gloss, metalText } from '../styles/classes.js';

/**
 * Skeuomorphic 404 page with an engraved display numeral.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-16 sm:py-24">
      <div className={cn(paperCard, gloss, 'w-full max-w-lg px-8 py-12 text-center sm:px-14')}>
        <p className={cn(metalText, 'font-display text-8xl font-black text-graphite-800')}>
          404
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-graphite-400">
          Page not found
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-graphite-500">
          The page you are looking for doesn&apos;t exist, has been moved, or
          you followed a broken link.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => navigate('/')}>
            <FiArrowLeft />
            Back to Dashboard
          </Button>
          <Button variant="secondary" onClick={() => navigate('/tasks')}>
            <FiCompass />
            View Tasks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
