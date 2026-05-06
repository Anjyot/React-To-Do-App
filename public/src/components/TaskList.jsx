import React from 'react';
import TaskItem from './TaskItem';

/* ── Empty-state icon ────────────────────────── */
const EmptyIcon = ({ filter }) => {
  const icons = {
    all:       { emoji: '✦', msg: 'No tasks yet', hint: 'Add one above to get started.' },
    completed: { emoji: '✓', msg: 'Nothing completed', hint: 'Check off tasks to see them here.' },
    pending:   { emoji: '○', msg: 'All done!', hint: 'Great work — nothing left pending.' },
  };
  const { emoji, msg, hint } = icons[filter] || icons.all;

  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-icon">
        <span style={{ fontSize: 22, color: 'var(--text-muted)' }}>{emoji}</span>
      </div>
      <p>{msg}</p>
      <span>{hint}</span>
    </div>
  );
};

/**
 * TaskList – renders the filtered list of TaskItem components.
 *
 * Props:
 *   tasks      Task[]
 *   filter     'all' | 'completed' | 'pending'
 *   onToggle   (id) => void
 *   onDelete   (id) => void
 */
const TaskList = ({ tasks, filter, onToggle, onDelete }) => {
  /* Client-side filter */
  const visible = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending')   return !t.completed;
    return true;
  });

  return (
    <div className="task-list" role="list" aria-label="Task list">
      <div className="task-list-inner">
        {visible.length === 0 ? (
          <EmptyIcon filter={filter} />
        ) : (
          visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
