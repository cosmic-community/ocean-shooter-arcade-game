import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getGameSettings() {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-settings' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    if (response.objects && response.objects.length > 0) {
      return response.objects[0];
    }
    return null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch game settings');
  }
}

export async function getHighScores(limit: number = 10) {
  try {
    const response = await cosmic.objects
      .find({ type: 'high-scores' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    // Sort manually for current SDK version
    const sortedScores = response.objects.sort((a, b) => {
      const scoreA = a.metadata?.score || 0;
      const scoreB = b.metadata?.score || 0;
      return scoreB - scoreA;
    });
    
    return sortedScores.slice(0, limit);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch high scores');
  }
}

export async function saveHighScore(playerName: string, score: number) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${playerName} - ${score}`,
      type: 'high-scores',
      metadata: {
        player_name: playerName,
        score: score,
        date: new Date().toISOString()
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error saving high score:', error);
    throw new Error('Failed to save high score');
  }
}