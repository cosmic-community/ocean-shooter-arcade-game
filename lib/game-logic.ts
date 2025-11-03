import { Creature, Projectile, CreatureType } from '@/types'

export function createCreature(
  type: CreatureType,
  canvasHeight: number,
  fishPoints: number,
  mermaidPoints: number,
  baseSpeed: number
): Creature {
  const id = Math.random().toString(36).substr(2, 9);
  const y = Math.random() * (canvasHeight - 60) + 30;
  
  if (type === 'fish') {
    return {
      id,
      type: 'fish',
      x: -50,
      y,
      speed: baseSpeed * (0.8 + Math.random() * 0.4),
      points: fishPoints,
      size: 30,
      color: '#FF6B35'
    };
  } else {
    return {
      id,
      type: 'mermaid',
      x: -60,
      y,
      speed: baseSpeed * (0.6 + Math.random() * 0.3),
      points: mermaidPoints,
      size: 40,
      color: '#4ECDC4'
    };
  }
}

export function updateCreatures(
  creatures: Creature[],
  canvasWidth: number
): Creature[] {
  return creatures
    .map(creature => ({
      ...creature,
      x: creature.x + creature.speed
    }))
    .filter(creature => creature.x < canvasWidth + 100);
}

export function createProjectile(
  startX: number,
  startY: number,
  targetX: number,
  targetY: number
): Projectile {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x: startX,
    y: startY,
    targetX,
    targetY,
    speed: 10
  };
}

export function updateProjectiles(projectiles: Projectile[]): Projectile[] {
  return projectiles
    .map(projectile => {
      const dx = projectile.targetX - projectile.x;
      const dy = projectile.targetY - projectile.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < projectile.speed) {
        return { ...projectile, x: projectile.targetX, y: projectile.targetY };
      }
      
      const ratio = projectile.speed / distance;
      return {
        ...projectile,
        x: projectile.x + dx * ratio,
        y: projectile.y + dy * ratio
      };
    })
    .filter(projectile => {
      const dx = projectile.targetX - projectile.x;
      const dy = projectile.targetY - projectile.y;
      return Math.sqrt(dx * dx + dy * dy) > 1;
    });
}

export function checkCollisions(
  creatures: Creature[],
  projectiles: Projectile[]
): { hitCreatures: Creature[], remainingCreatures: Creature[], remainingProjectiles: Projectile[] } {
  const hitCreatures: Creature[] = [];
  const remainingCreatures: Creature[] = [];
  const usedProjectileIds = new Set<string>();
  
  for (const creature of creatures) {
    let hit = false;
    
    for (const projectile of projectiles) {
      if (usedProjectileIds.has(projectile.id)) continue;
      
      const dx = creature.x - projectile.x;
      const dy = creature.y - projectile.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < creature.size) {
        hit = true;
        hitCreatures.push(creature);
        usedProjectileIds.add(projectile.id);
        break;
      }
    }
    
    if (!hit) {
      remainingCreatures.push(creature);
    }
  }
  
  const remainingProjectiles = projectiles.filter(p => !usedProjectileIds.has(p.id));
  
  return { hitCreatures, remainingCreatures, remainingProjectiles };
}

export function calculateGameSpeed(score: number, baseSpeed: number, multiplier: number): number {
  const speedIncrease = Math.floor(score / 100) * multiplier;
  return baseSpeed + speedIncrease;
}

export function shouldSpawnCreature(
  currentCreatures: number,
  maxCreatures: number,
  spawnChance: number = 0.02
): boolean {
  return currentCreatures < maxCreatures && Math.random() < spawnChance;
}

export function getRandomCreatureType(): CreatureType {
  // 70% chance for fish, 30% chance for mermaid
  return Math.random() < 0.7 ? 'fish' : 'mermaid';
}