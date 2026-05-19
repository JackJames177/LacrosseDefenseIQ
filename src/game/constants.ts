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
  /** extra points for nailing the correct PICK direction (L vs R) */
  pickPrecisionBonus: 25,
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
  FIRE: 'FIRE',
  HOLD: 'HOLD',
  TOPSIDE: 'TOPSIDE',
  CUTTER: 'CUTTER',
  PICK_LEFT: 'PICK L',
  PICK_RIGHT: 'PICK R',
  BREAK: 'BREAK',
}

export const CALL_FULL: Record<DefensiveCall, string> = {
  BALL: 'BALL! BALL! BALL!',
  HOT: "I'M HOT!",
  TWO: "I'M TWO!",
  SLIDE: 'SLIDE! SLIDE!',
  FIRE: 'FIRE! FIRE!',
  HOLD: 'HOLD!',
  TOPSIDE: 'TOPSIDE!',
  CUTTER: 'CUTTER!',
  PICK_LEFT: 'PICK LEFT!',
  PICK_RIGHT: 'PICK RIGHT!',
  BREAK: 'BREAK!',
}

export const CALL_KEYS: Record<DefensiveCall, string> = {
  BALL: 'B',
  HOT: 'H',
  TWO: 'T',
  SLIDE: 'S',
  FIRE: 'F',
  HOLD: 'O',
  TOPSIDE: 'P',
  CUTTER: 'U',
  PICK_LEFT: 'L',
  PICK_RIGHT: 'R',
  BREAK: 'K',
}

export const KEY_TO_CALL: Record<string, DefensiveCall> = Object.entries(
  CALL_KEYS
).reduce((acc, [call, key]) => {
  acc[key.toLowerCase()] = call as DefensiveCall
  return acc
}, {} as Record<string, DefensiveCall>)

export const CALL_TRIGGERS: Record<DefensiveCall, string> = {
  BALL: "You're on the ball carrier and he's a threat.",
  HOT: "You're the next slide — nearest help defender.",
  TWO: "You're two passes away, in help-side position.",
  SLIDE: "You're sliding to help a beaten teammate.",
  FIRE: "You're getting beaten — you need help NOW.",
  HOLD: "Your man has the ball but isn't threatening.",
  TOPSIDE: 'Direct a teammate to force the dodger away from the middle.',
  CUTTER: 'An off-ball man is cutting through the crease.',
  PICK_LEFT: 'A screen is being set on a teammate — call the side.',
  PICK_RIGHT: 'A screen is being set on a teammate — call the side.',
  BREAK: 'Save or ground ball — transition to the clear.',
}

/** Display order for the call-button grid (PICK pair kept together). */
export const BUTTON_ORDER: DefensiveCall[] = [
  'BALL',
  'HOT',
  'TWO',
  'SLIDE',
  'FIRE',
  'HOLD',
  'TOPSIDE',
  'CUTTER',
  'BREAK',
  'PICK_LEFT',
  'PICK_RIGHT',
]

export const LEVELS: LevelMeta[] = [
  {
    level: 1,
    name: 'Ball Basics',
    blurb: 'BALL, HOLD, and BREAK. Simple and confidence-building.',
    calls: ['BALL', 'HOLD', 'BREAK'],
    timerSeconds: 6,
  },
  {
    level: 2,
    name: 'Know Your Role',
    blurb: 'Add HOT and TWO. Where is the ball relative to you?',
    calls: ['BALL', 'HOLD', 'BREAK', 'HOT', 'TWO'],
    timerSeconds: 5,
  },
  {
    level: 3,
    name: 'The Slide',
    blurb: 'Add SLIDE and FIRE. Help a beaten teammate — or call for help.',
    calls: ['BALL', 'HOLD', 'BREAK', 'HOT', 'TWO', 'SLIDE', 'FIRE'],
    timerSeconds: 4.5,
  },
  {
    level: 4,
    name: 'Eyes Everywhere',
    blurb: 'Add CUTTER and TOPSIDE. Read what happens off the ball.',
    calls: [
      'BALL',
      'HOLD',
      'BREAK',
      'HOT',
      'TWO',
      'SLIDE',
      'FIRE',
      'CUTTER',
      'TOPSIDE',
    ],
    timerSeconds: 4,
  },
  {
    level: 5,
    name: 'Pick Apart',
    blurb: 'Add PICK LEFT / RIGHT. Read the screens. All 10 calls.',
    calls: [
      'BALL',
      'HOLD',
      'BREAK',
      'HOT',
      'TWO',
      'SLIDE',
      'FIRE',
      'CUTTER',
      'TOPSIDE',
      'PICK_LEFT',
      'PICK_RIGHT',
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
      'BREAK',
      'HOT',
      'TWO',
      'SLIDE',
      'FIRE',
      'CUTTER',
      'TOPSIDE',
      'PICK_LEFT',
      'PICK_RIGHT',
    ],
    timerSeconds: 3,
  },
]

export const ALL_CALLS: DefensiveCall[] = [
  'BALL',
  'HOT',
  'TWO',
  'SLIDE',
  'FIRE',
  'HOLD',
  'TOPSIDE',
  'CUTTER',
  'PICK_LEFT',
  'PICK_RIGHT',
  'BREAK',
]

export const TIMING = {
  /** Phase 1 — Setup: players move into place, hint shows, no pressure */
  setupMs: 1500,
  /** Brief hold between beats of a multi-call possession */
  beatGapMs: 650,
  /** Min time the "SAVE!" confirmation + possession glow shows before BREAK */
  saveConfirmMs: 1200,
  /** Min time the "GROUND BALL" confirmation shows before BREAK */
  gbConfirmMs: 1600,
  /** How long the "NOW" call cue flashes when the call window opens */
  callCueMs: 800,
  /** How long the resolution (correct/wrong + explanation) stays up */
  resolutionHoldMs: 2000,
} as const
