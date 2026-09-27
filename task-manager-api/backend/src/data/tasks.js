/**
 * STATIC TASK DATA
 *
 * This file is the application's "database" seed.
 *
 * All data access flows through the TaskModel (src/models/taskModel.js),
 * so this module can be swapped for a real database
 * (MongoDB, PostgreSQL, MySQL, ...) later by only replacing the model layer.
 * Controllers, services and the frontend never import this file directly.
 */

const tasks = [
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
];

export { tasks };