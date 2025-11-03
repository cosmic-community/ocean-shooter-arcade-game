'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-dark via-ocean-deep to-ocean-medium flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full">
        <div className="game-panel text-center">
          <div className="text-6xl mb-6 animate-bounce">⚠️</div>
          <h1 className="text-5xl font-bold text-arcade-cyan text-shadow-arcade mb-4 glow-cyan">
            GAME ERROR
          </h1>
          <div className="mb-8">
            <p className="text-xl text-ocean-surface mb-4">
              Oh no! Something went wrong with the game.
            </p>
            <div className="bg-ocean-dark/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 font-mono text-sm break-words">
                {error.message || 'An unexpected error occurred'}
              </p>
              {error.digest && (
                <p className="text-gray-400 text-xs mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="arcade-button"
            >
              🎮 TRY AGAIN
            </button>
            <a
              href="/"
              className="arcade-button bg-arcade-cyan text-black hover:bg-cyan-400"
            >
              🏠 BACK TO MENU
            </a>
          </div>
          
          <p className="text-sm text-ocean-light mt-8">
            If the problem persists, please refresh the page or contact support.
          </p>
        </div>
      </div>
    </div>
  )
}