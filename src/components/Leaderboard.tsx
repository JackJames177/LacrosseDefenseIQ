import { useState } from 'react'
import { useGame } from '../stores/gameStore'
import { useLeaderboard } from '../stores/leaderboardStore'

export default function Leaderboard() {
  const navigate = useGame((s) => s.navigate)
  const entries = useLeaderboard((s) => s.entries)
  const totalScore = useLeaderboard((s) => s.totalScore)
  const addScore = useLeaderboard((s) => s.addScore)
  const [initials, setInitials] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const total = totalScore()

  return (
    <div className="min-h-full px-5 py-8 max-w-lg mx-auto">
      <button
        onClick={() => navigate('menu')}
        className="font-mono text-xs text-white/50 hover:text-white mb-4"
      >
        ‹ MENU
      </button>
      <h2 className="font-display text-5xl text-defense tracking-wider mb-1">
        LEADERBOARD
      </h2>
      <p className="font-mono text-xs text-white/45 mb-6">
        TOP 10 · highest career scores
      </p>

      <div className="rounded-xl border border-defense/30 bg-bg-soft overflow-hidden">
        {entries.length === 0 && (
          <p className="p-6 text-center font-mono text-sm text-white/40">
            No scores yet. Go play!
          </p>
        )}
        {entries.map((e, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 border-b border-white/5 ${
              i === 0 ? 'bg-accent/10' : ''
            }`}
          >
            <span className="font-display text-2xl text-white/70 w-8">
              {i + 1}
            </span>
            <span className="font-display text-3xl tracking-widest text-defense flex-1">
              {e.initials}
            </span>
            <span className="font-body text-xs text-white/40 mr-4">
              {e.date}
            </span>
            <span className="font-display text-2xl text-accent">
              {e.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-bg-soft p-4">
        <p className="font-mono text-xs text-white/50 mb-2">
          YOUR CAREER TOTAL:{' '}
          <span className="text-accent text-base">
            {total.toLocaleString()}
          </span>
        </p>
        {submitted ? (
          <p className="font-mono text-sm text-accent">Saved! 🏆</p>
        ) : (
          <div className="flex gap-2">
            <input
              value={initials}
              onChange={(e) =>
                setInitials(
                  e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
                )
              }
              placeholder="AAA"
              maxLength={3}
              className="w-24 bg-bg border border-defense/40 rounded-lg px-3 py-2 font-display text-2xl tracking-widest text-center text-white outline-none focus:border-accent"
            />
            <button
              disabled={total === 0}
              onClick={() => {
                addScore(initials || 'AAA', total)
                setSubmitted(true)
              }}
              className="flex-1 font-display text-xl tracking-wide rounded-lg border-2 border-accent text-bg bg-accent disabled:opacity-40"
            >
              SAVE MY SCORE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
