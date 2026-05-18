import type { Scenario } from '../types'
import { level1 } from './level1'
import { level2 } from './level2'
import { level3 } from './level3'
import { level4 } from './level4'
import { level5 } from './level5'
import { level6 } from './level6'

export const SCENARIOS_BY_LEVEL: Record<number, Scenario[]> = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
  6: level6,
}

export function scenariosForLevel(level: number): Scenario[] {
  return SCENARIOS_BY_LEVEL[level] ?? []
}
