import { sendError } from '../utils/response.js';

// Task ids are positive integers (e.g. 1001).
const ID_PATTERN = /^\d+$/;

/**
 * Validates the `:id` route parameter before the controller runs.
 *
 * Rejects malformed ids (letters, symbols, decimals, empty strings)
 * with 400 Bad Request and normalizes the parameter to a number.
 */
const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!ID_PATTERN.test(id)) {
    return sendError(res, 'Invalid task id', 400);
  }

  req.params.id = Number(id);
  return next();
};

export default validateTaskId;
