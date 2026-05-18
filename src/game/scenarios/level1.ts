import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 1 — "Ball Awareness": only BALL, HOLD, CHECK.
 * Player controls D1, guarding A1 (offense index 0).
 * Slow timer (4s). Tutorials on the first three.
 */
export const level1: Scenario[] = [
  {
    id: 'L1-1',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1350,
    setupHint: 'Watch the ball — it is coming to your man.',
    explanation: 'Your man caught the ball and is a threat. The call is BALL!',
    tutorial:
      'When YOUR man catches the ball, you yell BALL! so everyone knows you have the ball.',
  },
  {
    id: 'L1-2',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 16, y: 94 }, delay: 200, duration: 700 },
    ],
    correctCalls: ['HOLD'],
    callOpensAt: 1050,
    setupHint: 'Your man has the ball but is turning away.',
    explanation:
      'Your man has the ball but turned his back to the goal — not a threat. The call is HOLD!',
    tutorial:
      'If your man has the ball but is NOT a threat (back to goal, cradling), you call HOLD!',
  },
  {
    id: 'L1-3',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.A1, toPlayerIndex: O.A3, delay: 300, duration: 1000 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 800,
    setupHint: 'The ball is being passed across.',
    explanation: 'The ball is in the air on a pass. The call is CHECK!',
    tutorial:
      'Any time the ball is in the air or loose on the ground, the whole defense yells CHECK!',
  },
  {
    id: 'L1-4',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.M2, delay: 200, duration: 600 },
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 1000, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1800, duration: 100 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 2050,
    setupHint: 'Ball is moving down the field toward your man.',
    explanation: 'Your man received the ball and faces the goal. The call is BALL!',
  },
  {
    id: 'L1-5',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    actions: [
      { type: 'pass', playerIndex: O.A3, toPlayerIndex: O.A2, delay: 300, duration: 900 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 750,
    setupHint: 'Ball is on the far side.',
    explanation: 'The ball is in the air between attackers. The call is CHECK!',
  },
  {
    id: 'L1-6',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.A1, delay: 300, duration: 900 },
      { type: 'catch', playerIndex: O.A1, delay: 1200, duration: 100 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1450,
    setupHint: 'Skip pass coming across the field.',
    explanation: 'Your man caught the skip pass and is dangerous. The call is BALL!',
  },
  {
    id: 'L1-7',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 30, y: 96 }, delay: 200, duration: 700 },
    ],
    correctCalls: ['HOLD'],
    callOpensAt: 1050,
    setupHint: 'Your man has the ball and is backing it out.',
    explanation:
      'Your man is backing the ball out to reset — not threatening. The call is HOLD!',
  },
  {
    id: 'L1-8',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    actions: [
      { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.A1, delay: 300, duration: 1000 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 850,
    setupHint: 'Pass coming from behind the goal to your man.',
    explanation:
      'The ball is still in the air — before it lands the call is CHECK!',
  },
  {
    id: 'L1-9',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballOverride: { x: 42, y: 70 },
    actions: [
      { type: 'move', playerIndex: O.M2, team: 'offense', target: { x: 44, y: 66 }, delay: 200, duration: 800 },
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 38, y: 74 }, delay: 200, duration: 800 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 900,
    setupHint: 'The ball is loose on the ground!',
    explanation: 'A loose ground ball — everyone calls CHECK!',
  },
  {
    id: 'L1-10',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 26, y: 78 }, delay: 1250, duration: 500 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1400,
    setupHint: 'Your man is getting the ball and squaring up.',
    explanation:
      'Your man has the ball and is squared to the goal — a threat. The call is BALL!',
  },
]
