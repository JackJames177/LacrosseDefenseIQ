import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 1 — "Ball Basics": BALL, HOLD, BREAK only. Timer 6s.
 * Player controls D1, guarding A1. Tutorials on the first three.
 * Single-beat scenarios (one call each).
 */
export const level1: Scenario[] = [
  {
    id: 'L1-1',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    setupHint: 'Watch the ball — it is coming to your man.',
    tutorial:
      'When YOUR man catches the ball and faces the cage, yell BALL! so everyone knows you have him.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 300, duration: 800 },
          { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BALL'],
        explanation: 'Your man caught it and is facing the cage — a threat. The call is BALL!',
      },
    ],
  },
  {
    id: 'L1-2',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man has the ball but is turning away.',
    tutorial:
      'If your man has the ball but is NOT a threat (back to the goal, cradling), you call HOLD!',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 8, y: 74 }, delay: 200, duration: 800 },
        ],
        callOpensAt: 1150,
        correctCalls: ['HOLD'],
        explanation: 'He has the ball but turned his back behind GLE — not a threat. The call is HOLD!',
      },
    ],
  },
  {
    id: 'L1-3',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'A shot is coming...',
    tutorial:
      'When the goalie makes a save (or the defense gets a ground ball), the play flips — yell BREAK to start the clear!',
    beats: [
      {
        actions: [
          { type: 'shot', playerIndex: O.A3, delay: 300, duration: 600 },
          { type: 'save', playerIndex: 0, delay: 950, duration: 300 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        explanation: 'The goalie made the save — the play is dead. BREAK gets the whole team clearing.',
      },
    ],
  },
  {
    id: 'L1-4',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    setupHint: 'Ball moving toward your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.A1, delay: 300, duration: 800 },
          { type: 'catch', playerIndex: O.A1, delay: 1100, duration: 100 },
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 26, y: 80 }, delay: 1250, duration: 500 },
        ],
        callOpensAt: 1450,
        correctCalls: ['BALL'],
        explanation: 'Your man caught it and squared to the cage. The call is BALL!',
      },
    ],
  },
  {
    id: 'L1-5',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man has it, just standing there.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 12, y: 78 }, delay: 300, duration: 600 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOLD'],
        explanation: 'He has the ball but is cradling, not attacking. The call is HOLD!',
      },
    ],
  },
  {
    id: 'L1-6',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballOverride: { x: 44, y: 70 },
    setupHint: 'The ball is loose on the ground!',
    beats: [
      {
        actions: [
          { type: 'ground_ball', playerIndex: D.D2, team: 'defense', target: { x: 46, y: 72 }, delay: 300, duration: 700 },
        ],
        callOpensAt: 1050,
        correctCalls: ['BREAK'],
        breakTrigger: 'ground_ball',
        explanation: 'Defense scooped the ground ball — possession flipped. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L1-7',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    setupHint: 'Skip pass across to your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.A1, delay: 300, duration: 900 },
          { type: 'catch', playerIndex: O.A1, delay: 1200, duration: 100 },
        ],
        callOpensAt: 1450,
        correctCalls: ['BALL'],
        explanation: 'He caught the skip and faces up in triple threat — dangerous. The call is BALL!',
      },
    ],
  },
  {
    id: 'L1-8',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man backing it out.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 8, y: 72 }, delay: 200, duration: 800 },
        ],
        callOpensAt: 1150,
        correctCalls: ['HOLD'],
        explanation: 'He is backing the ball out to reset — not threatening. The call is HOLD!',
      },
    ],
  },
  {
    id: 'L1-9',
    level: 1,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man winds up to shoot.',
    beats: [
      {
        actions: [
          { type: 'shot', playerIndex: O.A1, delay: 300, duration: 600 },
          { type: 'save', playerIndex: 0, delay: 950, duration: 300 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        explanation: 'Shot saved by the goalie — dead play. The call is BREAK to start the clear!',
      },
    ],
  },
]
