import mongoose from 'mongoose';

/**
 * Task schema — application-level contract enforced by Mongoose.
 *
 * MongoDB itself is schema-less, but this schema guarantees that every
 * document stored in the `tasks` collection follows the same shape and
 * passes the same validation rules (required title, priority/status enums).
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    dueDate: {
      type: String,
      default: '',
    },

    completed: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Expose the `id` virtual (stringified _id) so the API contract that
    // the frontend relies on stays identical, and hide the `__v` version key.
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

/**
 * Pre-save hook — trims surrounding whitespace from the title before the
 * document is persisted. E.g. "   Learn MongoDB   " -> "Learn MongoDB".
 *
 * Note: Mongoose 9 dropped callback-based pre middleware, so hooks must be
 * promise-returning (or synchronous) and must NOT call `next()`.
 */
taskSchema.pre('save', function () {
  if (typeof this.title === 'string') {
    this.title = this.title.trim();
  }
});

/**
 * Pre findOneAndUpdate hook — trims the title on updates too, because
 * update middleware does not run `pre('save')` hooks.
 */
taskSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update && typeof update.title === 'string') {
    update.title = update.title.trim();
  } else if (update && update.$set && typeof update.$set.title === 'string') {
    update.$set.title = update.$set.title.trim();
  }
});

export default mongoose.model('Task', taskSchema);
