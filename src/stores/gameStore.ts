import { create } from 'zustand'
import type {
  CallAttempt,
  DefensiveCall,
  GameAction,
  GamePhase,
  LevelResult,
  PlayerPosition,
  Scenario,
  ScenarioResult,
} from '../game/types'
import { FIELD, LEVELS, TIMING } from '../game/constants'
import {
  ballHolderAtStart,
  buildLevelResult,
  buildScenarioResult,
  makeCallAttempt,
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

export interface PickArrow {
  x: number
  y: number
  dir: 'left' | 'right'
}

export interface Outcome {
  correct: boolean
  timedOut: boolean
  points: number
  speedBonus: boolean
  pickBonus: boolean
  multiplier: number
  chosen: DefensiveCall | null
  correctCall: DefensiveCall
  explanation: string
  hasMoreBeats: boolean
}

interface GameState {
  screen: Screen
  level: number | null
  scenarios: Scenario[]
  scenarioIndex: number
  beatIndex: number
  phase: GamePhase
  positions: PlayerPosition[]
  ball: BallState
  pickArrow: PickArrow | null
  breakActive: boolean
  score: number
  streak: number
  timerMs: number
  /** epoch ms when the call window opened (0 if not open) */
  callOpenedAt: number
  /** calls collected for the in-progress scenario (multi-beat possessions) */
  scenarioCalls: CallAttempt[]
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

const offenseAbs = (i: number) => i
const defenseAbs = (i: number) => 6 + i

const GOAL = { x: FIELD.creaseCenter.x, y: FIELD.goalLineY }

export const useGame = create<GameState>((set, get) => {
  /** Apply one action to the live positions / ball (CSS transitions animate). */
  function applyAction(a: GameAction) {
    const team = a.team ?? 'offense'
    const abs =
      team === 'defense' ? defenseAbs(a.playerIndex) : offenseAbs(a.playerIndex)
    let positions = get().positions
    let ball = get().ball
    let pickArrow = get().pickArrow
    let breakActive = get().breakActive

    const move = (toX: number, toY: number) => {
      positions = positions.slice()
      positions[abs] = { ...positions[abs], x: toX, y: toY }
    }

    if (a.type === 'pass' && a.toPlayerIndex != null) {
      const to = positions[offenseAbs(a.toPlayerIndex)]
      ball = { x: to.x, y: to.y, inAir: true }
      later(() => set((s) => ({ ball: { ...s.ball, inAir: false } })), a.duration)
    } else if (a.type === 'shot') {
      ball = { x: GOAL.x, y: GOAL.y - 2, inAir: true }
    } else if (a.type === 'save') {
      ball = { x: GOAL.x, y: GOAL.y - 1, inAir: false }
      breakActive = true
    } else if (a.type === 'ground_ball') {
      const t = a.target ?? { x: ball.x, y: ball.y }
      ball = { x: t.x, y: t.y, inAir: false }
      breakActive = true
    } else if (a.type === 'pick') {
      if (a.target) move(a.target.x, a.target.y)
      if (a.targetDefenderIndex != null) {
        const d = get().positions[defenseAbs(a.targetDefenderIndex)]
        pickArrow = {
          x: d.x,
          y: d.y,
          dir: a.pickDirection ?? 'left',
        }
      }
    } else if (a.target) {
      // dodge / cut / move / catch
      const hadBall =
        team === 'offense' &&
        Math.abs(ball.x - positions[abs].x) < 0.6 &&
        Math.abs(ball.y - positions[abs].y) < 0.6
      move(a.target.x, a.target.y)
      if (hadBall) ball = { x: a.target.x, y: a.target.y, inAir: false }
    }

    set({ positions, ball, pickArrow, breakActive })
  }

  /** READY gate — show the formation static, no timer, no input. */
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
    const start = scenario.ballOverride ?? {
      x: initial[offenseAbs(holderIdx)].x,
      y: initial[offenseAbs(holderIdx)].y,
    }
    set({
      scenarioIndex: index,
      beatIndex: 0,
      phase: 'ready',
      positions: initial,
      ball: { x: start.x, y: start.y, inAir: false },
      pickArrow: null,
      breakActive: false,
      scenarioCalls: [],
      lastOutcome: null,
      callOpenedAt: 0,
    })
  }

  function startScenario() {
    clearTimers()
    const { scenarios, scenarioIndex } = get()
    const scenario = scenarios[scenarioIndex]
    if (!scenario) return
    const initial = scenario.initialPositions.map((p) => ({ ...p }))
    const holderIdx = ballHolderAtStart(scenario)
    const start = scenario.ballOverride ?? {
      x: initial[offenseAbs(holderIdx)].x,
      y: initial[offenseAbs(holderIdx)].y,
    }
    set({
      beatIndex: 0,
      phase: 'setup',
      positions: initial,
      ball: { x: start.x, y: start.y, inAir: false },
      pickArrow: null,
      breakActive: false,
      scenarioCalls: [],
      lastOutcome: null,
      callOpenedAt: 0,
    })
    later(() => runBeat(0), TIMING.setupMs)
  }

  /** Play one beat: animate its actions, then open the call window. */
  function runBeat(b: number) {
    const { scenarios, scenarioIndex } = get()
    const scenario = scenarios[scenarioIndex]
    const beat = scenario?.beats[b]
    if (!beat) return

    set({ beatIndex: b, phase: 'action', pickArrow: null, callOpenedAt: 0 })

    for (const a of beat.actions) {
      later(() => applyAction(a), a.delay)
    }

    later(() => {
      set({ phase: 'call', callOpenedAt: Date.now() })
      const timerMs = get().timerMs
      later(() => {
        if (get().phase === 'call') resolveBeat(null, true, timerMs)
      }, timerMs)
    }, beat.callOpensAt)
  }

  function resolveBeat(
    chosen: DefensiveCall | null,
    timedOut: boolean,
    reactionMs: number
  ) {
    const {
      scenarios,
      scenarioIndex,
      beatIndex,
      streak,
      timerMs,
      score,
      scenarioCalls,
    } = get()
    const scenario = scenarios[scenarioIndex]
    const beat = scenario.beats[beatIndex]
    const outcome = scoreCall(chosen, beat, reactionMs, timerMs, streak)
    const attempt = makeCallAttempt(
      beat,
      chosen,
      reactionMs,
      timedOut,
      outcome.points
    )
    const hasMoreBeats = beatIndex + 1 < scenario.beats.length

    set({
      phase: timedOut
        ? 'resolved-timeout'
        : outcome.correct
          ? 'resolved-correct'
          : 'resolved-wrong',
      score: score + outcome.points,
      streak: outcome.correct ? streak + 1 : 0,
      scenarioCalls: [...scenarioCalls, attempt],
      callOpenedAt: 0,
      lastOutcome: {
        correct: outcome.correct,
        timedOut,
        points: outcome.points,
        speedBonus: outcome.speedBonus,
        pickBonus: outcome.pickBonus,
        multiplier: outcome.multiplier,
        chosen,
        correctCall: beat.correctCalls[0],
        explanation: beat.explanation,
        hasMoreBeats,
      },
    })

    later(() => {
      if (hasMoreBeats) {
        runBeat(beatIndex + 1)
      } else {
        finishScenario()
      }
    }, TIMING.resolutionHoldMs)
  }

  function finishScenario() {
    const { scenarios, scenarioIndex, scenarioCalls, results } = get()
    const scenario = scenarios[scenarioIndex]
    const result = buildScenarioResult(
      scenario,
      scenarioIndex,
      scenarioCalls
    )
    set({ results: [...results, result] })
    if (scenarioIndex + 1 < scenarios.length) {
      prepareScenario(scenarioIndex + 1)
    } else {
      finishLevel()
    }
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
    beatIndex: 0,
    phase: 'setup',
    positions: [],
    ball: { x: 50, y: 60, inAir: false },
    pickArrow: null,
    breakActive: false,
    score: 0,
    streak: 0,
    timerMs: 4000,
    callOpenedAt: 0,
    scenarioCalls: [],
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
      startScenario()
    },

    makeCall: (call) => {
      const { phase, callOpenedAt } = get()
      if (phase !== 'call' || callOpenedAt === 0) return
      resolveBeat(call, false, Date.now() - callOpenedAt)
    },

    abortToMenu: () => {
      clearTimers()
      set({ screen: 'menu', phase: 'setup' })
    },
  }
})
