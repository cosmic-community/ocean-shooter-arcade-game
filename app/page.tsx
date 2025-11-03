import GameContainer from '@/components/GameContainer'
import { getGameSettings, getHighScores } from '@/lib/cosmic'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const settings = await getGameSettings()
  const highScores = await getHighScores(5)
  
  const defaultSettings = {
    credit_cost: 1,
    fish_points: 10,
    mermaid_points: 25,
    starting_speed: 2,
    difficulty_multiplier: 0.5,
    max_creatures: 8,
    game_duration: 60
  }
  
  const gameConfig = settings?.metadata || defaultSettings
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-ocean-dark via-ocean-deep to-ocean-medium py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-arcade-cyan text-shadow-arcade mb-2 glow-cyan">
            🌊 OCEAN SHOOTER 🌊
          </h1>
          <p className="text-xl text-ocean-surface">
            Shoot fish and mermaids to score points!
          </p>
        </header>
        
        <GameContainer 
          gameConfig={gameConfig}
          initialHighScores={highScores}
        />
      </div>
    </main>
  )
}