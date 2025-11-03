// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Game settings object type
export interface GameSettings extends CosmicObject {
  type: 'game-settings';
  metadata: {
    credit_cost?: number;
    fish_points?: number;
    mermaid_points?: number;
    starting_speed?: number;
    difficulty_multiplier?: number;
    max_creatures?: number;
    game_duration?: number;
  };
}

// High score object type
export interface HighScore extends CosmicObject {
  type: 'high-scores';
  metadata: {
    player_name: string;
    score: number;
    date: string;
    game_duration?: number;
  };
}

// Game creature types
export type CreatureType = 'fish' | 'mermaid';

export interface Creature {
  id: string;
  type: CreatureType;
  x: number;
  y: number;
  speed: number;
  points: number;
  size: number;
  color: string;
}

export interface Projectile {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
}

export interface GameState {
  credits: number;
  score: number;
  highScore: number;
  isPlaying: boolean;
  creatures: Creature[];
  projectiles: Projectile[];
  gameSpeed: number;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isGameSettings(obj: CosmicObject): obj is GameSettings {
  return obj.type === 'game-settings';
}

export function isHighScore(obj: CosmicObject): obj is HighScore {
  return obj.type === 'high-scores';
}

// Error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}