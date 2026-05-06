import React, { useState, useEffect, useRef } from 'react';
import TaskList from './components/TaskList';

/* ── Utility: generate unique id ─────────────── */
const uid = () => `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/* ── Inline SVG icons ────────────────────────── */
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const InputIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }}>
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

/* ── LocalStorage key ────────────────────────── */
const STORAGE_KEY = 'react_todo_tasks_v1';

/* ── Load tasks from localStorage ────────────── */
const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/* ─────────────────────────────────────────────
   App – root component
   ──────────────────────────────────────────── */
const App = () => {
  const [tasks,   setTasks]   = useState(loadTasks);
  const [input,   setInput]   = useState('');
  const [filter,  setFilter]  = useState('all'); // 'all' | 'completed' | 'pending'
  const inputRef = useRef(null);

  /* Persist to localStorage whenever tasks change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch { /* quota exceeded – silent fail */ }
  }, [tasks]);

  /* ── Derived stats ──────────────────────── */
  const totalCount     = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount   = totalCount - completedCount;
  const progressPct    = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  /* ── Handlers ───────────────────────────── */
  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    const newTask = { id: uid(), text, completed: false, createdAt: new Date().toISOString() };
    setTasks((prev) => [newTask, ...prev]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  /* ── Render ─────────────────────────────── */
  return (
    <div className="app-wrapper">
      <div className="app-container">

        {/* ── Header ── */}
        <header className="app-header">
          <div className="label">
            <span>✦</span> Task Manager
          </div>
          <h1>Anjyot's To-Do List</h1>
          <p className="subtitle">A simple, beautiful place for your tasks.</p>
        </header>

        {/* ── Main card ── */}
        <div className="card">

          {/* Add task */}
          <div className="add-task-form">
            <div className="task-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="task-input"
                placeholder="What needs to be done?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={200}
                aria-label="New task input"
              />
              <InputIcon />
            </div>
            <button
              className="add-btn"
              onClick={handleAdd}
              disabled={!input.trim()}
              aria-label="Add task"
              title="Add task (Enter)"
            >
              <PlusIcon />
              <span>Add</span>
            </button>
          </div>

          {/* Progress bar (only when tasks exist) */}
          {totalCount > 0 && (
            <div className="progress-bar-wrap">
              <div className="progress-label">
                <span>Progress</span>
                <span>{completedCount}/{totalCount} done</span>
              </div>
              <div className="progress-track" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}

          {/* Stats + filter row */}
          <div className="stats-bar">
            <div className="stats-counters" aria-label="Task statistics">
              <span className="stat-chip total">
                <span className="dot" /> {totalCount} total
              </span>
              <span className="stat-chip done">
                <span className="dot" /> {completedCount} done
              </span>
              <span className="stat-chip pending">
                <span className="dot" /> {pendingCount} pending
              </span>
            </div>

            <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
              {['all', 'completed', 'pending'].map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Task list */}
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />

          {/* Footer */}
          <div className="card-footer">
            <span className="footer-info">
              {totalCount === 0
                ? 'No tasks — add one above!'
                : `${pendingCount} task${pendingCount !== 1 ? 's' : ''} remaining`}
            </span>
            <button
              className="clear-btn"
              onClick={handleClearCompleted}
              disabled={completedCount === 0}
              aria-label="Clear completed tasks"
            >
              Clear completed
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
