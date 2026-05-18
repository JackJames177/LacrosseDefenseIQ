import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 4 — "Under Pressure": adds FIRE.
 * Player controls D1, guarding A1.
 * FIRE = your OWN man is dodging hard at you and beating you — you need
 * early help NOW. Plus SLIDE, HOT, TWO, BALL, HOLD, CHECK.
 */
export const level4: Scenario[] = [
  {
    id: 'L4-1',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 44, y: 96 }, delay: 200, duration: 1200 },
      { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 34, y: 88 }, delay: 350, duration: 1200 },
    ],
    correctCalls: ['FIRE'],
    callOpensAt: 1500,
    setupHint: 'Your man is dodging hard right at you.',
    explanation:
      'Your man beat you on the dodge and is driving to the goal — you need help right now. The call is FIRE!',
    tutorial:
      'When YOUR man dodges hard and gets a step past you toward the goal, yell FIRE! so a teammate slides early to help.',
  },
  {
    id: 'L4-2',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 200, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1000, duration: 100 },
      { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 46, y: 97 }, delay: 1150, duration: 1100 },
      { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 35, y: 89 }, delay: 1300, duration: 1100 },
    ],
    correctCalls: ['FIRE'],
    callOpensAt: 2050,
    setupHint: 'Your man caught it and is taking you to the rack.',
    explanation:
      'Your man received the ball, dodged, and blew past you to the goal. The call is FIRE!',
  },
  {
    id: 'L4-3',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'dodge', playerIndex: O.M2, team: 'offense', target: { x: 50, y: 80 }, delay: 200, duration: 1100 },
      { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 50, y: 60 }, delay: 350, duration: 1100 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1400,
    setupHint: 'M2 is dodging down the middle past his man.',
    explanation:
      'A different attacker beat his defender — a teammate must slide to the ball. The call is SLIDE!',
  },
  {
    id: 'L4-4',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    actions: [
      { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.A1, delay: 200, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1000, duration: 100 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1300,
    setupHint: 'Ball coming down to your man.',
    explanation: 'Your man caught it and is squared to the goal — a threat. The call is BALL!',
  },
  {
    id: 'L4-5',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 42, y: 94 }, delay: 200, duration: 1300 },
      { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 33, y: 87 }, delay: 400, duration: 1300 },
    ],
    correctCalls: ['FIRE'],
    callOpensAt: 1600,
    setupHint: 'Your man is rolling back and beating you to the cage.',
    explanation:
      'Your man dodged and has a step on you toward the goal — call for help early. The call is FIRE!',
  },
  {
    id: 'L4-6',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    actions: [
      { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.M2, delay: 200, duration: 700 },
      { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
    ],
    correctCalls: ['HOT'],
    callOpensAt: 1200,
    setupHint: 'Ball swung to the middle, one pass from your man.',
    explanation:
      'The ball is one pass from your man and you are the next slide. The call is HOT!',
  },
  {
    id: 'L4-7',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    actions: [
      { type: 'dodge', playerIndex: O.A3, team: 'offense', target: { x: 60, y: 96 }, delay: 200, duration: 1100 },
      { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 70, y: 88 }, delay: 350, duration: 1100 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1400,
    setupHint: 'A3 is driving the back side and got past his man.',
    explanation:
      'A3 beat his defender to the goal — the defense must slide. The call is SLIDE!',
  },
  {
    id: 'L4-8',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 15, y: 94 }, delay: 200, duration: 700 },
    ],
    correctCalls: ['HOLD'],
    callOpensAt: 1050,
    setupHint: 'Your man has the ball but is backing it out.',
    explanation:
      'Your man has the ball but turned away from the goal — not a threat. The call is HOLD!',
  },
  {
    id: 'L4-9',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
      { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 45, y: 96 }, delay: 1250, duration: 1100 },
      { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 35, y: 88 }, delay: 1400, duration: 1100 },
    ],
    correctCalls: ['FIRE'],
    callOpensAt: 2150,
    setupHint: 'Your man caught it and is dodging hard at the goal.',
    explanation:
      'Your man got the ball, dodged, and beat you toward the cage. The call is FIRE!',
  },
  {
    id: 'L4-10',
    level: 4,
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
    setupHint: 'Ball swung all the way to the far side.',
    explanation:
      'The ball is two passes away from your man — you are help-side. The call is TWO!',
  },
  {
    id: 'L4-11',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.A1, toPlayerIndex: O.M3, delay: 300, duration: 900 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 800,
    setupHint: 'Your man is passing the ball away.',
    explanation: 'The ball is in the air on a pass. The call is CHECK!',
  },
  {
    id: 'L4-12',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 40, y: 97 }, delay: 200, duration: 1200 },
      { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 31, y: 90 }, delay: 350, duration: 1200 },
    ],
    correctCalls: ['FIRE'],
    callOpensAt: 1550,
    setupHint: 'Your man split-dodged and is gone to the goal.',
    explanation:
      'Your man beat you clean on the dodge and is attacking the cage — get help fast. The call is FIRE!',
  },
]
