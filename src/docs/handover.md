# Seniors Bill Tracker — Handover

## Session: [today's date]

### What's finished

- Next.js + TypeScript + Tailwind app scaffolded at `~/Projects/seniors-bill-tracker`
- Live at: https://seniors-bill-tracker.vercel.app
- GitHub: https://github.com/VRLes/seniors-bill-tracker
- Core bill tracking: add / mark paid / delete bills, saved in browser (localStorage)
- Category icons (electricity, water, internet, phone, rent, insurance, subscription, other) via lucide-react — generic icons chosen over real company logos for simplicity
- Sage & cream visual theme (chosen over "deep ocean" and "terracotta sunset" options)
- Light/dark mode toggle — plain-worded button ("Switch to dark/light mode"), not icon-only, remembers choice, shows one-time explanation on first use. Dark mode uses a neutral charcoal background with sage as accent only (not sage-on-sage, for contrast reasons)
- Summary strip: due this week / overdue / total owing
- Reminder banner: plain-language cards for overdue and due-soon bills, friendly "all caught up" message when nothing's due
- Interactive month calendar: today highlighted, each day shows a status icon (not just colour) — circle+exclamation mark for overdue (softened from a warning triangle to avoid alarming users), clock for due soon, checkmark for paid. Tapping a day scrolls to and highlights the matching bill(s) below
- Paid Bills History page (`/history`): financial year presets (this FY / last FY, 1 July–30 June), optional custom date range, running total, print button (browser print, auto-hides buttons/nav when printing) — built for tax-agent handouts
- Colour is never used alone to convey meaning anywhere in the app (accessibility decision, prompted by colour-blindness consideration)

### Key decisions & reasoning

- Manual bill entry only — no bank/Plaid integration (cost, complexity, compliance)
- Primary audience: seniors, especially those with memory difficulties — not a general "subscription creep" app
- Freemium monetisation planned (not yet built): free tier ~10 bills, paid tier (~$3-5/mo) for unlimited bills, carer/family sharing, spending insights, export
- No settings/help page planned — the interface itself should be self-explanatory rather than relying on documentation nobody will read
- History groups bills by due date, not actual payment date (no separate "date paid" field currently tracked) — worth reconsidering if precise payment-date tracking is wanted later

### What didn't work / had to be fixed

- Folder mix-up early on: `~/Projects` (capital P, had ibd-compass) vs `~/projects` (lowercase, had this project) — consolidated everything under `~/Projects`
- VS Code auto-created new folders/files one level too deep (inside `src/app` instead of `src`) — had to move via terminal
- A GitHub repo had been created on an earlier attempt but never received a push, causing "name already exists" confusion — fixed by linking to the existing repo instead of creating a new one
- Git commit was skipped once (files were staged but never committed) — always confirm with `git log --oneline` that a commit actually landed before assuming it did

### Next steps (in priority order, as agreed)

1. Mobile-friendliness check — not yet tested on phone/tablet despite this being a key use case
2. Carer/family sharing feature — invite a family member to view (read-only) or get notified of overdue bills; planned as a paid-tier feature
3. Eventually: freemium paywall/tier logic once ready to monetise

### Useful reference

- Local dev: `cd ~/Projects/seniors-bill-tracker && npm run dev`
- Deploy: `git add . && git commit -m "..." && git push` (auto-deploys via Vercel)
- Manual deploy if ever needed: `npx vercel --prod`
