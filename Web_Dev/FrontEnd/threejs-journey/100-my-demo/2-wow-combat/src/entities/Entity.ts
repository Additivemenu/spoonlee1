import * as THREE from "three";

/**
 * Base Entity class for all game objects
 */
export abstract class Entity {
  mesh: THREE.Mesh;
  position: THREE.Vector3;

  // Stats
  maxHealth: number;
  currentHealth: number;
  maxEnergy: number;
  currentEnergy: number;

  // Combat
  isDead: boolean = false;
  target: Entity | null = null;

  constructor(
    mesh: THREE.Mesh,
    maxHealth: number = 100,
    maxEnergy: number = 100,
  ) {
    this.mesh = mesh;
    this.position = mesh.position;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.maxEnergy = maxEnergy;
    this.currentEnergy = maxEnergy;
  }

  /**
   * Calculate distance to another entity (2D distance on XZ plane)
   */
  distanceTo(entity: Entity): number {
    const dx = this.position.x - entity.position.x;
    const dz = this.position.z - entity.position.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  /**
   * Take damage
   */
  takeDamage(amount: number): void {
    this.currentHealth = Math.max(0, this.currentHealth - amount);

    if (this.currentHealth === 0) {
      this.isDead = true;
      this.onDeath();
    }

    console.log(
      `💥 ${this.constructor.name} took ${amount} damage! HP: ${this.currentHealth}/${this.maxHealth}`,
    );
  }

  /**
   * Heal
   */
  heal(amount: number): void {
    const oldHealth = this.currentHealth;
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    const healed = this.currentHealth - oldHealth;

    console.log(
      `💚 ${this.constructor.name} healed ${healed}! HP: ${this.currentHealth}/${this.maxHealth}`,
    );
  }

  /**
   * Consume energy
   */
  consumeEnergy(amount: number): boolean {
    if (this.currentEnergy >= amount) {
      this.currentEnergy -= amount;
      return true;
    }
    return false;
  }

  /**
   * Regenerate energy
   */
  regenerateEnergy(amount: number): void {
    this.currentEnergy = Math.min(this.maxEnergy, this.currentEnergy + amount);
  }

  /**
   * Called when entity dies
   */
  protected onDeath(): void {
    console.log(`☠️ ${this.constructor.name} died!`);
  }

  /**
   * Update logic - to be implemented by subclasses
   */
  abstract update(deltaTime: number): void;
}
