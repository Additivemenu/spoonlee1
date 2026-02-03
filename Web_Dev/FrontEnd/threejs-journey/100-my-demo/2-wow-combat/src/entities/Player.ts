import * as THREE from "three";
import { Entity } from "./Entity";
import { SkillManager } from "../systems/SkillManager";

/**
 * Player Entity with skill management
 */
export class Player extends Entity {
  private skillManager: SkillManager;
  private moveSpeed: number = 5;
  private moveDirection: THREE.Vector3 = new THREE.Vector3();

  constructor(mesh: THREE.Mesh) {
    super(mesh, 100, 100);
    this.skillManager = new SkillManager(this);
  }

  /**
   * Set movement direction
   */
  setMoveDirection(direction: THREE.Vector3): void {
    this.moveDirection.copy(direction).normalize();
  }

  /**
   * Use a skill
   */
  useSkill(skillName: string): void {
    this.skillManager.useSkill(skillName);
  }

  /**
   * Get skill manager for UI updates
   */
  getSkillManager(): SkillManager {
    return this.skillManager;
  }

  /**
   * Update player logic
   */
  update(deltaTime: number): void {
    if (this.isDead) return;

    // Movement
    if (this.moveDirection.length() > 0) {
      const movement = this.moveDirection
        .clone()
        .multiplyScalar(this.moveSpeed * deltaTime);
      this.position.add(movement);
    }

    // Energy regeneration (10 energy per second)
    this.regenerateEnergy(10 * deltaTime);

    // Update skill cooldowns
    this.skillManager.update(deltaTime);
  }
}
