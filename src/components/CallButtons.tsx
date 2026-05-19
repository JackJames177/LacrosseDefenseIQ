import { useEffect } from 'react'
import { useGame } from '../stores/gameStore'
import {
  BUTTON_ORDER,
  CALL_KEYS,
  CALL_LABELS,
  KEY_TO_CALL,
  LEVELS,
} from '../game/constants'
import type { DefensiveCall } from '../game/types'

const isPick = (c: DefensiveCall) => c === 'PICK_LEFT' || c === 'PICK_RIGHT'

export default function CallButtons() {
  const level = useGame((s) => s.level)
  const phase = useGame((s) => s.phase)
  const makeCall = useGame((s) => s.makeCall)
  const lastOutcome = useGame((s) => s.lastOutcome)

  const meta = LEVELS.find((l) => l.level === level)
  const available = meta?.calls ?? []
  const buttons = BUTTON_ORDER.filter((c) => available.includes(c))
  const live = phase === 'call'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const call = KEY_TO_CALL[e.key.toLowerCase()]
      if (call && available.includes(call) && phase === 'call') {
        makeCall(call)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [available, phase, makeCall])

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {buttons.map((call) => {
        const resolved = phase.startsWith('resolved')
        const isCorrect = resolved && lastOutcome?.correctCall === call
        const isWrongPick =
          resolved && lastOutcome?.chosen === call && !lastOutcome?.correct
        const pick = isPick(call)

        const stateClass = isCorrect
          ? 'border-accent bg-accent/25 text-accent animate-pop'
          : isWrongPick
            ? 'border-error bg-error/25 text-error animate-shake'
            : live
              ? pick
                ? 'border-ball/80 bg-ball/10 text-ball active:scale-95 active:bg-ball active:text-bg hover:border-ball'
                : 'border-defense/70 bg-bg-soft text-white active:scale-95 active:bg-defense active:text-bg hover:border-defense'
              : pick
                ? 'border-ball/25 bg-bg-soft/60 text-ball/40'
                : 'border-white/10 bg-bg-soft/60 text-white/40'

        return (
          <button
            key={call}
            disabled={!live}
            onClick={() => makeCall(call)}
            className={`relative select-none rounded-xl border-2 px-1 py-3 sm:py-4 min-h-[52px] font-display text-xl sm:text-2xl tracking-wide transition-all duration-100 ${stateClass}`}
          >
            {pick && (
              <span className="absolute top-1 left-1.5 text-[11px] text-ball/70">
                {call === 'PICK_LEFT' ? '◀' : '▶'}
              </span>
            )}
            {CALL_LABELS[call]}
            <span className="absolute top-1 right-1.5 text-[10px] font-mono text-white/35 border border-white/15 rounded px-1 leading-tight hidden sm:block">
              {CALL_KEYS[call]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
