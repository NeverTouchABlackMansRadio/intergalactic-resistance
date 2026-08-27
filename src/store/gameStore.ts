import { create } from 'zustand'
import { supabase, Game, Planet, Facility, Inventory, Location, Ship } from '../lib/supabase'

export interface GameState {
  // Current game
  currentGame: Game | null
  homePlanet: Planet | null
  inventory: Inventory | null
  facilities: Facility[]
  locations: Location[]
  ships: Ship[]
  
  // UI State
  currentView: 'planet' | 'exploration' | 'combat' | 'ship'
  gameLog: string[]
  
  // Game actions
  createGame: () => Promise<void>
  loadGame: (gameId: string) => Promise<void>
  incrementTurn: () => Promise<void>
  updateInventory: (updates: Partial<Inventory>) => Promise<void>
  buildFacility: (planetId: string, facilityType: string) => Promise<void>
  upgradeFacility: (facilityId: string) => Promise<void>
  discoverLocation: (locationId: string) => Promise<void>
  buildShip: (shipName: string) => Promise<void>
  addLog: (message: string) => void
}

const FACILITY_PRODUCTION = {
  mining: [
    { level: 1, ore: 20, cost: { ore: 200, credits: 100 }, buildTime: 1 },
    { level: 2, ore: 40, cost: { ore: 500, credits: 200 }, upgradeTime: 1 },
    { level: 3, ore: 70, cost: { ore: 1000, credits: 400 }, upgradeTime: 1 },
    { level: 4, ore: 110, cost: { ore: 1500, credits: 600 }, upgradeTime: 2 },
    { level: 5, ore: 160, cost: { ore: 2000, credits: 800 }, upgradeTime: 2 },
  ],
  crystals: [
    { level: 1, crystals: 15, cost: { ore: 300, credits: 200 }, buildTime: 1 },
    { level: 2, crystals: 30, cost: { ore: 600, credits: 300 }, upgradeTime: 1 },
    { level: 3, crystals: 55, cost: { ore: 1200, credits: 500 }, upgradeTime: 1 },
    { level: 4, crystals: 90, cost: { ore: 1800, credits: 800 }, upgradeTime: 2 },
    { level: 5, crystals: 130, cost: { ore: 2400, credits: 1000 }, upgradeTime: 2 },
  ],
  quantum: [
    { level: 1, quantum: 8, cost: { ore: 1000, crystals: 500, credits: 300 }, buildTime: 2 },
    { level: 2, quantum: 16, cost: { ore: 1500, crystals: 800, credits: 500 }, upgradeTime: 1 },
    { level: 3, quantum: 30, cost: { ore: 2500, crystals: 1500, credits: 800 }, upgradeTime: 2 },
    { level: 4, quantum: 50, cost: { ore: 3500, crystals: 2000, credits: 1200 }, upgradeTime: 2 },
    { level: 5, quantum: 75, cost: { ore: 4500, crystals: 2500, credits: 1500 }, upgradeTime: 3 },
  ],
}

