import { create } from 'zustand'
import type {
  DefensiveCall,
  GamePhase,
  LevelResult,
  PlayerPosition,
  Scenario,
  ScenarioResult,
} from '../game/types'
import { LEVELS, TIMING } from '../game/constants'
import {
  ballHolderAtStart,
  buildLevelResult,
  buildScenarioResult,
  scoreCall,
} from '../game/engine'
import { scenariosForLevel } from '../game/scenarios'
import { useLeaderboard } from './leaderboardStore'

export type Screen =
  | 'menu'
  | 'levelSelect'
  | 'howTo'
  | 'leaderboard'
  | 'playing'
  | 'breakdown'

export interface BallState {
  x: number
  y: number
  inAir: boolean
}

export interface Outcome {
  correct: boolean
  timedOut: boolean
  points: number
  speedBonus: boolean
  multiplier: number
  chosen: DefensiveCall | null
  correctCall: DefensiveCall
  explanation: string
}

interface GameState {
  screen: Screen
  level: number | null
  scenarios: Scenario[]
  scenarioIndex: number
  phase: GamePhase
  positions: PlayerPosition[]
  ball: BallState
  score: number
  streak: number
  timerMs: number
  /** epoch ms when the call window opened (0 if not open) */
  callOpenedAt: number
  results: ScenarioResult[]
  lastOutcome: Outcome | null
  levelResult: LevelResult | null
  isNewHighScore: boolean

  navigate: (screen: Screen) => void
  startLevel: (level: number) => void
  beginScenario: () => void
  makeCall: (call: DefensiveCall) => void
  abortToMenu: () => void
}

let timers: ReturnType<typeof setTimeout>[] = []
function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}
function later(fn: () => void, ms: number) {
  timers.push(setTimeout(fn, ms))
}

function offenseAbs(i: number) {
  return i
}
function defenseAbs(i: number) {
  return 6 + i
}

