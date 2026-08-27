import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { useShallow } from 'zustand/react/shallow'
import { Zap, Compass, Hammer, Ship, SkipForward } from 'lucide-react'

export default function ActionBar() {
  const {
    currentView,
    buildShip,
    incrementTurn,
  } = useGameStore(
    useShallow((state) => ({
      currentView: state.currentView,
      buildShip: state.buildShip,
      incrementTurn: state.incrementTurn,
    }))
  )

  const [shipName, setShipName] = useState('Explorer-1')
  const [showShipBuilder, setShowShipBuilder] = useState(false)

  const handleBuildShip = async () => {
    await buildShip(shipName)
    setShowShipBuilder(false)
    setShipName('Explorer-' + (Math.floor(Math.random() * 1000)))
  }

  return (
    <div className="bg-slate-800 border-t border-slate-700 px-4 py-3 rounded-lg">
      <div className="flex items-center gap-2">
        {/* Main action buttons */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-semibold text-sm transition-colors"
        >
          <Compass className="w-4 h-4" />
          Explore
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-semibold text-sm transition-colors"
        >
          <Hammer className="w-4 h-4" />
          Manage Planet
        </button>

        <button
          onClick={() => setShowShipBuilder(!showShipBuilder)}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded font-semibold text-sm transition-colors"
        >
          <Ship className="w-4 h-4" />
          Build Ship
        </button>

        <button
          onClick={() => incrementTurn()}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-700 hover:bg-yellow-600 rounded font-semibold text-sm transition-colors ml-auto"
        >
          <SkipForward className="w-4 h-4" />
          End Turn
        </button>
      </div>

      {/* Ship builder dialog */}
      {showShipBuilder && (
        <div className="mt-3 bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-2 mb-3">
            <Ship className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold">Build New Ship</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-300 block mb-1">Ship Name</label>
              <input
                type="text"
                value={shipName}
                onChange={(e) => setShipName(e.target.value)}
                className="w-full bg-slate-600 text-white px-3 py-2 rounded text-sm border border-slate-500 focus:border-cyan-500 outline-none"
                placeholder="Enter ship name"
              />
            </div>

            <div className="bg-slate-600 rounded p-3 text-xs text-slate-300">
              <p className="font-semibold mb-2">Cost:</p>
              <p>⛏️ 400 Ore</p>
              <p>💎 100 Crystals</p>
              <p>💰 300 Credits</p>
              <p>⏱️ 1 Turn</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBuildShip}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded text-sm transition-colors"
              >
                Confirm Build
              </button>
              <button
                onClick={() => setShowShipBuilder(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 rounded text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
