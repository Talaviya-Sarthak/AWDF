import { GraduationCap, Target, MapPin, BookOpen, Languages } from 'lucide-react'
import { about, profile } from '../../utils/data'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

const facts = [
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: GraduationCap, label: 'Degree', value: 'B.Tech CSE (2028)' },
  { icon: Languages, label: 'Languages', value: 'Gujarati · English' },
  { icon: BookOpen, label: 'Currently', value: 'Deep Learning · LLMs' },
]

const About = () => {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Behind the terminal"
      description="A quick look at who I am, where I've studied and what I'm aiming for."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="surface-raised p-7 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-ink">
                {about.headline}
              </h3>
              <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-raised flex items-start gap-4 p-6 sm:p-7">
              <span className="btn-secondary inline-flex shrink-0 rounded-xl p-3">
                <Target className="size-5 text-bronze-deep" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  Career Objective
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {about.objective}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.05}>
            <div className="surface-raised p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <GraduationCap className="size-5 text-bronze" />
                <h3 className="font-display text-base font-semibold text-ink">
                  Education
                </h3>
              </div>
              <div className="space-y-5">
                {about.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="relative rounded-xl border border-line bg-surface p-4 shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold text-ink">{edu.degree}</h4>
                      <span className="inline-flex shrink-0 rounded-lg bg-bronze-soft px-2.5 py-1 text-[11px] font-semibold text-bronze-deep">
                        {edu.year}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{edu.school}</p>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft/80">{edu.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="surface-raised grid grid-cols-2 gap-3 p-6 sm:p-7">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-line bg-parchment p-4 shadow-soft">
                  <fact.icon className="size-4 text-bronze" />
                  <p className="mt-2 text-[11px] font-semibold tracking-wide text-muted uppercase">
                    {fact.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-ink">{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

export default About
