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
  const breakKind = useGame((s) => s.breakKind)
  const shotLine = useGame((s) => s.shotLine)
  const beatIndex = useGame((s) => s.beatIndex)

  const scenario = scenarios[scenarioIndex]
  const selfAbs = scenario ? 6 + scenario.playerDefenderIndex : -1
  const guardedAbs = scenario ? scenario.guardedAttackerIndex : -1
  const inPlay = positions.length > 0
  const beat = scenario?.beats[beatIndex]
  const isTwoCall =
    phase === 'call' && !!beat && beat.correctCalls.includes('TWO')

  // ball carrier = nearest player to the ball when not in air.
  // After a ground ball the scooping DEFENDER carries it, so include defense.
  const carrierTeam: 'offense' | 'any' =
    breakActive && breakKind === 'ground_ball' ? 'any' : 'offense'
  let carrierAbs = -1
  if (!ball.inAir && breakKind !== 'save') {
    let best = Infinity
    positions.forEach((p, i) => {
      if (carrierTeam === 'offense' && p.team !== 'offense') return
      const d = (p.x - ball.x) ** 2 + (p.y - ball.y) ** 2
      if (d < best && d < 16) {
        best = d
        carrierAbs = i
      }
    })
  }

  // FIX 2: during a TWO call, tag the true first-slide (HOT) defender so the
  // player SEES someone else is the first help — therefore they are TWO.
  // The HOT man is the nearest HELP defender, excluding the on-ball defender
  // (defenders map 1:1 to offense: D_i guards O_i) and the player themself.
  let hotAbs = -1
  if (isTwoCall) {
    const onBallDefAbs = carrierAbs >= 0 ? carrierAbs + 6 : -1
    let best = Infinity
    positions.forEach((p, i) => {
      if (p.team !== 'defense' || i === selfAbs || i === onBallDefAbs) return
      const d = (p.x - ball.x) ** 2 + (p.y - ball.y) ** 2
      if (d < best) {
        best = d
        hotAbs = i
      }
    })
  }

  const GX = FIELD.creaseCenter.x
  const GY = FIELD.goalLineY

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

        {/* shot path — visible arc toward the cage */}
        {shotLine && (
          <line
            key={`shot-${scenarioIndex}-${beatIndex}`}
            x1={shotLine.x1}
            y1={shotLine.y1}
            x2={shotLine.x2}
            y2={shotLine.y2}
            stroke={COLORS.ball}
            strokeWidth={0.9}
            strokeDasharray="3 2"
            opacity={0.7}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* goalie — always in the cage during play */}
        {inPlay && (
          <g style={{ pointerEvents: 'none' }}>
            {breakKind === 'save' && (
              <circle
                cx={GX}
                cy={GY - 4}
                r={6.5}
                fill="none"
                stroke={COLORS.ball}
                strokeWidth={1.4}
                className="animate-pulseRing"
              />
            )}
            <circle
              cx={GX}
              cy={GY - 4}
              r={3.4}
              fill={breakKind === 'save' ? COLORS.accent : COLORS.defense}
              stroke="#06121a"
              strokeWidth={0.7}
              className={breakKind === 'save' ? 'animate-pop' : undefined}
              style={
                breakKind === 'save'
                  ? { filter: `drop-shadow(0 0 4px ${COLORS.accent})` }
                  : undefined
              }
            />
            <text
              x={GX}
              y={GY - 2.8}
              textAnchor="middle"
              fontSize={3}
              fontWeight={700}
              fill="#06121a"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              G
            </text>
          </g>
        )}

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

        {/* FIX 2: HOT tag on the real first-slide defender during a TWO call */}
        {hotAbs >= 0 && positions[hotAbs] && (
          <text
            x={positions[hotAbs].x}
            y={positions[hotAbs].y - 5.5}
            textAnchor="middle"
            fontSize={4}
            fontWeight={700}
            fill={COLORS.ball}
            className="animate-pop"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              pointerEvents: 'none',
              filter: `drop-shadow(0 0 2px ${COLORS.ball})`,
            }}
          >
            HOT
          </text>
        )}

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
            {breakKind === 'save' && (
              <text
                x={GX}
                y={GY - 11}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={COLORS.accent}
                className="animate-pop"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  filter: `drop-shadow(0 0 4px ${COLORS.accent})`,
                }}
              >
                SAVE!
              </text>
            )}
            {breakKind === 'ground_ball' && (
              <text
                x={FIELD.W / 2}
                y={Math.max(ball.y - 7, 20)}
                textAnchor="middle"
                fontSize={5.4}
                fontWeight={700}
                fill={COLORS.accent}
                className="animate-pop"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  filter: `drop-shadow(0 0 3px ${COLORS.accent})`,
                }}
              >
                GROUND BALL — OUR POSSESSION!
              </text>
            )}
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
