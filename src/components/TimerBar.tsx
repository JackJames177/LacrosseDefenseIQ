import { useEffect, useRef, useState } from 'react'
import { useGame } from '../stores/gameStore'

/** Shrinking countdown bar. Green -> yellow -> red as time runs out. */
export default function TimerBar() {
  const phase = useGame((s) => s.phase)
  const callOpenedAt = useGame((s) => s.callOpenedAt)
  const timerMs = useGame((s) => s.timerMs)
  const [frac, setFrac] = useState(1)
  const raf = useRef<number>()

  const active = phase === 'call' && callOpenedAt > 0

  useEffect(() => {
    if (!active) {
      setFrac(phase === 'call' ? 1 : frac)
      return
    }
    const tick = () => {
      const elapsed = Date.now() - callOpenedAt
      const f = Math.max(0, 1 - elapsed / timerMs)
      setFrac(f)
      if (f > 0) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, callOpenedAt, timerMs])

  const color =
    frac > 0.5 ? '#00dc82' : frac > 0.25 ? '#f5c542' : '#ff4444'

  const display = active ? frac : phase === 'call' ? 1 : 0

  return (
    <div className="w-full h-3 rounded-full bg-black/50 overflow-hidden border border-white/10">
      <div
        className="h-full rounded-full"
        style={{
          width: `${display * 100}%`,
          background: color,
          boxShadow: `0 0 8px ${color}`,
          transition: 'background 0.2s linear',
        }}
      />
    </div>
  )
}
