import { sendError } from '../utils/response.js';

/**
 * Global error handler.
 *
 * Registered as the LAST middleware in the stack. It maps:
 *   - Mongoose validation errors -> 400 with a structured `errors` object,
 *   - invalid MongoDB ObjectIds   -> 400 clean JSON response,
 *   - typed errors (ValidationError / NotFoundError) -> their status code,
 *   - every unexpected error      -> 500 "Something went wrong".
 *
 * Stack traces are NEVER exposed to the client. They are only logged
 * server-side for debugging in non-production environments.
 */
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Structured Mongoose validation error (required title, invalid priority…).
  if (err.name === 'ValidationError') {
    const errors = {};
    for (const [field, error] of Object.entries(err.errors)) {
      errors[field] = error.message;
    }
    return sendError(res, 'Validation failed', 400, errors);
  }

  // Invalid MongoDB ObjectId (defensive — format is pre-checked by middleware).
  if (err.name === 'CastError') {
    return sendError(res, 'Invalid task id', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode
    ? err.message
    : 'Something went wrong';

  if (!err.statusCode) {
    // eslint-disable-next-line no-console
    console.error('[Unhandled error]', err.message);
  }

  return sendError(res, message, statusCode);
};

export default errorHandler;
