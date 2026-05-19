import { SCORING, starsFor, streakMultiplier } from './constants'
import type {
  Beat,
  CallAttempt,
  DefensiveCall,
  LevelResult,
  Scenario,
  ScenarioResult,
} from './types'

export interface ScoreOutcome {
  correct: boolean
  points: number
  speedBonus: boolean
  pickBonus: boolean
  multiplier: number
}

function isPick(c: DefensiveCall | null): boolean {
  return c === 'PICK_LEFT' || c === 'PICK_RIGHT'
}

/**
 * Score a single call within a beat.
 * @param chosen        the call the player tapped (null = timed out)
 * @param beat          the active beat
 * @param reactionMs    ms from call-window open to the tap
 * @param timerMs       full timer length for this level (ms)
 * @param streakBefore  the player's streak BEFORE this call
 */
export function scoreCall(
  chosen: DefensiveCall | null,
  beat: Beat,
  reactionMs: number,
  timerMs: number,
  streakBefore: number
): ScoreOutcome {
  const correct = chosen != null && beat.correctCalls.includes(chosen)
  if (!correct) {
    return {
      correct: false,
      points: 0,
      speedBonus: false,
      pickBonus: false,
      multiplier: 1,
    }
  }

  const fast = reactionMs <= timerMs * SCORING.speedThreshold
  const base = fast ? SCORING.base : SCORING.slowPoints
  const speed = fast ? SCORING.speedBonus : 0
  // nailing the exact PICK direction earns a precision bonus
  const pick = isPick(chosen) ? SCORING.pickPrecisionBonus : 0
  const multiplier = streakMultiplier(streakBefore + 1)
  const points = (base + speed + pick) * multiplier

  return {
    correct: true,
    points,
    speedBonus: fast,
    pickBonus: pick > 0,
    multiplier,
  }
}

export function makeCallAttempt(
  beat: Beat,
  chosen: DefensiveCall | null,
  reactionMs: number,
  timedOut: boolean,
  points: number
): CallAttempt {
  return {
    correctCall: beat.correctCalls[0],
    playerCall: chosen,
    correct: chosen != null && beat.correctCalls.includes(chosen),
    timedOut,
    reactionMs,
    pointsEarned: points,
    explanation: beat.explanation,
    breakTrigger: beat.breakTrigger,
  }
}

export function buildScenarioResult(
  scenario: Scenario,
  index: number,
  calls: CallAttempt[]
): ScenarioResult {
  return {
    scenarioId: scenario.id,
    index,
    setupHint: scenario.setupHint,
    calls,
  }
}

export function buildLevelResult(
  level: number,
  results: ScenarioResult[]
): LevelResult {
  const allCalls = results.flatMap((r) => r.calls)
  const totalCount = allCalls.length
  const correctCount = allCalls.filter((c) => c.correct).length
  const totalScore = allCalls.reduce((s, c) => s + c.pointsEarned, 0)
  const accuracy = totalCount === 0 ? 0 : correctCount / totalCount

  let streak = 0
  let bestStreak = 0
  for (const c of allCalls) {
    if (c.correct) {
      streak += 1
      bestStreak = Math.max(bestStreak, streak)
    } else {
      streak = 0
    }
  }

  const reacted = allCalls.filter((c) => c.correct && !c.timedOut)
  const avgReactionMs =
    reacted.length === 0
      ? 0
      : Math.round(
          reacted.reduce((s, c) => s + c.reactionMs, 0) / reacted.length
        )

  return {
    level,
    scenarioResults: results,
    totalScore,
    correctCount,
    totalCount,
    accuracy,
    bestStreak,
    avgReactionMs,
    stars: starsFor(accuracy),
  }
}

/**
 * Offense index that holds the ball at scenario start: explicit ballStartIndex,
 * else the first pass/dodge origin in the first beat, else the guarded man.
 */
export function ballHolderAtStart(scenario: Scenario): number {
  if (scenario.ballStartIndex != null) return scenario.ballStartIndex
  const firstActions = scenario.beats[0]?.actions ?? []
  const firstPass = firstActions.find((a) => a.type === 'pass')
  if (firstPass) return firstPass.playerIndex
  const firstDodge = firstActions.find(
    (a) => a.type === 'dodge' && a.team !== 'defense'
  )
  if (firstDodge) return firstDodge.playerIndex
  return scenario.guardedAttackerIndex
}
