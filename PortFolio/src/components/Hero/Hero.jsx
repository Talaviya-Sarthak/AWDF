import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Download, FolderKanban, Mail, TerminalSquare } from 'lucide-react'
import avatar from '../../assets/avatar.svg'
import { profile } from '../../utils/data'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'

const chips = [
  { label: 'PyTorch', className: 'top-[18%] -left-3 sm:-left-6', delay: 0.2 },
  { label: 'Transformers', className: 'bottom-[24%] -left-6 sm:-left-14', delay: 0.35 },
  { label: 'Computer Vision', className: 'top-[30%] -right-2 sm:-right-8', delay: 0.5 },
]

const RotatingRoles = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % profile.roles.length),
      3800
    )
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-block h-[1.35em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap text-bronze-deep"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(133 121 95 / 0.14) 1px, transparent 0)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-parchment to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-parchment px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tick opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-tick" />
            </span>
            {profile.availability}
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
            Hi, I&apos;m {profile.name}.
            <span className="mt-2 block text-ink-soft">
              <RotatingRoles />
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.shortIntro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button href="#projects" variant="primary">
              <FolderKanban className="size-4.5" />
              View Projects
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" download>
              <Download className="size-4.5" />
              Download Resume
            </Button>
            <Button href="#contact" variant="secondary">
              <Mail className="size-4.5" />
              Contact Me
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <SocialLinks size="lg" />
            <span className="hidden h-6 w-px bg-line-strong sm:block" />
            <p className="hidden text-xs font-medium tracking-wide text-muted sm:block">
              Based in {profile.location}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md"
        >
          <div className="surface-raised relative rounded-[2rem] p-3.5 sm:p-4">
            <div className="well relative overflow-hidden rounded-[1.5rem] p-2 sm:p-2.5">
              <img
                src={avatar}
                alt={`Illustration of ${profile.name}`}
                className="w-full rounded-[1.25rem]"
                width={400}
                height={400}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]" />
          </div>

          {chips.map((chip) => (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + chip.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute ${chip.className}`}
            >
              <motion.span
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
              >
                <span className="surface flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-ink-soft shadow-raised">
                  <TerminalSquare className="size-4 text-bronze" />
                  {chip.label}
                </span>
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-bronze sm:flex"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}

export default Hero