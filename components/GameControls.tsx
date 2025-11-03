'use client'

interface GameControlsProps {
  credits: number;
  isPlaying: boolean;
  onAddCredit: () => void;
  onStartGame: () => void;
  creditCost: number;
}

export default function GameControls({
  credits,
  isPlaying,
  onAddCredit,
  onStartGame,
  creditCost
}: GameControlsProps) {
  return (
    <div className="game-panel">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="text-center sm:text-left">
          <p className="text-xl text-ocean-surface mb-1">Available Credits</p>
          <p className="text-4xl font-bold text-arcade-yellow glow-yellow">
            {credits}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onAddCredit}
            disabled={isPlaying}
            className="arcade-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💰 Insert Credit
          </button>
          
          <button
            onClick={onStartGame}
            disabled={isPlaying || credits < creditCost}
            className="arcade-button disabled:opacity-50 disabled:cursor-not-allowed bg-arcade-green hover:bg-green-400"
          >
            🎮 Start Game ({creditCost} Credit)
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-center text-ocean-surface">
        <p className="text-sm">
          {isPlaying 
            ? '🎯 Click on the canvas to shoot!'
            : credits >= creditCost
            ? '✅ Ready to play! Click Start Game.'
            : '💰 Insert credits to play!'}
        </p>
      </div>
    </div>
  )
}