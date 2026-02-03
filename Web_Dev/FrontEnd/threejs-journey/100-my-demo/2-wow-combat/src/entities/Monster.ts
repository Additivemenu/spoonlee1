import * as THREE from "three";
import { Entity } from "./Entity";
import { StateMachine, IState } from "../core/StateMachine";

/**
 * Monster Entity with FSM-based AI
 */
export class Monster extends Entity {
  private fsm: StateMachine;
  private moveSpeed: number = 3;
  private attackRange: number = 2;
  private chaseRange: number = 10;
  private attackDamage: number = 15;
  private attackCooldown: number = 2; // seconds
  private lastAttackTime: number = 0;

  constructor(mesh: THREE.Mesh) {
    super(mesh, 80, 0); // Monsters don't use energy
    this.fsm = new StateMachine();
    this.initializeStates();
  }

  /**
   * Initialize FSM states
   */
  private initializeStates(): void {
    // Idle State
    this.fsm.addState({
      name: "Idle",
      enter: () => {
        console.log("🧟 Monster: Entering Idle state");
      },
      update: (deltaTime: number) => {
        if (!this.target || this.target.isDead) return;

        const distance = this.distanceTo(this.target);
        if (distance <= this.chaseRange) {
          this.fsm.setState("Chase");
        }
      },
      exit: () => {},
    });

    // Chase State
    this.fsm.addState({
      name: "Chase",
      enter: () => {
        console.log("🏃 Monster: Entering Chase state");
      },
      update: (deltaTime: number) => {
        if (!this.target || this.target.isDead) {
          this.fsm.setState("Idle");
          return;
        }

        const distance = this.distanceTo(this.target);

        if (distance > this.chaseRange) {
          this.fsm.setState("Idle");
          return;
        }

        if (distance <= this.attackRange) {
          this.fsm.setState("Attack");
          return;
        }

        // Move towards target
        const direction = new THREE.Vector3()
          .subVectors(this.target.position, this.position)
          .normalize();

        this.position.add(direction.multiplyScalar(this.moveSpeed * deltaTime));

        // Face target
        this.mesh.lookAt(this.target.position);
      },
      exit: () => {},
    });

    // Attack State
    this.fsm.addState({
      name: "Attack",
      enter: () => {
        console.log("⚔️ Monster: Entering Attack state");
      },
      update: (deltaTime: number) => {
        if (!this.target || this.target.isDead) {
          this.fsm.setState("Idle");
          return;
        }

        const distance = this.distanceTo(this.target);

        if (distance > this.attackRange) {
          this.fsm.setState("Chase");
          return;
        }

        // Attack logic with cooldown
        const currentTime = Date.now() / 1000;
        if (currentTime - this.lastAttackTime >= this.attackCooldown) {
          this.performAttack();
          this.lastAttackTime = currentTime;
        }
      },
      exit: () => {},
    });

    // Start in Idle state
    this.fsm.setState("Idle");
  }

  /**
   * Perform attack on target
   */
  private performAttack(): void {
    if (!this.target) return;

    console.log("👹 Monster attacks!");
    this.target.takeDamage(this.attackDamage);
  }

  /**
   * Set target entity
   */
  setTarget(target: Entity): void {
    this.target = target;
  }

  /**
   * Get current FSM state name
   */
  getCurrentState(): string {
    return this.fsm.getCurrentStateName();
  }

  /**
   * Override death behavior
   */
  protected onDeath(): void {
    super.onDeath();
    this.mesh.material = new THREE.MeshStandardMaterial({
      color: 0x666666,
      emissive: 0x330000,
    });
  }

  /**
   * Update monster logic
   */
  update(deltaTime: number): void {
    if (this.isDead) return;
    this.fsm.update(deltaTime);
  }
}
