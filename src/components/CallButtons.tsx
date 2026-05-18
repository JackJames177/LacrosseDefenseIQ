import { useEffect } from 'react'
import { useGame } from '../stores/gameStore'
import {
  CALL_KEYS,
  CALL_LABELS,
  KEY_TO_CALL,
  LEVELS,
} from '../game/constants'
import type { DefensiveCall } from '../game/types'

const DISPLAY_ORDER: DefensiveCall[] = [
  'BALL',
  'HOT',
  'TWO',
  'SLIDE',
  'HOLD',
  'CHECK',
  'FIRE',
  'CUTTER',
  'TOPSIDE',
]

export default function CallButtons() {
  const level = useGame((s) => s.level)
  const phase = useGame((s) => s.phase)
  const makeCall = useGame((s) => s.makeCall)
  const lastOutcome = useGame((s) => s.lastOutcome)

  const meta = LEVELS.find((l) => l.level === level)
  const available = meta?.calls ?? []
  const buttons = DISPLAY_ORDER.filter((c) => available.includes(c))
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
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
      {buttons.map((call) => {
        const resolved = phase.startsWith('resolved')
        const isCorrect = resolved && lastOutcome?.correctCall === call
        const isWrongPick =
          resolved &&
          lastOutcome?.chosen === call &&
          !lastOutcome?.correct

        const stateClass = isCorrect
          ? 'border-accent bg-accent/25 text-accent animate-pop'
          : isWrongPick
            ? 'border-error bg-error/25 text-error animate-shake'
            : live
              ? 'border-defense/70 bg-bg-soft text-white active:scale-95 active:bg-defense active:text-bg hover:border-defense'
              : 'border-white/10 bg-bg-soft/60 text-white/40'

        return (
          <button
            key={call}
            disabled={!live}
            onClick={() => makeCall(call)}
            className={`relative select-none rounded-xl border-2 px-1 py-3 sm:py-5 min-h-[56px] font-display text-2xl sm:text-3xl tracking-wide transition-all duration-100 ${stateClass}`}
          >
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
