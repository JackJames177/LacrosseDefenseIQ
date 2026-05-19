import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 2 — "Know Your Role": adds HOT and TWO (BALL/HOLD/BREAK stay).
 * Player controls D1, guarding A1. Timer 5s. Single-beat scenarios.
 * Ball one pass away -> HOT. Two+ passes away -> TWO.
 */
export const level2: Scenario[] = [
  {
    id: 'L2-1',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'Ball one pass from your man.',
    tutorial:
      'When the ball is ONE pass away and you are the next defender to slide, call HOT!',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['HOT'],
        explanation: 'The ball is one pass from your man and you are the nearest help. The call is HOT!',
      },
    ],
  },
  {
    id: 'L2-2',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball swung to the far side.',
    tutorial: 'When the ball is TWO passes away, you are deep help. Call TWO!',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A3, delay: 200, duration: 900 },
          { type: 'catch', playerIndex: O.A3, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1400,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes away from your man — you are help-side. The call is TWO!',
      },
    ],
  },
  {
    id: 'L2-3',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    setupHint: 'Ball coming to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
          { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BALL'],
        explanation: 'Your man has the ball and is a threat. The call is BALL!',
      },
    ],
  },
  {
    id: 'L2-4',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man has it but is turning away.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 10, y: 78 }, delay: 200, duration: 700 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOLD'],
        explanation: 'Your man has the ball but is not a threat. The call is HOLD!',
      },
    ],
  },
  {
    id: 'L2-5',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'Ball settled on the opposite side.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.A3, delay: 200, duration: 800 },
          { type: 'catch', playerIndex: O.A3, delay: 1000, duration: 100 },
        ],
        callOpensAt: 1300,
        correctCalls: ['TWO'],
        explanation: 'The ball is far from your man on the help side. The call is TWO!',
      },
    ],
  },
  {
    id: 'L2-6',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'Ball moving up to the wing next to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.M1, delay: 200, duration: 900 },
          { type: 'catch', playerIndex: O.M1, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1400,
        correctCalls: ['HOT'],
        explanation: 'The ball is now one pass from your man — you are the next slide. The call is HOT!',
      },
    ],
  },
  {
    id: 'L2-7',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    setupHint: 'Ball up top, two away.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes away at the top — help-side. The call is TWO!',
      },
    ],
  },
  {
    id: 'L2-8',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'Ball coming down to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.A1, delay: 300, duration: 800 },
          { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BALL'],
        explanation: 'Your man caught it and is a threat. The call is BALL!',
      },
    ],
  },
  {
    id: 'L2-9',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball swung to the wing next to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M1, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['HOT'],
        explanation: 'One pass from your man and you are the closest help. The call is HOT!',
      },
    ],
  },
  {
    id: 'L2-10',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'Shot from the wing...',
    beats: [
      {
        actions: [
          { type: 'shot', playerIndex: O.A3, delay: 300, duration: 600 },
          { type: 'save', playerIndex: 0, delay: 950, duration: 300 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        explanation: 'The goalie made the save. The call is BREAK to start the clear!',
      },
    ],
  },
]
