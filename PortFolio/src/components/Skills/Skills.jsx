import { motion } from 'framer-motion'
import { skillCategories } from '../../utils/data'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

const Skills = () => {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="My toolbox"
      description="The technologies and tools I reach for to design, build and ship reliable software."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon
          return (
            <Reveal key={category.title} delay={(idx % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="surface-raised group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-hover"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className="inline-flex size-12 items-center justify-center rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_5px_rgba(60,45,20,0.12)]"
                    style={{ backgroundColor: category.tint }}
                  >
                    <Icon
                      className="size-6"
                      style={{ color: category.accent }}
                      strokeWidth={1.9}
                    />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {category.title}
                  </h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-soft shadow-soft transition-all duration-200 group-hover:border-line-strong"
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default Skills
