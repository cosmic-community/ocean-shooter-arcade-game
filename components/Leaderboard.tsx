'use client'

interface LeaderboardProps {
  highScores: any[];
}

export default function Leaderboard({ highScores }: LeaderboardProps) {
  return (
    <div className="game-panel h-full">
      <h2 className="text-2xl font-bold text-arcade-yellow text-center mb-4 glow-yellow">
        🏆 HIGH SCORES 🏆
      </h2>
      
      {highScores && highScores.length > 0 ? (
        <div className="space-y-2">
          {highScores.map((score, index) => {
            const playerName = score.metadata?.player_name || 'Player'
            const points = score.metadata?.score || 0
            
            return (
              <div
                key={score.id}
                className="flex items-center justify-between p-3 bg-ocean-medium rounded-lg border-2 border-ocean-light"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${
                    index === 0 ? 'text-arcade-yellow' :
                    index === 1 ? 'text-gray-300' :
                    index === 2 ? 'text-orange-400' :
                    'text-ocean-surface'
                  }`}>
                    #{index + 1}
                  </span>
                  <span className="text-lg">{playerName}</span>
                </div>
                <span className="text-xl font-bold text-arcade-cyan">
                  {points}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-ocean-surface">
          <p>No high scores yet!</p>
          <p className="text-sm mt-2">Be the first to set a record! 🎮</p>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-ocean-light text-center text-sm text-ocean-surface">
        <p>💡 <strong>Tip:</strong> Mermaids are slower but worth more points!</p>
      </div>
    </div>
  )
}