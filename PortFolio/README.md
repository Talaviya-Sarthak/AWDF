# Personal Portfolio — Talaviya Sarthak

A modern, tactile portfolio built with **React 19**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, **lucide-react** and **react-icons**, styled with a subtle skeuomorphic design language (soft shadows, layered surfaces, pressed buttons).

## Practical 3 — API Integration & Data Rendering

This practical integrates the **GitHub REST API** into the Projects section.

- **API used:** `https://api.github.com/users/Talaviya-Sarthak/repos` (no authentication required)
- **Integration point:** `src/components/Projects/Projects.jsx`
- **State managed:** `repos` (data), `loading` (in-flight), `error` (failure) — each rendered with a dedicated UI state.
- **Loading state:** `src/components/ui/Spinner.jsx` — skeuomorphic spinner shown while the request is in progress.
- **Error state:** `src/components/ui/ErrorMessage.jsx` — shown when the request fails, with a **Try Again** (retry) button that re-triggers the fetch.
- **Success state:** `src/components/ui/RepoList.jsx` — renders each repository's name, star count, forks, language, description, and a link to its GitHub URL.
- **Bonus (supplementary problems):**
  - Retry button on error (see `ErrorMessage` / `setAttempt` in `Projects.jsx`).
  - Search input that filters the rendered list by repository name.
  - Star count shown alongside each repository name.

### Setup

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # oxlint
npm test         # DOM integration test for the GitHub API integration (needs network)
```

### Notes

- GitHub's API is CORS-friendly and works from `localhost` without keys.
- A rate limit of 60 requests/hour per IP applies for unauthenticated requests.
- To switch users, change `githubUsername` in `src/utils/data.js`.

## Structure

```
src/
├── assets/
├── components/
│   ├── Hero, About, Skills, Projects, Timeline, Contact, Footer, Navbar
│   └── ui/  (Button, Section, Reveal, SocialLinks, Spinner, ErrorMessage, RepoList)
├── hooks/     (useScrollSpy)
├── pages/
└── utils/     (data.js)
```
