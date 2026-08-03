# TaskFlow — Task Manager API

A premium **skeuomorphic** task manager with a full REST API backend (Node.js + Express) and a polished React dashboard. The UI uses realistic materials — paper cards, a leather sidebar, a brushed-metal top bar, raised buttons and inset inputs — instead of flat or neumorphic styling.

> Data is stored in a **static file** (`backend/src/data/tasks.js`) behind a clean repository interface, so the data source can be swapped for MongoDB, PostgreSQL or MySQL later **without touching the frontend**.

---

## ✨ Features

- **RESTful Task API** — complete CRUD with proper HTTP status codes (200 / 201 / 400 / 404 / 415 / 500).
- **Clean architecture** — routes → controllers → services → models (data access), so each layer is independently replaceable.
- **Middleware** — request logging (method, URL, timestamp, execution time), `application/json` content-type guard, and task-id validation.
- **Consistent response shape** — every endpoint returns `{ success, message, data }`.
- **Premium dashboard** — statistics cards, recent activity feed, quick actions, search, filters, task cards, and add / edit / delete modals.
- **Graceful degradation** — if the API is offline, the frontend falls back to bundled demo data and shows a notice.
- **Fully responsive** — desktop, tablet and mobile layouts.

---

## 🗂 Folder Structure

```
task-manager-api/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js                 # Environment configuration
│   │   ├── controllers/
│   │   │   └── taskController.js      # HTTP layer
│   │   ├── middleware/
│   │   │   ├── logger.js              # Method / URL / timestamp / ms
│   │   │   ├── errorHandler.js        # Global error handler (last)
│   │   │   ├── validateContentType.js # Rejects non-JSON bodies (415)
│   │   │   └── validateTaskId.js      # Rejects invalid ids (400)
│   │   ├── routes/
│   │   │   └── taskRoutes.js          # Express router
│   │   ├── services/
│   │   │   └── taskService.js         # Business rules & validation
│   │   ├── models/
│   │   │   └── taskModel.js           # Data access (swap for a DB later)
│   │   ├── data/
│   │   │   └── tasks.js               # Static task data source
│   │   ├── utils/
│   │   │   └── response.js            # Standard response helpers
│   │   ├── app.js                     # App wiring & middleware order
│   │   └── server.js                  # Bootstrap / listen
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Header.jsx             # Brushed-metal top bar
│   │   │   ├── Modal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Sidebar.jsx            # Leather sidebar
│   │   │   ├── StatsCard.jsx
│   │   │   └── TaskCard.jsx           # Notebook-inspired card
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js                 # Single Axios instance
│   │   ├── hooks/
│   │   │   └── useTasks.js            # Data hook (fetch + mutations)
│   │   ├── data/
│   │   │   └── tasks.js               # Offline demo fallback data
│   │   ├── utils/
│   │   │   └── format.js              # Date formatting helpers
│   │   ├── styles/
│   │   │   ├── skeuo.css              # Tailwind tokens + animation config
│   │   │   └── classes.js             # Shared Tailwind material classes
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

Requirements: **Node.js ≥ 18**.

```bash
# 1. Backend
cd backend
npm install

# 2. Frontend (from project root)
cd ../frontend
npm install
```

---

## ▶️ Running the Backend

```bash
cd backend
npm run dev        # uses nodemon (development)
# or
npm start          # plain node
```

The API starts on **http://localhost:5000** and every request is logged like:

```
GET /api/tasks
2026-08-02T10:10:00.000Z
14 ms
```

> Create `backend/.env` from `.env.example` if needed. Defaults already match the frontend dev server.

---

## ▶️ Running the Frontend

```bash
cd frontend
npm run dev
```

Open **http://localhost:5173**. The dashboard talks to `http://localhost:5000/api` (configured via `frontend/.env`).

