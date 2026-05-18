import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 2 — "Know Your Role": adds HOT and TWO.
 * Player controls D1, guarding A1.
 * Ball one pass away (player is the next slide) -> HOT.
 * Ball two passes away (help side) -> TWO. Plus BALL / HOLD / CHECK.
 */
export const level2: Scenario[] = [
  {
    id: 'L2-1',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    actions: [
      { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.M2, delay: 200, duration: 700 },
      { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
    ],
    correctCalls: ['HOT'],
    callOpensAt: 1200,
    setupHint: 'Ball just one pass away from your man.',
    explanation:
      'The ball is one pass from your man and you are the nearest help. The call is HOT!',
    tutorial:
      'When the ball is ONE pass away and you are the next defender to slide, call HOT!',
  },
  {
    id: 'L2-2',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A3, delay: 200, duration: 900 },
      { type: 'catch', playerIndex: O.A3, delay: 1100, duration: 100 },
    ],
    correctCalls: ['TWO'],
    callOpensAt: 1400,
    setupHint: 'Ball swung to the far side.',
    explanation:
      'The ball is two passes away from your man — you are help-side. The call is TWO!',
    tutorial:
      'When the ball is TWO passes away, you are deep help. Call TWO!',
  },
  {
    id: 'L2-3',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1350,
    setupHint: 'Ball coming to your man.',
    explanation: 'Your man has the ball and is a threat. The call is BALL!',
  },
  {
    id: 'L2-4',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    actions: [
      { type: 'pass', playerIndex: O.A3, toPlayerIndex: O.A2, delay: 300, duration: 900 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 800,
    setupHint: 'Ball is being moved on the far side.',
    explanation: 'The ball is in the air. The call is CHECK!',
  },
  {
    id: 'L2-5',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    actions: [
      { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.A3, delay: 200, duration: 800 },
      { type: 'catch', playerIndex: O.A3, delay: 1000, duration: 100 },
    ],
    correctCalls: ['TWO'],
    callOpensAt: 1300,
    setupHint: 'Ball settled on the opposite side.',
    explanation:
      'The ball is far away from your man on the help side. The call is TWO!',
  },
  {
    id: 'L2-6',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    actions: [
      { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.M1, delay: 200, duration: 900 },
      { type: 'catch', playerIndex: O.M1, delay: 1100, duration: 100 },
    ],
    correctCalls: ['HOT'],
    callOpensAt: 1400,
    setupHint: 'Ball moving up to the wing next to your man.',
    explanation:
      'The ball is now one pass from your man — you are the next slide. The call is HOT!',
  },
  {
    id: 'L2-7',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 16, y: 95 }, delay: 200, duration: 700 },
    ],
    correctCalls: ['HOLD'],
    callOpensAt: 1050,
    setupHint: 'Your man has it but is turning away.',
    explanation: 'Your man has the ball but is not a threat. The call is HOLD!',
  },
  {
    id: 'L2-8',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    actions: [
      { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.M2, delay: 200, duration: 700 },
      { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
    ],
    correctCalls: ['TWO'],
    callOpensAt: 1200,
    setupHint: 'Ball up top, two away from your man.',
    explanation:
      'The ball is two passes away at the top — help-side. The call is TWO!',
  },
  {
    id: 'L2-9',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 700 },
      { type: 'catch', playerIndex: O.M1, delay: 900, duration: 100 },
    ],
    correctCalls: ['HOT'],
    callOpensAt: 1200,
    setupHint: 'Ball swung to the wing right next to your man.',
    explanation:
      'One pass from your man and you are the closest help. The call is HOT!',
  },
  {
    id: 'L2-10',
    level: 2,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    actions: [
      { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.A1, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1350,
    setupHint: 'Ball coming down to your man on the wing.',
    explanation: 'Your man caught it and is a threat. The call is BALL!',
  },
]
