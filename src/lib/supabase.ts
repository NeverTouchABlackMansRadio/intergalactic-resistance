import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types
export interface Game {
  id: string
  user_id: string
  created_at: string
  current_turn: number
  foe_hp: number
  foe_discovered: boolean
  game_status: 'active' | 'won' | 'lost'
}

export interface Planet {
  id: string
  game_id: string
  name: string
  planet_type: string
  x: number
  y: number
  is_home: boolean
  population: number
  morale: number
  created_at: string
}

export interface Facility {
  id: string
  planet_id: string
  facility_type: string
  level: number
  ore_per_turn: number
  crystals_per_turn: number
  quantum_per_turn: number
  essence_per_turn: number
  created_at: string
}

export interface Inventory {
  id: string
  game_id: string
  ore: number
  crystals: number
  quantum_materials: number
  credits: number
  alien_essence: number
  updated_at: string
}

export interface Location {
  id: string
  game_id: string
  name: string
  location_type: string
  x: number
  y: number
  discovered: boolean
  visited: boolean
  resource_type: string | null
  resource_amount: number
  visited_count: number
  created_at: string
}

export interface Ship {
  id: string
  game_id: string
  name: string
  hull_type: string
  hull_level: number
  engine_level: number
  weapon_level: number
  shield_level: number
  status: string
  health: number
  max_health: number
  cargo_capacity: number
  created_at: string
}
