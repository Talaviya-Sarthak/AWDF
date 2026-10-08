import taskEvents from './taskEvents.js';

/**
 * Background Event Listeners.
 *
 * Registered once at application startup. Handles asynchronous, non-blocking
 * side effects triggered by Task lifecycle events.
 */

// Listener 1: Task Created -> Async Notification & Email Dispatch
taskEvents.on('task-created', (task) => {
  const handlerStartTime = new Date().toISOString();
  console.log(`[Event:Received] 'task-created' event caught at ${handlerStartTime}`);

  // Supplementary Problem 3: Simulate heavy background notification (e.g. SMTP / Webhook)
  // Using setTimeout proves non-blocking execution while the API response has already returned.
  setTimeout(() => {
    const completionTime = new Date().toISOString();
    console.log('---------------------------------------------------------');
    console.log(`[Notification Service] Email dispatched to: ${task.user || 'Workspace Member'}`);
    console.log(`[Notification Details] Task: "${task.title}" (Priority: ${task.priority || 'medium'})`);
    console.log(`[Notification Time]    Completed at: ${completionTime}`);
    console.log('---------------------------------------------------------');
  }, 1500); // 1.5 second artificial delay simulating third-party email API
});

// Listener 2 (Supplementary Problem 1): Task Deleted -> Audit Log Record
taskEvents.on('task-deleted', (data) => {
  const timestamp = new Date().toISOString();
  console.log('---------------------------------------------------------');
  console.log(`[Audit Trail] Task ID "${data.id}" permanently deleted`);
  console.log(`[Audit Action] Triggered by: ${data.user || 'Authenticated User'}`);
  console.log(`[Audit Time]   Logged at: ${timestamp}`);
  console.log('---------------------------------------------------------');
});

// Listener 3 (Supplementary Problem 2): Error Listener
// Catches and logs errors thrown inside event handlers, preventing Node process crashes.
taskEvents.on('error', (err) => {
  console.error('[EventEmitter:Error] Unhandled error in background listener:', err.message);
});

console.log('[EventEmitter] Background task listeners successfully registered');
