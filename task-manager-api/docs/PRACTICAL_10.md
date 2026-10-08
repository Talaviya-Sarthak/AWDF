# Practical 10: Asynchronous Processing with Event-Driven Architecture

- **Course Outcome:** CO4 — Design and implement event-driven asynchronous backend architectures.
- **Program Outcomes:** PO3 (Design/development of solutions), PO5 (Modern tool usage).
- **Objective:** Implement non-blocking background processing using Node.js native `EventEmitter` without external message queue dependencies.

---

## 1. Architecture & Execution Workflow

### Event-Driven Request-Response Cycle

```
Client (Postman / Browser)
         │
         ├── 1. POST /api/tasks (Payload: title, priority, dueDate)
         ▼
Express Route & Controller (Main Event Loop Call Stack)
         │
         ├── 2. Save task document to MongoDB via Mongoose (~10 ms)
         │
         ├── 3. Send HTTP 201 Created response immediately to client! (t = 0 ms)
         │       Client receives response and finishes HTTP connection.
         │
         └── 4. Emit 'task-created' event onto TaskEventEmitter bus
                 │
                 ▼ (Scheduled on Event Loop Macrotask Queue)
       Background Event Listener
                 │
                 ├── Logs event reception (t = 1 ms)
                 ├── Simulates email dispatch / webhook push (1500 ms delay)
                 └── Completes notification logging (t = +1510 ms)
```

---

## 2. Empirical Execution Evidence: Timestamp Comparison

Captured from automated benchmark (`node src/utils/eventDemo.mjs`):

```bash
[EventEmitter] Background task listeners successfully registered
===============================================================
 Practical 10: Asynchronous Event-Driven Processing Benchmark 
===============================================================

[Client] Sending POST /api/tasks request to create task...
[Database] Task written to MongoDB at: 2026-10-08T12:23:10.393Z

>>> [API Response] HTTP 201 Created sent to client at: 2026-10-08T12:23:10.394Z (11 ms elapsed)
[API Controller] Emitting "task-created" event onto native EventEmitter bus...
[Event:Received] 'task-created' event caught at 2026-10-08T12:23:10.395Z

>>> Notice: Client is already released! Background work continues asynchronously...

---------------------------------------------------------
[Notification Service] Email dispatched to: student@taskflow.dev
[Notification Details] Task: "Deploy Production Release v2.4" (Priority: high)
[Notification Time]    Completed at: 2026-10-08T12:23:11.905Z
---------------------------------------------------------

===============================================================
 Demonstrating Supplementary Problem 1: task-deleted Event    
===============================================================
>>> [API Response] HTTP 200 OK sent to client at: 2026-10-08T12:23:12.399Z
---------------------------------------------------------
[Audit Trail] Task ID "66fc9876543210fedcba4321" permanently deleted
[Audit Action] Triggered by: student@taskflow.dev
[Audit Time]   Logged at: 2026-10-08T12:23:12.399Z
---------------------------------------------------------

===============================================================
 Demonstrating Supplementary Problem 2: error Event Listener   
===============================================================
[EventEmitter:Error] Unhandled error in background listener: Simulated external notification API timeout

[Process] Event loop verified non-blocking. Demo completed successfully.
```

### Empirical Timing Proof Analysis

| Checkpoint | Timestamp | Elapsed Time | State |
| :--- | :--- | :--- | :--- |
| **Task Saved to MongoDB** | `2026-10-08T12:23:10.393Z` | 0 ms | Data layer write complete |
| **API Response Sent (`res.status(201)`)** | **`2026-10-08T12:23:10.394Z`** | **+1 ms** | **Client unblocked & received response!** |
| **Event Dispatched & Caught** | `2026-10-08T12:23:10.395Z` | +2 ms | Background listener triggered |
| **Notification Processing Complete** | **`2026-10-08T12:23:11.905Z`** | **+1,512 ms** | Handled in background without delaying client |

---

## 3. Implementation Details

### A. Dedicated Event Bus (`backend/src/events/taskEvents.js`)
A centralized Node.js native `EventEmitter` instance that acts as an in-process pub/sub bus:

```javascript
import { EventEmitter } from 'events';

class TaskEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(20);
  }
}

export const taskEvents = new TaskEventEmitter();
export default taskEvents;
```

### B. Background Listeners (`backend/src/events/taskListeners.js`)
Registers asynchronous side-effect handlers at server startup:

```javascript
import taskEvents from './taskEvents.js';

// 1. Task Created Listener (Asynchronous Notification)
taskEvents.on('task-created', (task) => {
  console.log(`[Event:Received] 'task-created' caught at ${new Date().toISOString()}`);

  // Simulates slow third-party notification (1.5s delay)
  setTimeout(() => {
    console.log(`[Notification Service] Dispatched email for task "${task.title}" to ${task.user}`);
    console.log(`[Notification Time] Completed at ${new Date().toISOString()}`);
  }, 1500);
});

// 2. Task Deleted Listener (Supplementary Problem 1: Audit Logging)
taskEvents.on('task-deleted', (data) => {
  console.log(`[Audit Trail] Task ${data.id} deleted by ${data.user} at ${new Date().toISOString()}`);
});

// 3. Error Listener (Supplementary Problem 2: Process Protection)
taskEvents.on('error', (err) => {
  console.error('[EventEmitter:Error] Caught background listener error:', err.message);
});
```

