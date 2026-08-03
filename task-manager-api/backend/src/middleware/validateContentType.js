import { sendError } from '../utils/response.js';

/**
 * Rejects POST and PUT requests that do not send `application/json`.
 *
 * Returns 415 Unsupported Media Type when the Content-Type header is missing
 * or does not match the expected value.
 */
const validateContentType = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';

  if (!contentType.includes('application/json')) {
    return sendError(res, 'Content-Type must be application/json', 415);
  }

  return next();
};

export default validateContentType;
