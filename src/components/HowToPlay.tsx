import { useGame } from '../stores/gameStore'
import {
  ALL_CALLS,
  CALL_FULL,
  CALL_KEYS,
  CALL_TRIGGERS,
} from '../game/constants'

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
        Watch the play on the field. The instant you read it, tap the right
        defensive call before the timer runs out. Faster calls and streaks score
        more. Your defender has the glowing ring — your man has the dashed ring.
      </p>

      <h3 className="font-display text-2xl text-accent tracking-wide mb-3">
        THE 9 CALLS
      </h3>
      <div className="flex flex-col gap-2">
        {ALL_CALLS.map((c) => (
          <div
            key={c}
            className="rounded-lg border border-defense/30 bg-bg-soft p-3"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl text-defense tracking-wide">
                {CALL_FULL[c]}
              </span>
              <span className="font-mono text-[11px] text-white/40 border border-white/15 rounded px-1.5">
                key: {CALL_KEYS[c]}
              </span>
            </div>
            <p className="font-body text-sm text-white/70 mt-1">
              {CALL_TRIGGERS[c]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
