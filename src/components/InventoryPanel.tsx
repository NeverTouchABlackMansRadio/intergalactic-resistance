import { useGameStore } from '../store/gameStore'
import { useShallow } from 'zustand/react/shallow'
import { Package } from 'lucide-react'

export default function InventoryPanel() {
  const { inventory } = useGameStore(
    useShallow((state) => ({
      inventory: state.inventory,
    }))
  )

  if (!inventory) return null

  const resources = [
    { key: 'credits', label: 'Credits', icon: '💰', color: 'yellow' },
    { key: 'ore', label: 'Metal Ore', icon: '⛏️', color: 'slate' },
    { key: 'crystals', label: 'Crystals', icon: '💎', color: 'purple' },
    { key: 'quantum_materials', label: 'Quantum', icon: '⚛️', color: 'blue' },
    { key: 'alien_essence', label: 'Essence', icon: '🌌', color: 'indigo' },
  ]

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold">Inventory</h3>
      </div>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div key={resource.key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{resource.icon}</span>
              <span className="text-sm text-slate-300">{resource.label}</span>
            </div>
            <span className={`font-bold text-${resource.color}-400`}>
              {inventory[resource.key as keyof typeof inventory].toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Total cargo info */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Cargo Capacity</span>
          <span>
            {(inventory.ore + inventory.crystals + inventory.quantum_materials).toLocaleString()} / 1000
          </span>
        </div>
      </div>
    </div>
  )
}
