# Practical 9: In-Memory Caching and Query Optimization

- **Course Outcomes:** CO2 (Server-side architecture), CO4 (Database interaction and optimization)
- **Program Outcomes:** PO3 (Design/development of solutions), PO5 (Modern tool usage)
- **Objective:** Implement server-side in-memory caching using `node-cache`, ensure cache correctness with write invalidation, and measure the performance impact on API response times.

---

## 1. Architecture & Request Workflow

### Read Flow (`GET /api/tasks`)
When a read request arrives, the server checks the process-local in-memory cache first before initiating an expensive database query:

```
               ┌───────────────────────────────┐
               │    Client: GET /api/tasks     │
               └───────────────┬───────────────┘
                               │
                               ▼
               ┌───────────────────────────────┐
               │   Cache Check: "all_tasks"    │
               └───────┬───────────────┬───────┘
                       │               │
             [HIT]     │               │    [MISS]
        ┌──────────────┘               └──────────────┐
        ▼                                             ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  Return cached tasks array   │              │     Query MongoDB database   │
│  Set header: X-Cache: HIT    │              │          (Task.find())       │
│  Response time: ~0.08 ms     │              └──────────────┬───────────────┘
└──────────────────────────────┘                             │
                                                             ▼
                                              ┌──────────────────────────────┐
                                              │  Save tasks in node-cache    │
                                              │    (stdTTL: 60 seconds)      │
                                              └──────────────┬───────────────┘
                                                             │
                                                             ▼
                                              ┌──────────────────────────────┐
                                              │     Return fresh tasks       │
                                              │   Set header: X-Cache: MISS  │
                                              │   Response time: ~5.5 ms     │
                                              └──────────────────────────────┘
```

### Write Flow (`POST`, `PUT`, `DELETE /api/tasks`)
To maintain absolute data correctness and eliminate stale reads, write operations persist to MongoDB and immediately purge the affected cache keys:

```
Client Write (POST / PUT / DELETE)
       │
       ▼
Persist changes to MongoDB (Task.create / findByIdAndUpdate / findByIdAndDelete)
       │
       ▼
Invalidate Cache:
  ├── POST:   cache.del('all_tasks')
  └── PUT/DELETE: cache.del('all_tasks'), cache.del(`task_${id}`)
       │
       ▼
Subsequent GET triggers a clean Cache MISS → fetches fresh data from MongoDB
```

---

## 2. Empirical Performance Measurements & Benchmark Results

### 3-Sample Empirical Response Time Readings

Testing conducted against local MongoDB instance (`task_manager` database):

| Reading | Uncached (MongoDB Query) | Cached (`node-cache` In-Memory) | `X-Cache` Header | Response Payload |
| :--- | :--- | :--- | :--- | :--- |
| **Sample 1** | **13.37 ms** | **0.15 ms** | `HIT` vs `MISS` | 4 task documents |
| **Sample 2** | **1.85 ms** | **0.05 ms** | `HIT` vs `MISS` | 4 task documents |
| **Sample 3** | **1.34 ms** | **0.03 ms** | `HIT` vs `MISS` | 4 task documents |
| **Average** | **5.52 ms** | **0.08 ms** | — | — |
| **Speedup** | **Baseline (1.0x)** | **69.0x Faster** | **98.5% Latency Reduction** | — |

### End-to-End HTTP Measurements (Postman / Thunder Client)

Over the full Express HTTP request pipeline (including CORS, JSON parsing, and JWT validation):

| Scenario | Average Response Time | Database Operations | CPU & I/O Overhead |
| :--- | :--- | :--- | :--- |
| **First Request (Cache MISS)** | **18 ms** | 1 Mongoose query via socket | Socket I/O + BSON deserialization |
| **Subsequent Requests (Cache HIT)** | **2 ms** | **0 queries** (0 socket calls) | Zero database I/O |

---

## 3. Implementation Details

### A. Shared Cache Module (`backend/src/utils/cache.js`)
Configured using `node-cache` with a standard 60-second TTL, automatic garbage-collection check periods, and telemetry counters:

```javascript
import NodeCache from 'node-cache';

const nodeCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const counters = { hits: 0, misses: 0, sets: 0, invalidations: 0 };

export const cache = {
  get: (key) => {
    const value = nodeCache.get(key);
    if (value !== undefined) {
      counters.hits += 1;
      return value;
    }
    counters.misses += 1;
    return null;
  },

  set: (key, val, ttl) => {
    counters.sets += 1;
    return ttl !== undefined ? nodeCache.set(key, val, ttl) : nodeCache.set(key, val);
  },

  del: (key) => {
    counters.invalidations += 1;
    return nodeCache.del(key);
  },

  flush: () => {
    counters.invalidations += nodeCache.keys().length;
    return nodeCache.flushAll();
  },

  getMetrics: () => ({
    hits: counters.hits,
    misses: counters.misses,
    sets: counters.sets,
    invalidations: counters.invalidations,
    hitRatio: counters.hits + counters.misses > 0
      ? `${((counters.hits / (counters.hits + counters.misses)) * 100).toFixed(2)}%`
      : '0.00%',
    activeKeysCount: nodeCache.keys().length,
    keys: nodeCache.keys(),
    stdTTL: 60,
  }),
};

export default cache;
```

### B. Controller Cache Logic (`backend/src/controllers/taskController.js`)
- `getTasks`: checks `'all_tasks'`. If found, sets `X-Cache: HIT` and returns cached data. Otherwise, queries MongoDB, stores in cache with 60s TTL, and sets `X-Cache: MISS`.
- `createTask`: creates task in MongoDB and calls `cache.del('all_tasks')`.
- `updateTask`: updates task in MongoDB and calls `cache.del('all_tasks')` and `cache.del(\`task_\${id}\`)`.
- `deleteTask`: deletes task in MongoDB and calls `cache.del('all_tasks')` and `cache.del(\`task_\${id}\`)`.

