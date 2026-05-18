import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LeaderboardEntry, LevelProgress, LevelResult } from '../game/types'
import { UNLOCK_ACCURACY } from '../game/constants'

interface LeaderboardState {
  entries: LeaderboardEntry[]
  /** keyed by level number */
  progress: Record<number, LevelProgress>
  recordLevel: (result: LevelResult) => { isHighScore: boolean }
  addScore: (initials: string, score: number) => void
  isLevelUnlocked: (level: number) => boolean
  totalScore: () => number
  reset: () => void
}

export const useLeaderboard = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      entries: [],
      progress: {},

      recordLevel: (result) => {
        const prev = get().progress[result.level]
        const isHighScore = !prev || result.totalScore > prev.bestScore
        const merged: LevelProgress = {
          bestScore: Math.max(prev?.bestScore ?? 0, result.totalScore),
          stars: Math.max(prev?.stars ?? 0, result.stars),
          accuracy: Math.max(prev?.accuracy ?? 0, result.accuracy),
          completed:
            (prev?.completed ?? false) || result.accuracy >= UNLOCK_ACCURACY,
        }
        set((s) => ({
          progress: { ...s.progress, [result.level]: merged },
        }))
        return { isHighScore }
      },

      addScore: (initials, score) => {
        const entry: LeaderboardEntry = {
          initials: initials.toUpperCase().slice(0, 3) || 'AAA',
          score,
          date: new Date().toISOString().slice(0, 10),
        }
        set((s) => ({
          entries: [...s.entries, entry]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10),
        }))
      },

      isLevelUnlocked: (level) => {
        if (level <= 1) return true
        const prev = get().progress[level - 1]
        return !!prev && prev.accuracy >= UNLOCK_ACCURACY
      },

      totalScore: () =>
        Object.values(get().progress).reduce((s, p) => s + p.bestScore, 0),

      reset: () => set({ entries: [], progress: {} }),
    }),
    { name: 'defensive-iq-leaderboard' }
  )
)
