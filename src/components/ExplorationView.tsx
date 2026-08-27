import { useGameStore } from '../store/gameStore'
import { useShallow } from 'zustand/react/shallow'
import { MapPin, Compass } from 'lucide-react'

export default function ExplorationView() {
  const {
    locations,
    discoverLocation,
  } = useGameStore(
    useShallow((state) => ({
      locations: state.locations,
      discoverLocation: state.discoverLocation,
    }))
  )

  const discoveredCount = locations.filter((l) => l.discovered).length
  const totalCount = locations.length

  const getLocationIcon = (type: string) => {
    const icons = {
      mining_site: '⛏️',
      crystal_cave: '💎',
      anomaly: '⚛️',
      empty: '❓',
    }
    return icons[type as keyof typeof icons] || '❓'
  }

  const getLocationColor = (type: string) => {
    const colors = {
      mining_site: 'slate',
      crystal_cave: 'purple',
      anomaly: 'blue',
      empty: 'gray',
    }
    return colors[type as keyof typeof colors] || 'gray'
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Exploration header */}
      <div className="bg-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold">Exploration Map</h2>
          </div>
          <span className="text-slate-400 text-sm">
            {discoveredCount} / {totalCount} discovered
          </span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div
            className="bg-cyan-500 h-2 rounded-full transition-all"
            style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Locations list */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {locations.map((location) => {
            const icon = getLocationIcon(location.location_type)
            const isDiscovered = location.discovered
            const hasResources = location.resource_type && location.resource_amount > 0

            return (
              <div
                key={location.id}
                className={`rounded-lg p-3 cursor-pointer transition-all ${
                  isDiscovered
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {isDiscovered ? (
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <h3 className="font-bold text-sm">{location.name}</h3>
                          <p className="text-xs text-slate-400">{location.location_type}</p>
                        </div>
                      </div>
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    </div>

                    {hasResources && (
                      <div className="text-xs text-slate-300">
                        Found: {location.resource_amount} {location.resource_type}
                      </div>
                    )}

                    {location.visited && (
                      <div className="text-xs text-slate-400 mt-1">
                        Visited {location.visited_count}x
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl opacity-50">?</span>
                      <Compass className="w-4 h-4 text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Unknown location</p>
                    <button
                      onClick={() => discoverLocation(location.id)}
                      className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs py-1 rounded transition-colors"
                    >
                      Explore
                    </button>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-700 rounded-lg p-3 text-xs">
        <p className="font-bold mb-2">Legend:</p>
        <div className="grid grid-cols-2 gap-2 text-slate-300">
          <div>⛏️ Mining Site - Ore</div>
          <div>💎 Crystal Cave - Crystals</div>
          <div>⚛️ Anomaly - Quantum</div>
          <div>❓ Unknown - ???</div>
        </div>
      </div>
    </div>
  )
}
