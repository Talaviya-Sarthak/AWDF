import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { profile } from '../../utils/data'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Spinner from '../ui/Spinner'
import ErrorMessage from '../ui/ErrorMessage'
import RepoList from '../ui/RepoList'

const GITHUB_API_URL = `https://api.github.com/users/${profile.githubUsername}/repos`

const Projects = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    fetch(`${GITHUB_API_URL}?per_page=30&sort=updated`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!ignore) setRepos(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [attempt])

  const sorted = useMemo(
    () =>
      [...repos].sort(
        (a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
      ),
    [repos]
  )

  const filtered = useMemo(
    () =>
      sorted.filter((repo) =>
        repo.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [sorted, query]
  )

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Open-source work"
      description="A live list of my public repositories, fetched straight from the GitHub API."
    >
      <Reveal>
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="inline-flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <FiGithub className="size-4 text-bronze" />
            <span>
              {loading
                ? 'Fetching from GitHub…'
                : error
                  ? 'Showing GitHub data'
                  : `${filtered.length} of ${repos.length} repositories${
                      query ? ' matching your search' : ''
                    }`}
            </span>
          </p>
          <div className="relative w-full sm:w-72">
            <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter repositories by name…"
              aria-label="Filter repositories by name"
              className="w-full rounded-xl border border-line-strong bg-surface py-2.5 pr-4 pl-10 text-sm text-ink shadow-[inset_0_1px_3px_rgba(60,45,20,0.08)] outline-none transition-all duration-200 placeholder:text-muted focus:border-bronze focus:bg-parchment focus:ring-2 focus:ring-bronze/20"
            />
          </div>
        </div>
      </Reveal>

      {loading ? (
        <Reveal>
          <Spinner />
        </Reveal>
      ) : error ? (
        <Reveal>
          <ErrorMessage
            message={error}
            onRetry={() => setAttempt((n) => n + 1)}
          />
        </Reveal>
      ) : (
        <Reveal>
          <RepoList repos={filtered} hasRepos={repos.length > 0} />
        </Reveal>
      )}
    </Section>
  )
}

export default Projects
