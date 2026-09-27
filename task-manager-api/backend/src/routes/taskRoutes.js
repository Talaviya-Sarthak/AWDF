import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import validateContentType from '../middleware/validateContentType.js';
import validateTaskId from '../middleware/validateTaskId.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateTaskInput } from '../middleware/validate.js';

/**
 * Task routes — all protected by authentication middleware.
 *
 * Middleware placement:
 *   - authenticate — verifies JWT on all routes
 *   - validateContentType — rejects non-JSON bodies on POST / PUT
 *   - validateTaskId — rejects malformed ids on any route using :id
 *   - validateTaskInput — validates required fields (title) before controller
 */
const router = Router();

router.use(authenticate);

router.get('/', getTasks);
router.get('/:id', validateTaskId, getTask);
router.post('/', validateContentType, validateTaskInput, createTask);
router.put('/:id', validateContentType, validateTaskId, validateTaskInput, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

export default router;
