/**
 * Global request logger.
 *
 * For every incoming request it logs:
 *   - HTTP method + URL
 *   - ISO timestamp
 *   - execution time in milliseconds
 *
 * Example output:
 *   GET /api/tasks
 *   2026-08-02T10:10:00.000Z
 *   14 ms
 */

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const startedAt = process.hrtime();

  res.on('finish', () => {
    const elapsed = process.hrtime(startedAt);
    const elapsedMs = Math.round(elapsed[0] * 1000 + elapsed[1] / 1e6);

    console.log(`${req.method} ${req.originalUrl}`);
    console.log(timestamp);
    console.log(`${elapsedMs} ms`);
    console.log('-'.repeat(28));
  });

  next();
};

export default logger;
