import {
  getAllTasks,
  getTaskById,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from '../services/taskService.js';
import { sendSuccess } from '../utils/response.js';

/**
 * TaskController — HTTP layer.
 *
 * Controllers translate HTTP requests into service calls and shape the
 * response. They contain no business rules and no data-access code.
 */

/** GET /api/tasks */
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks();
    return sendSuccess(res, 'Tasks fetched successfully', tasks);
  } catch (error) {
    return next(error);
  }
};

/** GET /api/tasks/:id */
export const getTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);
    return sendSuccess(res, 'Task fetched successfully', task);
  } catch (error) {
    return next(error);
  }
};

/** POST /api/tasks */
export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body);
    return sendSuccess(res, 'Task created successfully', task, 201);
  } catch (error) {
    return next(error);
  }
};

/** PUT /api/tasks/:id */
export const updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskService(req.params.id, req.body);
    return sendSuccess(res, 'Task updated successfully', task);
  } catch (error) {
    return next(error);
  }
};

/** DELETE /api/tasks/:id */
export const deleteTask = async (req, res, next) => {
  try {
    await deleteTaskService(req.params.id);
    return sendSuccess(res, 'Task deleted successfully');
  } catch (error) {
    return next(error);
  }
};
