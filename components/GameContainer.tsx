'use client'

import { useState, useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'
import GameControls from '@/components/GameControls'
import ScoreBoard from '@/components/ScoreBoard'
import Leaderboard from '@/components/Leaderboard'
import { GameState } from '@/types'

interface GameContainerProps {
  gameConfig: {
    credit_cost?: number;
    fish_points?: number;
    mermaid_points?: number;
    starting_speed?: number;
    difficulty_multiplier?: number;
    max_creatures?: number;
  };
  initialHighScores: any[];
}

export default function GameContainer({ gameConfig, initialHighScores }: GameContainerProps) {
  const [gameState, setGameState] = useState<GameState>({
    credits: 0,
    score: 0,
    highScore: 0,
    isPlaying: false,
    creatures: [],
    projectiles: [],
    gameSpeed: gameConfig.starting_speed || 2
  })
  
  const [highScores, setHighScores] = useState(initialHighScores)
  
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('oceanShooterHighScore')
    if (savedHighScore) {
      setGameState(prev => ({ ...prev, highScore: parseInt(savedHighScore) }))
    }
  }, [])
  
  useEffect(() => {
    // Save high score to localStorage when it changes
    if (gameState.score > gameState.highScore) {
      localStorage.setItem('oceanShooterHighScore', gameState.score.toString())
      setGameState(prev => ({ ...prev, highScore: gameState.score }))
    }
  }, [gameState.score, gameState.highScore])
  
  const addCredit = () => {
    setGameState(prev => ({ ...prev, credits: prev.credits + 1 }))
  }
  
  const startGame = () => {
    if (gameState.credits >= (gameConfig.credit_cost || 1)) {
      setGameState(prev => ({
        ...prev,
        credits: prev.credits - (gameConfig.credit_cost || 1),
        score: 0,
        isPlaying: true,
        creatures: [],
        projectiles: [],
        gameSpeed: gameConfig.starting_speed || 2
      }))
    }
  }
  
  const endGame = async () => {
    setGameState(prev => ({ ...prev, isPlaying: false }))
    
    // Check if this is a new high score and save it
    if (gameState.score > 0) {
      try {
        const response = await fetch('/api/high-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerName: 'Player',
            score: gameState.score
          })
        })
        
        if (response.ok) {
          // Refresh high scores (in a real app, you'd fetch from the API)
          console.log('High score saved!')
        }
      } catch (error) {
        console.error('Failed to save high score:', error)
      }
    }
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ScoreBoard 
          score={gameState.score}
          highScore={gameState.highScore}
          credits={gameState.credits}
        />
        
        <GameCanvas
          gameState={gameState}
          setGameState={setGameState}
          gameConfig={gameConfig}
          onGameEnd={endGame}
        />
        
        <GameControls
          credits={gameState.credits}
          isPlaying={gameState.isPlaying}
          onAddCredit={addCredit}
          onStartGame={startGame}
          creditCost={gameConfig.credit_cost || 1}
        />
      </div>
      
      <div className="lg:col-span-1">
        <Leaderboard highScores={highScores} />
      </div>
    </div>
  )
}