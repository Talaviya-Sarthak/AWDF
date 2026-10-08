import app from './app.js';
import env from './config/env.js';
import mongoose from 'mongoose';
import taskModel from './models/taskModel.js';
import './events/taskListeners.js';

/**
 * Server entry point.
 *
 * Splitting `app.js` (config + middleware wiring) from `server.js`
 * (process bootstrap) makes the app trivially testable — a test suite can
 * import the Express app without opening a network port.
 *
 * The server connects to MongoDB via Mongoose before accepting requests.
 * The connection string is read from the environment (never hardcoded).
 */
mongoose
  .connect(env.mongoUri)
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');

    // Populate MongoDB with the Practical 4 seed data on first run so the
    // dashboard is not empty after migrating away from the in-memory array.
    await taskModel.seedIfEmpty();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Task Manager API running on http://localhost:${env.port}`);
  console.log(`Environment: ${env.nodeEnv}`);
});
