import Task from './Task.js';
import { tasks as seedTasks } from '../data/tasks.js';

/**
 * TaskModel — data access layer (repository).
 *
 * The model is the ONLY module allowed to touch the data source. Previously
 * it kept state in the in-memory `src/data/tasks.js` array; it now delegates
 * every operation to the Mongoose `Task` model backed by MongoDB, so data
 * persists across server restarts.
 *
 * The public method signatures are unchanged (getAll / getById / create /
 * update / delete), so nothing above this layer had to be restructured —
 * only the call sites became async because Mongoose queries are promises.
 */
const taskModel = {
  /** Returns every task in the `tasks` collection. */
  getAll: () => Task.find(),

  /** Returns a single task by ObjectId, or null when it does not exist. */
  getById: (id) => Task.findById(id),

  /** Creates and persists a new task. */
  create: (payload) => Task.create(payload),

  /**
   * Merges partial updates into an existing task. `runValidators` makes
   * sure schema validation (required / enum) runs during updates.
   */
  update: (id, payload) =>
    Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true }),

  /** Removes a task. Returns the deleted doc, or null when missing. */
  delete: (id) => Task.findByIdAndDelete(id),

  /**
   * Seeds the seed tasks from `src/data/tasks.js` into MongoDB, but only
   * when the collection is empty — preserves the Practical 4 seed data
   * without ever duplicating user-created tasks.
   */
  seedIfEmpty: async () => {
    const count = await Task.countDocuments();
    if (count > 0) {
      return;
    }
    // Drop the numeric `id` — MongoDB generates its own ObjectId.
    const docs = seedTasks.map(({ id, ...task }) => ({ ...task }));
    await Task.insertMany(docs);
    // eslint-disable-next-line no-console
    console.log(`Seeded ${docs.length} tasks into MongoDB`);
  },
};

export default taskModel;
