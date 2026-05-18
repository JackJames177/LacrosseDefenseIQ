import { useState } from 'react'
import { useGame } from '../stores/gameStore'
import { useLeaderboard } from '../stores/leaderboardStore'
import { CALL_LABELS, LEVELS, UNLOCK_ACCURACY } from '../game/constants'

function Confetti() {
  const colors = ['#00dc82', '#00b4d8', '#f5c542', '#ff4444', '#ffffff']
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 w-2 h-3 animate-confetti"
          style={{
            left: `${(i * 2.5) % 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i % 10) * 0.12}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function PostGameBreakdown() {
  const navigate = useGame((s) => s.navigate)
  const startLevel = useGame((s) => s.startLevel)
  const result = useGame((s) => s.levelResult)
  const isNewHigh = useGame((s) => s.isNewHighScore)
  const isUnlocked = useLeaderboard((s) => s.isLevelUnlocked)
  const addScore = useLeaderboard((s) => s.addScore)
  const totalScore = useLeaderboard((s) => s.totalScore)
  const [initials, setInitials] = useState('')
  const [saved, setSaved] = useState(false)

  if (!result) return null
  const meta = LEVELS.find((l) => l.level === result.level)
  const pct = Math.round(result.accuracy * 100)
  const passed = result.accuracy >= UNLOCK_ACCURACY
  const nextLevel = result.level + 1
  const nextUnlocked = isUnlocked(nextLevel) && nextLevel <= LEVELS.length

  return (
    <div className="relative min-h-full px-4 py-8 max-w-2xl mx-auto">
      {isNewHigh && result.totalScore > 0 && <Confetti />}

      <h2 className="font-display text-5xl text-defense tracking-wider text-center">
        {meta?.name.toUpperCase()}
      </h2>
      {isNewHigh && result.totalScore > 0 && (
        <p className="text-center font-display text-2xl text-accent animate-pop mt-1">
          ★ NEW HIGH SCORE ★
        </p>
      )}

      <div className="text-center my-5">
        <div className="text-3xl">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={i <= result.stars ? 'text-ball' : 'text-white/15'}
              style={{
                animation:
                  i <= result.stars
                    ? `pop 0.4s ease ${i * 0.15}s both`
                    : undefined,
              }}
            >
              ★
            </span>
          ))}
        </div>
        <div className="font-display text-6xl text-white mt-2">
          {result.totalScore.toLocaleString()}
        </div>
        <p className={`font-mono text-sm mt-1 ${passed ? 'text-accent' : 'text-error'}`}>
          {passed ? 'LEVEL PASSED' : `Need ${Math.round(UNLOCK_ACCURACY * 100)}% to advance`}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        {[
          ['ACCURACY', `${result.correctCount}/${result.totalCount} · ${pct}%`],
          ['BEST STREAK', `${result.bestStreak}`],
          [
            'AVG REACTION',
            result.avgReactionMs ? `${(result.avgReactionMs / 1000).toFixed(2)}s` : '—',
          ],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-bg-soft border border-white/10 p-3">
            <div className="font-mono text-[10px] text-white/40">{k}</div>
            <div className="font-display text-xl text-white">{v}</div>
          </div>
        ))}
      </div>

      <h3 className="font-display text-2xl text-accent tracking-wide mb-2">
        PLAY BY PLAY
      </h3>
      <div className="flex flex-col gap-1.5 mb-6 max-h-72 overflow-y-auto no-scrollbar">
        {result.scenarioResults.map((r) => (
          <div
            key={r.scenarioId}
            className={`rounded-lg border p-3 ${
              r.correct
                ? 'border-accent/30 bg-accent/5'
                : 'border-error/30 bg-error/5'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-white/70 flex-1">
                #{r.index + 1} · {r.setupHint}
              </span>
              <span
                className={`font-display text-lg ${
                  r.correct ? 'text-accent' : 'text-error'
                }`}
              >
                {r.correct ? '✓' : '✗'}{' '}
                {r.timedOut
                  ? 'TIMEOUT'
                  : r.playerCall
                    ? CALL_LABELS[r.playerCall]
                    : '—'}
              </span>
            </div>
            <div className="font-mono text-[11px] text-white/45 mt-1">
              Answer: {CALL_LABELS[r.correctCall]}
              {r.correct && !r.timedOut
                ? ` · ${(r.reactionMs / 1000).toFixed(2)}s · +${r.pointsEarned}`
                : ''}
            </div>
            {!r.correct && (
              <p className="font-body text-xs text-white/70 mt-1">
                {r.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      {isNewHigh && result.totalScore > 0 && (
        <div className="mb-5 rounded-xl border border-accent/40 bg-accent/10 p-4">
          <p className="font-mono text-xs text-white/70 mb-2">
            Save your career total ({totalScore().toLocaleString()}) to the
            leaderboard:
          </p>
          {saved ? (
            <p className="font-mono text-sm text-accent">Saved to leaderboard! 🏆</p>
          ) : (
            <div className="flex gap-2">
              <input
                value={initials}
                onChange={(e) =>
                  setInitials(
                    e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z]/g, '')
                      .slice(0, 3)
                  )
                }
                placeholder="AAA"
                maxLength={3}
                className="w-24 bg-bg border border-defense/40 rounded-lg px-3 py-2 font-display text-2xl tracking-widest text-center text-white outline-none focus:border-accent"
              />
              <button
                onClick={() => {
                  addScore(initials || 'AAA', totalScore())
                  setSaved(true)
                }}
                className="flex-1 font-display text-xl rounded-lg border-2 border-accent text-bg bg-accent"
              >
                SAVE
              </button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={() => startLevel(result.level)}
          className="font-display text-2xl py-3 rounded-xl border-2 border-defense text-defense bg-bg-soft active:scale-95"
        >
          RETRY
        </button>
        <button
          disabled={!nextUnlocked}
          onClick={() => startLevel(nextLevel)}
          className="font-display text-2xl py-3 rounded-xl border-2 border-accent text-bg bg-accent disabled:opacity-40 active:scale-95"
        >
          {nextLevel > LEVELS.length ? 'DONE!' : 'NEXT LEVEL'}
        </button>
        <button
          onClick={() => navigate('menu')}
          className="font-display text-2xl py-3 rounded-xl border-2 border-white/20 text-white/70 bg-bg-soft active:scale-95"
        >
          MENU
        </button>
      </div>
    </div>
  )
}
