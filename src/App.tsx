import { useEffect, useState } from 'react'
import { useGameStore } from './store/gameStore'
import Header from './components/Header'
import PlanetView from './components/PlanetView'
import ExplorationView from './components/ExplorationView'
import InventoryPanel from './components/InventoryPanel'
import GameLog from './components/GameLog'
import ActionBar from './components/ActionBar'
import './App.css'

function App() {
  const {
    currentGame,
    currentView,
    createGame,
    loadGame,
  } = useGameStore()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initGame = async () => {
      // Try to load saved game, otherwise create new
      const savedGameId = localStorage.getItem('currentGameId')
      if (savedGameId) {
        await loadGame(savedGameId)
      } else {
        await createGame()
      }
      setInitialized(true)
    }

    initGame()
  }, [])

  useEffect(() => {
    if (currentGame) {
      localStorage.setItem('currentGameId', currentGame.id)
    }
  }, [currentGame])

  if (!initialized || !currentGame) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white text-xl">Loading game...</div>
  }

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Main game view */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-slate-800 rounded-lg p-4 overflow-hidden">
            {currentView === 'planet' && <PlanetView />}
            {currentView === 'exploration' && <ExplorationView />}
          </div>
          
          {/* Action bar */}
          <ActionBar />
        </div>

        {/* Right sidebar */}
        <div className="w-80 flex flex-col gap-4 overflow-hidden">
          <InventoryPanel />
          <GameLog />
        </div>
      </div>
    </div>
  )
}

export default App
