# 🏋️ FitLog — Workout Library

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

## Technologies
Next.js 14 (App Router) · React 18 · Tailwind CSS · lucide-react · Context API · localStorage

## Features
1. Responsive library of 12 workouts (3-column grid → 1 column on mobile) with live search by name/tag
2. Detail page with specs, instructions, and Add to plan / Save for later actions
3. Navbar Plan & Saved badges that update live (5-lift cap enforced)
4. My Plan page with live Exercises / Minutes / Calories metrics, tabs, and sorting by Duration, Calories, Rating
5. Mark as Done and Remove actions with toast notifications
6. Loading spinners, empty states, custom 404 page, and localStorage persistence

## Run locally
```bash
npm install
npm run dev
```
Deploy on Vercel — App Router routes work on reload with no extra config.
