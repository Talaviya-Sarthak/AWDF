import { useMemo, useState } from 'react';
import { FiTrendingUp, FiPieChart, FiBarChart2, FiCheckCircle } from 'react-icons/fi';
import { cn, paperCard, gloss, emboss, badge, badgeGreen, badgeBlue, badgeYellow } from '../styles/classes.js';

/**
 * Heavy analytical metrics component simulating a data-dense charting module
 * (e.g. Chart.js / Recharts / D3).
 *
 * Demonstrates component-level code splitting: only loaded on demand when the user
 * requests deep analytics in the Projects view.
 */
const ProjectMetricsChart = () => {
  const [activeMetric, setActiveMetric] = useState('burndown');

  // Simulated heavy dataset calculation
  const metricsData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return {
      burndown: [
        { label: 'Sprint Day 1', planned: 45, actual: 45 },
        { label: 'Sprint Day 2', planned: 38, actual: 40 },
        { label: 'Sprint Day 3', planned: 30, actual: 28 },
        { label: 'Sprint Day 4', planned: 22, actual: 25 },
        { label: 'Sprint Day 5', planned: 15, actual: 14 },
        { label: 'Sprint Day 6', planned: 8, actual: 7 },
        { label: 'Sprint Day 7', planned: 0, actual: 2 },
      ],
      distribution: [
        { category: 'Frontend Architecture', percentage: 42, color: 'bg-accent-500' },
        { category: 'Backend REST API', percentage: 28, color: 'bg-emerald-500' },
        { category: 'Security & Auth', percentage: 18, color: 'bg-amber-500' },
        { category: 'Testing & QA', percentage: 12, color: 'bg-indigo-500' },
      ],
      velocity: days.map((day, idx) => ({
        day,
        velocity: Math.floor(18 + Math.sin(idx) * 8 + idx * 3),
      })),
    };
  }, []);

  return (
    <div className={cn(paperCard, gloss, 'p-6 space-y-6')}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite-200/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn(badge, badgeBlue)}>Heavy Component Chunk</span>
            <span className="text-xs text-graphite-400">Loaded on-demand via React.lazy()</span>
          </div>
          <h3 className={cn(emboss, 'mt-1 font-display text-lg font-bold text-graphite-800 flex items-center gap-2')}>
            <FiTrendingUp className="text-accent-600" />
            Project Performance & Burndown Analytics
          </h3>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg bg-graphite-100 p-1 text-xs font-semibold text-graphite-600">
          <button
            type="button"
            onClick={() => setActiveMetric('burndown')}
            className={cn(
              'rounded-md px-3 py-1.5 transition-colors',
              activeMetric === 'burndown' ? 'bg-white shadow-sm text-graphite-900' : 'hover:text-graphite-900'
            )}
          >
            Burndown
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('distribution')}
            className={cn(
              'rounded-md px-3 py-1.5 transition-colors',
              activeMetric === 'distribution' ? 'bg-white shadow-sm text-graphite-900' : 'hover:text-graphite-900'
            )}
          >
            Task Distribution
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('velocity')}
            className={cn(
              'rounded-md px-3 py-1.5 transition-colors',
              activeMetric === 'velocity' ? 'bg-white shadow-sm text-graphite-900' : 'hover:text-graphite-900'
            )}
          >
            Velocity Trend
          </button>
        </div>
      </div>

      {/* Render active chart visualization */}
      {activeMetric === 'burndown' && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-graphite-500">
            <span>Remaining Story Points</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-500" /> Planned</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Actual</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-44 pt-4 border-b border-graphite-200">
            {metricsData.burndown.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex justify-center items-end gap-1.5 h-36">
                  <div
                    style={{ height: `${(item.planned / 45) * 100}%` }}
                    className="w-3 rounded-t bg-accent-500/80 transition-all duration-300"
                    title={`Planned: ${item.planned}`}
                  />
                  <div
                    style={{ height: `${(item.actual / 45) * 100}%` }}
                    className="w-3 rounded-t bg-emerald-500 transition-all duration-300"
                    title={`Actual: ${item.actual}`}
                  />
                </div>
                <span className="text-[10px] text-graphite-400 truncate max-w-full">
                  Day {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMetric === 'distribution' && (
        <div className="space-y-4">
          <p className="text-xs text-graphite-500">Effort allocation across development domains</p>
          <div className="space-y-3">
            {metricsData.distribution.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-graphite-700">
                  <span>{cat.category}</span>
                  <span>{cat.percentage}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-graphite-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', cat.color)}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMetric === 'velocity' && (
        <div className="space-y-4">
          <p className="text-xs text-graphite-500">Daily team output velocity (resolved tasks/day)</p>
          <div className="grid grid-cols-7 gap-3 items-end h-36 border-b border-graphite-200 pb-2">
            {metricsData.velocity.map((v, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  style={{ height: `${(v.velocity / 35) * 100}%` }}
                  className="w-7 rounded-t bg-indigo-500 transition-all hover:bg-indigo-600 shadow-sm flex items-start justify-center pt-1"
                >
                  <span className="text-[9px] font-bold text-white">{v.velocity}</span>
                </div>
                <span className="text-xs font-medium text-graphite-500">{v.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between rounded-xl bg-graphite-50/80 p-3 text-xs text-graphite-600 border border-graphite-200/50">
        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <FiCheckCircle /> Code-Split Module Active
        </span>
        <span>Isolated bundle footprint: ~12 KB</span>
      </div>
    </div>
  );
};

export default ProjectMetricsChart;
