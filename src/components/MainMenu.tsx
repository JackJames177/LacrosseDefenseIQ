import { useGame } from '../stores/gameStore'
import { useLeaderboard } from '../stores/leaderboardStore'
import { LEVELS } from '../game/constants'
import InstallPrompt from './InstallPrompt'

export default function MainMenu() {
  const navigate = useGame((s) => s.navigate)
  const startLevel = useGame((s) => s.startLevel)
  const isUnlocked = useLeaderboard((s) => s.isLevelUnlocked)
  const progress = useLeaderboard((s) => s.progress)

  // PLAY -> first unlocked level that isn't 3-starred yet, else level 1
  const nextLevel =
    LEVELS.find((l) => isUnlocked(l.level) && (progress[l.level]?.stars ?? 0) < 3)
      ?.level ?? 1

  const Btn = ({
    label,
    onClick,
    primary,
  }: {
    label: string
    onClick: () => void
    primary?: boolean
  }) => (
    <button
      onClick={onClick}
      className={`w-full font-display text-3xl tracking-widest py-4 rounded-xl border-2 transition-all active:scale-95 ${
        primary
          ? 'border-accent text-bg bg-accent hover:bg-accent/90 shadow-[0_0_20px_rgba(0,220,130,0.4)]'
          : 'border-defense/50 text-defense bg-bg-soft hover:border-defense'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="font-display text-7xl sm:text-8xl tracking-[0.12em] text-defense drop-shadow-[0_0_18px_rgba(0,180,216,0.6)]">
          DEFENSIVE<span className="text-accent"> IQ</span>
        </h1>
        <p className="font-mono text-sm text-white/50 mt-1 tracking-[0.3em]">
          COMMUNICATION TRAINER
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <Btn label="PLAY" primary onClick={() => startLevel(nextLevel)} />
        <Btn label="LEVELS" onClick={() => navigate('levelSelect')} />
        <Btn label="LEADERBOARD" onClick={() => navigate('leaderboard')} />
        <Btn label="HOW TO PLAY" onClick={() => navigate('howTo')} />
      </div>

      <InstallPrompt />

      <p className="mt-10 font-mono text-[10px] text-white/30">
        Built for Mason · 9 calls · 6 levels
      </p>
    </div>
  )
}
