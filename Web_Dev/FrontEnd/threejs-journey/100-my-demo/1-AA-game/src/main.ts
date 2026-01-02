import * as THREE from "three";
import { SceneManager } from "./SceneManager";
import { WeaponManager } from "./WeaponManager";
import { EnemyManager } from "./EnemyManager";
import { CollisionManager } from "./CollisionManager";
import { UIManager } from "./UIManager";
import { InputManager } from "./InputManager";
import { GameState, GameConfig } from "./types";

/**
 * AAGame - Main game coordinator that orchestrates all managers
 */
class AAGame {
  // Managers
  private sceneManager: SceneManager;
  private weaponManager: WeaponManager;
  private enemyManager: EnemyManager;
  private collisionManager: CollisionManager;
  private uiManager: UIManager;
  private inputManager: InputManager;

  // Game state
  private gameState: GameState;
  private clock: THREE.Clock;

  // Game configuration
  private readonly config: GameConfig = {
    planeSpawnInterval: 2000, // ms
    bulletSpeed: 50,
    bulletLifetime: 3, // seconds
  };

  constructor() {
    // Initialize game state
    this.gameState = {
      score: 0,
      planesDestroyed: 0,
      isRunning: true,
    };

    // Initialize clock
    this.clock = new THREE.Clock();

    // Get canvas element
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

    // Initialize all managers
    this.sceneManager = new SceneManager(canvas);
    this.weaponManager = new WeaponManager(
      this.sceneManager.scene,
      this.config,
    );
    this.enemyManager = new EnemyManager(this.sceneManager.scene, this.config);
    this.collisionManager = new CollisionManager(this.sceneManager.scene);
    this.uiManager = new UIManager();
    this.inputManager = new InputManager();

    // Setup input callbacks
    this.inputManager.onShoot(() => this.handleShoot());

    // Start game loop
    this.animate();
  }

  private handleShoot(): void {
    if (!this.gameState.isRunning) return;

    const shootDirection = this.inputManager.getAimDirection(
      this.sceneManager.camera,
    );
    const bulletStartPos = this.weaponManager.getGunPosition();

    this.weaponManager.shoot(bulletStartPos, shootDirection);
  }

  private update(deltaTime: number): void {
    if (!this.gameState.isRunning) return;

    // Update gun rotation based on mouse position
    const targetPoint = this.inputManager.getTargetPoint(
      this.sceneManager.camera,
    );
    this.weaponManager.updateGunRotation(targetPoint);

    // Spawn and update enemies
    this.enemyManager.spawnPlanes(deltaTime * 1000); // Convert to ms
    this.enemyManager.update(deltaTime);

    // Update bullets
    this.weaponManager.update(deltaTime);

    // Check collisions
    this.collisionManager.checkCollisions(
      this.weaponManager.getBullets(),
      this.enemyManager.getPlanes(),
      (bullet, plane) => {
        // Handle hit
        this.weaponManager.removeBullet(bullet);
        this.enemyManager.removePlane(plane);

        // Update score
        this.gameState.score += 100;
        this.gameState.planesDestroyed++;
        this.uiManager.updateScore(this.gameState);
      },
    );
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    const deltaTime = this.clock.getDelta();
    this.update(deltaTime);

    // Render the scene
    this.sceneManager.render();
  };
}

// Initialize game when page loads
window.addEventListener("DOMContentLoaded", () => {
  new AAGame();
});
