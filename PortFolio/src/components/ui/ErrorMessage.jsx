import { AlertTriangle } from 'lucide-react'
import Button from './Button'

const ErrorMessage = ({ message, onRetry }) => (
  <div
    role="alert"
    className="surface-raised flex flex-col items-center gap-4 px-8 py-14 text-center"
  >
    <span className="btn-secondary inline-flex rounded-2xl p-4">
      <AlertTriangle className="size-7 text-[#b3261e]" />
    </span>
    <div>
      <h3 className="font-display text-lg font-semibold text-ink">
        Couldn&apos;t load repositories
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted">
        {message}
      </p>
      <p className="mt-1 text-xs text-muted">
        Check your connection and try again.
      </p>
    </div>
    {onRetry && (
      <Button as="button" onClick={onRetry} variant="primary">
        Try Again
      </Button>
    )}
  </div>
)

export default ErrorMessage
