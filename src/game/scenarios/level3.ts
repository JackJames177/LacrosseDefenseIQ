import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 3 — "The Slide": adds SLIDE.
 * Player controls D1, guarding A1.
 * A teammate gets beat on a dodge -> the player must SLIDE to help.
 * Plus HOT / TWO / BALL / CHECK.
 */
export const level3: Scenario[] = [
  {
    id: 'L3-1',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'dodge', playerIndex: O.M2, team: 'offense', target: { x: 50, y: 92 }, delay: 200, duration: 1200 },
      { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 52, y: 70 }, delay: 400, duration: 1100 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1300,
    setupHint: 'A teammate is getting beat toward the goal.',
    explanation:
      'Your teammate got beat and the dodger is driving to the crease — you must help. The call is SLIDE!',
    tutorial:
      'When a teammate gets beat on a dodge and the ball drives to the goal, the closest helper yells SLIDE and goes to stop it!',
  },
  {
    id: 'L3-2',
    level: 3,
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
  },
  {
    id: 'L3-3',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    actions: [
      { type: 'dodge', playerIndex: O.A3, team: 'offense', target: { x: 56, y: 94 }, delay: 200, duration: 1300 },
      { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 76, y: 80 }, delay: 400, duration: 1200 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1400,
    setupHint: 'A teammate got beat on the wing.',
    explanation:
      'The dodger blew past your teammate and is attacking the crease — help now. The call is SLIDE!',
  },
  {
    id: 'L3-4',
    level: 3,
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
  },
  {
    id: 'L3-5',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    actions: [
      { type: 'dodge', playerIndex: O.M3, team: 'offense', target: { x: 58, y: 90 }, delay: 200, duration: 1200 },
      { type: 'move', playerIndex: D.D6, team: 'defense', target: { x: 74, y: 60 }, delay: 400, duration: 1100 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1300,
    setupHint: 'Top dodger is beating his man to the middle.',
    explanation:
      'Your teammate is trailing and the dodger has a lane to the goal — go help. The call is SLIDE!',
  },
  {
    id: 'L3-6',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    actions: [
      { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.M3, delay: 200, duration: 800 },
      { type: 'catch', playerIndex: O.M3, delay: 1000, duration: 100 },
    ],
    correctCalls: ['TWO'],
    callOpensAt: 1300,
    setupHint: 'Ball settled on the opposite side.',
    explanation:
      'The ball is far from your man on the help side. The call is TWO!',
  },
  {
    id: 'L3-7',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    actions: [
      { type: 'dodge', playerIndex: O.A2, team: 'offense', target: { x: 50, y: 96 }, delay: 200, duration: 1300 },
      { type: 'move', playerIndex: D.D2, team: 'defense', target: { x: 50, y: 118 }, delay: 400, duration: 1200 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1400,
    setupHint: 'Dodge coming from behind the goal.',
    explanation:
      'Your teammate got beat from X and the dodger is at the crease — help. The call is SLIDE!',
  },
  {
    id: 'L3-8',
    level: 3,
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
  },
  {
    id: 'L3-9',
    level: 3,
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
    setupHint: 'Ball swung to the middle next to your man.',
    explanation:
      'One pass from your man and you are the closest help. The call is HOT!',
  },
  {
    id: 'L3-10',
    level: 3,
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
    explanation: 'Your man caught the ball and is a threat. The call is BALL!',
  },
]
