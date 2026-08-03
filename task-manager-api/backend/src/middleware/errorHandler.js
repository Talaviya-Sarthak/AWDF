import { sendError } from '../utils/response.js';

/**
 * Global error handler.
 *
 * Registered as the LAST middleware in the stack. It maps:
 *   - typed errors (ValidationError / NotFoundError) -> their status code,
 *   - every unexpected error                         -> 500 "Something went wrong".
 *
 * Stack traces are NEVER exposed to the client. They are only logged
 * server-side for debugging in non-production environments.
 */
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
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
