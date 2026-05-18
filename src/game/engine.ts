import { SCORING, starsFor, streakMultiplier } from './constants'
import type {
  DefensiveCall,
  LevelResult,
  Scenario,
  ScenarioResult,
} from './types'

export interface ScoreOutcome {
  correct: boolean
  points: number
  speedBonus: boolean
  multiplier: number
}

/**
 * Score a single call.
 * @param chosen        the call the player tapped (null = timed out)
 * @param scenario      the active scenario
 * @param reactionMs    ms from call-window open to the tap
 * @param timerMs       full timer length for this level (ms)
 * @param streakBefore  the player's streak BEFORE this call
 */
export function scoreCall(
  chosen: DefensiveCall | null,
  scenario: Scenario,
  reactionMs: number,
  timerMs: number,
  streakBefore: number
): ScoreOutcome {
  const correct = chosen != null && scenario.correctCalls.includes(chosen)
  if (!correct) {
    return { correct: false, points: 0, speedBonus: false, multiplier: 1 }
  }

  const fast = reactionMs <= timerMs * SCORING.speedThreshold
  const base = fast ? SCORING.base : SCORING.slowPoints
  const speedBonus = fast ? SCORING.speedBonus : 0
  // multiplier is based on the streak this call produces
  const multiplier = streakMultiplier(streakBefore + 1)
  const points = (base + speedBonus) * multiplier

  return { correct: true, points, speedBonus: fast, multiplier }
}

export function buildScenarioResult(
  scenario: Scenario,
  index: number,
  chosen: DefensiveCall | null,
  reactionMs: number,
  timedOut: boolean,
  points: number
): ScenarioResult {
  return {
    scenarioId: scenario.id,
    index,
    setupHint: scenario.setupHint,
    correctCall: scenario.correctCalls[0],
    playerCall: chosen,
    correct: chosen != null && scenario.correctCalls.includes(chosen),
    timedOut,
    reactionMs,
    pointsEarned: points,
    explanation: scenario.explanation,
  }
}

export function buildLevelResult(
  level: number,
  results: ScenarioResult[]
): LevelResult {
  const totalCount = results.length
  const correctCount = results.filter((r) => r.correct).length
  const totalScore = results.reduce((s, r) => s + r.pointsEarned, 0)
  const accuracy = totalCount === 0 ? 0 : correctCount / totalCount

  let streak = 0
  let bestStreak = 0
  for (const r of results) {
    if (r.correct) {
      streak += 1
      bestStreak = Math.max(bestStreak, streak)
    } else {
      streak = 0
    }
  }

  const reacted = results.filter((r) => r.correct && !r.timedOut)
  const avgReactionMs =
    reacted.length === 0
      ? 0
      : Math.round(
          reacted.reduce((s, r) => s + r.reactionMs, 0) / reacted.length
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
 * Position of the ball at scenario start: it sits on the offensive player
 * who is not a pass/dodge originator yet — by convention scenarios place the
 * ball on offense index found here. Falls back to index 0.
 */
export function ballHolderAtStart(scenario: Scenario): number {
  if (scenario.ballStartIndex != null) return scenario.ballStartIndex
  // The first pass action's playerIndex holds the ball at start.
  const firstPass = scenario.actions.find((a) => a.type === 'pass')
  if (firstPass) return firstPass.playerIndex
  const firstDodge = scenario.actions.find(
    (a) => a.type === 'dodge' && a.team !== 'defense'
  )
  if (firstDodge) return firstDodge.playerIndex
  return scenario.guardedAttackerIndex
}
