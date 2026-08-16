import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../utils/data'
import useScrollSpy from '../hooks/useScrollSpy'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(navLinks.map((l) => l.href.slice(1)))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 w-full max-w-6xl px-4 sm:mt-4 sm:px-6">
        <nav className="surface flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-5">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-bronze-soft font-display text-base font-bold text-bronze-deep shadow-soft">
              ST
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-ink">
              {profile.firstName}
              <span className="text-bronze">.dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-bronze-soft text-bronze-deep shadow-soft'
                        : 'text-ink-soft hover:bg-line/40 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Hire Me
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="btn-secondary inline-flex rounded-xl p-2.5 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {open && (
          <div className="surface mt-2 rounded-2xl p-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-bronze-soft hover:text-bronze-deep"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar