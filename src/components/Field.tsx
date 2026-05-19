import { useGame } from '../stores/gameStore'
import { COLORS, FIELD } from '../game/constants'
import Player from './Player'

/** Top-down lacrosse half-field with animated players + ball. */
export default function Field() {
  const positions = useGame((s) => s.positions)
  const ball = useGame((s) => s.ball)
  const scenarios = useGame((s) => s.scenarios)
  const scenarioIndex = useGame((s) => s.scenarioIndex)
  const phase = useGame((s) => s.phase)
  const pickArrow = useGame((s) => s.pickArrow)
  const breakActive = useGame((s) => s.breakActive)

  const scenario = scenarios[scenarioIndex]
  const selfAbs = scenario ? 6 + scenario.playerDefenderIndex : -1
  const guardedAbs = scenario ? scenario.guardedAttackerIndex : -1

  // ball carrier = nearest offensive player when not in air
  let carrierAbs = -1
  if (!ball.inAir) {
    let best = Infinity
    positions.forEach((p, i) => {
      if (p.team !== 'offense') return
      const d = (p.x - ball.x) ** 2 + (p.y - ball.y) ** 2
      if (d < best && d < 16) {
        best = d
        carrierAbs = i
      }
    })
  }

  const flash =
    phase === 'resolved-correct'
      ? 'animate-flashGreen'
      : phase === 'resolved-wrong' || phase === 'resolved-timeout'
        ? 'animate-flashRed'
        : ''
  const flashColor =
    phase === 'resolved-correct' ? COLORS.accent : COLORS.error

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${FIELD.W} ${FIELD.H}`}
        className="w-full h-full max-h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: 'drop-shadow(0 0 18px rgba(0,180,216,0.18))' }}
      >
        <defs>
          <radialGradient id="fieldGrad" cx="50%" cy="78%" r="75%">
            <stop offset="0%" stopColor="#13433a" />
            <stop offset="100%" stopColor="#0a241f" />
          </radialGradient>
        </defs>

        <rect
          x={1}
          y={1}
          width={FIELD.W - 2}
          height={FIELD.H - 2}
          rx={3}
          fill="url(#fieldGrad)"
          stroke={COLORS.fieldLine}
          strokeWidth={0.6}
          opacity={0.95}
        />

        {/* midfield line */}
        <line
          x1={2}
          y1={FIELD.midfieldY}
          x2={FIELD.W - 2}
          y2={FIELD.midfieldY}
          stroke={COLORS.fieldLine}
          strokeWidth={0.5}
          opacity={0.5}
        />
        {/* restraining line */}
        <line
          x1={2}
          y1={FIELD.restrainingY}
          x2={FIELD.W - 2}
          y2={FIELD.restrainingY}
          stroke={COLORS.fieldLine}
          strokeWidth={0.5}
          strokeDasharray="3 2"
          opacity={0.45}
        />
        {/* goal-line extended */}
        <line
          x1={2}
          y1={FIELD.goalLineY}
          x2={FIELD.W - 2}
          y2={FIELD.goalLineY}
          stroke={COLORS.fieldLine}
          strokeWidth={0.4}
          opacity={0.4}
        />
        {/* crease */}
        <circle
          cx={FIELD.creaseCenter.x}
          cy={FIELD.creaseCenter.y}
          r={FIELD.creaseR}
          fill="rgba(0,180,216,0.10)"
          stroke={COLORS.fieldLine}
          strokeWidth={0.6}
          opacity={0.7}
        />
        {/* goal */}
        <rect
          x={FIELD.creaseCenter.x - FIELD.goalW / 2}
          y={FIELD.goalLineY - 1.4}
          width={FIELD.goalW}
          height={2.8}
          fill="none"
          stroke={COLORS.fieldLine}
          strokeWidth={0.9}
        />

        {/* players */}
        {positions.map((p, i) => (
          <Player
            key={p.id}
            player={p}
            isSelf={i === selfAbs}
            hasBall={i === carrierAbs}
            isGuardedMan={i === guardedAbs}
          />
        ))}

        {/* ball */}
        <circle
          cx={ball.x}
          cy={ball.y}
          r={ball.inAir ? 1.7 : 1.4}
          fill={COLORS.ball}
          stroke="#5a4500"
          strokeWidth={0.3}
          style={{
            transition: 'cx 0.5s linear, cy 0.5s linear, r 0.2s ease',
            filter: `drop-shadow(0 0 ${ball.inAir ? 3 : 1.5}px ${COLORS.ball})`,
          }}
        />

        {/* BREAK / transition cue — ball is dead, get heads up and clear */}
        {breakActive && (
          <g style={{ pointerEvents: 'none' }}>
            <circle
              cx={FIELD.creaseCenter.x}
              cy={FIELD.goalLineY - 1}
              r={4}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={1}
              className="animate-pulseRing"
            />
            {[0, 1, 2].map((i) => (
              <text
                key={i}
                x={FIELD.W / 2}
                y={FIELD.midfieldY + 8 + i * 7}
                textAnchor="middle"
                fontSize={6}
                fill={COLORS.accent}
                opacity={0.5 - i * 0.13}
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                ▲
              </text>
            ))}
          </g>
        )}

        {/* PICK direction indicator — amber arrow from the screen side */}
        {pickArrow && (phase === 'action' || phase === 'call') && (
          <g
            key={`pick-${scenarioIndex}-${pickArrow.dir}-${Math.round(
              pickArrow.x
            )}`}
            style={{ pointerEvents: 'none' }}
          >
            <text
              x={pickArrow.x + (pickArrow.dir === 'left' ? -8 : 8)}
              y={pickArrow.y - 7}
              textAnchor="middle"
              fontSize={9}
              fontWeight={700}
              fill={COLORS.ball}
              className="animate-pop"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                filter: `drop-shadow(0 0 3px ${COLORS.ball})`,
              }}
            >
              {pickArrow.dir === 'left' ? '◀' : '▶'}
            </text>
            <circle
              cx={pickArrow.x}
              cy={pickArrow.y}
              r={6}
              fill="none"
              stroke={COLORS.ball}
              strokeWidth={0.9}
              strokeDasharray="2 1.5"
              opacity={0.8}
              className="animate-pulseRing"
            />
          </g>
        )}

        {flash && (
          <rect
            x={0}
            y={0}
            width={FIELD.W}
            height={FIELD.H}
            fill={flashColor}
            className={flash}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* "NOW" border pulse when the call window opens */}
        {phase === 'call' && (
          <rect
            key={`calledge-${scenarioIndex}`}
            x={1.5}
            y={1.5}
            width={FIELD.W - 3}
            height={FIELD.H - 3}
            rx={3}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth={2.4}
            className="animate-borderPulse"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </svg>
    </div>
  )
}
