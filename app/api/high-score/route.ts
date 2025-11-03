import { NextRequest, NextResponse } from 'next/server'
import { saveHighScore } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { playerName, score } = body
    
    if (!playerName || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Player name and score are required' },
        { status: 400 }
      )
    }
    
    const highScore = await saveHighScore(playerName, score)
    
    return NextResponse.json({ success: true, highScore })
  } catch (error) {
    console.error('Error saving high score:', error)
    return NextResponse.json(
      { error: 'Failed to save high score' },
      { status: 500 }
    )
  }
}