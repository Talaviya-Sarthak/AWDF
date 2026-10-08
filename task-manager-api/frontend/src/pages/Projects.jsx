import { useState, lazy, Suspense } from 'react';
import {
  FiFolder,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiPlus,
  FiTrendingUp,
} from 'react-icons/fi';
import Button from '../components/Button.jsx';
import { Spinner } from '../components/Spinner.jsx';
import {
  cn,
  paperCard,
  gloss,
  paperCardLift,
  emboss,
  badge,
  badgeGreen,
  badgeBlue,
  badgeYellow,
  notebookAccent,
  accentHigh,
  accentMedium,
  accentLow,
} from '../styles/classes.js';

// Supplementary Problem 1: Lazy load heavy analytical chart component on demand
const ProjectMetricsChart = lazy(() => import('../components/ProjectMetricsChart.jsx'));

const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Core REST API v2 Upgrade',
    description: 'Migrating endpoints, introducing rate limiting, and optimizing SQL query execution plans.',
    status: 'In Progress',
    badgeClass: badgeBlue,
    accentClass: accentHigh,
    progress: 75,
    tasksCount: 14,
    lead: 'Backend Squad',
  },
  {
    id: 2,
    title: 'Skeuomorphic Design System',
    description: 'Designing tactile leather sidebar, paper cards, and brushed metal topbars for React.',
    status: 'Completed',
    badgeClass: badgeGreen,
    accentClass: accentLow,
    progress: 100,
    tasksCount: 22,
    lead: 'Design & UI/UX',
  },
  {
    id: 3,
    title: 'Client Performance & Code Splitting',
    description: 'Implementing React.lazy() and Suspense boundaries for route chunks and heavy modules.',
    status: 'Active',
    badgeClass: badgeYellow,
    accentClass: accentMedium,
    progress: 90,
    tasksCount: 8,
    lead: 'Web Engineering',
  },
];

const Projects = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className={cn(emboss, 'font-display text-2xl font-bold text-graphite-800')}>
            Workspace Projects
          </h2>
          <p className="mt-1 text-sm text-graphite-500">
            High-level initiatives, sprint milestones, and progress telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowChart((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <FiBarChart2 />
            {showChart ? 'Hide Analytics' : 'Load Analytics Chart (Lazy)'}
          </Button>

          <Button variant="primary" className="flex items-center gap-2">
            <FiPlus />
            New Project
          </Button>
        </div>
      </div>

      {/* Supplementary Problem 1: Lazy Loaded Heavy Chart */}
      {showChart && (
        <Suspense
          fallback={
            <div className={cn(paperCard, gloss, 'flex h-56 flex-col items-center justify-center p-6 text-center')}>
              <Spinner size="lg" className="text-accent-600 mb-3" />
              <p className="text-sm font-semibold text-graphite-700">
                Loading Heavy Analytics Module Chunk...
              </p>
              <p className="text-xs text-graphite-400">
                Component bundle requested dynamically via React.lazy()
              </p>
            </div>
          }
        >
          <ProjectMetricsChart />
        </Suspense>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_PROJECTS.map((project) => (
          <div
            key={project.id}
            className={cn(paperCard, gloss, paperCardLift, 'flex flex-col justify-between p-6')}
          >
            <span className={cn(notebookAccent, project.accentClass)} aria-hidden="true" />

            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={cn(badge, project.badgeClass)}>{project.status}</span>
                <span className="flex items-center gap-1 text-xs text-graphite-400">
                  <FiClock /> Active Sprint
                </span>
              </div>

              <h3 className={cn(emboss, 'mt-4 font-display text-lg font-bold text-graphite-800')}>
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite-500">
                {project.description}
              </p>
            </div>

            <div className="mt-6 border-t border-graphite-200/60 pt-4">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-graphite-600">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-graphite-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent-500 transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-graphite-500">
                <span className="flex items-center gap-1">
                  <FiUsers /> {project.lead}
                </span>
                <span className="font-medium text-graphite-700">
                  {project.tasksCount} Tasks
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
