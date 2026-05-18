import { useGame } from '../stores/gameStore'
import { CALL_FULL } from '../game/constants'

/** Setup hint, tutorial tooltip, floating points and resolution explanation. */
export default function PlayFeedback() {
  const phase = useGame((s) => s.phase)
  const scenarios = useGame((s) => s.scenarios)
  const scenarioIndex = useGame((s) => s.scenarioIndex)
  const outcome = useGame((s) => s.lastOutcome)
  const scenario = scenarios[scenarioIndex]
  if (!scenario) return null

  const watching = phase === 'setup' || phase === 'action'

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center">
      {/* Hint + phase label during setup / action / call (not ready/resolved) */}
      {(watching || phase === 'call') && (
        <div className="mt-1 flex flex-col items-center gap-1">
          {watching && (
            <span className="font-display text-lg tracking-[0.35em] text-defense/80 animate-pulse">
              👀 READ THE PLAY
            </span>
          )}
          <div className="px-4 py-1.5 rounded-full bg-black/55 border border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs sm:text-sm text-white/85">
              {scenario.setupHint}
            </span>
          </div>
        </div>
      )}

      {/* Phase 2 -> 3 transition: the "NOW" cue when the call window opens */}
      {phase === 'call' && (
        <div
          key={`cue-${scenarioIndex}`}
          className="absolute top-[14%] left-1/2 -translate-x-1/2 animate-nowCue"
        >
          <div className="font-display text-7xl tracking-widest text-accent drop-shadow-[0_0_18px_rgba(0,220,130,0.9)]">
            NOW!
          </div>
        </div>
      )}

      {/* Tutorial tooltip */}
      {scenario.tutorial && (phase === 'setup' || phase === 'action') && (
        <div className="mt-3 mx-4 max-w-md px-4 py-3 rounded-xl bg-defense/15 border border-defense/40">
          <p className="font-body text-sm text-defense-foreground text-center text-white/90">
            💡 {scenario.tutorial}
          </p>
        </div>
      )}

      {/* Correct: floating points */}
      {phase === 'resolved-correct' && outcome && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
          <div className="animate-floatUp">
            <div className="font-display text-6xl text-accent text-stroke drop-shadow-[0_0_12px_rgba(0,220,130,0.8)]">
              +{outcome.points}
            </div>
            {outcome.speedBonus && (
              <div className="font-display text-2xl text-ball">QUICK CALL!</div>
            )}
            {outcome.multiplier > 1 && (
              <div className="font-display text-xl text-accent">
                x{outcome.multiplier} STREAK
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wrong / timeout: correct answer + explanation */}
      {(phase === 'resolved-wrong' || phase === 'resolved-timeout') &&
        outcome && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[88%] max-w-md text-center">
            <div className="font-display text-4xl text-error mb-1">
              {phase === 'resolved-timeout' ? 'TOO SLOW!' : 'WRONG CALL'}
            </div>
            <div className="rounded-xl bg-black/70 border border-error/40 px-4 py-3">
              <div className="font-display text-3xl text-accent tracking-wide">
                {CALL_FULL[outcome.correctCall]}
              </div>
              <p className="font-body text-sm text-white/85 mt-1">
                {outcome.explanation}
              </p>
            </div>
          </div>
        )}
    </div>
  )
}