If the backend is not running, the dashboard still works with bundled demo data and shows a notice banner.

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint         | Description        | Success | Errors        |
| ------ | ---------------- | ------------------ | ------- | ------------- |
| GET    | `/tasks`         | List all tasks     | 200     | —             |
| GET    | `/tasks/:id`     | Get a single task  | 200     | 400, 404      |
| POST   | `/tasks`         | Create a task      | 201     | 400, 415      |
| PUT    | `/tasks/:id`     | Update a task      | 200     | 400, 404, 415 |
| DELETE | `/tasks/:id`     | Delete a task      | 200     | 400, 404      |
| GET    | `/health`        | Health check       | 200     | —             |

**Request / response format** — all bodies are JSON, all responses share one shape:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1015,
    "title": "Prepare sprint demo",
    "description": "Walk through the new dashboard",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-09-01",
    "createdAt": "2026-08-02T10:10:00.000Z"
  }
}
```

**Task fields**

| Field         | Type     | Rules                                          |
| ------------- | -------- | ---------------------------------------------- |
| `title`       | string   | required, max 120 chars                        |
| `description` | string   | optional                                       |
| `status`      | string   | `pending` \| `in_progress` \| `completed` (default `pending`) |
| `priority`    | string   | `low` \| `medium` \| `high` (default `medium`) |
| `dueDate`     | string   | `YYYY-MM-DD`, optional                         |

**Example — create a task**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare sprint demo","priority":"high","dueDate":"2026-09-01"}'
```

**Error scenarios**

- `400` — invalid task id (`/tasks/abc`) or invalid payload (missing title, bad status).
- `404` — task or route not found (`{"success":false,"message":"Route not found","data":null}`).
- `415` — `POST`/`PUT` without `Content-Type: application/json`.
- `500` — unexpected server error (message is always `"Something went wrong"`, stack traces never leak).

---

## 🧱 Skeuomorphic Design Language

| Element        | Material        | Details                                                     |
| -------------- | --------------- | ----------------------------------------------------------- |
| Background     | Warm light gray | Soft radial color washes + paper page                        |
| Sidebar        | Leather         | Dark graphite, grain texture, inset edge shadow, stitched patch widget |
| Top bar        | Brushed metal   | Horizontal sheen, beveled bottom edge, engraved title        |
| Cards          | Off-white paper | Laminated highlight, drop shadow, gloss sweep               |
| Task cards     | Notebook        | Binder rings, colored spine, ruled badges, status dot       |
| Buttons        | Raised plastic  | 3D bevel lip, press-down on click, gloss highlight          |
| Inputs / selects | Inset        | Carved look with top inner shadow                           |
| Icons / numbers | Embossed      | Inset engraving via shadow stacks                           |
| Modals         | Floating        | Heavy drop shadow, blurred backdrop, pop-in animation       |

Accent: **blue** · Status colors: **green / yellow / red**.

---

## 📸 Screenshots

*Add screenshots here:*

```md
![Dashboard](screenshots/dashboard.png)
![Tasks](screenshots/tasks.png)
```

*(Capture them by running both servers and opening `http://localhost:5173`.)*

---

## 🗄 Future Database Support

The data layer is intentionally isolated:

- `backend/src/data/tasks.js` — the only place raw data lives today.
- `backend/src/models/taskModel.js` — the only module that touches that data.

To migrate to **MongoDB / PostgreSQL / MySQL**, replace the methods inside `taskModel.js` (or point the service at a new repository implementation). Controllers, routes, middleware, the response format and the **entire frontend** stay unchanged.

---

## 🔮 Future Improvements

- Persist tasks to a real database (PostgreSQL / MongoDB / MySQL).
- Add task pagination, sorting and debounced search on the server.
- Authentication & per-user task ownership with JWT.
- Drag-and-drop board view (Kanban) alongside the list view.
- Subtask support and task dependencies.
- Due-date reminders and email notifications.
- API rate limiting, request validation with a schema library, and automated tests.
- Dark leather / night theme variant.

---

## 🛠 Tech Stack

- **Frontend:** React 19 · Vite · Tailwind CSS v4 · Axios · React Icons · React Router
- **Backend:** Node.js · Express.js (ESM)
- **Design:** Skeuomorphic system built entirely from Tailwind utilities (`src/styles/classes.js`)
