import { useGameStore } from '../store/gameStore'
import { useShallow } from 'zustand/react/shallow'
import { Zap, Plus, ArrowUp } from 'lucide-react'

export default function PlanetView() {
  const {
    homePlanet,
    facilities,
    buildFacility,
    upgradeFacility,
  } = useGameStore(
    useShallow((state) => ({
      homePlanet: state.homePlanet,
      facilities: state.facilities,
      buildFacility: state.buildFacility,
      upgradeFacility: state.upgradeFacility,
    }))
  )

  if (!homePlanet) return null

  const facilityTypes = ['mining', 'crystals', 'quantum']
  const buildableSlots = 5 - facilities.length

  const getFacilityInfo = (type: string) => {
    const spec = {
      mining: { name: 'Mining Facility', icon: '⛏️', color: 'slate' },
      crystals: { name: 'Crystal Extraction', icon: '💎', color: 'purple' },
      quantum: { name: 'Quantum Lab', icon: '⚛️', color: 'blue' },
    }[type]
    return spec || { name: 'Unknown', icon: '❓', color: 'gray' }
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Planet info */}
      <div className="bg-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{homePlanet.name}</h2>
          <span className="text-slate-400">Type: {homePlanet.planet_type}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Population: <span className="text-cyan-400">{homePlanet.population}</span></div>
          <div>Morale: <span className="text-green-400">{homePlanet.morale}%</span></div>
        </div>
      </div>

      {/* Building slots */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Existing facilities */}
          {facilities.map((facility) => {
            const info = getFacilityInfo(facility.facility_type)
            return (
              <div key={facility.id} className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{info.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{info.name}</h3>
                    <p className="text-xs text-slate-400">Level {facility.level}</p>
                  </div>
                </div>

                {/* Production stats */}
                <div className="text-xs text-slate-300 mb-3 space-y-1">
                  {facility.ore_per_turn > 0 && <p>⛏️ {facility.ore_per_turn} ore/turn</p>}
                  {facility.crystals_per_turn > 0 && <p>💎 {facility.crystals_per_turn} crystals/turn</p>}
                  {facility.quantum_per_turn > 0 && <p>⚛️ {facility.quantum_per_turn} quantum/turn</p>}
                </div>

                {/* Upgrade button */}
                {facility.level < 5 && (
                  <button
                    onClick={() => upgradeFacility(facility.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded flex items-center justify-center gap-1"
                  >
                    <ArrowUp className="w-3 h-3" />
                    Upgrade to L{facility.level + 1}
                  </button>
                )}
                {facility.level === 5 && (
                  <div className="w-full bg-slate-600 text-slate-300 text-xs py-2 rounded text-center">
                    Max Level
                  </div>
                )}
              </div>
            )
          })}

          {/* Empty slots for building */}
          {buildableSlots > 0 && facilityTypes.map((type) => {
            const exists = facilities.some((f) => f.facility_type === type)
            if (exists) return null

            const info = getFacilityInfo(type)
            return (
              <div key={`build-${type}`} className="bg-slate-700 rounded-lg p-4 border-2 border-dashed border-slate-600 cursor-pointer hover:border-slate-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl opacity-50">{info.icon}</span>
                  <h3 className="font-bold text-sm text-slate-400">{info.name}</h3>
                </div>
                <button
                  onClick={() => buildFacility(homePlanet.id, type)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Build Facility
                </button>
              </div>
            )
          })}

          {/* Slots indicator */}
          {buildableSlots === 0 && (
            <div className="col-span-2 bg-slate-700 rounded-lg p-4 text-center text-slate-400">
              All {5} building slots filled
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
