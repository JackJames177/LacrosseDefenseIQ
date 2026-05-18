import { useGame } from '../stores/gameStore'
import { LEVELS, streakMultiplier } from '../game/constants'
import TimerBar from './TimerBar'

export default function HUD() {
  const level = useGame((s) => s.level)
  const score = useGame((s) => s.score)
  const streak = useGame((s) => s.streak)
  const scenarioIndex = useGame((s) => s.scenarioIndex)
  const scenarios = useGame((s) => s.scenarios)
  const abortToMenu = useGame((s) => s.abortToMenu)

  const phase = useGame((s) => s.phase)
  const meta = LEVELS.find((l) => l.level === level)
  const mult = streakMultiplier(streak)

  const phaseLabel =
    phase === 'ready'
      ? 'GET READY'
      : phase === 'setup'
        ? 'WATCH'
        : phase === 'action'
          ? 'READ THE PLAY'
          : phase === 'call'
            ? null
            : ''

  return (
    <div className="w-full px-3 pt-3 pb-1 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={abortToMenu}
          className="font-mono text-xs text-white/50 hover:text-white shrink-0"
          aria-label="Quit to menu"
        >
          ‹ QUIT
        </button>
        <div className="text-center leading-none">
          <div className="font-display text-lg tracking-wider text-defense">
            LVL {level} · {meta?.name?.toUpperCase()}
          </div>
          <div className="font-mono text-[10px] text-white/40">
            {Math.min(scenarioIndex + 1, scenarios.length)} / {scenarios.length}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-2xl leading-none text-white">
            {score.toLocaleString()}
          </div>
          {streak >= 3 && (
            <div className="font-display text-sm text-accent leading-none animate-pop">
              🔥 {streak} · x{mult}
            </div>
          )}
        </div>
      </div>
      {phase === 'call' ? (
        <TimerBar />
      ) : (
        <div className="h-3 flex items-center justify-center">
          {phaseLabel && (
            <span className="font-mono text-[11px] tracking-[0.35em] text-white/35">
              {phaseLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
