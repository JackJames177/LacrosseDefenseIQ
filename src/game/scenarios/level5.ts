import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 5 — "Pick Apart": all 10 calls active, new focus is PICK.
 * Player controls D1, guarding A1. PICK_LEFT/PICK_RIGHT plus mixed reads.
 * An off-ball attacker sets a screen on a teammate's defender — read the side.
 */
export const level5: Scenario[] = [
  {
    id: 'L5-1',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'A3 sliding up to screen M1\'s defender.',
    tutorial:
      'When a teammate is about to get screened, warn him — yell PICK LEFT if the screen comes from his left side!',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, pickDirection: 'left', targetDefenderIndex: D.D4, target: { x: 24, y: 50 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1500,
        correctCalls: ['PICK_LEFT'],
        explanation: 'A3 set a screen on M1\'s defender from his left. The call is PICK LEFT!',
      },
    ],
  },
  {
    id: 'L5-2',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    setupHint: 'A2 climbing to pick M3\'s defender.',
    tutorial:
      'If the screen comes from your teammate\'s right side, yell PICK RIGHT so he can fight over it!',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A2, pickDirection: 'right', targetDefenderIndex: D.D6, target: { x: 76, y: 50 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1500,
        correctCalls: ['PICK_RIGHT'],
        explanation: 'A2 set a screen on M3\'s defender from his right. The call is PICK RIGHT!',
      },
    ],
  },
  {
    id: 'L5-3',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'A3 stepping in to screen M2\'s defender.',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, pickDirection: 'left', targetDefenderIndex: D.D5, target: { x: 45, y: 43 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1500,
        correctCalls: ['PICK_LEFT'],
        explanation: 'A3 screened M2\'s defender from the left. The call is PICK LEFT!',
      },
    ],
  },
  {
    id: 'L5-4',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'A3 sneaking up to screen M1\'s defender.',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, pickDirection: 'right', targetDefenderIndex: D.D4, target: { x: 34, y: 50 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1500,
        correctCalls: ['PICK_RIGHT'],
        explanation: 'A3 screened M1\'s defender from his right. The call is PICK RIGHT!',
      },
    ],
  },
  {
    id: 'L5-5',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'A3 picks for M2, then rolls to the crease.',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, pickDirection: 'left', targetDefenderIndex: D.D5, target: { x: 45, y: 43 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1500,
        correctCalls: ['PICK_LEFT'],
        prompt: 'Read the screen!',
        explanation: 'A3 set the screen on M2\'s defender from the left. The call is PICK LEFT!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A3, team: 'offense', target: { x: 50, y: 100 }, delay: 200, duration: 1000 },
        ],
        callOpensAt: 1200,
        correctCalls: ['CUTTER'],
        prompt: 'Where did the picker go?',
        explanation: 'After the pick, A3 rolled hard to the crease wide open. The call is CUTTER!',
      },
    ],
  },
  {
    id: 'L5-6',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    setupHint: 'A2 picks for M3, then dives to the crease.',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A2, pickDirection: 'right', targetDefenderIndex: D.D6, target: { x: 76, y: 50 }, delay: 300, duration: 1000 },
        ],
        callOpensAt: 1500,
        correctCalls: ['PICK_RIGHT'],
        prompt: 'Read the screen!',
        explanation: 'A2 screened M3\'s defender from his right. The call is PICK RIGHT!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A2, team: 'offense', target: { x: 50, y: 100 }, delay: 200, duration: 1000 },
        ],
        callOpensAt: 1200,
        correctCalls: ['CUTTER'],
        prompt: 'Track the picker!',
        explanation: 'A2 slipped the pick and cut to the doorstep. The call is CUTTER!',
      },
    ],
  },
  {
    id: 'L5-7',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'M2 dodges from up top — no screen anywhere.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.M2, team: 'offense', target: { x: 50, y: 70 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 50, y: 66 }, delay: 500, duration: 1100 },
        ],
        callOpensAt: 1500,
        correctCalls: ['SLIDE'],
        prompt: 'Is that really a pick?',
        explanation: 'No screen was set — M2 just dodged and beat his man. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L5-8',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'A3 drifts toward M3\'s defender but veers away.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A3, team: 'offense', target: { x: 70, y: 60 }, delay: 200, duration: 600 },
          { type: 'move', playerIndex: O.A3, team: 'offense', target: { x: 84, y: 78 }, delay: 800, duration: 600 },
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M3, delay: 400, duration: 700 },
          { type: 'catch', playerIndex: O.M3, delay: 1100, duration: 100 },
        ],
        callOpensAt: 1500,
        correctCalls: ['HOT'],
        prompt: 'Fake pick — read the ball!',
        explanation: 'A3 faked the screen and bailed; the ball is one pass from your man. The call is HOT!',
      },
    ],
  },
  {
    id: 'L5-9',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'A3 dodges from the wing and beats his man.',
    beats: [
      {
        actions: [
          { type: 'dodge', playerIndex: O.A3, team: 'offense', target: { x: 66, y: 92 }, delay: 300, duration: 1100 },
          { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 70, y: 88 }, delay: 500, duration: 1100 },
        ],
        callOpensAt: 1500,
        correctCalls: ['SLIDE'],
        explanation: 'A3 beat D3 off the dodge and is driving to the goal. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L5-10',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'A wing shot rips toward the cage...',
    beats: [
      {
        actions: [
          { type: 'shot', playerIndex: O.A3, delay: 300, duration: 600 },
          { type: 'save', playerIndex: 0, delay: 950, duration: 300 },
        ],
        callOpensAt: 1350,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        explanation: 'The goalie made the save — the play is dead. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L5-11',
    level: 5,
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
        explanation: 'Your man caught it and squared to the cage — a threat. The call is BALL!',
      },
    ],
  },
  {
    id: 'L5-12',
    level: 5,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball swung to the far side.',
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
]
