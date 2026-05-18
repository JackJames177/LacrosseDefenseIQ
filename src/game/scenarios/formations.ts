import type { PlayerPosition } from '../types'

/**
 * Standard 3-3 offensive set on the offensive half.
 * Field space is 100 x 130 (see FIELD constants). Goal at (50,100).
 *
 * Offense order:  [A1 leftCrease, A2 X-behind, A3 rightCrease,
 *                  M1 leftTop,  M2 centerTop, M3 rightTop]
 * Defense order:  [D1->A1, D2->A2, D3->A3, D4->M1, D5->M2, D6->M3]
 *
 * Each scenario gets its own fresh copy via base().
 */
export function base(): PlayerPosition[] {
  return [
    { id: 'A1', team: 'offense', label: 'A1', x: 22, y: 86 },
    { id: 'A2', team: 'offense', label: 'A2', x: 50, y: 116 },
    { id: 'A3', team: 'offense', label: 'A3', x: 78, y: 86 },
    { id: 'M1', team: 'offense', label: 'M1', x: 26, y: 44 },
    { id: 'M2', team: 'offense', label: 'M2', x: 50, y: 36 },
    { id: 'M3', team: 'offense', label: 'M3', x: 74, y: 44 },
    { id: 'D1', team: 'defense', label: 'D', x: 26, y: 82 },
    { id: 'D2', team: 'defense', label: 'D', x: 50, y: 108 },
    { id: 'D3', team: 'defense', label: 'D', x: 74, y: 82 },
    { id: 'D4', team: 'defense', label: 'D', x: 29, y: 50 },
    { id: 'D5', team: 'defense', label: 'D', x: 50, y: 43 },
    { id: 'D6', team: 'defense', label: 'D', x: 71, y: 50 },
  ]
}

/** offense index helpers for readability in scenario files */
export const O = { A1: 0, A2: 1, A3: 2, M1: 3, M2: 4, M3: 5 } as const
/** defense index helpers (0-5 within the defense sub-array) */
export const D = { D1: 0, D2: 1, D3: 2, D4: 3, D5: 4, D6: 5 } as const
