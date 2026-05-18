import { useEffect } from 'react'
import { useGame } from '../stores/gameStore'
import { LEVELS } from '../game/constants'

/** Phase 0 — the "whistle". Mason taps READY to start the next possession. */
export default function ReadyGate() {
  const phase = useGame((s) => s.phase)
  const scenarioIndex = useGame((s) => s.scenarioIndex)
  const scenarios = useGame((s) => s.scenarios)
  const level = useGame((s) => s.level)
  const begin = useGame((s) => s.beginScenario)

  useEffect(() => {
    if (phase !== 'ready') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        begin()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, begin])

  if (phase !== 'ready') return null
  const meta = LEVELS.find((l) => l.level === level)
  const total = scenarios.length

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg/82 backdrop-blur-sm px-6">
      <p className="font-mono text-sm tracking-[0.3em] text-defense/70">
        {meta?.name?.toUpperCase()}
      </p>
      <p className="font-display text-5xl text-white mt-2">
        PLAY {scenarioIndex + 1}{' '}
        <span className="text-white/40">OF {total}</span>
      </p>
      <p className="font-body text-sm text-white/55 mt-3 text-center max-w-xs">
        Watch the play develop, then make your call when the timer starts.
      </p>
      <button
        autoFocus
        onClick={begin}
        className="mt-8 font-display text-5xl tracking-[0.15em] text-bg bg-accent rounded-2xl px-16 py-5 border-2 border-accent shadow-[0_0_28px_rgba(0,220,130,0.5)] active:scale-95 transition-transform"
      >
        READY
      </button>
      <p className="font-mono text-[11px] text-white/30 mt-6">
        tap READY or press SPACE / ENTER
      </p>
    </div>
  )
}
