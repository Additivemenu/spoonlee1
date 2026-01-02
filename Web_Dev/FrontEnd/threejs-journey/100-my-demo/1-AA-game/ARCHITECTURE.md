# Architecture Diagram

## Class Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         AAGame                               │
│                    (Main Coordinator)                        │
│  - gameState: GameState                                     │
│  - clock: THREE.Clock                                       │
│  - config: GameConfig                                       │
│                                                             │
│  + constructor()                                            │
│  + handleShoot()                                            │
│  + update(deltaTime)                                        │
│  + animate()                                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ manages
                            ▼
        ┌───────────────────────────────────────┐
        │                                       │
        ▼                                       ▼
┌────────────────────┐              ┌────────────────────┐
│   SceneManager     │              │   InputManager     │
│                    │              │                    │
│ - scene            │              │ - mousePosition    │
│ - camera           │              │ - raycaster        │
│ - renderer         │              │ - shootCallbacks   │
│                    │              │                    │
│ + render()         │              │ + onShoot()        │
│ + setupLighting()  │              │ + getAimDirection()│
│ + createGround()   │              │ + getTargetPoint() │
└────────────────────┘              └────────────────────┘
        │                                       │
        │ provides scene                        │ emits events
        ▼                                       ▼
┌────────────────────┐              ┌────────────────────┐
│   WeaponManager    │              │    UIManager       │
│                    │              │                    │
│ - gun: Group       │              │ - scoreElement     │
│ - bullets: []      │              │ - hitsElement      │
│                    │              │                    │
│ + shoot()          │              │ + updateScore()    │
│ + update()         │              │                    │
│ + updateRotation() │              │                    │
│ + getBullets()     │              │                    │
└────────────────────┘              └────────────────────┘
        │
        │ provides bullets
        ▼
┌────────────────────┐              ┌────────────────────┐
│   EnemyManager     │              │ CollisionManager   │
│                    │              │                    │
│ - planes: []       │──provides───▶│                    │
│                    │   planes     │ + checkCollisions()│
│ + spawnPlanes()    │              │ + createExplosion()│
│ + update()         │              │                    │
│ + getPlanes()      │              │                    │
│ + removePlane()    │              │                    │
└────────────────────┘              └────────────────────┘
```

## Data Flow

```
User Input (Mouse/Keyboard)
        │
        ▼
  InputManager
        │
        ├──── Mouse Movement ────▶ AAGame ────▶ WeaponManager.updateRotation()
        │
        └──── Shoot Event ───────▶ AAGame ────▶ WeaponManager.shoot()
                                      │
                                      ▼
                              Update Bullets ────▶ WeaponManager.update()
                                      │
                                      ▼
                              Spawn Enemies ─────▶ EnemyManager.spawnPlanes()
                                      │
                                      ▼
                             Update Enemies ─────▶ EnemyManager.update()
                                      │
                                      ▼
                           Check Collisions ─────▶ CollisionManager.checkCollisions()
                                      │
                                      ├──── Hit Detected ────▶ Remove Bullet/Plane
                                      │                        Create Explosion
                                      ▼
                              Update Score ──────▶ UIManager.updateScore()
                                      │
                                      ▼
                                Render Scene ────▶ SceneManager.render()
```

## Manager Responsibilities

### SceneManager

- ✅ Scene initialization
- ✅ Camera setup
- ✅ Renderer configuration
- ✅ Lighting (ambient + directional)
- ✅ Environment (ground)
- ✅ Window resize handling

### WeaponManager

- ✅ AA gun creation (base, turret, barrel)
- ✅ Gun rotation/aiming
- ✅ Bullet creation and lifecycle
- ✅ Bullet physics
- ✅ Tracer effects
- ✅ Gun recoil animation

### EnemyManager

- ✅ Plane geometry creation
- ✅ Spawn timing and positioning
- ✅ Random flight paths
- ✅ Plane movement and updates
- ✅ Out-of-bounds cleanup

### CollisionManager

- ✅ Distance-based collision detection
- ✅ Explosion visual effects
- ✅ Callback-based hit handling
- ✅ Decoupled from entities

### UIManager

- ✅ DOM element references
- ✅ Score updates
- ✅ Stats display
- ✅ UI state management

### InputManager

- ✅ Mouse movement tracking
- ✅ Click/keyboard events
- ✅ Aim direction calculation
- ✅ Event callbacks
- ✅ Raycasting utilities

### AAGame (Coordinator)

- ✅ Initialize all managers
- ✅ Maintain game state
- ✅ Coordinate updates
- ✅ Run game loop
- ✅ Handle cross-manager communication
