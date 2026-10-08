import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getCacheStats,
  flushCache,
} from '../controllers/taskController.js';
import validateContentType from '../middleware/validateContentType.js';
import validateTaskId from '../middleware/validateTaskId.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateTaskInput } from '../middleware/validate.js';

/**
 * Task routes — protected by authentication middleware.
 *
 * Middleware placement:
 *   - authenticate — verifies JWT on all routes
 *   - validateContentType — rejects non-JSON bodies on POST / PUT
 *   - validateTaskId — rejects malformed ids on any route using :id
 *   - validateTaskInput — validates required fields (title) before controller
 *
 * Note: /cache/* routes are declared before /:id to prevent routing collisions.
 */
const router = Router();

// Practical 9: Cache telemetry and debug routes (accessible for monitoring & testing)
router.get('/cache/stats', getCacheStats);
router.post('/cache/flush', flushCache);

// Protected resource routes
router.use(authenticate);

// Resource routes
router.get('/', getTasks);
router.get('/:id', validateTaskId, getTask);
router.post('/', validateContentType, validateTaskInput, createTask);
router.put('/:id', validateContentType, validateTaskId, validateTaskInput, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

export default router;