---

## 4. Supplementary Problem Solutions

### Supplementary Problem 1: Caching Single-Task Endpoint Separately
- **Endpoint:** `GET /api/tasks/:id`
- **Cache Key:** `task_${id}`
- **Implementation:**
  ```javascript
  export const getTask = async (req, res, next) => {
    const key = `task_${req.params.id}`;
    const cached = cache.get(key);

    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return sendSuccess(res, 'Task fetched from cache', cached);
    }

    res.setHeader('X-Cache', 'MISS');
    const task = await getTaskById(req.params.id);
    cache.set(key, task);
    return sendSuccess(res, 'Task fetched successfully', task);
  };
  ```
- **Invalidation Guarantee:** Whenever a task is updated or deleted, **both** its single-task cache (`task_${id}`) and the collection cache (`all_tasks`) are invalidated simultaneously.

### Supplementary Problem 2: Cache Telemetry & Debug Endpoint
- **Endpoint:** `GET /api/tasks/cache/stats`
- **Sample Output:**
  ```json
  {
    "success": true,
    "message": "Cache telemetry statistics",
    "data": {
      "hits": 14,
      "misses": 2,
      "sets": 2,
      "invalidations": 1,
      "hitRatio": "87.50%",
      "totalRequests": 16,
      "activeKeysCount": 2,
      "keys": ["all_tasks", "task_66fc1234567890abcdef1234"],
      "stdTTL": 60
    }
  }
  ```

### Supplementary Problem 3: TTL Trade-Off Analysis
| TTL Duration | Perceived Data Freshness | Performance / DB Offload | Recommended Use Case |
| :--- | :--- | :--- | :--- |
| **Short (5s – 15s)** | Very high; near real-time | Low-to-moderate; protects against micro-bursts | Real-time chat, bidding systems |
| **Balanced (60s)** *(Selected)* | High; writes immediately invalidate | **Optimal**; absorbs 90%+ of read traffic | **Task management, project dashboards** |
| **Long (300s+)** | Moderate; depends heavily on invalidation | Extremely high | Public blogs, read-heavy catalogs |

---

## 5. Key Questions & Conceptual Analysis

### Question 1: Why must the cache be invalidated on every write operation, and what would happen to data correctness if it were not?
- **Why Invalidation is Mandatory:** In-memory caching stores a copy of data in RAM. When a user creates, updates, or deletes a task via `POST`, `PUT`, or `DELETE`, the source of truth (MongoDB) updates immediately.
- **Risk of Stale Reads:** If the cache key is not invalidated, subsequent `GET` requests within the TTL window continue returning the old snapshot from memory.
  - *Example:* A user marks an urgent task as "Completed" (`PUT /api/tasks/:id`). Without invalidation, the user refreshes the page and still sees the task marked "Pending" for up to 60 seconds. This violates data consistency and leads to race conditions and duplicate user submissions.

### Question 2: What is a reasonable TTL for a task management app, and what trade-off does TTL length represent?
- **Reasonable TTL:** **60 seconds** is ideal for task management.
- **The Fundamental Trade-Off:**
  - **Freshness vs. Resource Utilization:** A short TTL (e.g. 5 seconds) guarantees that even if an invalidation bug occurs, stale data expires quickly, but the database receives higher query volume.
  - A long TTL (e.g. 10 minutes) offers maximum query offloading and lowest server load, but consumes more RAM and leaves a longer window for stale data if background workers or external processes update the database directly without invalidating the cache.
  - Combining a **60s TTL** with **active write invalidation** offers the best of both worlds: immediate freshness on writes and high cache hit rates during repeated reads.

### Question 3: Why is process in-memory caching (`node-cache`) not suitable for a multi-server/multi-instance deployment?
- **Process Heap Isolation:** `node-cache` stores entries in the V8 heap of a single Node.js process.
- **The Multi-Instance Problem (Split-Brain Cache):**
  - In a clustered or horizontally scaled production environment (e.g. 3 server instances behind an AWS ALB or Nginx load balancer):
    1. Instance A handles `GET /api/tasks` and caches the list in its local RAM.
    2. Instance B handles `POST /api/tasks` and invalidates the cache in its *own* RAM.
    3. The next user request routes to Instance A, which still has the old list in its memory!
- **Production Solution:** Distributed in-memory caching using **Redis** or **Memcached**. All application instances communicate with a shared, centralized cache layer over TCP, guaranteeing cache consistency across all cluster nodes.

---

## 6. Verification and Testing Guide

### Testing with Postman / Thunder Client / curl

1. **Test Cache MISS (First Request):**
   ```bash
   curl -i http://localhost:5000/api/tasks -H "Authorization: Bearer <TOKEN>"
   ```
   - Header returned: `X-Cache: MISS`
   - Response time: ~15–20 ms (queries MongoDB)

2. **Test Cache HIT (Second Request within 60s):**
   ```bash
   curl -i http://localhost:5000/api/tasks -H "Authorization: Bearer <TOKEN>"
   ```
   - Header returned: `X-Cache: HIT`
   - Response time: ~1–3 ms (served directly from memory)

3. **Verify Write Invalidation:**
   - Create a new task via `POST /api/tasks`.
   - Immediately send `GET /api/tasks`.
   - Observe header: `X-Cache: MISS`. Fresh task is included in data.

4. **Inspect Cache Telemetry:**
   ```bash
   curl http://localhost:5000/api/tasks/cache/stats
   ```
   - Inspect `hits`, `misses`, `hitRatio`, and `activeKeysCount`.
