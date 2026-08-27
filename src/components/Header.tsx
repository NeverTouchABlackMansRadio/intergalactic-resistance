import { useGameStore } from '../store/gameStore'
import { Heart, Radio } from 'lucide-react'

export default function Header() {
  const { currentGame } = useGameStore()

  if (!currentGame) return null

  const foeDiscoveryPercent = currentGame.foe_discovered ? 100 : 0

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">INTERGALACTIC RESISTANCE</h1>
          <p className="text-slate-400 text-sm">Alpha Build - Phase 1</p>
        </div>

        <div className="flex items-center gap-8">
          {/* Turn counter */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">TURN</p>
            <p className="text-2xl font-bold text-yellow-400">{currentGame.current_turn}</p>
          </div>

          {/* Foe status */}
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4" />
              <span className="text-slate-400 text-sm">FOE HP</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-2xl font-bold text-red-500">{currentGame.foe_hp}</span>
            </div>
          </div>

          {/* Game status */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">STATUS</p>
            <p className={`text-lg font-bold ${
              currentGame.game_status === 'active' ? 'text-green-400' :
              currentGame.game_status === 'won' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {currentGame.game_status.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
