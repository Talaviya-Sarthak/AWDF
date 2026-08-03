import { useCallback, useEffect, useState } from 'react';
import { taskApi } from '../services/api.js';
import seedTasks from '../data/tasks.js';

/**
 * useTasks — data layer hook.
 *
 * Encapsulates all fetching and mutation logic so pages stay declarative.
 *
 * Graceful degradation: when the API is unreachable (e.g. the backend is not
 * running), the hook falls back to the bundled static data so the dashboard
 * stays fully explorable in demo mode.
 *
 * @returns {{
 *   tasks: Array,
 *   loading: boolean,
 *   usingFallback: boolean,
 *   fetchTasks: Function,
 *   createTask: Function,
 *   updateTask: Function,
 *   deleteTask: Function
 * }}
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await taskApi.getAll();
      setTasks(response.data.data);
      setUsingFallback(false);
    } catch {
      setTasks(seedTasks.map((task) => ({ ...task })));
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (payload) => {
    if (usingFallback) {
      const created = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [created, ...prev]);
      return created;
    }
    const response = await taskApi.create(payload);
    setTasks((prev) => [response.data.data, ...prev]);
    return response.data.data;
  };

  const updateTask = async (id, payload) => {
    if (usingFallback) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...payload } : task))
      );
      return { id, ...payload };
    }
    const response = await taskApi.update(id, payload);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? response.data.data : task))
    );
    return response.data.data;
  };

  const deleteTask = async (id) => {
    if (usingFallback) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      return true;
    }
    await taskApi.remove(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    return true;
  };

  return { tasks, loading, usingFallback, fetchTasks, createTask, updateTask, deleteTask };
};

export default useTasks;
