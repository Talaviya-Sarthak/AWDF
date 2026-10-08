import {
  getAllTasks,
  getTaskById,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from '../services/taskService.js';
import { sendSuccess } from '../utils/response.js';
import cache from '../utils/cache.js';

const CACHE_KEY_ALL_TASKS = 'all_tasks';
const getTaskCacheKey = (id) => `task_${id}`;

/**
 * GET /api/tasks
 *
 * Implements In-Memory Caching (node-cache):
 * 1. Checks if all_tasks exists in cache.
 * 2. HIT: Sets X-Cache: HIT and returns cached array immediately.
 * 3. MISS: Sets X-Cache: MISS, queries MongoDB, stores in cache with 60s TTL, returns tasks.
 */
export const getTasks = async (req, res, next) => {
  try {
    const cached = cache.get(CACHE_KEY_ALL_TASKS);

    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return sendSuccess(res, 'Tasks fetched from cache', cached);
    }

    res.setHeader('X-Cache', 'MISS');
    const tasks = await getAllTasks();

    // Store in cache with standard TTL (60 seconds)
    cache.set(CACHE_KEY_ALL_TASKS, tasks);

    return sendSuccess(res, 'Tasks fetched successfully', tasks);
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/tasks/:id
 *
 * Supplementary Problem 1: Cache single-task endpoint separately.
 */
export const getTask = async (req, res, next) => {
  try {
    const key = getTaskCacheKey(req.params.id);
    const cached = cache.get(key);

    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return sendSuccess(res, 'Task fetched from cache', cached);
    }

    res.setHeader('X-Cache', 'MISS');
    const task = await getTaskById(req.params.id);

    cache.set(key, task);
    return sendSuccess(res, 'Task fetched successfully', task);
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/tasks
 *
 * Writes to MongoDB and invalidates all_tasks cache key.
 */
export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body);

    // Invalidate list cache so newly created task is immediately visible
    cache.del(CACHE_KEY_ALL_TASKS);

    return sendSuccess(res, 'Task created successfully', task, 201);
  } catch (error) {
    return next(error);
  }
};

/**
 * PUT /api/tasks/:id
 *
 * Writes update to MongoDB and invalidates both all_tasks and specific task cache.
 */
export const updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskService(req.params.id, req.body);

    // Invalidate list cache and item cache to prevent serving stale data
    cache.del(CACHE_KEY_ALL_TASKS);
    cache.del(getTaskCacheKey(req.params.id));

    return sendSuccess(res, 'Task updated successfully', task);
  } catch (error) {
    return next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 *
 * Deletes task from MongoDB and invalidates both all_tasks and specific task cache.
 */
export const deleteTask = async (req, res, next) => {
  try {
    await deleteTaskService(req.params.id);

    // Invalidate both cache keys
    cache.del(CACHE_KEY_ALL_TASKS);
    cache.del(getTaskCacheKey(req.params.id));

    return sendSuccess(res, 'Task deleted successfully');
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/tasks/cache/stats
 *
 * Supplementary Problem 2: Expose cache hits, misses, ratios, and active keys.
 */
export const getCacheStats = (req, res) => {
  return sendSuccess(res, 'Cache telemetry statistics', cache.getMetrics());
};

/**
 * POST /api/tasks/cache/flush
 *
 * Debug endpoint to manually flush cache for testing and evaluation.
 */
export const flushCache = (req, res) => {
  cache.flush();
  return sendSuccess(res, 'Cache cleared successfully');
};
