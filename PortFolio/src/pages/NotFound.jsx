import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Home, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[80vh] items-center justify-center px-5 pt-24 pb-16 sm:pt-28">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-parchment px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-bronze-deep shadow-soft">
              <Compass className="size-3.5" />
              Error 404
            </span>

            <div className="well mx-auto mb-6 inline-flex items-center justify-center px-8 py-5 sm:px-12">
              <span className="font-display text-7xl font-bold tracking-tight text-bronze sm:text-8xl">
                4
                <span className="mx-1 inline-block size-10 rounded-xl border border-line-strong bg-cream align-baseline shadow-well sm:size-14" />
                4
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              This page drifted off the map
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              The page you&apos;re looking for doesn&apos;t exist or was moved.
              Let&apos;s get you back to somewhere useful.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 select-none hover:-translate-y-0.5"
              >
                <Home className="size-4" />
                Back to Home
              </Link>
              <Link
                to="/#about"
                className="btn-secondary inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 select-none hover:-translate-y-0.5"
              >
                <ArrowLeft className="size-4" />
                About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFound
