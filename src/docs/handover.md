## Session: 14 October 2026

### What's finished

- **Calculator** (`/calculator`): plain calculator with large 4x5 keypad that fits a phone screen without scrolling. Small line above the number shows the sum in progress. Clear and Back buttons. Friendly message for divide by zero. Below the keypad, a tick list of unpaid bills with a "Ticked bills total" line and a "Use this total" button that puts the amount on the calculator screen
- **Converter** (`/converter`): three simple screens (pick a topic, pick a conversion, type a number), with a "Swap direction" button. Topics: Length, Weight, Temperature, Cooking, Speed, Area. Cooking has an Australia / UK / US picker (Australian tablespoon = 20 ml, cup = 250 ml), remembered in localStorage as `measureRegion`
- **Clean start**: new visitors now see an empty app with a "No bills yet" message instead of the three sample bills. Fixed a bug where deleting the last bill made it come back (a `loaded` flag now controls when bills are saved). The `sampleBills` import was removed from the main page
- **Friendlier dates**: bills show as "12 December 2026" on the main page and History page instead of "2026-12-12"
- **Help page** (`/help`): topics for calendar, calculator, converter, history, printing / saving a PDF, and putting the app on the home screen. Each topic has an id so a pill can jump straight to it, a thick outline on the topic you land on, and a "Back to where I was" button
- **"How does this work?" pills** on the main page (above the calendar), Calculator page, all three Converter screens, and History page. A separate "How do I print or save a PDF?" pill sits just above "Print this list". "Put this on my home screen" button sits at the bottom of the main page. Pills on History are hidden when printing
- **App icon and name**: `src/app/icon.tsx`, `src/app/apple-icon.tsx` and `src/app/manifest.ts`, drawn in code (cream bill with green tick on sage green `#4a7a2e`, cream `#f5f1e6`). App name is "Bill Toolkit", set in `layout.tsx`. Confirmed working by Les
- **Home screen install help** covers iPhone / iPad (Safari), Android phone / tablet (Chrome) and laptop / computer (Chrome or Edge)

### Key decisions & reasoning

- Calculator buttons are large, not extra large, so the whole keypad fits on one phone screen without scrolling
- Bill totals use a tick list rather than tap-to-add: ticks show what's included, and a wrong tick is easy to undo
- Pills only go where a new user might get stuck (calendar, calculator, converter, history, printing). The Help page is a safety net, not a manual
- Pill text uses plain words ("How does this work?"), not a "?" icon
- No currency converter, because it needs live exchange rates from an outside service (same reason as no bank connections)
- Region picker only appears on Cooking, because metres, kilograms and degrees are the same everywhere
- Updates reach users automatically on each push (Vercel). Exception: the icon and name under it are saved by the phone when the shortcut is added, so changing them later means removing and re-adding the shortcut. Bills live on each person's own device and are not touched by updates

### What didn't work / had to be fixed

- Help page's History topic first said "Print button", but the real button says "Print this list". Fixed to match
- The "2 of 2" Ctrl+H counter after a replace is normal, because the replacement text contains the Find text. Check with Ctrl+F (should be 1 of 1) before assuming it was added twice
- A date fix looked like it hadn't worked until the browser was refreshed
- The last commit also picked up `CONTEXT.md` (an app description file) and a 114-line tidy-up of `package-lock.json`. Both looked harmless
- Pill order is slightly inconsistent: on the Converter it sits above "Back to my bills", on the Calculator below it. Left as is

### Not yet confirmed

- **iPhone home screen app storage**: the Help text says bills added in Safari first may not appear in the home screen version (iPhones keep separate storage). Written from general knowledge, so test this on an iPhone and update the Help wording to match
- Phone / tablet print and "save as PDF" step in Help was also written from general knowledge. Check against what your phone shows
- Reminder banner dates: not seen yet. If it shows 2026-09-15 style dates, fix the same way as the bill cards (it's in `src/components/ReminderBanner.tsx`)
- Full mobile-friendliness check (phone and tablet, portrait and landscape)

### Next steps (in priority order)

1. Test on a real iPhone and tablet, then tidy the Help wording based on what you see
2. Carer / family sharing: invite a family member to view (read-only) or get notified of overdue bills (planned paid-tier feature)
3. Freemium paywall / tier logic when ready to monetise

### Useful reference

- Local dev: `cd ~/projects/seniors-bill-tracker && npm run dev` (the folder is lowercase `projects`, confirmed: full path `/home/les/projects/seniors-bill-tracker`)
- Save and deploy in one paste (second terminal): `git add . && git commit -m "..." && git log --oneline -2 && git push`
- New files this session: `src/app/calculator/page.tsx`, `converter/page.tsx`, `help/page.tsx`, `icon.tsx`, `apple-icon.tsx`, `manifest.ts`





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

- Local dev: `cd ~/projects/seniors-bill-tracker && npm run dev`
- Deploy: `git add . && git commit -m "..." && git push` (auto-deploys via Vercel)
- Manual deploy if ever needed: `npx vercel --prod`
