import { Player } from "../entities/Player";
import {
  BehaviorTree,
  SequenceNode,
  ConditionNode,
  ActionNode,
} from "../core/BehaviorTree";

/**
 * Skill definition
 */
export interface Skill {
  name: string;
  energyCost: number;
  damage?: number;
  healing?: number;
  range: number;
  cooldown: number;
  currentCooldown: number;
  execute: (player: Player) => void;
}

/**
 * Skill Manager with Behavior Tree logic
 */
export class SkillManager {
  private player: Player;
  private skills: Map<string, Skill> = new Map();
  private globalCooldown: number = 0;
  private readonly GCD_DURATION: number = 1.0; // Global cooldown in seconds

  constructor(player: Player) {
    this.player = player;
    this.initializeSkills();
  }

  /**
   * Initialize all available skills
   */
  private initializeSkills(): void {
    // Basic Attack
    this.skills.set("attack", {
      name: "Attack",
      energyCost: 15,
      damage: 20,
      range: 3,
      cooldown: 0,
      currentCooldown: 0,
      execute: (player: Player) => {
        if (player.target) {
          player.target.takeDamage(20);
          console.log("⚡ Player uses Attack!");
        }
      },
    });

    // Heavy Strike
    this.skills.set("heavy", {
      name: "Heavy Strike",
      energyCost: 30,
      damage: 40,
      range: 3,
      cooldown: 3,
      currentCooldown: 0,
      execute: (player: Player) => {
        if (player.target) {
          player.target.takeDamage(40);
          console.log("💥 Player uses Heavy Strike!");
        }
      },
    });

    // Heal
    this.skills.set("heal", {
      name: "Heal",
      energyCost: 40,
      healing: 30,
      range: 0, // Self-cast
      cooldown: 5,
      currentCooldown: 0,
      execute: (player: Player) => {
        player.heal(30);
        console.log("✨ Player casts Heal!");
      },
    });
  }

  /**
   * Use a skill with behavior tree validation
   */
  useSkill(skillName: string): boolean {
    const skill = this.skills.get(skillName);

    if (!skill) {
      console.log(`❌ Skill "${skillName}" not found`);
      return false;
    }

    // Build behavior tree for skill validation
    // Uses Sequence node: all conditions must succeed in order
    const behaviorTree = new BehaviorTree(
      new SequenceNode([
        // Check 1: Is GCD ready?
        new ConditionNode(
          () => this.globalCooldown === 0,
          `Global cooldown active (${this.globalCooldown.toFixed(1)}s remaining)`,
        ),

        // Check 2: Is skill off cooldown?
        new ConditionNode(
          () => skill.currentCooldown === 0,
          `${skill.name} on cooldown (${skill.currentCooldown.toFixed(1)}s remaining)`,
        ),

        // Check 3: Does player have enough energy?
        new ConditionNode(
          () => this.player.currentEnergy >= skill.energyCost,
          `Not enough energy (need ${skill.energyCost}, have ${this.player.currentEnergy.toFixed(0)})`,
        ),

        // Check 4: Is there a valid target (for damage skills)?
        new ConditionNode(
          () => {
            if (skill.damage && !this.player.target) {
              return false;
            }
            if (skill.damage && this.player.target?.isDead) {
              return false;
            }
            return true;
          },
          skill.damage
            ? !this.player.target
              ? "No target selected"
              : "Target is dead"
            : undefined,
        ),

        // Check 5: Is target in range (for damage skills)?
        new ConditionNode(
          () => {
            if (skill.damage && this.player.target) {
              const distance = this.player.distanceTo(this.player.target);
              return distance <= skill.range;
            }
            return true;
          },
          skill.damage && this.player.target
            ? `Target out of range (${this.player.distanceTo(this.player.target!).toFixed(1)}m / ${skill.range}m)`
            : undefined,
        ),

        // All checks passed - execute skill
        new ActionNode(
          () => this.executeSkill(skill),
          `Executing ${skill.name}`,
        ),
      ]),
    );

    return behaviorTree.execute();
  }

  /**
   * Actually execute the skill
   */
  private executeSkill(skill: Skill): void {
    // Consume energy
    this.player.consumeEnergy(skill.energyCost);

    // Execute skill effect
    skill.execute(this.player);

    // Set cooldowns
    skill.currentCooldown = skill.cooldown;
    this.globalCooldown = this.GCD_DURATION;
  }

  /**
   * Update cooldowns
   */
  update(deltaTime: number): void {
    // Update global cooldown
    if (this.globalCooldown > 0) {
      this.globalCooldown = Math.max(0, this.globalCooldown - deltaTime);
    }

    // Update individual skill cooldowns
    this.skills.forEach((skill) => {
      if (skill.currentCooldown > 0) {
        skill.currentCooldown = Math.max(0, skill.currentCooldown - deltaTime);
      }
    });
  }

  /**
   * Get skill for UI display
   */
  getSkill(skillName: string): Skill | undefined {
    return this.skills.get(skillName);
  }

  /**
   * Check if skill is ready
   */
  isSkillReady(skillName: string): boolean {
    const skill = this.skills.get(skillName);
    if (!skill) return false;

    return (
      this.globalCooldown === 0 &&
      skill.currentCooldown === 0 &&
      this.player.currentEnergy >= skill.energyCost
    );
  }
}
