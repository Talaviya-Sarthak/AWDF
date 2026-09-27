import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import { sendSuccess, sendError } from './utils/response.js';

/**
 * Express application factory.
 *
 * Middleware order matters:
 *   1. CORS + JSON body parsing
 *   2. Global request logger
 *   3. Feature routes (auth first, then tasks)
 *   4. 404 handler (catches unknown routes)
 *   5. Global error handler (ALWAYS last)
 */
const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
app.use(logger);

// Lightweight health check used by dev tools / uptime monitors.
app.get('/api/health', (req, res) =>
  sendSuccess(res, 'API is healthy', { status: 'ok' })
);

// Feature routes.
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler for unknown routes.
app.use((req, res) => sendError(res, 'Route not found', 404));

// Global error handler — must be registered last.
app.use(errorHandler);

export default app;
