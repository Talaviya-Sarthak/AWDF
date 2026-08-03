import { ArrowUp } from 'lucide-react'
import { profile } from '../../utils/data'
import SocialLinks from '../ui/SocialLinks'

const Footer = () => {
  return (
    <footer className="relative border-t border-line bg-parchment/80">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-bronze-soft font-display text-base font-bold text-bronze-deep shadow-soft">
                ST
              </span>
              <span className="font-display text-sm font-semibold text-ink">
                {profile.name}
              </span>
            </a>
            <p className="mt-2 text-xs text-muted">
              {profile.roles.join(' · ')}
            </p>
          </div>

          <SocialLinks />

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <a
              href="#home"
              aria-label="Back to top"
              className="btn-secondary inline-flex rounded-xl p-2.5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <ArrowUp className="size-4" />
            </a>
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} {profile.name}. Crafted with React &amp; care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
