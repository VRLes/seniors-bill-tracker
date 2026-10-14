# Seniors Bill Tracker — Project Context

## What This App Is

A simple, visual bill and subscription tracker designed for seniors. Helps users see what bills are coming up, what's overdue, and what's been paid — at a glance, without confusion.

No login required. Data is saved locally in the browser (localStorage).

---

## Current Status

- MVP complete
- No npm vulnerabilities
- Monetisation potential being explored

---

## Target Users

- Seniors who want a simple way to track bills and subscriptions
- Designed for clarity and ease of use — large text, simple layout, no clutter

---

## Tech Stack

- **Framework:** Next.js + TypeScript
- **Styling:** Tailwind CSS + CSS custom properties (`var(--)`)
- **Data storage:** localStorage (no database, no backend)
- **Structure:** Uses `src/` folder (not `app/` directly — note for navigation)

---

## Folder Structure

src/
├── app/          — Pages (Home, History)
├── components/   — UI components
├── data/         — Sample bills data
├── docs/         — Project docs
└── types/        — TypeScript types (Bill type)

---

## App Structure

| Route | Section | Notes |
|---|---|---|
| `/` | My Bills | Main dashboard — bill list, summary, calendar |
| `/history` | History | Paid bills history |

---

## Key Components

| Component | Purpose |
|---|---|
| `BillIcon` | Category icon for each bill |
| `AddBillForm` | Form to add a new bill |
| `ReminderBanner` | Banner showing upcoming/overdue alerts |
| `CalendarView` | Visual calendar of bill due dates |
| `ThemeToggle` | Dark/light mode switch |

---

## Key Features

- Summary strip — 3 cards: Due this week / Overdue / Total owing
- Calendar view — click a day to highlight bills due that day
- Mark as Paid — toggles paid status, moves to history
- Delete bill — confirms before deleting
- Reminder banner — shows upcoming and overdue bills
- Dark/light theme via ThemeToggle

---

## Design Tokens (never hardcode colours)

- `--bg-page` — page background
- `--bg-card` — card backgrounds
- `--text-primary` — main text
- `--text-secondary` — secondary text
- `--border-default` — borders
- `--accent-text` — accent colour for paid/totals
- `--accent-button-bg` — highlight ring colour

---

## Language & Terminology

- App name: Seniors Bill Tracker (UI shows "My Bills")
- Bills have: name, amount, dueDate, category, paid status
- Due soon = within 7 days
- Overdue = past due date and unpaid
- History = paid bills

---

## Known Gaps

- [ ] Monetisation strategy not yet decided
- [ ] No backend — data lives in browser localStorage only
- [ ] Mobile responsiveness — check on small screens