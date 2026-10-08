import { EventEmitter } from 'events';

/**
 * TaskEvents — Application-wide Event Bus.
 *
 * Uses Node.js native EventEmitter without external message brokers.
 * Decouples resource mutation (API response) from downstream side-effects
 * (email notifications, audit logging, analytics indexing).
 */
class TaskEventEmitter extends EventEmitter {
  constructor() {
    super();
    // Default max listeners threshold
    this.setMaxListeners(20);
  }
}

export const taskEvents = new TaskEventEmitter();

export default taskEvents;
