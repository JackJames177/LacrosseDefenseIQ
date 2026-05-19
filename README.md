# DEFENSIVE IQ 🥍

Lacrosse defensive **communication** training game — **v2 (10 calls)**. Tap
READY, read the play on an animated top-down field, then make the right
defensive call before the timer runs out. Some possessions chain several
calls — keep talking.

Built for Mason. 6 levels from "Ball Basics" to a full-speed multi-call final
exam, hand-crafted scenarios, arcade scoring with streak + PICK-precision
bonuses, and a teaching breakdown after every level.

## Play It

👉 **[Play Now](https://JackJames177.github.io/LacrosseDefenseIQ/)**

Install on a phone/iPad: open the link in Safari or Chrome →
**Add to Home Screen**. It then runs full-screen and offline (PWA).

## The 10 Calls

| Call | Key | Trigger |
|------|-----|---------|
| BALL | B | You're on the ball carrier and he's a threat |
| HOT | H | You're the next slide — nearest help |
| TWO | T | You're two passes away, help-side |
| SLIDE | S | You're sliding to help a beaten teammate |
| FIRE | F | You're getting beaten — need help NOW |
| HOLD | O | Your man has the ball but isn't threatening |
| TOPSIDE | P | Direct a teammate to force the dodger from the middle |
| CUTTER | U | An off-ball man is cutting through the crease |
| PICK LEFT / RIGHT | L / R | A screen is being set on a teammate — call the side |
| BREAK | K | Save or ground ball — transition to the clear |

PICK is directional — calling the exact side (L vs R) earns a precision bonus.

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
