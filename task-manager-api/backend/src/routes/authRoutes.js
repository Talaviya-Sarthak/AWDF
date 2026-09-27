import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateRequired, validateEmail, validatePassword } from '../middleware/validate.js';

/**
 * Auth routes.
 *
 * Public routes:
 *   POST /api/auth/register — register new user
 *   POST /api/auth/login    — login and get JWT
 *
 * Protected routes (require valid JWT):
 *   GET /api/auth/me        — get current user details
 */
const router = Router();

router.post(
  '/register',
  validateRequired(['email', 'password']),
  validateEmail,
  validatePassword,
  register
);

router.post(
  '/login',
  validateRequired(['email', 'password']),
  validateEmail,
  login
);

router.get('/me', authenticate, me);

export default router;