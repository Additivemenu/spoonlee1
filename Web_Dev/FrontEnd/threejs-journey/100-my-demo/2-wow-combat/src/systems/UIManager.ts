import { Player } from "../entities/Player";
import { Monster } from "../entities/Monster";

/**
 * UI Manager for updating game UI
 */
export class UIManager {
  private playerHealthText: HTMLElement;
  private playerHealthBar: HTMLElement;
  private playerEnergyText: HTMLElement;
  private playerEnergyBar: HTMLElement;
  private monsterStateText: HTMLElement;

  // Target frame elements
  private targetFrame: HTMLElement;
  private targetNameText: HTMLElement;
  private targetHealthText: HTMLElement;
  private targetHealthBar: HTMLElement;

  private skillButtons: Map<string, HTMLElement> = new Map();

  constructor() {
    // Get UI elements
    this.playerHealthText = document.getElementById("player-health")!;
    this.playerHealthBar = document.getElementById("player-health-bar")!;
    this.playerEnergyText = document.getElementById("player-energy")!;
    this.playerEnergyBar = document.getElementById("player-energy-bar")!;
    this.monsterStateText = document.getElementById("monster-state")!;

    // Get target frame elements
    this.targetFrame = document.getElementById("target-frame")!;
    this.targetNameText = document.getElementById("target-name")!;
    this.targetHealthText = document.getElementById("target-health")!;
    this.targetHealthBar = document.getElementById("target-health-bar")!;

    // Get skill buttons
    this.skillButtons.set("attack", document.getElementById("skill-attack")!);
    this.skillButtons.set("heavy", document.getElementById("skill-heavy")!);
    this.skillButtons.set("heal", document.getElementById("skill-heal")!);
  }

  /**
   * Update player stats display
   */
  updatePlayerStats(player: Player): void {
    // Health
    const healthPercent = (player.currentHealth / player.maxHealth) * 100;
    this.playerHealthText.textContent = Math.ceil(
      player.currentHealth,
    ).toString();
    this.playerHealthBar.style.width = `${healthPercent}%`;

    // Energy
    const energyPercent = (player.currentEnergy / player.maxEnergy) * 100;
    this.playerEnergyText.textContent = Math.ceil(
      player.currentEnergy,
    ).toString();
    this.playerEnergyBar.style.width = `${energyPercent}%`;
  }

  /**
   * Update skill button states
   */
  updateSkillButtons(player: Player): void {
    const skillManager = player.getSkillManager();

    this.skillButtons.forEach((button, skillName) => {
      const isReady = skillManager.isSkillReady(skillName);

      if (isReady) {
        button.classList.remove("cooldown");
      } else {
        button.classList.add("cooldown");
      }
    });
  }

  /**
   * Update monster state display
   */
  updateMonsterState(monster: Monster | null): void {
    if (monster) {
      this.monsterStateText.textContent = monster.getCurrentState();
    } else {
      this.monsterStateText.textContent = "No Monster";
    }
  }

  /**
   * Update target frame display
   */
  updateTargetFrame(player: Player): void {
    const target = player.target;

    if (target && !target.isDead) {
      // Show target frame
      this.targetFrame.classList.remove("hidden");

      // Update target info
      this.targetNameText.textContent = "Monster";
      this.targetHealthText.textContent = Math.ceil(
        target.currentHealth,
      ).toString();

      // Update health bar
      const healthPercent = (target.currentHealth / target.maxHealth) * 100;
      this.targetHealthBar.style.width = `${healthPercent}%`;
    } else {
      // Hide target frame
      this.targetFrame.classList.add("hidden");
    }
  }
}
