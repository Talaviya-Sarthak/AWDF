import taskModel from '../models/taskModel.js';

/**
 * TaskService — business logic layer.
 *
 * This layer orchestrates the data access layer (TaskModel) and throws
 * typed errors that the global error handler maps to proper HTTP status
 * codes. Field-level validation is now owned by the Mongoose schema
 * (required title, priority/status enums), so it is enforced at the data
 * layer and produces structured validation responses.
 */

/** Thrown when the request payload violates a service-level rule -> 400. */
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

/** Thrown when a resource does not exist -> 404. */
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

/* -------------------------------- service ------------------------------- */

export const getAllTasks = async () => taskModel.getAll();

export const getTaskById = async (id) => {
  const task = await taskModel.getById(id);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  return task;
};

export const createTask = async (payload) => taskModel.create(payload);

export const updateTask = async (id, payload) => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new ValidationError('At least one field is required for update');
  }
  const task = await taskModel.update(id, payload);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  return task;
};

export const deleteTask = async (id) => {
  const deleted = await taskModel.delete(id);
  if (!deleted) {
    throw new NotFoundError('Task not found');
  }
  return deleted;
};
