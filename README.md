# 📌 Campus Confessions Wall

> **Browser Blitz · Round 2 · Legacy Rescue**

You've inherited the codebase for **Campus Confessions Wall** — an anonymous confession board for students. It was built by a student developer who graduated early, leaving behind a codebase that *almost* works.

Your mission: **rescue it in 40 minutes.**

---

## What It Should Do

- **The Wall** — Displays confession cards fetched from the backend, showing the text, mood emoji, timestamp, and heart count
- **Confess** — A form that lets any student submit an anonymous confession, which immediately appears on the wall
- **Responsive** — Must work on mobile (375px) and desktop
- **Accessible** — The UI should be navigable and usable by everyone

---

## Project Structure

```
campus-confessions/
├── client/                  ← React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── ConfessionFeed.jsx
│   │   │   └── PostConfession.jsx
│   │   └── styles/
│   │       └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── server/
    ├── index.js
    ├── data.json
    └── package.json
```

---

## Getting Started

### Start the server
```bash
cd server
npm install
npm start
```

### Start the client
```bash
cd client
npm install
npm run dev
```

---

## Scoring

| Area                        | Points |
|-----------------------------|--------|
| Server connects to frontend | 20     |
| Infinite re-renders fixed   | 15     |
| Mobile responsive layout    | 15     |
| POST + GET data works       | 20     |
| Accessibility improvements  | 15     |
| Console warnings cleared    | 15     |

**Total: 100 points**

---

> 💡 *The app is broken in multiple ways. Some issues are obvious. Some are subtle. All are fixable. Good luck.*
