import { tasks as seedTasks } from '../data/tasks.js';

/**
 * TaskModel — data access layer (repository).
 *
 * The model is the ONLY module allowed to touch the data source. Today it
 * reads the static file `src/data/tasks.js` and keeps state in memory.
 *
 * To migrate to a real database later, only this class needs to change:
 *   - getAll()   -> SELECT / find()
 *   - getById()  -> SELECT WHERE id = ?  / findById()
 *   - create()   -> INSERT / insertOne()
 *   - update()   -> UPDATE / findByIdAndUpdate()
 *   - delete()   -> DELETE / findByIdAndDelete()
 *
 * Nothing above this layer (services, controllers, routes, frontend)
 * has to be modified.
 */
class TaskModel {
  constructor() {
    // Work on a copy so the seed module is never mutated.
    this._tasks = seedTasks.map((task) => ({ ...task }));
  }

  /** Returns a shallow copy of every task. */
  getAll() {
    return this._tasks.map((task) => ({ ...task }));
  }

  /** Returns a copy of a single task or null when it does not exist. */
  getById(id) {
    const task = this._tasks.find((item) => item.id === id);
    return task ? { ...task } : null;
  }

  /** Persists a new task and returns the created entity. */
  create(payload) {
    const task = {
      id: this._getNextId(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    this._tasks.push(task);
    return { ...task };
  }

  /** Merges partial updates into an existing task, or returns null. */
  update(id, payload) {
    const index = this._tasks.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    this._tasks[index] = { ...this._tasks[index], ...payload };
    return { ...this._tasks[index] };
  }

  /** Removes a task. Returns true when deleted, false when missing. */
  delete(id) {
    const index = this._tasks.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this._tasks.splice(index, 1);
    return true;
  }

  /** Simple auto-increment style id generator (seed ids start at 1001). */
  _getNextId() {
    const maxId = this._tasks.reduce(
      (max, task) => Math.max(max, task.id),
      1000
    );
    return maxId + 1;
  }
}

// Export a single shared instance (acts like a connection/session object).
export default new TaskModel();