export const useGameStore = create<GameState>((set, get) => ({
  currentGame: null,
  homePlanet: null,
  inventory: null,
  facilities: [],
  locations: [],
  ships: [],
  currentView: 'planet',
  gameLog: [],

  createGame: async () => {
    try {
      // Create game record
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .insert({
          current_turn: 1,
          foe_hp: 5000,
          foe_discovered: false,
          game_status: 'active',
        })
        .select()
        .single()

      if (gameError) throw gameError

      // Create home planet
      const { data: planetData, error: planetError } = await supabase
        .from('planets')
        .insert({
          game_id: gameData.id,
          name: 'Home - Barren',
          planet_type: 'barren',
          is_home: true,
          population: 1000,
          morale: 50,
        })
        .select()
        .single()

      if (planetError) throw planetError

      // Create inventory
      const { error: invError } = await supabase
        .from('inventory')
        .insert({
          game_id: gameData.id,
          ore: 500,
          crystals: 0,
          quantum_materials: 0,
          credits: 200,
          alien_essence: 0,
        })

      if (invError) throw invError

      // Create initial locations
      const locations = [
        { name: 'Asteroid Field Alpha', location_type: 'mining_site', resource_type: 'ore', resource_amount: 200 },
        { name: 'Crystal Cavern', location_type: 'crystal_cave', resource_type: 'crystals', resource_amount: 100 },
        { name: 'Quantum Anomaly', location_type: 'anomaly', resource_type: 'quantum_materials', resource_amount: 50 },
        // Add more locations as needed (20 total for MVP)
      ]

      for (let i = 0; i < locations.length; i++) {
        await supabase.from('locations').insert({
          game_id: gameData.id,
          ...locations[i],
          x: Math.random() * 100,
          y: Math.random() * 100,
          discovered: false,
        })
      }

      set({ currentGame: gameData, homePlanet: planetData })
      get().addLog('Game created! Starting on Barren home planet.')
    } catch (error) {
      console.error('Error creating game:', error)
      get().addLog('Error creating game.')
    }
  },

  loadGame: async (gameId: string) => {
    try {
      // First get game and planet
      const [gameRes, planetRes, invRes, locRes] = await Promise.all([
        supabase.from('games').select('*').eq('id', gameId).single(),
        supabase.from('planets').select('*').eq('game_id', gameId).eq('is_home', true).single(),
        supabase.from('inventory').select('*').eq('game_id', gameId).single(),
        supabase.from('locations').select('*').eq('game_id', gameId),
      ])

      if (gameRes.error) throw gameRes.error
      if (planetRes.error) throw planetRes.error
      if (invRes.error) throw invRes.error

      // Then get facilities using planet ID
      const planetId = planetRes.data?.id
      const facRes = await supabase.from('facilities').select('*').eq('planet_id', planetId || '')

      set({
        currentGame: gameRes.data,
        homePlanet: planetRes.data,
        inventory: invRes.data,
        facilities: facRes.data || [],
        locations: locRes.data || [],
      })
    } catch (error) {
      console.error('Error loading game:', error)
    }
  },

  incrementTurn: async () => {
    const state = get()
    if (!state.currentGame) return

    try {
      // Increment turn and increase foe HP
      const newTurn = state.currentGame.current_turn + 1
      const newFoeHp = state.currentGame.foe_hp + 10

      const { error } = await supabase
        .from('games')
        .update({
          current_turn: newTurn,
          foe_hp: newFoeHp,
        })
        .eq('id', state.currentGame.id)

      if (error) throw error

      // Calculate facility production
      let newOre = state.inventory?.ore || 0
      let newCrystals = state.inventory?.crystals || 0
      let newQuantum = state.inventory?.quantum_materials || 0

      state.facilities.forEach((fac) => {
        newOre += fac.ore_per_turn
        newCrystals += fac.crystals_per_turn
        newQuantum += fac.quantum_per_turn
      })

      // Update inventory with production
      await state.updateInventory({
        ore: newOre,
        crystals: newCrystals,
        quantum_materials: newQuantum,
      })

      // Update local state
      set((s) => ({
        currentGame: s.currentGame
          ? { ...s.currentGame, current_turn: newTurn, foe_hp: newFoeHp }
          : null,
      }))

      state.addLog(`Turn ${newTurn}: Foe HP now ${newFoeHp}. Facilities produced resources.`)
    } catch (error) {
      console.error('Error incrementing turn:', error)
    }
  },

  updateInventory: async (updates: Partial<Inventory>) => {
    const state = get()
    if (!state.inventory) return

    try {
      const { error } = await supabase
        .from('inventory')
        .update(updates)
        .eq('id', state.inventory.id)

      if (error) throw error

      set((s) => ({
        inventory: s.inventory ? { ...s.inventory, ...updates } : null,
      }))
    } catch (error) {
      console.error('Error updating inventory:', error)
    }
  },

  buildFacility: async (planetId: string, facilityType: string) => {
    const state = get()
    if (!state.inventory || !state.currentGame) return

    try {
      const facilitySpec = FACILITY_PRODUCTION[facilityType as keyof typeof FACILITY_PRODUCTION]?.[0]
      if (!facilitySpec) return

      // Check resources
      if (
        state.inventory.ore < facilitySpec.cost.ore ||
        state.inventory.credits < facilitySpec.cost.credits
      ) {
        state.addLog('Not enough resources to build facility.')
        return
      }

      // Deduct cost
      await state.updateInventory({
        ore: state.inventory.ore - facilitySpec.cost.ore,
        credits: state.inventory.credits - facilitySpec.cost.credits,
      })

      // Create facility
      const { error } = await supabase.from('facilities').insert({
        planet_id: planetId,
        facility_type: facilityType,
        level: 1,
        ore_per_turn: facilitySpec.ore || 0,
        crystals_per_turn: facilitySpec.crystals || 0,
        quantum_per_turn: facilitySpec.quantum || 0,
      })

      if (error) throw error

      // Progress time
      await state.incrementTurn()
      state.addLog(`Built ${facilityType} facility on planet. Ready to produce!`)
    } catch (error) {
      console.error('Error building facility:', error)
    }
  },

  upgradeFacility: async (facilityId: string) => {
    const state = get()
    if (!state.inventory || !state.currentGame) return

    try {
      const facility = state.facilities.find((f) => f.id === facilityId)
      if (!facility) return

      const facilitySpec = FACILITY_PRODUCTION[facility.facility_type as keyof typeof FACILITY_PRODUCTION]
      const nextLevel = facilitySpec[facility.level]
      if (!nextLevel) {
        state.addLog('Facility already at max level.')
        return
      }

      // Check resources
      if (state.inventory.ore < nextLevel.cost.ore || state.inventory.credits < nextLevel.cost.credits) {
        state.addLog('Not enough resources to upgrade facility.')
        return
      }

      // Deduct cost
      await state.updateInventory({
        ore: state.inventory.ore - nextLevel.cost.ore,
        credits: state.inventory.credits - nextLevel.cost.credits,
      })

      // Upgrade facility
      const { error } = await supabase
        .from('facilities')
        .update({
          level: facility.level + 1,
          ore_per_turn: nextLevel.ore || facility.ore_per_turn,
          crystals_per_turn: nextLevel.crystals || facility.crystals_per_turn,
          quantum_per_turn: nextLevel.quantum || facility.quantum_per_turn,
        })
        .eq('id', facilityId)

      if (error) throw error

      // Progress time
      await state.incrementTurn()
      state.addLog(`Upgraded ${facility.facility_type} to level ${facility.level + 1}!`)
    } catch (error) {
      console.error('Error upgrading facility:', error)
    }
  },

  discoverLocation: async (locationId: string) => {
    const state = get()
    if (!state.inventory || !state.currentGame) return

    try {
      const location = state.locations.find((l) => l.id === locationId)
      if (!location || location.discovered) return

      // Mark as discovered
      await supabase.from('locations').update({ discovered: true }).eq('id', locationId)

      // Add resources if available
      if (location.resource_type && location.resource_amount > 0) {
        const updates: Record<string, number> = {}
        updates[location.resource_type] = (state.inventory[location.resource_type as keyof Inventory] as number) +
          location.resource_amount

        await state.updateInventory(updates as Partial<Inventory>)
        state.addLog(`Discovered ${location.name}! Found ${location.resource_amount} ${location.resource_type}.`)
      } else {
        state.addLog(`Discovered ${location.name}. Nothing here.`)
      }

      // Progress time
      await state.incrementTurn()
    } catch (error) {
      console.error('Error discovering location:', error)
    }
  },

  buildShip: async (shipName: string) => {
    const state = get()
    if (!state.inventory || !state.currentGame) return

    try {
      // Ship building cost
      const shipCost = { ore: 400, crystals: 100, credits: 300 }

      if (
        state.inventory.ore < shipCost.ore ||
        state.inventory.crystals < shipCost.crystals ||
        state.inventory.credits < shipCost.credits
      ) {
        state.addLog('Not enough resources to build ship.')
        return
      }

      // Deduct cost
      await state.updateInventory({
        ore: state.inventory.ore - shipCost.ore,
        crystals: state.inventory.crystals - shipCost.crystals,
        credits: state.inventory.credits - shipCost.credits,
      })

      // Create ship
      const { error } = await supabase
        .from('ships')
        .insert({
          game_id: state.currentGame.id,
          name: shipName,
          hull_type: 'fighter',
          hull_level: 1,
          engine_level: 1,
          weapon_level: 1,
          shield_level: 1,
          status: 'ready',
          health: 500,
          max_health: 500,
          cargo_capacity: 1000,
        })
        .select()
        .single()

      if (error) throw error

      // Progress time
      await state.incrementTurn()
      state.addLog(`Built ship "${shipName}". Ready to explore!`)
    } catch (error) {
      console.error('Error building ship:', error)
    }
  },

  addLog: (message: string) => {
    set((state) => ({
      gameLog: [...state.gameLog.slice(-19), message], // Keep last 20 messages
    }))
  },
}))