### C. Controller Integration (`backend/src/controllers/taskController.js`)
The controller persists the task, transmits the HTTP response immediately to unblock the client, and then fires the event:

```javascript
export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body);
    cache.del(CACHE_KEY_ALL_TASKS);

    // 1. Send HTTP response first
    const responseTimestamp = new Date().toISOString();
    console.log(`[API] Response 201 sent at ${responseTimestamp}`);
    sendSuccess(res, 'Task created successfully', task, 201);

    // 2. Emit event asynchronously (Non-blocking)
    taskEvents.emit('task-created', {
      id: task._id || task.id,
      title: task.title,
      priority: task.priority,
      user: req.user?.email || 'Authenticated User',
      timestamp: responseTimestamp,
    });
  } catch (error) {
    return next(error);
  }
};
```

---

## 4. Supplementary Problem Solutions

### Supplementary Problem 1: `task-deleted` Event Listener
- **Event Name:** `task-deleted`
- **Payload:** `{ id, user, timestamp }`
- **Purpose:** Decoupled security and compliance audit logging. Whenever `DELETE /api/tasks/:id` succeeds, an immutable audit event is emitted and processed without stalling the deletion response.

### Supplementary Problem 2: Dedicated Error Event Listener
- **Special Node.js Behavior:** By default, if an `EventEmitter` instance emits an `'error'` event and there are no listeners registered for `'error'`, Node.js prints a stack trace and **crashes the entire process** (`uncaughtException`).
- **Solution:** Registering `taskEvents.on('error', (err) => { ... })` ensures that background failures (such as SMTP connection timeouts or third-party webhook dropouts) are safely logged without crashing the Express web server.

### Supplementary Problem 3: Artificial Delay Simulation (Slow Notification)
- **Simulation:** A `setTimeout(..., 1500)` simulates network latency when reaching an external email provider (SendGrid, AWS SES) or push notification service.
- **Result:** The API returns `201 Created` in **11 ms**, while the notification completes **1,512 ms** later in the background.

---

## 5. Key Questions & Conceptual Analysis

### Question 1: Why does emitting an event not block the API response, even though both run on the same Node.js process?
1. **The Node.js Single-Threaded Event Loop:**
   - Node.js operates on a single execution thread with an event-driven loop backed by `libuv`.
   - When `res.status(201).json(task)` is called, Express flushes HTTP headers and the payload into the operating system network socket buffer immediately.
2. **Synchronous vs Asynchronous Handlers:**
   - In standard `EventEmitter`, `emit()` invokes listener callbacks sequentially.
   - When listeners wrap work in asynchronous APIs (such as `setTimeout`, `setImmediate`, database I/O, or `fetch`), the timer or I/O handle is offloaded to the `libuv` thread pool/timer queue.
   - The main call stack immediately returns to finish the request lifecycle. The callback executes in a subsequent tick of the event loop after the client connection has closed.

### Question 2: What would happen to API response time if the notification logic were placed directly inside the POST route instead of in an event handler?
1. **Massive Latency Penalty:**
   - If an email service takes **1.5 seconds** to establish a TLS handshake and deliver an email, the client would be forced to wait **1,511 ms** instead of **11 ms** (a **137x slower response time**).
2. **Failure Coupling:**
   - If the third-party email service times out or throws an error, the entire `POST /tasks` request would fail with an HTTP 500 error, falsely telling the user their task could not be created even though it was already saved in MongoDB.
3. **Throughput Degradation:**
   - Synchronous network I/O keeps the request socket open, consuming server file descriptors and causing request queuing during traffic spikes.

### Question 3: Why is `EventEmitter` suitable for this application scale, but not for an enterprise system handling millions of events per day?
| Dimension | Node.js Built-in `EventEmitter` | Enterprise Message Queue (RabbitMQ / BullMQ / Kafka) |
| :--- | :--- | :--- |
| **Scope** | Single-process (in-memory) | Distributed across multiple clusters |
| **Persistence** | **None.** If the server process restarts or crashes, pending in-memory events are permanently lost. | Durable disk-backed persistence. |
| **Backpressure** | None. Unbounded queueing can cause Out-Of-Memory (OOM) heap crashes. | Robust rate limiting, consumer concurrency, and backpressure control. |
| **Retry & DLQ** | No built-in retry mechanisms or Dead Letter Queues (DLQ). | Automatic exponential backoff retries and failed message auditing. |
| **Horizontal Scaling** | Events cannot cross process boundaries between load-balanced servers. | Seamless message distribution across worker nodes. |

---

## 6. How to Test and Verify

1. **Run the Automated Event Demonstration Script:**
   ```bash
   cd task-manager-api/backend
   node src/utils/eventDemo.mjs
   ```
   Observe the terminal output confirming that the `HTTP 201 Created` timestamp is printed before the `[Notification Service]` completion log.

2. **Test via Postman / Thunder Client:**
   - Start the backend server (`npm run dev` in `task-manager-api/backend`).
   - Send `POST http://localhost:5000/api/tasks`:
     ```json
     {
       "title": "Complete Practical 10 Verification",
       "priority": "high",
       "dueDate": "2026-10-15"
     }
     ```
   - Watch the server terminal:
     1. `[API] Response 201 sent at ...` appears instantly.
     2. Postman shows `Status: 201 Created` in ~15 ms.
     3. 1.5 seconds later, the server prints the notification dispatch confirmation.
