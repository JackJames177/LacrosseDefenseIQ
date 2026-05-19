import { useGame } from '../stores/gameStore'

interface Row {
  call: string
  keys: string
  when: string
}

/** 10-call reference card (PICK LEFT/RIGHT shown as one row). */
const CALLS: Row[] = [
  { call: 'BALL! BALL! BALL!', keys: 'B', when: "You're on the ball carrier and he's a threat" },
  { call: "I'M HOT!", keys: 'H', when: "You're the next slide — nearest help" },
  { call: "I'M TWO!", keys: 'T', when: "You're two passes away, help-side" },
  { call: 'SLIDE! SLIDE!', keys: 'S', when: "You're sliding to help a beaten teammate" },
  { call: 'FIRE! FIRE!', keys: 'F', when: "You're getting beaten — need help NOW" },
  { call: 'HOLD!', keys: 'O', when: "Your man has the ball but isn't threatening" },
  { call: 'TOPSIDE!', keys: 'P', when: 'Direct a teammate to force the dodger from the middle' },
  { call: 'CUTTER!', keys: 'U', when: 'An off-ball man is cutting through the crease' },
  {
    call: 'PICK LEFT / RIGHT!',
    keys: 'L / R',
    when: 'A screen is being set on a teammate — call the side it comes from',
  },
  { call: 'BREAK!', keys: 'K', when: 'Save or ground ball — transition to the clear' },
]

export default function HowToPlay() {
  const navigate = useGame((s) => s.navigate)

  return (
    <div className="min-h-full px-5 py-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('menu')}
        className="font-mono text-xs text-white/50 hover:text-white mb-4"
      >
        ‹ MENU
      </button>
      <h2 className="font-display text-5xl text-defense tracking-wider mb-2">
        HOW TO PLAY
      </h2>
      <p className="font-body text-sm text-white/70 mb-6">
        Tap READY, watch the play develop, then make the right defensive call
        before the timer runs out. Faster calls and streaks score more. Some
        possessions need several calls in a row — keep talking. Your defender
        has the glowing ring; your man has the dashed ring.
      </p>

      <h3 className="font-display text-2xl text-accent tracking-wide mb-3">
        THE 10 CALLS
      </h3>
      <div className="flex flex-col gap-2">
        {CALLS.map((r) => (
          <div
            key={r.call}
            className="rounded-lg border border-defense/30 bg-bg-soft p-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-2xl text-defense tracking-wide">
                {r.call}
              </span>
              <span className="font-mono text-[11px] text-white/40 border border-white/15 rounded px-1.5 shrink-0">
                key: {r.keys}
              </span>
            </div>
            <p className="font-body text-sm text-white/70 mt-1">{r.when}</p>
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-ball/70 mt-5">
        PICK is directional — read which side the screen comes from and call
        PICK LEFT or PICK RIGHT. The exact side earns a precision bonus.
      </p>
    </div>
  )
}
