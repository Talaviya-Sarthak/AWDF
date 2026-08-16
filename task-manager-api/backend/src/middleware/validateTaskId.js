import { sendError } from '../utils/response.js';

// MongoDB ObjectIds are 24-character hex strings (e.g. 64b8f3a2c1d2e4f5a6b7c8d9).
const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

/**
 * Validates the `:id` route parameter before the controller runs.
 *
 * Rejects malformed ids (letters, short/non-hex strings, empty strings)
 * with 400 Bad Request. The normalized value is kept as a string and cast
 * to an ObjectId by Mongoose during the query.
 */
const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!OBJECT_ID_PATTERN.test(id)) {
    return sendError(res, 'Invalid task id', 400);
  }

  return next();
};

export default validateTaskId;
