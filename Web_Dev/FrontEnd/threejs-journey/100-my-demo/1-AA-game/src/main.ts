import * as THREE from "three";
import { SceneManager } from "./SceneManager";
import { WeaponManager } from "./WeaponManager";
import { EnemyManager } from "./EnemyManager";
import { CollisionManager } from "./CollisionManager";
import { UIManager } from "./UIManager";
import { InputManager } from "./InputManager";
import { AudioManager } from "./AudioManager";
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
  private audioManager: AudioManager;

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
    this.audioManager = new AudioManager();

    // Setup input callbacks
    this.inputManager.onShoot(() => this.handleShoot());
    this.inputManager.onMuteToggle(() => this.handleMuteToggle());
    this.inputManager.onCameraRotation((deltaX, deltaY) =>
      this.sceneManager.rotateCamera(deltaX, deltaY),
    );

    // Setup mute button
    const muteButton = document.getElementById("muteButton");
    if (muteButton) {
      muteButton.addEventListener("click", () => this.handleMuteToggle());
    }

    // Resume audio context on first user interaction (browser requirement)
    window.addEventListener("click", () => this.audioManager.resume(), {
      once: true,
    });

    // Start game loop
    this.animate();
  }

  private handleShoot(): void {
    if (!this.gameState.isRunning) return;

    // Get bullet start position from gun barrel tip
    const bulletStartPos = this.weaponManager.getGunPosition();

    // Get actual barrel direction (use barrel's actual pointing direction)
    const shootDirection = this.weaponManager.getBarrelDirection();

    this.weaponManager.shoot(bulletStartPos, shootDirection);

    // Play gun fire sound
    this.audioManager.playGunFire();

    // Visual feedback - crosshair flash
    this.flashCrosshair();
  }

  private flashCrosshair(): void {
    const crosshair = document.getElementById("crosshair");
    if (crosshair) {
      crosshair.style.borderColor = "rgba(255, 0, 0, 1)";
      crosshair.style.boxShadow =
        "0 0 20px rgba(255, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 0, 0.5)";

      setTimeout(() => {
        crosshair.style.borderColor = "rgba(0, 255, 0, 0.6)";
        crosshair.style.boxShadow =
          "0 0 10px rgba(0, 255, 0, 0.3), inset 0 0 10px rgba(0, 255, 0, 0.2)";
      }, 100);
    }
  }

  private handleMuteToggle(): void {
    this.audioManager.toggleMute();

    // Update button text
    const muteButton = document.getElementById("muteButton");
    if (muteButton) {
      muteButton.textContent = this.audioManager.getMuted()
        ? "🔇 Muted"
        : "🔊 Sound";
    }
  }

  //! update data every frame
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

        // Play hit and explosion sounds
        this.audioManager.playHit();
        this.audioManager.playExplosion();

        // Visual feedback - hit marker
        this.showHitMarker();

        // Update score
        this.gameState.score += 100;
        this.gameState.planesDestroyed++;
        this.uiManager.updateScore(this.gameState);
      },
    );
  }

  private showHitMarker(): void {
    const crosshair = document.getElementById("crosshair");
    if (crosshair) {
      // Temporarily enlarge crosshair to indicate hit
      crosshair.style.transform = "translate(-50%, -50%) scale(1.3)";
      crosshair.style.borderColor = "rgba(255, 255, 0, 1)";
      crosshair.style.boxShadow =
        "0 0 30px rgba(255, 255, 0, 1), inset 0 0 30px rgba(255, 255, 0, 0.8)";

      setTimeout(() => {
        crosshair.style.transform = "translate(-50%, -50%) scale(1)";
        crosshair.style.borderColor = "rgba(0, 255, 0, 0.6)";
        crosshair.style.boxShadow =
          "0 0 10px rgba(0, 255, 0, 0.3), inset 0 0 10px rgba(0, 255, 0, 0.2)";
      }, 150);
    }
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
