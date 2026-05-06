import React, { useState } from 'react';

/* ── Tiny inline SVG icons ───────────────────── */
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,6 5,9 10,3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6l-1,14H6L5,6" />
    <path d="M10,11v6M14,11v6" />
    <path d="M9,6V4h6v2" />
  </svg>
);

/**
 * TaskItem – renders a single task row.
 *
 * Props:
 *   task       { id, text, completed, createdAt }
 *   onToggle   (id) => void
 *   onDelete   (id) => void
 */
const TaskItem = ({ task, onToggle, onDelete }) => {
  const [removing, setRemoving] = useState(false);

  /* Play exit animation then call parent delete */
  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => onDelete(task.id), 260);
  };

  /* Format creation timestamp */
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${removing ? 'removing' : ''}`}
      role="listitem"
    >
      {/* Checkbox */}
      <button
        className={`checkbox-btn ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
        title={task.completed ? 'Mark as pending' : 'Mark as completed'}
      >
        <CheckIcon />
      </button>

      {/* Text + meta */}
      <div className="task-text-wrapper">
        <p className={`task-text ${task.completed ? 'done' : ''}`}>
          {task.text}
        </p>
        <p className="task-meta">Added at {formatTime(task.createdAt)}</p>
      </div>

      {/* Delete */}
      <button
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Delete task"
        title="Delete task"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskItem;
