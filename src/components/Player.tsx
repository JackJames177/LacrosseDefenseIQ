import type { PlayerPosition } from '../game/types'
import { COLORS } from '../game/constants'

interface Props {
  player: PlayerPosition
  isSelf: boolean
  hasBall: boolean
  isGuardedMan: boolean
}

/** One player token. Position animates via CSS transition on the <g> transform. */
export default function Player({ player, isSelf, hasBall, isGuardedMan }: Props) {
  const isDefense = player.team === 'defense'
  const r = isSelf ? 4.6 : 3.6
  const fill = isDefense
    ? isSelf
      ? COLORS.defenseSelf
      : COLORS.defense
    : COLORS.attack

  return (
    <g
      style={{
        transform: `translate(${player.x}px, ${player.y}px)`,
        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {hasBall && (
        <circle
          r={r + 3.5}
          fill="none"
          stroke={COLORS.ball}
          strokeWidth={1.4}
          opacity={0.9}
          className="animate-pulseRing"
        />
      )}
      {isSelf && (
        <circle
          r={r + 2.4}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={1.2}
          className="animate-pulseRing"
        />
      )}
      {isGuardedMan && !hasBall && (
        <circle
          r={r + 1.8}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={0.6}
          strokeDasharray="2 2"
          opacity={0.55}
        />
      )}
      <circle
        r={r}
        fill={fill}
        stroke="#06121a"
        strokeWidth={0.7}
        style={{
          filter: isSelf
            ? `drop-shadow(0 0 4px ${COLORS.defenseSelf})`
            : undefined,
        }}
      />
      <text
        textAnchor="middle"
        dy={1.4}
        fontSize={3.4}
        fontWeight={700}
        fill="#06121a"
        style={{ fontFamily: 'Space Mono, monospace', pointerEvents: 'none' }}
      >
        {player.label}
      </text>
    </g>
  )
}
