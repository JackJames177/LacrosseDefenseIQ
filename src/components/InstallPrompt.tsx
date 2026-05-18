import { useEffect, useState } from 'react'

interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: string }>
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null)
  const [installed, setInstalled] = useState(false)
  const [showIos, setShowIos] = useState(false)

  useEffect(() => {
    const onBIP = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BIPEvent)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onBIP)
    window.addEventListener('appinstalled', onInstalled)

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true
    if (isIos && !standalone) setShowIos(true)
    if (standalone) setInstalled(true)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  if (deferred) {
    return (
      <button
        onClick={async () => {
          await deferred.prompt()
          await deferred.userChoice
          setDeferred(null)
        }}
        className="mt-4 text-sm font-mono text-accent border border-accent/40 rounded-lg px-4 py-2 hover:bg-accent/10"
      >
        ⬇ INSTALL APP
      </button>
    )
  }

  if (showIos) {
    return (
      <p className="mt-4 text-xs font-mono text-white/45 max-w-xs text-center">
        Install: tap the Share icon, then “Add to Home Screen”
      </p>
    )
  }

  return null
}
