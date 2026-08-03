import { motion } from 'framer-motion'
import { Folder, GitFork, Star, ExternalLink } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'

const languageColors = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  C: '#555555',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54',
}

const RepoCard = ({ repo }) => {
  const {
    name,
    html_url: url,
    description,
    stargazers_count: stars = 0,
    forks_count: forks = 0,
    language,
  } = repo

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="surface-raised group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="btn-secondary inline-flex shrink-0 rounded-lg p-2">
            <Folder className="size-4 text-bronze" />
          </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-display text-base font-semibold break-all text-ink transition-colors hover:text-bronze-deep sm:text-lg"
          >
            {name}
          </a>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink-soft shadow-soft"
          title="Stars"
        >
          <Star className="size-3.5 fill-bronze text-bronze" />
          {stars.toLocaleString()}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
        {description || 'No description provided.'}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
        {language && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-soft shadow-soft">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: languageColors[language] ?? '#a16207' }}
            />
            {language}
          </span>
        )}
        <span
          className="inline-flex items-center gap-1 text-xs font-medium text-muted"
          title="Forks"
        >
          <GitFork className="size-3.5" />
          {forks.toLocaleString()}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn-primary ml-auto inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
        >
          <FiGithub className="size-4" />
          GitHub
          <ExternalLink className="size-3 opacity-70" />
        </a>
      </div>
    </motion.article>
  )
}

const RepoList = ({ repos, hasRepos = true }) => {
  if (repos.length === 0) {
    return (
      <div className="surface-raised px-8 py-14 text-center">
        <p className="text-sm font-medium text-muted">
          {hasRepos
            ? 'No repositories match your search.'
            : 'No public repositories found.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export default RepoList
