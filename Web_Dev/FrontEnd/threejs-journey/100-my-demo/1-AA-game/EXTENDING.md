# Extending the AA Game

This guide shows how to add new features to the modular AA game.

## Example 1: Add a New Enemy Type (Helicopters)

### Step 1: Extend EnemyManager

```typescript
// In EnemyManager.ts

interface Enemy {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  health: number;
  type: 'plane' | 'helicopter'; // Add type
}

private createHelicopter(): Enemy {
  const heliGroup = new THREE.Group();

  // Create helicopter geometry
  const bodyGeometry = new THREE.BoxGeometry(0.8, 0.5, 1.5);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x00AA00 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  heliGroup.add(body);

  // Add rotor
  const rotorGeometry = new THREE.BoxGeometry(2, 0.1, 0.2);
  const rotor = new THREE.Mesh(rotorGeometry, bodyMaterial);
  rotor.position.y = 0.5;
  heliGroup.add(rotor);

  // Spawn position
  const startX = Math.random() * 40 - 20;
  const startY = 10 + Math.random() * 10;
  const startZ = -50;
  heliGroup.position.set(startX, startY, startZ);

  this.scene.add(heliGroup);

  return {
    mesh: heliGroup,
    velocity: new THREE.Vector3(0, 0, 3), // Slower, straight path
    health: 2, // Takes 2 hits
    type: 'helicopter'
  };
}

public spawnEnemies(deltaTime: number): void {
  this.lastSpawn += deltaTime;

  if (this.lastSpawn >= this.config.spawnInterval) {
    // 70% planes, 30% helicopters
    const enemy = Math.random() < 0.7
      ? this.createPlane()
      : this.createHelicopter();
    this.enemies.push(enemy);
    this.lastSpawn = 0;
  }
}
```

### Step 2: Update Collision Detection

```typescript
// In CollisionManager.ts or AAGame

onHit: (bullet, enemy) => {
  this.weaponManager.removeBullet(bullet);

  enemy.health--;
  if (enemy.health <= 0) {
    this.enemyManager.removeEnemy(enemy);
    const points = enemy.type === "helicopter" ? 200 : 100;
    this.gameState.score += points;
  }

  this.uiManager.updateScore(this.gameState);
};
```

## Example 2: Add Power-Ups

### Step 1: Create PowerUpManager

```typescript
// src/PowerUpManager.ts

export interface PowerUp {
  mesh: THREE.Mesh;
  type: "rapidFire" | "multiShot" | "health";
  position: THREE.Vector3;
}

export class PowerUpManager {
  private powerUps: PowerUp[] = [];
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public spawnPowerUp(position: THREE.Vector3, type: PowerUp["type"]): void {
    const geometry = new THREE.SphereGeometry(0.5);
    const material = new THREE.MeshStandardMaterial({
      color: type === "rapidFire" ? 0xff0000 : 0x00ff00,
      emissive: 0xffff00,
      emissiveIntensity: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    this.scene.add(mesh);

    this.powerUps.push({ mesh, type, position });
  }

  public update(deltaTime: number): void {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];

      // Rotate for visual effect
      powerUp.mesh.rotation.y += deltaTime * 2;

      // Fall slowly
      powerUp.mesh.position.y -= deltaTime * 2;

      // Remove if too low
      if (powerUp.mesh.position.y < 0) {
        this.scene.remove(powerUp.mesh);
        this.powerUps.splice(i, 1);
      }
    }
  }

  public getPowerUps(): PowerUp[] {
    return this.powerUps;
  }

  public removePowerUp(powerUp: PowerUp): void {
    const index = this.powerUps.indexOf(powerUp);
    if (index > -1) {
      this.scene.remove(powerUp.mesh);
      this.powerUps.splice(index, 1);
    }
  }
}
```

### Step 2: Integrate with AAGame

```typescript
// In main.ts

class AAGame {
  private powerUpManager: PowerUpManager;

  constructor() {
    // ... existing initialization

    this.powerUpManager = new PowerUpManager(this.sceneManager.scene);
  }

  private update(deltaTime: number): void {
    // ... existing updates

    // Update power-ups
    this.powerUpManager.update(deltaTime);

    // Check power-up collection
    this.checkPowerUpCollisions();
  }

  private checkPowerUpCollisions(): void {
    const gunPosition = this.weaponManager.getGunPosition();

    this.powerUpManager.getPowerUps().forEach((powerUp) => {
      const distance = gunPosition.distanceTo(powerUp.position);

      if (distance < 2) {
        this.activatePowerUp(powerUp.type);
        this.powerUpManager.removePowerUp(powerUp);
      }
    });
  }

  private activatePowerUp(type: PowerUp["type"]): void {
    switch (type) {
      case "rapidFire":
        // Temporarily increase fire rate
        this.config.bulletSpeed *= 1.5;
        setTimeout(() => {
          this.config.bulletSpeed /= 1.5;
        }, 10000);
        break;
      // ... other power-ups
    }
  }
}
```

