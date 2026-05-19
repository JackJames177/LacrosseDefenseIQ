import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 3 — "The Slide": adds SLIDE and FIRE (BALL/HOLD/BREAK/HOT/TWO stay).
 * Player controls D1, guarding A1. New focus: SLIDE (help a beaten teammate)
 * and FIRE (your own man beats you to the cage). Two multi-beat scenarios.
 */
export const level3: Scenario[] = [
  {
    id: 'L3-1',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'A2 is driving hard at the cage past his man.',
    tutorial:
      'When a teammate gets beat and an attacker drives at the goal, sprint over to stop the ball — yell SLIDE!',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A2, target: { x: 50, y: 100 }, delay: 300, duration: 1200 },
          { type: 'move', playerIndex: D.D2, team: 'defense', target: { x: 50, y: 112 }, delay: 500, duration: 1100 },
        ],
        callOpensAt: 1500,
        correctCalls: ['SLIDE'],
        explanation: 'A2 beat D2 and is driving the cage — you must help. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L3-2',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your own man is dodging right at the goal.',
    tutorial:
      'When YOUR man beats you toward the cage, shout FIRE so the next defender slides to him!',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, target: { x: 50, y: 100 }, delay: 300, duration: 1200 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 30, y: 80 }, delay: 500, duration: 1100 },
        ],
        callOpensAt: 1500,
        correctCalls: ['FIRE'],
        explanation: 'Your man beat you and is attacking the cage. The call is FIRE!',
      },
    ],
  },
  {
    id: 'L3-3',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'A3 rips down the alley toward the crease.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A3, target: { x: 50, y: 100 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 70, y: 92 }, delay: 500, duration: 1000 },
        ],
        callOpensAt: 1400,
        correctCalls: ['SLIDE'],
        explanation: 'A3 turned the corner on D3 and is a threat. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L3-4',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'M2 splits the top and bursts to the goal.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.M2, target: { x: 50, y: 100 }, delay: 300, duration: 1300 },
          { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 50, y: 60 }, delay: 500, duration: 1200 },
        ],
        callOpensAt: 1600,
        correctCalls: ['SLIDE'],
        explanation: 'M2 blew by D5 down the middle — help now. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L3-5',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man takes you on toward the cage.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, target: { x: 48, y: 100 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 28, y: 84 }, delay: 500, duration: 1000 },
        ],
        callOpensAt: 1400,
        correctCalls: ['FIRE'],
        explanation: 'Your man got a step on you to the goal. The call is FIRE!',
      },
    ],
  },
  {
    id: 'L3-6',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball feeding down to X, right next to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A2, delay: 200, duration: 800 },
          { type: 'catch', playerIndex: O.A2, delay: 1000, duration: 100 },
        ],
        callOpensAt: 1300,
        correctCalls: ['HOT'],
        explanation:
          'The ball is one pass from your man at X and you are the closest help defender — the next slide. The call is HOT!',
      },
    ],
  },
  {
    id: 'L3-7',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A2,
    setupHint: 'Ball swung up next to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.A2, toPlayerIndex: O.M1, delay: 200, duration: 800 },
          { type: 'catch', playerIndex: O.M1, delay: 1000, duration: 100 },
        ],
        callOpensAt: 1300,
        correctCalls: ['HOT'],
        explanation: 'The ball is now one pass from your man. The call is HOT!',
      },
    ],
  },
  {
    id: 'L3-8',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    setupHint: 'Ball swung all the way to the far top.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man — help-side. The call is TWO!',
      },
    ],
  },
  {
    id: 'L3-9',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    setupHint: 'Ball coming to your man, then he attacks.',
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
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, target: { x: 50, y: 100 }, delay: 300, duration: 1200 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 30, y: 82 }, delay: 500, duration: 1100 },
        ],
        callOpensAt: 1500,
        correctCalls: ['FIRE'],
        explanation: 'Now your man dodged past you to the goal. The call is FIRE!',
      },
    ],
  },
  {
    id: 'L3-10',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man holds it, then a teammate gets beat.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 10, y: 78 }, delay: 200, duration: 800 },
        ],
        callOpensAt: 1150,
        correctCalls: ['HOLD'],
        explanation: 'Your man has it but turned away behind GLE. The call is HOLD!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.A1, toPlayerIndex: O.A3, delay: 200, duration: 800 },
          { type: 'catch', playerIndex: O.A3, delay: 1000, duration: 100 },
          { type: 'dodge', playerIndex: O.A3, target: { x: 50, y: 100 }, delay: 1100, duration: 1100 },
          { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 72, y: 92 }, delay: 1300, duration: 1000 },
        ],
        callOpensAt: 2200,
        correctCalls: ['SLIDE'],
        explanation: 'He fed A3, who beat D3 to the cage — help. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L3-11',
    level: 3,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Shot from up top...',
    beats: [
      {
        actions: [
          { type: 'shot', playerIndex: O.M2, delay: 300, duration: 600 },
          { type: 'save', playerIndex: 0, delay: 950, duration: 300 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        explanation: 'The goalie made the save — dead play. The call is BREAK!',
      },
    ],
  },
]
