/**
 * Seed task data bundled with the frontend.
 *
 * Used as a graceful-degradation fallback when the API is unreachable,
 * so the dashboard remains fully explorable in demo mode. Mirrors the
 * seed data served by the backend (backend/src/data/tasks.js).
 */
const seedTasks = [
  {
    id: 1001,
    title: 'Design landing page hero section',
    description:
      'Create a premium hero layout with product mockup, three headline options and a convincing call-to-action for the marketing site.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-07-25',
    createdAt: '2026-07-18T08:30:00.000Z',
  },
  {
    id: 1002,
    title: 'Implement authentication API',
    description:
      'Build JWT-based authentication with register, login and refresh endpoints, including role-based access control.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-07-28',
    createdAt: '2026-07-15T11:05:00.000Z',
  },
  {
    id: 1003,
    title: 'Write unit tests for task service',
    description:
      'Cover the task service layer with unit tests: validation rules, not-found cases and happy paths for every CRUD operation.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-08-04',
    createdAt: '2026-07-29T09:45:00.000Z',
  },
  {
    id: 1004,
    title: 'Set up CI/CD pipeline',
    description:
      'Configure automated linting, testing and deployment to staging using GitHub Actions with environment-specific secrets.',
    status: 'pending',
    priority: 'high',
    dueDate: '2026-08-10',
    createdAt: '2026-07-30T14:20:00.000Z',
  },
  {
    id: 1005,
    title: 'Refactor payment gateway module',
    description:
      'Extract the payment gateway into an adapter-based service so Stripe can be replaced without touching business logic.',
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-08-12',
    createdAt: '2026-07-31T10:15:00.000Z',
  },
  {
    id: 1006,
    title: 'Create onboarding email sequence',
    description:
      'Draft a five-step drip sequence welcoming new users and guiding them through the core features of the product.',
    status: 'in_progress',
    priority: 'low',
    dueDate: '2026-08-06',
    createdAt: '2026-07-27T16:40:00.000Z',
  },
  {
    id: 1007,
    title: 'Audit API error responses',
    description:
      'Review every endpoint for consistent error shapes, correct status codes and human readable messages for the frontend.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2026-07-24',
    createdAt: '2026-07-20T12:00:00.000Z',
  },
  {
    id: 1008,
    title: 'Prepare Q3 marketing budget',
    description:
      'Forecast spend across paid channels, content production and events; align numbers with the sales team.',
    status: 'pending',
    priority: 'high',
    dueDate: '2026-08-08',
    createdAt: '2026-08-01T08:10:00.000Z',
  },
  {
    id: 1009,
    title: 'Update privacy policy page',
    description:
      'Refresh the legal copy to reflect recent data handling changes and add the required disclosure for analytics cookies.',
    status: 'completed',
    priority: 'low',
    dueDate: '2026-07-22',
    createdAt: '2026-07-19T13:25:00.000Z',
  },
  {
    id: 1010,
    title: 'Fix responsive navigation on mobile',
    description:
      'Resolve the overflow bug in the top navigation on small screens and improve touch target sizes.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-08-03',
    createdAt: '2026-07-30T17:55:00.000Z',
  },
  {
    id: 1011,
    title: 'Schedule team retro meeting',
    description:
      'Book the room, prepare the agenda and circulate the feedback form at least 48 hours before the session.',
    status: 'pending',
    priority: 'low',
    dueDate: '2026-08-05',
    createdAt: '2026-08-02T09:00:00.000Z',
  },
  {
    id: 1012,
    title: 'Migrate build pipeline to Vite',
    description:
      'Move the frontend build from webpack to Vite, verify HMR and shave the CI build time below two minutes.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-07-26',
    createdAt: '2026-07-16T15:30:00.000Z',
  },
  {
    id: 1013,
    title: 'Design error and empty states',
    description:
      'Create consistent empty, loading and error states for every screen, including illustrations and micro-copy.',
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-08-14',
    createdAt: '2026-08-01T11:35:00.000Z',
  },
  {
    id: 1014,
    title: 'Optimize image delivery',
    description:
      'Switch static assets to next-gen formats, add responsive srcset and enable CDN caching for media files.',
    status: 'in_progress',
    priority: 'low',
    dueDate: '2026-08-09',
    createdAt: '2026-07-28T10:50:00.000Z',
  },
];

export default seedTasks;
