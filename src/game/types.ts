export type DefensiveCall =
  | 'BALL'
  | 'HOT'
  | 'TWO'
  | 'SLIDE'
  | 'HOLD'
  | 'CHECK'
  | 'FIRE'
  | 'CUTTER'
  | 'TOPSIDE'

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

export type ActionType = 'pass' | 'dodge' | 'cut' | 'move' | 'catch'

export interface GameAction {
  type: ActionType
  /** Index into the matching team array (offense for pass/dodge/cut/catch) */
  playerIndex: number
  team?: Team
  target?: { x: number; y: number }
  /** ms for the animation */
  duration: number
  /** ms after scenario action-phase start */
  delay: number
  /** for 'pass' — index of receiving offensive player (ball travels to them) */
  toPlayerIndex?: number
}

export interface Scenario {
  id: string
  level: number
  initialPositions: PlayerPosition[]
  /** Index into the defense players (in order they appear in initialPositions) */
  playerDefenderIndex: number
  /** Which offensive player the player's defender is guarding (index into offense) */
  guardedAttackerIndex: number
  actions: GameAction[]
  /** Accepted correct call(s). First entry is the canonical answer. */
  correctCalls: DefensiveCall[]
  setupHint: string
  explanation: string
  /** ms the scenario action plays before the call window opens */
  callOpensAt: number
  /** Optional tutorial tooltip (used in early Level 1 scenarios) */
  tutorial?: string
  /** Loose ground ball — ball sits here instead of on a player */
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

export interface ScenarioResult {
  scenarioId: string
  index: number
  setupHint: string
  correctCall: DefensiveCall
  playerCall: DefensiveCall | null
  correct: boolean
  timedOut: boolean
  reactionMs: number
  pointsEarned: number
  explanation: string
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
  /** Calls unlocked / available as buttons in this level */
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
