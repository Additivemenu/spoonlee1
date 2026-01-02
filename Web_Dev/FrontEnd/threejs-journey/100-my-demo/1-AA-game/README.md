# AA Game - Anti-Aircraft Shooter

A 3D anti-aircraft game built with Three.js and TypeScript featuring a modular, maintainable architecture.

## 🏗️ Architecture

The game follows a **Manager Pattern** with clear separation of concerns:

```
AAGame (Main Coordinator)
├── SceneManager      - Scene, camera, renderer, lighting, environment
├── WeaponManager     - AA gun, bullets, shooting mechanics
├── EnemyManager      - Plane spawning, movement, lifecycle
├── CollisionManager  - Collision detection, explosion effects
├── UIManager         - Score display, UI updates
├── InputManager      - Mouse and keyboard input handling
└── AudioManager      - Sound effects (gun fire, explosions, hits)
```

## 📁 Project Structure

```
src/
├── main.ts              # Main game coordinator (AAGame class)
├── types.ts             # Shared TypeScript interfaces and types
├── SceneManager.ts      # Scene setup and rendering
├── WeaponManager.ts     # Weapon and bullet management
├── EnemyManager.ts      # Enemy plane management
├── CollisionManager.ts  # Collision detection and effects
├── UIManager.ts         # UI state management
├── InputManager.ts      # Input event handling
└── AudioManager.ts      # Sound effects and audio
```

## 🎮 How to Play

- **Move Mouse**: Aim the AA gun
- **Left Click** or **Space**: Shoot
- **M Key** or **Click Sound Button**: Toggle sound on/off
- Destroy planes to earn points!

## 🔊 Audio Features

The game includes immersive sound effects:

- **Gun Fire**: Punchy gunshot sound when shooting
- **Explosion**: Rumbling explosion when planes are destroyed
- **Hit**: Metallic ping sound on successful hits
- **Mute Control**: Toggle sound with M key or button (top-right)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 Modular Design Benefits

### 1. **SceneManager**

- Encapsulates all Three.js scene setup
- Manages camera, renderer, lighting
- Handles window resize events
- Easy to swap rendering configurations

### 2. **WeaponManager**

- Single responsibility: weapon and ammunition
- Creates and tracks bullets
- Handles gun rotation and recoil effects
- Exposes clean API: `shoot()`, `update()`, `getBullets()`

### 3. **EnemyManager**

- Manages all enemy entities
- Controls spawning logic and intervals
- Updates enemy positions and lifecycle
- Easy to add new enemy types

### 4. **CollisionManager**

- Pure collision detection logic
- Callback-based hit handling
- Creates visual effects (explosions)
- Decoupled from game entities

### 5. **UIManager**

- Simple UI state updates
- Separates presentation from game logic
- Easy to extend with new UI elements

### 6. **InputManager**

- Centralizes all user input
- Event-driven architecture with callbacks
- Provides utility methods for aim direction
- Easy to add new control schemes

### 7. **AudioManager**

- Synthesized sound effects using Web Audio API
- Gun fire, explosion, and hit sounds
- Volume control and mute functionality
- Optimized for performance

### 8. **AAGame (Coordinator)**

- Orchestrates all managers
- Maintains game state
- Runs game loop
- Clean, focused responsibility

## 🎯 Key Design Patterns

- **Manager Pattern**: Each manager handles one aspect of the game
- **Dependency Injection**: Managers receive dependencies via constructor
- **Callback Pattern**: Loose coupling between managers
- **Single Responsibility**: Each class has one clear purpose

## 🔄 Adding New Features

### Add a new weapon type:

1. Extend `WeaponManager` with new weapon logic
2. No changes needed to other managers

### Add power-ups:

1. Create `PowerUpManager` following the same pattern
2. Register with `AAGame` coordinator
3. Hook into collision system via callbacks

### Add new enemy types:

1. Extend `EnemyManager` with new enemy creation logic
2. Collision and scoring work automatically

## 📊 Game Configuration

Modify `config` object in `main.ts`:

```typescript
private readonly config: GameConfig = {
  planeSpawnInterval: 2000,  // Time between plane spawns (ms)
  bulletSpeed: 50,           // Bullet velocity
  bulletLifetime: 3,         // Bullet lifetime (seconds)
};
```

## 🧪 Testing

Each manager can be tested independently:

- Mock dependencies for unit tests
- Test managers in isolation
- Integration tests via AAGame coordinator

## 🎨 Customization

- **Visual**: Modify geometry in respective managers
- **Gameplay**: Adjust config values
- **Controls**: Extend InputManager
- **Effects**: Enhance CollisionManager

## 📝 License

MIT
