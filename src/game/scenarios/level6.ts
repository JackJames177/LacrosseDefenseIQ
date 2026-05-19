import type { Scenario } from '../types'
import { base, O, D } from './formations'

/**
 * LEVEL 6 — "Full Speed": multi-beat possessions. The play keeps developing
 * and the timer RESETS for each beat's call. Player controls D1, guarding A1.
 * Positions & ball persist between beats; each beat's delays/callOpensAt are
 * relative to that beat's own action start.
 */
export const level6: Scenario[] = [
  {
    id: 'L6-1',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'Ball settled far from your man — a long possession is starting.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.A3, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man on the help side. The call is TWO!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M1, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['HOT'],
        prompt: 'Ball swung — your role changed.',
        explanation: 'The ball swung one pass from your man — you are the next slide. The call is HOT!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.M1, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
          { type: 'move', playerIndex: D.D4, team: 'defense', target: { x: 48, y: 96 }, delay: 400, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['SLIDE'],
        prompt: 'He is dodging to the cage!',
        explanation: 'The dodger beat his man toward the goal — you must help. The call is SLIDE!',
      },
      {
        actions: [
          { type: 'shot', playerIndex: O.M1, delay: 200, duration: 500 },
          { type: 'save', playerIndex: 0, delay: 750, duration: 300 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        prompt: 'Save!',
        explanation: 'The goalie saved it — possession flips. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L6-2',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man has the ball at X — square up.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 30, y: 90 }, delay: 200, duration: 600 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BALL'],
        explanation: 'Your man has the ball and is facing up — a threat. The call is BALL!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.A1, toPlayerIndex: O.M1, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M1, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['HOT'],
        prompt: 'He passed off — reset your role.',
        explanation: 'Your man passed it one away — you are the next slide. The call is HOT!',
      },
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, targetDefenderIndex: D.D4, pickDirection: 'right', target: { x: 33, y: 50 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['PICK_RIGHT'],
        prompt: 'Screen on your teammate!',
        explanation: 'A pick is being set on D4 from the right side. The call is PICK_RIGHT!',
      },
    ],
  },
  {
    id: 'L6-3',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'Ball up top near the wing by your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.M2, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.M2, delay: 800, duration: 100 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOT'],
        explanation: 'The ball is one pass from your man — you are the help. The call is HOT!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A3, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['CUTTER'],
        prompt: 'Cutter through the crease!',
        explanation: 'An off-ball attacker is cutting through the crease. The call is CUTTER!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.A1, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['BALL'],
        prompt: 'The feed found your man.',
        explanation: 'The ball was fed to the cutter — your man — at the cage. The call is BALL!',
      },
    ],
  },
  {
    id: 'L6-4',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man has it behind the goal, no threat yet.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 38, y: 114 }, delay: 200, duration: 700 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOLD'],
        explanation: 'Your man has it behind GLE, back turned — not a threat. The call is HOLD!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, target: { x: 44, y: 92 }, delay: 200, duration: 900 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 42, y: 88 }, delay: 400, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['FIRE'],
        prompt: 'He turned and is driving!',
        explanation: 'Your man turned and beat you to the cage — you need help now. The call is FIRE!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.A1, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        prompt: 'The slide stopped it — ball is off.',
        explanation: 'The slide stopped the drive and the ball moved two away. The call is TWO!',
      },
    ],
  },
  {
    id: 'L6-5',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball up top one pass from your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.M1, delay: 800, duration: 100 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOT'],
        explanation: 'The ball is one pass from your man — you are the next slide. The call is HOT!',
      },
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, targetDefenderIndex: D.D4, pickDirection: 'left', target: { x: 24, y: 50 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['PICK_LEFT'],
        prompt: 'Screen on your teammate!',
        explanation: 'A pick is being set on D4 from the left side. The call is PICK_LEFT!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.M1, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
          { type: 'move', playerIndex: D.D4, team: 'defense', target: { x: 48, y: 96 }, delay: 400, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['SLIDE'],
        prompt: 'He fought through and is dodging!',
        explanation: 'The dodger beat his man off the pick toward the goal. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L6-6',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'Ball on the far side to start.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.A3, toPlayerIndex: O.M3, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M3, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man on the help side. The call is TWO!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A2, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['CUTTER'],
        prompt: 'Off-ball cut through the middle!',
        explanation: 'An off-ball attacker is cutting through the crease. The call is CUTTER!',
      },
      {
        actions: [
          { type: 'shot', playerIndex: O.M3, delay: 200, duration: 500 },
          { type: 'save', playerIndex: 0, delay: 750, duration: 300 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        prompt: 'Save!',
        explanation: 'The goalie made the save — the play is dead. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L6-7',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Unsettled — the ball finds your man fast.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A1, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.A1, delay: 800, duration: 100 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BALL'],
        explanation: 'In the scramble your man got it facing the cage. The call is BALL!',
      },
      {
        actions: [
          { type: 'shot', playerIndex: O.A1, delay: 200, duration: 500 },
          { type: 'save', playerIndex: 0, delay: 750, duration: 300 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        prompt: 'Save!',
        explanation: 'Your man shot and the goalie saved it. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L6-8',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Watch off-ball action away from the ball.',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A3, targetDefenderIndex: D.D4, pickDirection: 'right', target: { x: 33, y: 50 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['PICK_RIGHT'],
        explanation: 'A pick is being set on D4 from the right side. The call is PICK_RIGHT!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A3, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['CUTTER'],
        prompt: 'The picker is rolling to the crease!',
        explanation: 'The screener rolled off the pick into the crease. The call is CUTTER!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A3, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.A3, delay: 800, duration: 100 },
          { type: 'move', playerIndex: D.D3, team: 'defense', target: { x: 50, y: 98 }, delay: 1000, duration: 700 },
        ],
        callOpensAt: 1300,
        correctCalls: ['SLIDE'],
        prompt: 'The feed hit the roller!',
        explanation: 'The cutter caught the feed at the cage — help must go. The call is SLIDE!',
      },
    ],
  },
  {
    id: 'L6-9',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A3,
    setupHint: 'Ball far away — a full possession develops.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.A3, toPlayerIndex: O.M2, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.M2, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man on the help side. The call is TWO!',
      },
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.M1, delay: 800, duration: 100 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOT'],
        prompt: 'Ball swung — your role changed.',
        explanation: 'The ball swung one pass from your man. The call is HOT!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.M1, target: { x: 50, y: 70 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TOPSIDE'],
        prompt: 'He is driving middle!',
        explanation: 'The carrier is dodging topside toward the middle of the field. The call is TOPSIDE!',
      },
      {
        actions: [
          { type: 'move', playerIndex: D.D4, team: 'defense', target: { x: 48, y: 66 }, delay: 200, duration: 700 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOLD'],
        prompt: 'On-ball D recovered.',
        explanation: 'The on-ball defender held and stayed in front — no slide needed. The call is HOLD!',
      },
    ],
  },
  {
    id: 'L6-10',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    ballOverride: { x: 48, y: 78 },
    setupHint: 'Ball one pass from your man up top.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.M1, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.M1, delay: 800, duration: 100 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOT'],
        explanation: 'The ball is one pass from your man — you are the next slide. The call is HOT!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.M1, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
          { type: 'move', playerIndex: D.D4, team: 'defense', target: { x: 48, y: 96 }, delay: 400, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['SLIDE'],
        prompt: 'He is dodging to the cage!',
        explanation: 'The dodger beat his man to the goal — you must help. The call is SLIDE!',
      },
      {
        actions: [
          { type: 'ground_ball', playerIndex: D.D2, team: 'defense', target: { x: 48, y: 78 }, delay: 200, duration: 700 },
        ],
        callOpensAt: 1050,
        correctCalls: ['BREAK'],
        breakTrigger: 'ground_ball',
        prompt: 'Loose ball — we got it!',
        explanation: 'The defense recovered the ground ball — possession flipped. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L6-11',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M3,
    setupHint: 'Ball up top on the far side.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M3, toPlayerIndex: O.A3, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.A3, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man — help side. The call is TWO!',
      },
      {
        actions: [
          { type: 'cut', playerIndex: O.A2, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['CUTTER'],
        prompt: 'Cutter through the crease!',
        explanation: 'An off-ball attacker is cutting through the crease. The call is CUTTER!',
      },
    ],
  },
  {
    id: 'L6-12',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.A1,
    setupHint: 'Your man has it and squares up.',
    beats: [
      {
        actions: [
          { type: 'move', playerIndex: O.A1, team: 'offense', target: { x: 30, y: 88 }, delay: 200, duration: 600 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BALL'],
        explanation: 'Your man has the ball facing the cage — a threat. The call is BALL!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.A1, target: { x: 46, y: 94 }, delay: 200, duration: 900 },
          { type: 'move', playerIndex: D.D1, team: 'defense', target: { x: 44, y: 90 }, delay: 400, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['FIRE'],
        prompt: 'He beat you to the cage!',
        explanation: 'Your man dodged past you toward the goal — you need help. The call is FIRE!',
      },
    ],
  },
  {
    id: 'L6-13',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'Ball one pass from your man up top.',
    beats: [
      {
        actions: [
          { type: 'pick', playerIndex: O.A2, targetDefenderIndex: D.D1, pickDirection: 'left', target: { x: 18, y: 84 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['PICK_LEFT'],
        explanation: 'A pick is being set on you from the left side. The call is PICK_LEFT!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.M1, target: { x: 50, y: 70 }, delay: 200, duration: 900 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TOPSIDE'],
        prompt: 'Carrier driving middle!',
        explanation: 'The carrier is dodging topside into the middle. The call is TOPSIDE!',
      },
    ],
  },
  {
    id: 'L6-14',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M2,
    setupHint: 'Ball settled up top, two from your man.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M2, toPlayerIndex: O.A3, delay: 200, duration: 700 },
          { type: 'catch', playerIndex: O.A3, delay: 900, duration: 100 },
        ],
        callOpensAt: 1200,
        correctCalls: ['TWO'],
        explanation: 'The ball is two passes from your man — help side. The call is TWO!',
      },
      {
        actions: [
          { type: 'shot', playerIndex: O.A3, delay: 200, duration: 500 },
          { type: 'save', playerIndex: 0, delay: 750, duration: 300 },
        ],
        callOpensAt: 1100,
        correctCalls: ['BREAK'],
        breakTrigger: 'save',
        prompt: 'Save!',
        explanation: 'The goalie made the save — the play is dead. The call is BREAK!',
      },
    ],
  },
  {
    id: 'L6-15',
    level: 6,
    initialPositions: base(),
    playerDefenderIndex: D.D1,
    guardedAttackerIndex: O.A1,
    ballStartIndex: O.M1,
    setupHint: 'Ball one pass from your man — stay sharp.',
    beats: [
      {
        actions: [
          { type: 'pass', playerIndex: O.M1, toPlayerIndex: O.M2, delay: 200, duration: 600 },
          { type: 'catch', playerIndex: O.M2, delay: 800, duration: 100 },
        ],
        callOpensAt: 1100,
        correctCalls: ['HOT'],
        explanation: 'The ball is one pass from your man — you are the next slide. The call is HOT!',
      },
      {
        actions: [
          { type: 'dodge', playerIndex: O.M2, target: { x: 50, y: 100 }, delay: 200, duration: 900 },
          { type: 'move', playerIndex: D.D5, team: 'defense', target: { x: 50, y: 96 }, delay: 400, duration: 900 },
        ],
        callOpensAt: 1300,
        correctCalls: ['SLIDE'],
        prompt: 'He is dodging to the cage!',
        explanation: 'The dodger beat his man to the goal — you must help. The call is SLIDE!',
      },
    ],
  },
]
