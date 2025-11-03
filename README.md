# 🎮 Ocean Shooter Arcade Game

![Game Preview](https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=300&fit=crop&auto=format)

An exciting arcade-style shooting game where players aim and shoot at sea creatures including fish and mermaids swimming across the screen. Insert credits to play, earn points for successful hits, and compete for the high score!

## ✨ Features

- 🎯 **Arcade-Style Shooting Gameplay** - Point and click to shoot at moving sea creatures
- 🐠 **Multiple Target Types** - Fish and mermaids with different point values and behaviors
- 💰 **Credit System** - Insert virtual credits to start playing (arcade-style)
- 📊 **Score Tracking** - Real-time score display and high score persistence
- 🎮 **Progressive Difficulty** - Game gets faster as your score increases
- 🌊 **Ocean Theme** - Beautiful underwater visuals and animations
- 🏆 **Leaderboard** - Track top scores via Cosmic CMS
- 🔊 **Sound Effects** - Audio feedback for shooting, hits, and game events
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6908aec0271316ad9f4d2753&clone_repository=6908b12f271316ad9f4d2767)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Game with fishes and mermaids that you have to shoot to get points and you have to put credits in to have points

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Content management and leaderboard storage
- **HTML Canvas API** - Game rendering and animations
- **Bun** - Fast package manager and runtime

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account and bucket (get one free at [cosmicjs.com](https://www.cosmicjs.com))

### Installation

1. Clone this repository or create a new Next.js project
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Game Settings

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects } = await cosmic.objects
  .find({ type: 'game-settings' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Submitting High Score

```typescript
await cosmic.objects.insertOne({
  title: `${playerName} - ${score}`,
  type: 'high-scores',
  metadata: {
    player_name: playerName,
    score: score,
    date: new Date().toISOString()
  }
})
```

### Fetching Leaderboard

```typescript
const { objects: scores } = await cosmic.objects
  .find({ type: 'high-scores' })
  .props(['id', 'title', 'metadata'])
  .depth(1)

// Sort manually for current SDK version
const sortedScores = scores.sort((a, b) => 
  (b.metadata?.score || 0) - (a.metadata?.score || 0)
)
```

## 🎮 Cosmic CMS Integration

This game uses Cosmic CMS to manage:

1. **Game Settings** - Configure creature point values, credit costs, and difficulty
2. **High Scores** - Persistent leaderboard stored in Cosmic
3. **Game Content** - Instructions, messages, and UI text

### Content Model Structure

**game-settings** Object Type:
- `credit_cost` (Number) - Credits required per game
- `fish_points` (Number) - Points awarded for hitting a fish
- `mermaid_points` (Number) - Points awarded for hitting a mermaid
- `starting_speed` (Number) - Initial creature movement speed
- `difficulty_multiplier` (Number) - Speed increase per score threshold

**high-scores** Object Type:
- `player_name` (Text) - Player's name
- `score` (Number) - Points achieved
- `date` (Date) - When the score was achieved

## 🌐 Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

## 🎯 How to Play

1. **Insert Credits** - Click "Insert Credit" to add credits to your account
2. **Start Game** - Click "Start Game" to begin (costs 1 credit)
3. **Shoot Creatures** - Click anywhere on the game canvas to shoot
4. **Score Points** - Hit fish for 10 points, mermaids for 25 points
5. **Challenge Yourself** - Game gets faster as your score increases!

## 📝 License

This project is open source and available under the MIT License.

<!-- README_END -->