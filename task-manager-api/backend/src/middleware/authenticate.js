import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { sendError } from '../utils/response.js';
import User from '../models/User.js';

/**
 * Authentication middleware — verifies JWT from Authorization header.
 *
 * Expected header format: Authorization: Bearer <token>
 *
 * On success:
 *   - Decodes the token payload (contains user id)
 *   - Attaches the user document to req.user for downstream use
 *   - Calls next() to continue the middleware chain
 *
 * On failure (missing, malformed, expired, invalid signature, user not found):
 *   - Returns 401 Unauthorized with a clear message
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return sendError(res, 'Authentication required', 401);
    }

    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, 'User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Token expired', 401);
    }
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, 'Invalid token', 401);
    }
    return sendError(res, 'Authentication failed', 401);
  }
};