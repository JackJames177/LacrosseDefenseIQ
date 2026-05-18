import type { DefensiveCall, LevelMeta } from './types'

export const COLORS = {
  bg: '#0a0e14',
  bgSoft: '#0f1620',
  field: '#0d2b24',
  fieldLine: '#dff7ee',
  defense: '#00b4d8',
  defenseSelf: '#3ad6ff',
  attack: '#ff4444',
  ball: '#f5c542',
  accent: '#00dc82',
  error: '#ff4444',
} as const

/** SVG field coordinate space. Top = midfield, bottom = behind the goal. */
export const FIELD = {
  W: 100,
  H: 130,
  midfieldY: 8,
  restrainingY: 34,
  goalLineY: 100,
  creaseCenter: { x: 50, y: 100 },
  creaseR: 9,
  goalW: 6,
} as const

export const SCORING = {
  base: 100,
  speedBonus: 50,
  /** call made under this fraction of the timer earns the speed bonus */
  speedThreshold: 0.5,
  slowPoints: 75,
} as const

/** streak -> multiplier thresholds (checked high to low) */
export const STREAK_TIERS: { at: number; mult: number }[] = [
  { at: 12, mult: 5 },
  { at: 8, mult: 4 },
  { at: 5, mult: 3 },
  { at: 3, mult: 2 },
]

export function streakMultiplier(streak: number): number {
  for (const tier of STREAK_TIERS) {
    if (streak >= tier.at) return tier.mult
  }
  return 1
}

export const STAR_THRESHOLDS = { one: 0.7, two: 0.85, three: 0.95 } as const

export function starsFor(accuracy: number): number {
  if (accuracy >= STAR_THRESHOLDS.three) return 3
  if (accuracy >= STAR_THRESHOLDS.two) return 2
  if (accuracy >= STAR_THRESHOLDS.one) return 1
  return 0
}

export const UNLOCK_ACCURACY = 0.7

export const CALL_LABELS: Record<DefensiveCall, string> = {
  BALL: 'BALL',
  HOT: 'HOT',
  TWO: 'TWO',
  SLIDE: 'SLIDE',
  HOLD: 'HOLD',
  CHECK: 'CHECK',
  FIRE: 'FIRE',
  CUTTER: 'CUTTER',
  TOPSIDE: 'TOPSIDE',
}

export const CALL_FULL: Record<DefensiveCall, string> = {
  BALL: 'BALL! BALL! BALL!',
  HOT: "I'M HOT!",
  TWO: "I'M TWO!",
  SLIDE: 'SLIDE! SLIDE!',
  HOLD: 'HOLD!',
  CHECK: 'CHECK!',
  FIRE: 'FIRE! FIRE!',
  CUTTER: 'CUTTER!',
  TOPSIDE: 'TOPSIDE!',
}

export const CALL_KEYS: Record<DefensiveCall, string> = {
  BALL: 'B',
  HOT: 'H',
  TWO: 'T',
  SLIDE: 'S',
  HOLD: 'O',
  CHECK: 'C',
  FIRE: 'F',
  CUTTER: 'U',
  TOPSIDE: 'P',
}

export const KEY_TO_CALL: Record<string, DefensiveCall> = Object.entries(
  CALL_KEYS
).reduce((acc, [call, key]) => {
  acc[key.toLowerCase()] = call as DefensiveCall
  return acc
}, {} as Record<string, DefensiveCall>)

export const CALL_TRIGGERS: Record<DefensiveCall, string> = {
  BALL: 'Your man receives or has the ball and is a threat.',
  HOT: "You're the nearest help defender — next slide.",
  TWO: "You're two passes away, in help-side position.",
  SLIDE: 'A teammate got beat on a dodge — you slide to help.',
  HOLD: 'Your man has the ball but is NOT threatening (cradling / facing away).',
  CHECK: 'Ball is in the air on a pass, or loose on the ground.',
  FIRE: "You're getting beaten on a dodge — bring the hot man early.",
  CUTTER: 'An off-ball attacker is cutting through the crease.',
  TOPSIDE: 'Direct a teammate to force the ball carrier away from the middle.',
}

export const LEVELS: LevelMeta[] = [
  {
    level: 1,
    name: 'Ball Awareness',
    blurb: 'Learn BALL, HOLD, and CHECK. Slow and steady.',
    calls: ['BALL', 'HOLD', 'CHECK'],
    timerSeconds: 6,
  },
  {
    level: 2,
    name: 'Know Your Role',
    blurb: 'Add HOT and TWO. Read the ball relative to your man.',
    calls: ['BALL', 'HOLD', 'CHECK', 'HOT', 'TWO'],
    timerSeconds: 5,
  },
  {
    level: 3,
    name: 'The Slide',
    blurb: 'Add SLIDE. A teammate gets beat — go help.',
    calls: ['BALL', 'HOLD', 'CHECK', 'HOT', 'TWO', 'SLIDE'],
    timerSeconds: 4.5,
  },
  {
    level: 4,
    name: 'Under Pressure',
    blurb: 'Add FIRE. Your man dodges at you — get early help.',
    calls: ['BALL', 'HOLD', 'CHECK', 'HOT', 'TWO', 'SLIDE', 'FIRE'],
    timerSeconds: 4,
  },
  {
    level: 5,
    name: 'Eyes Everywhere',
    blurb: 'All 9 calls. Spot cutters and direct teammates.',
    calls: [
      'BALL',
      'HOLD',
      'CHECK',
      'HOT',
      'TWO',
      'SLIDE',
      'FIRE',
      'CUTTER',
      'TOPSIDE',
    ],
    timerSeconds: 3.5,
  },
  {
    level: 6,
    name: 'Full Speed',
    blurb: 'Final exam. Real possessions, chained calls, full speed.',
    calls: [
      'BALL',
      'HOLD',
      'CHECK',
      'HOT',
      'TWO',
      'SLIDE',
      'FIRE',
      'CUTTER',
      'TOPSIDE',
    ],
    timerSeconds: 3,
  },
]

export const ALL_CALLS: DefensiveCall[] = [
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

export const TIMING = {
  /** Phase 1 — Setup: players move into place, hint shows, no pressure */
  setupMs: 1800,
  /** How long the "NOW" call cue flashes when the call window opens */
  callCueMs: 800,
  /** How long the resolution (correct/wrong + explanation) stays up */
  resolutionHoldMs: 2000,
} as const
