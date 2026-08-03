import { Briefcase, GraduationCap, Trophy, BookOpen } from 'lucide-react'
import { timeline } from '../../utils/data'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

const typeMeta = {
  work: { icon: Briefcase, tint: '#f5e9d4', color: '#b4760b', label: 'Work' },
  education: { icon: GraduationCap, tint: '#e0f0e6', color: '#2f7d4f', label: 'Education' },
  achievement: { icon: Trophy, tint: '#f5e9d4', color: '#b4760b', label: 'Achievement' },
  publication: { icon: BookOpen, tint: '#e2ecf6', color: '#3a6ea5', label: 'Publication' },
}

const Timeline = () => {
  return (
    <Section
      id="experience"
      eyebrow="Experience & Education"
      title="My journey so far"
      description="A vertical walk through the work, studies and learning that shaped me."
    >
      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute top-2 bottom-2 left-[22px] w-[3px] rounded-full sm:left-1/2 sm:-translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg, #ddd2bd, #b4760b 40%, #ddd2bd)',
            boxShadow: 'inset 0 1px 2px rgb(60 45 20 / 0.15)',
          }}
        />
        <div className="space-y-10">
          {timeline.map((entry, idx) => {
            const meta = typeMeta[entry.type] ?? typeMeta.work
            const Icon = meta.icon
            const left = idx % 2 === 0
            return (
              <Reveal key={`${entry.period}-${entry.title}`} delay={0.05}>
                <div className={`relative flex ${left ? 'sm:justify-start' : 'sm:justify-end'}`}>
                  <span
                    className="absolute left-[22px] top-1.5 z-10 flex size-5 -translate-x-1/2 items-center justify-center sm:left-1/2"
                    aria-hidden="true"
                  >
                    <span
                      className="inline-flex size-5 items-center justify-center rounded-full border-4"
                      style={{ backgroundColor: meta.color, borderColor: '#f7f3ec' }}
                    />
                  </span>

                  <div className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2.5rem)] ${left ? '' : ''}`}>
                    <article className="surface-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold"
                          style={{ backgroundColor: meta.tint, color: meta.color }}
                        >
                          <Icon className="size-3.5" />
                          {meta.label}
                        </span>
                        <span className="inline-flex rounded-lg bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink-soft shadow-soft">
                          {entry.period}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-semibold text-ink sm:text-lg">
                        {entry.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-medium text-bronze-deep">
                        {entry.place}
                      </p>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                        {entry.description}
                      </p>
                    </article>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default Timeline
