import { sendError } from '../utils/response.js';

/**
 * Validation middleware factory.
 *
 * Accepts an array of required field names and returns a middleware
 * that checks if all fields are present in req.body.
 *
 * Usage:
 *   router.post('/register', validateRequired(['email', 'password']), registerController);
 *
 * Returns 400 Bad Request with details about missing fields if validation fails.
 */
export const validateRequired = (fields) => (req, res, next) => {
  const missing = [];

  for (const field of fields) {
    const value = req.body[field];
    if (value === undefined || value === null || value === '') {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    return sendError(res, 'Validation failed', 400, {
      missingFields: missing,
    });
  }

  next();
};

/**
 * Validates email format.
 */
export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (email && typeof email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendError(res, 'Invalid email format', 400);
    }
  }

  next();
};

/**
 * Validates password strength (minimum 6 characters).
 */
export const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password && typeof password === 'string') {
    if (password.length < 6) {
      return sendError(res, 'Password must be at least 6 characters', 400);
    }
  }

  next();
};

/**
 * Validates task input — requires title field.
 */
export const validateTaskInput = (req, res, next) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return sendError(res, 'Title is required', 400);
  }

  if (title.trim().length > 200) {
    return sendError(res, 'Title must be 200 characters or less', 400);
  }

  next();
};