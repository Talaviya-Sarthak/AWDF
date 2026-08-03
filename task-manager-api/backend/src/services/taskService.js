import taskModel from '../models/taskModel.js';

/**
 * TaskService — business logic layer.
 *
 * This layer is responsible for:
 *   - enforcing domain rules and validating payloads,
 *   - orchestrating the data access layer (TaskModel),
 *   - throwing typed errors that the global error handler maps to
 *     proper HTTP status codes.
 *
 * It knows nothing about Express, HTTP or the transport layer, which makes
 * it fully reusable if a database is introduced later.
 */

const VALID_STATUSES = ['pending', 'in_progress', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TITLE_MAX_LENGTH = 120;

/** Thrown when the request payload violates a domain rule -> 400. */
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

/* ------------------------------ validators ------------------------------ */

const requireTitle = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ValidationError('Title is required');
  }
  const title = value.trim();
  if (title.length > TITLE_MAX_LENGTH) {
    throw new ValidationError(
      `Title must not exceed ${TITLE_MAX_LENGTH} characters`
    );
  }
  return title;
};

const validateDescription = (value) => {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value !== 'string') {
    throw new ValidationError('Description must be a string');
  }
  return value.trim();
};

const validateStatus = (value) => {
  if (value === undefined) {
    return 'pending';
  }
  if (!VALID_STATUSES.includes(value)) {
    throw new ValidationError(
      `Status must be one of: ${VALID_STATUSES.join(', ')}`
    );
  }
  return value;
};

const validatePriority = (value) => {
  if (value === undefined) {
    return 'medium';
  }
  if (!VALID_PRIORITIES.includes(value)) {
    throw new ValidationError(
      `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`
    );
  }
  return value;
};

const validateDueDate = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) {
    throw new ValidationError('dueDate must use the YYYY-MM-DD format');
  }
  return value;
};

/* --------------------------- payload sanitizers -------------------------- */

const sanitizeCreatePayload = (payload = {}) => ({
  title: requireTitle(payload.title),
  description: validateDescription(payload.description),
  status: validateStatus(payload.status),
  priority: validatePriority(payload.priority),
  dueDate: validateDueDate(payload.dueDate),
});

const sanitizeUpdatePayload = (payload = {}) => {
  const clean = {};

  if (payload.title !== undefined) clean.title = requireTitle(payload.title);
  if (payload.description !== undefined)
    clean.description = validateDescription(payload.description);
  if (payload.status !== undefined) clean.status = validateStatus(payload.status);
  if (payload.priority !== undefined)
    clean.priority = validatePriority(payload.priority);
  if (payload.dueDate !== undefined)
    clean.dueDate = validateDueDate(payload.dueDate);

  if (Object.keys(clean).length === 0) {
    throw new ValidationError('At least one field is required for update');
  }

  return clean;
};

/* -------------------------------- service ------------------------------- */

export const getAllTasks = async () => taskModel.getAll();

export const getTaskById = async (id) => {
  const task = taskModel.getById(id);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  return task;
};

export const createTask = async (payload) =>
  taskModel.create(sanitizeCreatePayload(payload));

export const updateTask = async (id, payload) => {
  // Failing fast on a missing task keeps the "not found" semantics clear.
  if (!taskModel.getById(id)) {
    throw new NotFoundError('Task not found');
  }
  return taskModel.update(id, sanitizeUpdatePayload(payload));
};

export const deleteTask = async (id) => {
  const deleted = taskModel.delete(id);
  if (!deleted) {
    throw new NotFoundError('Task not found');
  }
  return deleted;
};
