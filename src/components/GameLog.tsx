import { useGameStore } from '../store/gameStore'
import { useShallow } from 'zustand/react/shallow'
import { MessageSquare } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function GameLog() {
  const { gameLog } = useGameStore(
    useShallow((state) => ({
      gameLog: state.gameLog,
    }))
  )

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [gameLog])

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold">Game Log</h3>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 text-xs"
      >
        {gameLog.length === 0 ? (
          <p className="text-slate-500">Waiting for events...</p>
        ) : (
          gameLog.map((message, idx) => (
            <div
              key={idx}
              className="text-slate-300 py-1 px-2 bg-slate-700 rounded border-l-2 border-cyan-500"
            >
              {message}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
