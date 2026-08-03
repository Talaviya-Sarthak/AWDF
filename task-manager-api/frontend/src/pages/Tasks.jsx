import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckSquare, FiPlus } from 'react-icons/fi';
import useTasks from '../hooks/useTasks.js';
import SearchBar from '../components/SearchBar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Select from '../components/Select.jsx';
import { cn, paperCard, inputInset, btnPrimary } from '../styles/classes.js';

/** Filter options rendered as inset selects. */
const STATUS_FILTERS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const PRIORITY_FILTERS = [
  { value: 'all', label: 'All priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const EMPTY_FORM = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

/** Maps a task onto the form shape. */
const toForm = (task) => ({
  title: task.title,
  description: task.description || '',
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate || '',
});

/** Shared field styling for the form controls. */
const FIELD_CLASSES = `${inputInset} w-full px-3.5 py-2.5 text-sm outline-none`;
const LABEL_CLASSES =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite-400';

/** Input component for the task form (avoids repetition). */
const Field = ({ label, children }) => (
  <div>
    <label className={LABEL_CLASSES}>{label}</label>
    {children}
  </div>
);

/**
 * Add / edit task modal. Rendered by Tasks.jsx; also triggered from the
 * Dashboard via router state `{ openModal: true | task }`.
 */
const TaskFormModal = ({
  open,
  editingTask,
  form,
  onChange,
  onSubmit,
  onClose,
  submitting,
  error,
}) => (
  <Modal
    open={open}
    title={editingTask ? 'Edit Task' : 'New Task'}
    onClose={onClose}
    footer={
      <>
        <Button variant="secondary" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" form="task-form" disabled={submitting}>
          {submitting
            ? 'Saving...'
            : editingTask
              ? 'Save Changes'
              : 'Create Task'}
        </Button>
      </>
    }
  >
    <form id="task-form" onSubmit={onSubmit} className="space-y-4">
      <Field label="Title *">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="e.g. Prepare sprint demo"
          className={FIELD_CLASSES}
          required
          maxLength={120}
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Add some context about this task..."
          rows={3}
          className={cn(FIELD_CLASSES, 'resize-none')}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Priority">
          <Select name="priority" value={form.priority} onChange={onChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </Field>

        <Field label="Status">
          <Select name="status" value={form.status} onChange={onChange}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </Field>

        <Field label="Due Date">
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={onChange}
            className={cn(FIELD_CLASSES, 'cursor-pointer')}
          />
        </Field>
      </div>

      {error && (
        <p className="rounded-lg border border-status-red/40 bg-status-red/10 px-3 py-2 text-sm font-medium text-status-red-dark">
          {error}
        </p>
      )}
    </form>
  </Modal>
);

/** Delete confirmation modal. */
const DeleteModal = ({ task, onConfirm, onClose, submitting }) => (
  <Modal
    open={Boolean(task)}
    title="Delete Task"
    onClose={onClose}
    footer={
      <>
        <Button variant="secondary" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={submitting}>
          {submitting ? 'Deleting...' : 'Delete Task'}
        </Button>
      </>
    }
  >
    <p className="text-sm leading-relaxed text-graphite-600">
      Are you sure you want to delete{' '}
      <strong className="text-graphite-800">{task?.title}</strong>? This action
      cannot be undone.
    </p>
  </Modal>
);

/** Tasks management page. */
const Tasks = () => {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const location = useLocation();
  const navigate = useNavigate();

  // Search + filters
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /**
   * React to router state set by the Dashboard:
   *   { openModal: true | task }  -> open the add / edit modal
   *   { deleteTask: task }        -> open the delete confirmation
   */
  useEffect(() => {
    const state = location.state;
    if (!state) return;

    if (state.openModal) {
      const task = state.openModal === true ? null : state.openModal;
      setEditingTask(task);
      setForm(task ? toForm(task) : EMPTY_FORM);
      setFormError('');
      setModalOpen(true);
    }

    if (state.deleteTask) {
      setDeleteTarget(state.deleteTask);
    }

    navigate(location.pathname, { replace: true });
  }, [location.state, location.pathname, navigate]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesQuery =
        !normalizedQuery ||
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.description.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [tasks, query, statusFilter, priorityFilter]);

  const openCreateModal = () => {
    setEditingTask(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setForm(toForm(task));
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
    setFormError('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      if (editingTask) {
        await updateTask(editingTask.id, form);
      } else {
        await createTask(form);
      }
      setModalOpen(false);
    } catch (error) {
      setFormError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await deleteTask(deleteTarget.id);
      setDeleteTarget(null);
    } catch (error) {
      window.alert(error.response?.data?.message || 'Failed to delete task');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar: search, filters, add */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <SearchBar value={query} onChange={setQuery} className="xl:max-w-md" />

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
            className="w-auto"
          >
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            aria-label="Filter by priority"
            className="w-auto"
          >
            {PRIORITY_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Button
            variant="primary"
            onClick={openCreateModal}
            className="hidden lg:inline-flex"
          >
            <FiPlus />
            Add Task
          </Button>
        </div>
      </div>

      <p className="text-xs font-medium text-graphite-400">
        Showing {filteredTasks.length} of {tasks.length} tasks
        {query && (
          <>
            {' '}
            for &ldquo;<span className="text-graphite-600">{query}</span>&rdquo;
          </>
        )}
      </p>

      {/* Task grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={cn(paperCard, 'h-48 animate-pulse')} />
          ))}
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiCheckSquare />}
          title="No tasks found"
          message={
            tasks.length === 0
              ? 'Your task list is empty. Create your first task to get started.'
              : 'Try adjusting your search or filters to find what you are looking for.'
          }
          action={
            <Button onClick={openCreateModal}>
              <FiPlus />
              Add Task
            </Button>
          }
        />
      )}

      {/* Floating add button (mobile / tablet) */}
      <button
        type="button"
        onClick={openCreateModal}
        className={cn(
          btnPrimary,
          'animate-fab-pulse fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3.5 text-sm lg:hidden'
        )}
        aria-label="Add task"
      >
        <FiPlus className="text-lg" />
        New Task
      </button>

      {/* Modals */}
      <TaskFormModal
        open={modalOpen}
        editingTask={editingTask}
        form={form}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
        submitting={submitting}
        error={formError}
      />

      <DeleteModal
        task={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
        submitting={deleting}
      />
    </div>
  );
};

export default Tasks;
