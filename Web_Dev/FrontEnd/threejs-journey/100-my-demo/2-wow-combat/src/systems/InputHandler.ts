import * as THREE from "three";
import { Player } from "../entities/Player";
import { Monster } from "../entities/Monster";

/**
 * Input Handler for player controls
 */
export class InputHandler {
  private keys: Set<string> = new Set();
  private player: Player;
  private monster: Monster | null = null;
  private camera: THREE.Camera;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  constructor(player: Player, camera: THREE.Camera) {
    this.player = player;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.setupEventListeners();
  }

  /**
   * Setup all event listeners
   */
  private setupEventListeners(): void {
    // Keyboard input
    window.addEventListener("keydown", (e) => {
      this.keys.add(e.key.toLowerCase());

      // Skill shortcuts
      if (e.key === "1") {
        this.player.useSkill("attack");
      } else if (e.key === "2") {
        this.player.useSkill("heavy");
      } else if (e.key === "3") {
        this.player.useSkill("heal");
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key.toLowerCase());
    });

    // Mouse click for targeting
    window.addEventListener("click", (e) => {
      if (!this.monster) return;

      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.monster.mesh);

      if (intersects.length > 0) {
        this.player.target = this.monster;
        console.log("🎯 Monster targeted!");
      }
    });

    // Skill button clicks
    document.getElementById("skill-attack")?.addEventListener("click", () => {
      this.player.useSkill("attack");
    });

    document.getElementById("skill-heavy")?.addEventListener("click", () => {
      this.player.useSkill("heavy");
    });

    document.getElementById("skill-heal")?.addEventListener("click", () => {
      this.player.useSkill("heal");
    });
  }

  /**
   * Set monster reference for targeting
   */
  setMonster(monster: Monster): void {
    this.monster = monster;
  }

  /**
   * Update player movement based on input
   */
  update(): void {
    const moveDirection = new THREE.Vector3();

    if (this.keys.has("w")) moveDirection.z -= 1;
    if (this.keys.has("s")) moveDirection.z += 1;
    if (this.keys.has("a")) moveDirection.x -= 1;
    if (this.keys.has("d")) moveDirection.x += 1;

    this.player.setMoveDirection(moveDirection);
  }
}
