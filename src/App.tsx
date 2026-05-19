import { useGame } from './stores/gameStore'
import MainMenu from './components/MainMenu'
import LevelSelect from './components/LevelSelect'
import HowToPlay from './components/HowToPlay'
import Leaderboard from './components/Leaderboard'
import PostGameBreakdown from './components/PostGameBreakdown'
import HUD from './components/HUD'
import Field from './components/Field'
import CallButtons from './components/CallButtons'
import PlayFeedback from './components/PlayFeedback'
import ReadyGate from './components/ReadyGate'

function PlayingScreen() {
  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <HUD />
      <div className="relative flex-1 min-h-0 px-2">
        <Field />
        <PlayFeedback />
        <ReadyGate />
      </div>
      <div className="p-3 pb-[calc(env(safe-area-inset-bottom)+12px)] bg-bg-soft/70 border-t border-white/10">
        <CallButtons />
      </div>
    </div>
  )
}

export default function App() {
  const screen = useGame((s) => s.screen)

  return (
    <div
      className="h-full w-full overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        {screen === 'menu' && <MainMenu />}
        {screen === 'levelSelect' && <LevelSelect />}
        {screen === 'howTo' && <HowToPlay />}
        {screen === 'leaderboard' && <Leaderboard />}
        {screen === 'breakdown' && <PostGameBreakdown />}
        {screen === 'playing' && <PlayingScreen />}
      </div>
    </div>
  )
}
