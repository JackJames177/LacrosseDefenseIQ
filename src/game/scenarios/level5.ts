import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 5 — "Eyes Everywhere": ALL 9 calls active.
 * BALL, HOLD, CHECK, HOT, TWO, SLIDE, FIRE, CUTTER, TOPSIDE.
 * New focus: CUTTER (off-ball man cuts through the crease) and
 * TOPSIDE (direct a teammate to force the carrier off the middle).
 * Player controls D1, guarding A1.
 */
export const level5: Scenario[] = [
  {
    id: 'L5-1',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    actions: [
      { type: 'cut', playerIndex: O.M2, team: 'offense', target: { x: 48, y: 98 }, delay: 300, duration: 1100 },
    ],
    correctCalls: ['CUTTER'],
    callOpensAt: 1100,
    setupHint: 'Watch the middle — someone is slashing through.',
    explanation:
      'An off-ball attacker cut right through the crease. The call is CUTTER!',
    tutorial:
      'When an offensive player without the ball runs through the crease, you yell CUTTER! so a defender picks him up.',
  },
  {
    id: 'L5-2',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    actions: [
      { type: 'move', playerIndex: O.A3, team: 'offense', target: { x: 70, y: 80 }, delay: 200, duration: 600 },
      { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.A3, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A3, delay: 1100, duration: 100 },
      { type: 'move', playerIndex: O.A3, team: 'offense', target: { x: 64, y: 76 }, delay: 1250, duration: 600 },
    ],
    correctCalls: ['TOPSIDE'],
    callOpensAt: 1400,
    setupHint: 'A teammate is on-ball up the wing — help him.',
    explanation:
      'Your teammate is on the ball and the carrier is driving the middle — tell him to force it away. The call is TOPSIDE!',
    tutorial:
      'When a teammate is guarding the ball, you call TOPSIDE! to tell him to push the carrier away from the middle of the field.',
  },
  {
    id: 'L5-3',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    actions: [
      { type: 'cut', playerIndex: O.M1, team: 'offense', target: { x: 52, y: 99 }, delay: 300, duration: 1000 },
    ],
    correctCalls: ['CUTTER'],
    callOpensAt: 1050,
    setupHint: 'A middie is diving toward the goal.',
    explanation:
      'An off-ball cutter sliced through the crease looking for a feed. The call is CUTTER!',
  },
  {
    id: 'L5-4',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'cut', playerIndex: O.A2, team: 'offense', target: { x: 47, y: 97 }, delay: 300, duration: 1200 },
    ],
    correctCalls: ['CUTTER'],
    callOpensAt: 1300,
    setupHint: 'X attacker is cutting off-ball.',
    explanation:
      'The attacker from behind cut hard through the crease. The call is CUTTER!',
  },
  {
    id: 'L5-5',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    actions: [
      { type: 'move', playerIndex: O.M1, team: 'offense', target: { x: 34, y: 52 }, delay: 200, duration: 600 },
      { type: 'move', playerIndex: O.M1, team: 'offense', target: { x: 42, y: 56 }, delay: 900, duration: 600 },
    ],
    correctCalls: ['TOPSIDE'],
    callOpensAt: 1300,
    setupHint: 'Teammate is on-ball at the top — direct him.',
    explanation:
      'A teammate has the ball carrier up top driving to the middle — push him out. The call is TOPSIDE!',
  },
  {
    id: 'L5-6',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    actions: [
      { type: 'move', playerIndex: O.M3, team: 'offense', target: { x: 66, y: 50 }, delay: 200, duration: 700 },
      { type: 'move', playerIndex: O.M3, team: 'offense', target: { x: 58, y: 54 }, delay: 1000, duration: 600 },
    ],
    correctCalls: ['TOPSIDE'],
    callOpensAt: 1500,
    setupHint: 'Far teammate on-ball cutting inside.',
    explanation:
      'Your teammate is on the ball and the carrier is rolling to the middle — call him off it. The call is TOPSIDE!',
  },
  {
    id: 'L5-7',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 40, y: 96 }, delay: 200, duration: 1100 },
      { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 36, y: 90 }, delay: 350, duration: 1100 },
    ],
    correctCalls: ['FIRE'],
    callOpensAt: 1300,
    setupHint: 'Your man is dodging hard at you.',
    explanation:
      'Your man beat you on the dodge and needs a slide now. The call is FIRE!',
  },
  {
    id: 'L5-8',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    actions: [
      { type: 'dodge', playerIndex: O.A3, team: 'offense', target: { x: 60, y: 96 }, delay: 200, duration: 1100 },
      { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 66, y: 90 }, delay: 350, duration: 1100 },
    ],
    correctCalls: ['SLIDE'],
    callOpensAt: 1350,
    setupHint: 'Another attacker is beating his man.',
    explanation:
      'A different attacker beat his defender and is driving the goal — help is needed. The call is SLIDE!',
  },
  {
    id: 'L5-9',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 700 },
      { type: 'catch', playerIndex: O.M1, delay: 900, duration: 100 },
    ],
    correctCalls: ['HOT'],
    callOpensAt: 1150,
    setupHint: 'Ball one pass from your man.',
    explanation:
      'The ball is one pass away and you are the next slide. The call is HOT!',
  },
  {
    id: 'L5-10',
    level: 5,
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
    id: 'L5-11',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
      { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
      { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 28, y: 80 }, delay: 1250, duration: 500 },
    ],
    correctCalls: ['BALL'],
    callOpensAt: 1350,
    setupHint: 'Ball coming to your man.',
    explanation:
      'Your man caught it and squared to the goal — a threat. The call is BALL!',
  },
  {
    id: 'L5-12',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    actions: [
      { type: 'pass', playerIndex: O.A1, toPlayerIndex: O.A3, delay: 300, duration: 900 },
    ],
    correctCalls: ['CHECK'],
    callOpensAt: 800,
    setupHint: 'The ball is in the air across the field.',
    explanation: 'The ball is in flight on a pass. The call is CHECK!',
  },
]
