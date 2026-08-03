/**
 * Response helpers.
 *
 * Every single API response follows one consistent shape:
 *   { success, message, data }
 *
 * Using these helpers keeps the controllers clean and guarantees that the
 * contract between the API and the frontend never drifts.
 */

const respond = (res, statusCode, success, message, data = null) =>
  res.status(statusCode).json({ success, message, data });

/**
 * Builds a successful response (200 / 201 by default).
 */
export const sendSuccess = (res, message, data = null, statusCode = 200) =>
  respond(res, statusCode, true, message, data);

/**
 * Builds an error response with the given HTTP status code.
 */
export const sendError = (res, message, statusCode = 400, data = null) =>
  respond(res, statusCode, false, message, data);