### Step 3: Drop Power-Ups on Enemy Death

```typescript
// In collision callback

onHit: (bullet, enemy) => {
  // ... existing logic

  // 20% chance to drop power-up
  if (Math.random() < 0.2) {
    const powerUpType = Math.random() < 0.5 ? "rapidFire" : "multiShot";
    this.powerUpManager.spawnPowerUp(enemy.mesh.position, powerUpType);
  }
};
```

## Example 3: Add Weapon Upgrades

### Step 1: Extend WeaponManager

```typescript
// In WeaponManager.ts

export class WeaponManager {
  private weaponLevel = 1;
  private maxLevel = 3;

  public upgrade(): boolean {
    if (this.weaponLevel < this.maxLevel) {
      this.weaponLevel++;
      this.updateGunVisuals();
      return true;
    }
    return false;
  }

  public shoot(position: THREE.Vector3, direction: THREE.Vector3): void {
    // Multi-shot based on weapon level
    const spread = 0.1;

    for (let i = 0; i < this.weaponLevel; i++) {
      const offset = (i - (this.weaponLevel - 1) / 2) * spread;
      const spreadDirection = direction.clone();
      spreadDirection.x += offset;
      spreadDirection.normalize();

      const bullet = this.createBullet(position, spreadDirection);
      this.bullets.push(bullet);
    }

    this.playRecoilAnimation();
  }

  private updateGunVisuals(): void {
    // Make gun larger/different color based on level
    this.gun.scale.setScalar(1 + (this.weaponLevel - 1) * 0.2);
  }
}
```

## Example 4: Add Game States

### Step 1: Create GameStateManager

```typescript
// src/GameStateManager.ts

export type GameMode = "menu" | "playing" | "paused" | "gameOver";

export class GameStateManager {
  private currentState: GameMode = "menu";
  private callbacks: Map<GameMode, Array<() => void>> = new Map();

  public setState(newState: GameMode): void {
    this.currentState = newState;
    this.callbacks.get(newState)?.forEach((cb) => cb());
  }

  public getState(): GameMode {
    return this.currentState;
  }

  public onStateChange(state: GameMode, callback: () => void): void {
    if (!this.callbacks.has(state)) {
      this.callbacks.set(state, []);
    }
    this.callbacks.get(state)?.push(callback);
  }
}
```

### Step 2: Integrate with AAGame

```typescript
// In main.ts

private stateManager: GameStateManager;

constructor() {
  this.stateManager = new GameStateManager();

  this.stateManager.onStateChange('playing', () => {
    this.gameState.isRunning = true;
  });

  this.stateManager.onStateChange('paused', () => {
    this.gameState.isRunning = false;
  });

  // Start in menu state
  this.stateManager.setState('menu');
}

// Add pause functionality in InputManager
window.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    const currentState = this.stateManager.getState();
    this.stateManager.setState(
      currentState === 'playing' ? 'paused' : 'playing'
    );
  }
});
```

## Testing Your Extensions

```typescript
// Example unit test for PowerUpManager
describe("PowerUpManager", () => {
  let scene: THREE.Scene;
  let manager: PowerUpManager;

  beforeEach(() => {
    scene = new THREE.Scene();
    manager = new PowerUpManager(scene);
  });

  it("should spawn power-up at position", () => {
    const position = new THREE.Vector3(0, 10, 0);
    manager.spawnPowerUp(position, "rapidFire");

    expect(manager.getPowerUps()).toHaveLength(1);
    expect(manager.getPowerUps()[0].type).toBe("rapidFire");
  });

  it("should remove power-up when it falls below ground", () => {
    manager.spawnPowerUp(new THREE.Vector3(0, 0.5, 0), "rapidFire");
    manager.update(1); // 1 second update

    expect(manager.getPowerUps()).toHaveLength(0);
  });
});
```

## Best Practices

1. **Keep managers independent**: Each manager should work without knowing implementation details of others
2. **Use callbacks for communication**: Avoid direct manager-to-manager calls
3. **Maintain single responsibility**: Each manager handles one aspect
4. **Test in isolation**: Unit test managers independently
5. **Document your extensions**: Add comments and update README

## Common Patterns

- **New entity type**: Extend appropriate manager (Enemy/Weapon/PowerUp)
- **New game mechanic**: Create new manager, register with AAGame
- **New visual effect**: Add to CollisionManager or create EffectsManager
- **New input**: Extend InputManager with new event handlers
- **New UI element**: Extend UIManager with new DOM references
