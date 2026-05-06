# ✦ React To-Do App

A clean, minimal task manager built with React — demonstrating core React fundamentals and best practices.

---

## Features

| Feature | Details |
|---|---|
| ➕ Add tasks | Type & press **Enter** or click **Add** |
| ✅ Complete tasks | Click the checkbox to toggle |
| 🗑️ Delete tasks | Hover a task → click the trash icon |
| 💾 Persistence | Tasks saved to **localStorage** — survive page refresh |
| 🔍 Filters | **All / Completed / Pending** tab bar |
| 📊 Task counter | Live stats: total, done, pending |
| 📈 Progress bar | Visual progress toward completing all tasks |
| ✨ Animations | Smooth enter/exit transitions on tasks |
| 🧹 Clear completed | One-click bulk remove of finished tasks |

---

## Project Structure

```
src/
├── index.js              # React entry point
├── index.css             # Global styles & CSS variables
├── App.jsx               # Root component — state, handlers, layout
└── components/
    ├── TaskList.jsx       # Filtered list renderer + empty state
    └── TaskItem.jsx       # Single task row (checkbox, text, delete)
```

---

## Tech Stack

- **React 18** — Functional components only
- **React Hooks** — `useState`, `useEffect`, `useRef`
- **CSS Custom Properties** — Consistent theming via variables
- **LocalStorage API** — Zero-dependency persistence
- **Google Fonts** — DM Sans + DM Serif Display

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## Design Philosophy

- **Light & white** palette — #ffffff surface with subtle off-white backgrounds
- **Refined typography** — Serif display heading paired with clean sans-serif body
- **Micro-interactions** — Checkbox bounce, task slide-in/slide-out, button hover states
- **Accessible** — ARIA labels, roles, keyboard navigation (Enter to add)

---

Built to demonstrate React fundamentals: component composition, unidirectional data flow, controlled inputs, and side effects.
