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

/**
 * Task routes.
 *
 * Middleware placement:
 *   - validateContentType rejects non-JSON bodies on POST / PUT.
 *   - validateTaskId rejects malformed ids on any route using :id.
 */
const router = Router();

router.get('/', getTasks);
router.get('/:id', validateTaskId, getTask);
router.post('/', validateContentType, createTask);
router.put('/:id', validateContentType, validateTaskId, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

export default router;
