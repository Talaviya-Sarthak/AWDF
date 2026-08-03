import Reveal from './Reveal'

const Section = ({ id, eyebrow, title, description, children, className = '' }) => (
  <section id={id} className={`relative scroll-mt-24 py-16 sm:py-24 ${className}`}>
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      {(eyebrow || title) && (
        <Reveal className="mb-10 sm:mb-14">
          <div className="flex flex-col items-center text-center">
            {eyebrow && (
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-parchment px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-bronze-deep shadow-soft">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {description}
              </p>
            )}
          </div>
        </Reveal>
      )}
      {children}
    </div>
  </section>
)

export default Section
