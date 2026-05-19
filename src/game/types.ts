export type DefensiveCall =
  | 'BALL'
  | 'HOT'
  | 'TWO'
  | 'SLIDE'
  | 'FIRE'
  | 'HOLD'
  | 'TOPSIDE'
  | 'CUTTER'
  | 'PICK_LEFT'
  | 'PICK_RIGHT'
  | 'BREAK'

export type Team = 'offense' | 'defense'

export interface PlayerPosition {
  /** Stable id, e.g. "A1", "D3" */
  id: string
  team: Team
  /** Short label shown on the circle, e.g. "A1", "M2", "D" */
  label: string
  x: number
  y: number
}

export type ActionType =
  | 'pass'
  | 'dodge'
  | 'cut'
  | 'move'
  | 'catch'
  | 'pick'
  | 'save'
  | 'ground_ball'
  | 'shot'

export interface GameAction {
  type: ActionType
  /** Index into the matching team array (offense unless team:'defense') */
  playerIndex: number
  team?: Team
  target?: { x: number; y: number }
  /** ms for the animation */
  duration: number
  /** ms after this beat's action phase starts */
  delay: number
  /** for 'pass' — index of receiving offensive player (ball travels there) */
  toPlayerIndex?: number
  /** for 'pick' — which side the screen comes from */
  pickDirection?: 'left' | 'right'
  /** for 'pick' — which defender (defense sub-array index) is being screened */
  targetDefenderIndex?: number
}

/**
 * A single call within a scenario. v2 scenarios can chain several beats —
 * the play keeps developing and the timer RESETS for each beat's call.
 * A simple single-call scenario is just one beat.
 */
export interface Beat {
  /** Actions for this beat. delays are relative to this beat's action start. */
  actions: GameAction[]
  /** ms from this beat's action start until the call window opens */
  callOpensAt: number
  /** Accepted call(s). First entry is the canonical answer. */
  correctCalls: DefensiveCall[]
  /** Shown if the player gets it wrong / times out */
  explanation: string
  /** Short prompt shown while this beat develops, e.g. "Read the screen!" */
  prompt?: string
  /** For BREAK beats — what triggered it (shown in the breakdown) */
  breakTrigger?: 'save' | 'ground_ball'
}

export interface Scenario {
  id: string
  level: number
  initialPositions: PlayerPosition[]
  /** Index into the defense sub-array — the defender the player controls */
  playerDefenderIndex: number
  /** Offense index the player's defender is guarding */
  guardedAttackerIndex: number
  /** One or more sequential beats (calls). */
  beats: Beat[]
  setupHint: string
  /** Optional tutorial tooltip (used in early teaching scenarios) */
  tutorial?: string
  /** Loose ground ball — ball sits here at scenario start instead of on a player */
  ballOverride?: { x: number; y: number }
  /** Offense index that starts with the ball (defaults to first pass/dodge origin) */
  ballStartIndex?: number
}

export type GamePhase =
  | 'ready'
  | 'setup'
  | 'action'
  | 'call'
  | 'resolved-correct'
  | 'resolved-wrong'
  | 'resolved-timeout'

/** One call attempt within a scenario (a scenario has 1+). */
export interface CallAttempt {
  correctCall: DefensiveCall
  playerCall: DefensiveCall | null
  correct: boolean
  timedOut: boolean
  reactionMs: number
  pointsEarned: number
  explanation: string
  breakTrigger?: 'save' | 'ground_ball'
}

export interface ScenarioResult {
  scenarioId: string
  index: number
  setupHint: string
  calls: CallAttempt[]
}

export interface LevelResult {
  level: number
  scenarioResults: ScenarioResult[]
  totalScore: number
  correctCount: number
  totalCount: number
  accuracy: number
  bestStreak: number
  avgReactionMs: number
  stars: number
}

export interface LevelMeta {
  level: number
  name: string
  blurb: string
  /** Calls available as buttons in this level */
  calls: DefensiveCall[]
  /** Seconds per call */
  timerSeconds: number
}

export interface LevelProgress {
  bestScore: number
  stars: number
  accuracy: number
  completed: boolean
}

export interface LeaderboardEntry {
  initials: string
  score: number
  date: string
}
