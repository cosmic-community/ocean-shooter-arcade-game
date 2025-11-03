'use client'

interface ScoreBoardProps {
  score: number;
  highScore: number;
  credits: number;
}

export default function ScoreBoard({ score, highScore, credits }: ScoreBoardProps) {
  return (
    <div className="game-panel">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-ocean-surface mb-1">SCORE</p>
          <p className="score-display">{score}</p>
        </div>
        
        <div>
          <p className="text-sm text-ocean-surface mb-1">HIGH SCORE</p>
          <p className="score-display text-arcade-yellow">{highScore}</p>
        </div>
        
        <div>
          <p className="text-sm text-ocean-surface mb-1">CREDITS</p>
          <p className="score-display text-arcade-green">{credits}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-ocean-light">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-xs text-ocean-surface">🐠 FISH</p>
            <p className="text-lg font-bold text-orange-400">10 pts</p>
          </div>
          <div>
            <p className="text-xs text-ocean-surface">🧜 MERMAID</p>
            <p className="text-lg font-bold text-cyan-400">25 pts</p>
          </div>
        </div>
      </div>
    </div>
  )
}