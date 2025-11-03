'use client'

import { useEffect, useRef } from 'react'
import { GameState } from '@/types'
import {
  createCreature,
  updateCreatures,
  createProjectile,
  updateProjectiles,
  checkCollisions,
  calculateGameSpeed,
  shouldSpawnCreature,
  getRandomCreatureType
} from '@/lib/game-logic'

interface GameCanvasProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameConfig: {
    fish_points?: number;
    mermaid_points?: number;
    starting_speed?: number;
    difficulty_multiplier?: number;
    max_creatures?: number;
  };
  onGameEnd: () => void;
}

export default function GameCanvas({ gameState, setGameState, gameConfig, onGameEnd }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = 500
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])
  
  useEffect(() => {
    if (!gameState.isPlaying) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let lastSpawnTime = Date.now()
    
    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#1a2f4f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add water effect
      ctx.fillStyle = 'rgba(42, 79, 127, 0.3)'
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(0, i * 100 + (Date.now() / 50) % 100, canvas.width, 50)
      }
      
      // Spawn new creatures
      const now = Date.now()
      if (shouldSpawnCreature(
        gameState.creatures.length,
        gameConfig.max_creatures || 8,
        0.02
      ) && now - lastSpawnTime > 1000) {
        const type = getRandomCreatureType()
        const newCreature = createCreature(
          type,
          canvas.height,
          gameConfig.fish_points || 10,
          gameConfig.mermaid_points || 25,
          gameState.gameSpeed
        )
        
        setGameState(prev => ({
          ...prev,
          creatures: [...prev.creatures, newCreature]
        }))
        
        lastSpawnTime = now
      }
      
      // Update creatures
      const updatedCreatures = updateCreatures(gameState.creatures, canvas.width)
      
      // Update projectiles
      const updatedProjectiles = updateProjectiles(gameState.projectiles)
      
      // Check collisions
      const { hitCreatures, remainingCreatures, remainingProjectiles } = checkCollisions(
        updatedCreatures,
        updatedProjectiles
      )
      
      // Update score
      const pointsEarned = hitCreatures.reduce((sum, creature) => sum + creature.points, 0)
      
      if (pointsEarned > 0) {
        const newScore = gameState.score + pointsEarned
        const newSpeed = calculateGameSpeed(
          newScore,
          gameConfig.starting_speed || 2,
          gameConfig.difficulty_multiplier || 0.5
        )
        
        setGameState(prev => ({
          ...prev,
          score: newScore,
          gameSpeed: newSpeed,
          creatures: remainingCreatures,
          projectiles: remainingProjectiles
        }))
      } else {
        setGameState(prev => ({
          ...prev,
          creatures: remainingCreatures,
          projectiles: remainingProjectiles
        }))
      }
      
      // Draw creatures
      gameState.creatures.forEach(creature => {
        ctx.fillStyle = creature.color
        
        if (creature.type === 'fish') {
          // Draw simple fish
          ctx.beginPath()
          ctx.ellipse(creature.x, creature.y, creature.size, creature.size * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()
          
          // Fish tail
          ctx.beginPath()
          ctx.moveTo(creature.x - creature.size, creature.y)
          ctx.lineTo(creature.x - creature.size - 10, creature.y - 10)
          ctx.lineTo(creature.x - creature.size - 10, creature.y + 10)
          ctx.closePath()
          ctx.fill()
        } else {
          // Draw mermaid
          ctx.beginPath()
          ctx.arc(creature.x, creature.y - 10, creature.size * 0.4, 0, Math.PI * 2)
          ctx.fill()
          
          // Body
          ctx.fillRect(creature.x - creature.size * 0.3, creature.y - 5, creature.size * 0.6, creature.size * 0.8)
          
          // Tail
          ctx.beginPath()
          ctx.moveTo(creature.x - creature.size * 0.3, creature.y + creature.size * 0.75)
          ctx.lineTo(creature.x, creature.y + creature.size * 1.2)
          ctx.lineTo(creature.x + creature.size * 0.3, creature.y + creature.size * 0.75)
          ctx.closePath()
          ctx.fill()
        }
      })
      
      // Draw projectiles
      gameState.projectiles.forEach(projectile => {
        ctx.fillStyle = '#ffff00'
        ctx.beginPath()
        ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2)
        ctx.fill()
      })
      
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, gameConfig, setGameState])
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameState.isPlaying) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Create projectile from center of canvas
    const centerX = canvas.width / 2
    const centerY = canvas.height
    
    const projectile = createProjectile(centerX, centerY, x, y)
    
    setGameState(prev => ({
      ...prev,
      projectiles: [...prev.projectiles, projectile]
    }))
  }
  
  return (
    <div className="game-panel">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full rounded-lg border-2 border-ocean-light"
      />
    </div>
  )
}