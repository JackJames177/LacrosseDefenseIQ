import { useGame } from '../stores/gameStore'
import { useLeaderboard } from '../stores/leaderboardStore'
import { LEVELS } from '../game/constants'

function Stars({ n }: { n: number }) {
  return (
    <div className="text-lg leading-none">
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= n ? 'text-ball' : 'text-white/15'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function LevelSelect() {
  const navigate = useGame((s) => s.navigate)
  const startLevel = useGame((s) => s.startLevel)
  const isUnlocked = useLeaderboard((s) => s.isLevelUnlocked)
  const progress = useLeaderboard((s) => s.progress)

  return (
    <div className="min-h-full px-5 py-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('menu')}
        className="font-mono text-xs text-white/50 hover:text-white mb-4"
      >
        ‹ MENU
      </button>
      <h2 className="font-display text-5xl text-defense tracking-wider mb-6">
        SELECT LEVEL
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEVELS.map((l) => {
          const unlocked = isUnlocked(l.level)
          const p = progress[l.level]
          return (
            <button
              key={l.level}
              disabled={!unlocked}
              onClick={() => startLevel(l.level)}
              className={`text-left rounded-xl border-2 p-4 transition-all ${
                unlocked
                  ? 'border-defense/50 bg-bg-soft hover:border-defense active:scale-[0.98]'
                  : 'border-white/10 bg-bg-soft/40 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-white">
                  {l.level}. {l.name.toUpperCase()}
                </span>
                {unlocked ? <Stars n={p?.stars ?? 0} /> : <span>🔒</span>}
              </div>
              <p className="font-body text-sm text-white/55 mt-1">{l.blurb}</p>
              {p && (
                <p className="font-mono text-[11px] text-accent/80 mt-2">
                  BEST {p.bestScore.toLocaleString()} ·{' '}
                  {Math.round(p.accuracy * 100)}%
                </p>
              )}
              {!unlocked && (
                <p className="font-mono text-[11px] text-white/40 mt-2">
                  Finish level {l.level - 1} at 70%+ to unlock
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
