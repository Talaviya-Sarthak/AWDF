import { Database } from 'lucide-react'

const Spinner = ({ label = 'Loading repositories…' }) => (
  <div
    role="status"
    aria-live="polite"
    className="surface-raised flex flex-col items-center justify-center gap-5 px-8 py-16"
  >
    <span className="relative inline-flex size-14">
      <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-line-strong border-t-bronze" />
      <span className="absolute inset-1.5 flex items-center justify-center rounded-full bg-surface shadow-[inset_0_2px_5px_rgba(60,45,20,0.15)]">
        <Database className="size-5 animate-pulse text-bronze" />
      </span>
    </span>
    <p className="text-sm font-medium text-ink-soft">{label}</p>
    <span className="sr-only">Loading</span>
  </div>
)

export default Spinner
