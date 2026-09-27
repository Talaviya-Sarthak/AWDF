import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/env.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * POST /api/auth/register
 *
 * Registers a new user.
 * - Validates email and password (done by middleware)
 * - Hashes password with bcrypt (cost factor 10)
 * - Creates user document in MongoDB
 * - Returns 201 with user data (without password)
 */
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 'Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return sendSuccess(res, 'User registered successfully', user, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 *
 * Authenticates a user and returns a JWT.
 * - Finds user by email (explicitly selects password field)
 * - Compares provided password with stored hash using bcrypt.compare
 * - On success, signs a JWT with user id, expires in 1 hour
 * - Returns token and user data (without password)
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign({ id: user._id }, env.jwtSecret, {
      expiresIn: '1h',
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return sendSuccess(res, 'Login successful', { token, user: userResponse });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 *
 * Returns the currently authenticated user's details.
 * Requires valid JWT (protected by authenticate middleware).
 * The user is attached to req.user by the authenticate middleware.
 */
export const me = async (req, res, next) => {
  try {
    const user = req.user;

    const userResponse = {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return sendSuccess(res, 'Current user fetched successfully', userResponse);
  } catch (error) {
    next(error);
  }
};