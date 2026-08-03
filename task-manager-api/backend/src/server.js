import app from './app.js';
import env from './config/env.js';

/**
 * Server entry point.
 *
 * Splitting `app.js` (config + middleware wiring) from `server.js`
 * (process bootstrap) makes the app trivially testable — a test suite can
 * import the Express app without opening a network port.
 */
app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Task Manager API running on http://localhost:${env.port}`);
  console.log(`Environment: ${env.nodeEnv}`);
});
