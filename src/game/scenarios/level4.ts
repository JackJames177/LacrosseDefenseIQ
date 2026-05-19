import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 4 — "Eyes Everywhere": adds CUTTER and TOPSIDE on top of
 * BALL/HOLD/BREAK/HOT/TWO/SLIDE/FIRE. Player controls D1, guarding A1.
 * Watch off-ball cutters through the crease and steer carriers away
 * from the middle. Two scenarios are multi-beat.
 */
export const level4: Scenario[] = [
  {
    id: 'L4-1',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'Watch the far attacker — he is darting through the middle.',
    tutorial:
      'When an attacker you are NOT guarding runs through the crease in front of the goal, yell CUTTER so help can pick him up!',
    beats: [
      {
        actions: [
          { type: 'cut', playerIndex: O.A3, team: 'offense', target: { x: 48, y: 98 }, delay: 300, duration: 1100 },
        ],
        callOpensAt: 1400,
        correctCalls: ['CUTTER'],
        explanation: 'An off-ball attacker is slicing through the crease for a feed. The call is CUTTER!',
      },
    ],
  },
  {
    id: 'L4-2',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'The ball is behind the goal — keep him out of the middle.',
    tutorial:
      'When a teammate guards a carrier behind the goal, tell him TOPSIDE so the carrier is forced away from the middle of the field!',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A2, team: 'offense', target: { x: 50, y: 110 }, delay: 300, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TOPSIDE'],
        explanation: 'The carrier behind the cage is driving toward the middle — steer him out. The call is TOPSIDE!',
      },
    ],
  },
  {
    id: 'L4-3',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Eyes off-ball — someone is cutting.',
    beats: [
      {
        actions: [
          { type: 'cut', playerIndex: O.A3, team: 'offense', target: { x: 49, y: 99 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1300,
        correctCalls: ['CUTTER'],
        explanation: 'An off-ball attacker is cutting across the crease for a quick feed. The call is CUTTER!',
      },
    ],
  },
  {
    id: 'L4-4',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'Carrier behind goal working to the middle.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A3, team: 'offense', target: { x: 52, y: 112 }, delay: 300, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TOPSIDE'],
        explanation: 'He is rolling toward the middle from X — force him back. The call is TOPSIDE!',
      },
    ],
  },
  {
    id: 'L4-5',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'Carrier behind the cage — read his angle.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A2, team: 'offense', target: { x: 84, y: 96 }, delay: 300, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['HOLD'],
        explanation: 'He is driving up the alley AWAY from the middle — no help needed yet. The call is HOLD!',
      },
    ],
  },
  {
    id: 'L4-6',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'A teammate is about to get beaten — be ready.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.M2, team: 'offense', target: { x: 50, y: 92 }, delay: 300, duration: 1200 },
          { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 50, y: 88 }, delay: 500, duration: 1100 },
        ],
        callOpensAt: 1400,
        correctCalls: ['SLIDE'],
        explanation: 'A non-A1 dodger beat his defender to the middle — you must help. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L4-7',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man is going hard at the cage.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 48, y: 96 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 46, y: 92 }, delay: 500, duration: 1000 },
        ],
        callOpensAt: 1300,
        correctCalls: ['FIRE'],
        explanation: 'Your man beat you and is loose at the goal — you need a double. The call is FIRE!',
      },
    ],
  },
  {
    id: 'L4-8',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'Ball one pass from your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['HOT'],
        explanation: 'The ball is one pass from your man and you are the next slide. The call is HOT!',
      },
    ],
  },
  {
    id: 'L4-9',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball swung far away.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A3, delay: 200, duration: 900 },
          { type: 'catch', playerIndex: O.A3, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1400,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man — you are help-side. The call is TWO!',
      },
    ],
  },
  {
    id: 'L4-10',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball coming to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
          { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BALL'],
        explanation: 'Your man caught it and is squared to the cage. The call is BALL!',
      },
    ],
  },
  {
    id: 'L4-11',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Help on the dodge first — then keep your eyes moving.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.M2, team: 'offense', target: { x: 50, y: 94 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 50, y: 90 }, delay: 500, duration: 1000 },
        ],
        callOpensAt: 1300,
        correctCalls: ['SLIDE'],
        explanation: 'The middie beat his man to the cage — you are the first slide. The call is SLIDE!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A3, team: 'offense', target: { x: 48, y: 98 }, delay: 200, duration: 1000 },
        ],
        callOpensAt: 1100,
        correctCalls: ['CUTTER'],
        explanation: 'As you slid, an off-ball attacker snuck in behind you through the crease. The call is CUTTER!',
      },
    ],
  },
  {
    id: 'L4-12',
    level: 4,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man attacks — then watch what happens next.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, team: 'offense', target: { x: 48, y: 95 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 46, y: 91 }, delay: 500, duration: 1000 },
        ],
        callOpensAt: 1300,
        correctCalls: ['FIRE'],
        explanation: 'Your man blew by you toward the goal — get a hot double. The call is FIRE!',
      },
      {
        actions: [
          { type: 'shot', playerIndex: O.A1, delay: 300, duration: 600 },
          { type: 'save', playerIndex: 0, delay: 950, duration: 300 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        explanation: 'The goalie smothered the shot — the play is dead. The call is BREAK!',
      },
    ],
  },
]
