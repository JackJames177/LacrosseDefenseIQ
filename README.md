# DEFENSIVE IQ 🥍

Lacrosse defensive **communication** training game. Read the play on an
animated top-down field and make the right defensive call — BALL, HOT, TWO,
SLIDE, HOLD, CHECK, FIRE, CUTTER, TOPSIDE — before the timer runs out.

Built for Mason. 6 levels from "Ball Awareness" to a full-speed final exam,
69 hand-crafted scenarios, arcade scoring with streak multipliers, and a
teaching breakdown after every level.

## Play It

👉 **[Play Now](https://JackJames177.github.io/LacrosseDefenseIQ/)**

Install on a phone/iPad: open the link in Safari or Chrome →
**Add to Home Screen**. It then runs full-screen and offline (PWA).

## The 9 Calls

| Call | Trigger |
|------|---------|
| BALL | Your man has the ball and is a threat |
| HOT | You're the nearest help defender (next slide) |
| TWO | You're two passes away, help-side |
| SLIDE | A teammate got beat — you slide to help |
| HOLD | Your man has the ball but is NOT threatening |
| CHECK | Ball is in the air or loose on the ground |
| FIRE | You're getting beaten — bring the hot man early |
| CUTTER | An off-ball attacker is cutting through the crease |
| TOPSIDE | Direct a teammate to force the ball away from the middle |

Keyboard shortcuts (desktop): B H T S O C F U P.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build (type-checks then bundles)
npm run preview   # preview the production build
npm run deploy    # build + push to the gh-pages branch
```

Regenerate app icons (zero-dependency rasterizer):

```bash
node scripts/gen-icons.mjs
```

## Deploy to GitHub Pages

1. Repo: **`JackJames177/LacrosseDefenseIQ`** (the Vite `base` is
   `/LacrosseDefenseIQ/` — keep `vite.config.ts` in sync if the repo is renamed).
2. Push to `main`. The included GitHub Actions workflow builds and deploys.
3. Repo → Settings → Pages → Source: **GitHub Actions**.
4. Live at `https://JackJames177.github.io/LacrosseDefenseIQ/`.

Manual fallback: `npm run deploy` (publishes `dist/` to the `gh-pages`
branch; then set Pages source to that branch).

## Tech

React 18 + TypeScript · Vite · Zustand · Tailwind CSS · SVG field with CSS
transitions · `vite-plugin-pwa` · localStorage leaderboard. No backend.

## How It's Organized

- `src/game/` — types, constants, scoring engine, scenario data per level
- `src/stores/` — Zustand game + leaderboard/progress stores
- `src/components/` — field, players, HUD, call buttons, screens