export const useGame = create<GameState>((set, get) => {
  /** Apply one action's movement to the live positions (CSS transitions animate it). */
  function applyAction(
    a: Scenario['actions'][number],
    positions: PlayerPosition[]
  ): PlayerPosition[] {
    const team = a.team ?? 'offense'
    const abs =
      team === 'defense' ? defenseAbs(a.playerIndex) : offenseAbs(a.playerIndex)
    if (!a.target) return positions
    const next = positions.slice()
    next[abs] = { ...next[abs], x: a.target.x, y: a.target.y }
    return next
  }

  /**
   * READY gate — show the upcoming scenario's formation static, no timer,
   * no input. Mason taps READY (beginScenario) to start the whistle.
   */
  function prepareScenario(index: number) {
    clearTimers()
    const { scenarios } = get()
    const scenario = scenarios[index]
    if (!scenario) {
      finishLevel()
      return
    }
    const initial = scenario.initialPositions.map((p) => ({ ...p }))
    const holderIdx = ballHolderAtStart(scenario)
    const start =
      scenario.ballOverride ??
      ({
        x: initial[offenseAbs(holderIdx)].x,
        y: initial[offenseAbs(holderIdx)].y,
      } as { x: number; y: number })
    set({
      scenarioIndex: index,
      phase: 'ready',
      positions: initial,
      ball: { x: start.x, y: start.y, inAir: false },
      lastOutcome: null,
      callOpenedAt: 0,
    })
  }

  function runScenario(index: number) {
    clearTimers()
    const { scenarios } = get()
    const scenario = scenarios[index]
    if (!scenario) return

    const initial = scenario.initialPositions.map((p) => ({ ...p }))
    const holderIdx = ballHolderAtStart(scenario)
    const start =
      scenario.ballOverride ??
      ({
        x: initial[offenseAbs(holderIdx)].x,
        y: initial[offenseAbs(holderIdx)].y,
      } as { x: number; y: number })

    set({
      scenarioIndex: index,
      phase: 'setup',
      positions: initial,
      ball: { x: start.x, y: start.y, inAir: false },
      lastOutcome: null,
      callOpenedAt: 0,
    })

    // SETUP -> ACTION
    later(() => {
      set({ phase: 'action' })

      // schedule each action's movement + ball tracking
      for (const a of scenario.actions) {
        later(() => {
          const positions = applyAction(a, get().positions)
          let ball = get().ball
          const team = a.team ?? 'offense'

          if (a.type === 'pass' && a.toPlayerIndex != null) {
            const to = positions[offenseAbs(a.toPlayerIndex)]
            ball = { x: to.x, y: to.y, inAir: true }
          } else if (
            (a.type === 'dodge' || a.type === 'move' || a.type === 'cut') &&
            team === 'offense' &&
            a.target
          ) {
            // ball follows the carrier if this offensive player has it
            const carrier = positions[offenseAbs(a.playerIndex)]
            const hadBall =
              Math.abs(get().ball.x - get().positions[offenseAbs(a.playerIndex)].x) < 0.5 &&
              Math.abs(get().ball.y - get().positions[offenseAbs(a.playerIndex)].y) < 0.5
            if (hadBall) ball = { x: carrier.x, y: carrier.y, inAir: false }
          }
          set({ positions, ball })

          if (a.type === 'pass') {
            // ball lands when flight completes
            later(() => {
              set((s) => ({ ball: { ...s.ball, inAir: false } }))
            }, a.duration)
          }
        }, a.delay)
      }

      // ACTION -> CALL window opens
      later(() => {
        set({ phase: 'call', callOpenedAt: Date.now() })
        const timerMs = get().timerMs
        later(() => {
          if (get().phase === 'call') resolveTimeout()
        }, timerMs)
      }, scenario.callOpensAt)
    }, TIMING.setupMs)
  }

  function finishScenario(
    chosen: DefensiveCall | null,
    timedOut: boolean,
    reactionMs: number
  ) {
    const { scenarios, scenarioIndex, streak, timerMs, score, results } = get()
    const scenario = scenarios[scenarioIndex]
    const outcome = scoreCall(
      chosen,
      scenario,
      reactionMs,
      timerMs,
      streak
    )
    const result = buildScenarioResult(
      scenario,
      scenarioIndex,
      chosen,
      reactionMs,
      timedOut,
      outcome.points
    )
    const newStreak = outcome.correct ? streak + 1 : 0

    set({
      phase: timedOut
        ? 'resolved-timeout'
        : outcome.correct
          ? 'resolved-correct'
          : 'resolved-wrong',
      score: score + outcome.points,
      streak: newStreak,
      results: [...results, result],
      callOpenedAt: 0,
      lastOutcome: {
        correct: outcome.correct,
        timedOut,
        points: outcome.points,
        speedBonus: outcome.speedBonus,
        multiplier: outcome.multiplier,
        chosen,
        correctCall: scenario.correctCalls[0],
        explanation: scenario.explanation,
      },
    })

    later(() => {
      const { scenarioIndex: idx, scenarios: scns } = get()
      if (idx + 1 < scns.length) {
        // Back to the READY gate — Mason controls the pace between plays.
        prepareScenario(idx + 1)
      } else {
        finishLevel()
      }
    }, TIMING.resolutionHoldMs)
  }

  function resolveTimeout() {
    finishScenario(null, true, get().timerMs)
  }

  function finishLevel() {
    clearTimers()
    const { level, results } = get()
    const lvl = level ?? 1
    const levelResult = buildLevelResult(lvl, results)
    const { isHighScore } = useLeaderboard.getState().recordLevel(levelResult)
    set({
      phase: 'setup',
      screen: 'breakdown',
      levelResult,
      isNewHighScore: isHighScore,
    })
  }

  return {
    screen: 'menu',
    level: null,
    scenarios: [],
    scenarioIndex: 0,
    phase: 'setup',
    positions: [],
    ball: { x: 50, y: 60, inAir: false },
    score: 0,
    streak: 0,
    timerMs: 4000,
    callOpenedAt: 0,
    results: [],
    lastOutcome: null,
    levelResult: null,
    isNewHighScore: false,

    navigate: (screen) => {
      clearTimers()
      set({ screen })
    },

    startLevel: (level) => {
      clearTimers()
      const meta = LEVELS.find((l) => l.level === level)
      const scenarios = scenariosForLevel(level)
      set({
        screen: 'playing',
        level,
        scenarios,
        scenarioIndex: 0,
        score: 0,
        streak: 0,
        results: [],
        lastOutcome: null,
        levelResult: null,
        isNewHighScore: false,
        timerMs: (meta?.timerSeconds ?? 4) * 1000,
      })
      prepareScenario(0)
    },

    beginScenario: () => {
      if (get().phase !== 'ready') return
      runScenario(get().scenarioIndex)
    },

    makeCall: (call) => {
      const { phase, callOpenedAt } = get()
      if (phase !== 'call' || callOpenedAt === 0) return
      const reactionMs = Date.now() - callOpenedAt
      finishScenario(call, false, reactionMs)
    },

    abortToMenu: () => {
      clearTimers()
      set({ screen: 'menu', phase: 'setup' })
    },
  }
})
