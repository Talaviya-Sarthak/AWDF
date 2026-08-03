import { useState } from 'react'
import { Send, Mail, Phone, CheckCircle2 } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { profile, socials } from '../../utils/data'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

const contactCards = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:+919601039375` },
  { icon: FiGithub, label: 'GitHub', value: '@Talaviya-Sarthak', href: profile.github },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'in/sarthak-talaviya', href: profile.linkedin },
]

const inputClass =
  'w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-ink shadow-[inset_0_1px_3px_rgba(60,45,20,0.08)] outline-none transition-all duration-200 placeholder:text-muted focus:border-bronze focus:bg-parchment focus:ring-2 focus:ring-bronze/20'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:${profile.email}?subject=Portfolio enquiry from ${encodeURIComponent(
      form.name || 'a visitor'
    )}&body=${encodeURIComponent(form.message)}`
    window.location.href = mailto
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    window.setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Have a role, a project or an idea? My inbox is always open — I usually reply within a day."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="flex flex-col gap-5">
          {contactCards.map((card, idx) => (
            <Reveal key={card.label} delay={idx * 0.07}>
              <a
                href={card.href}
                target={card.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="surface-raised group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
              >
                <span className="btn-secondary inline-flex shrink-0 rounded-xl p-3">
                  <card.icon className="size-5 text-bronze-deep" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                    {card.label}
                  </span>
                  <span className="block text-sm font-medium text-ink transition-colors group-hover:text-bronze-deep">
                    {card.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="surface-raised p-5">
              <p className="text-sm font-semibold text-ink">Prefer quick chat?</p>
              <p className="mt-1 text-sm text-muted">
                Find me on the platforms below, or drop a message through the form.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="surface-raised p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">Send me a message</h3>
            <p className="mt-1 text-sm text-muted">
              This opens your email client with the message pre-filled.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell me about your project or opportunity…"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button as="button" type="submit" variant="primary">
                <Send className="size-4" />
                Send Message
              </Button>
              {status === 'sent' && (
                <p className="inline-flex items-center gap-1.5 text-sm font-medium text-tick">
                  <CheckCircle2 className="size-4" />
                  Opening your mail client…
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

export default Contact
