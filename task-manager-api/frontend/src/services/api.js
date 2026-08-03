import axios from 'axios';

/**
 * Shared Axios instance.
 *
 * Every request made by the application MUST go through this module so the
 * base URL, headers and interceptors stay consistent. Components never
 * instantiate axios directly.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Task API surface — one method per backend endpoint.
 */
export const taskApi = {
  getAll: () => api.get('/tasks'),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (payload) => api.post('/tasks', payload),
  update: (id, payload) => api.put(`/tasks/${id}`, payload),
  remove: (id) => api.delete(`/tasks/${id}`),
};

export default api;
