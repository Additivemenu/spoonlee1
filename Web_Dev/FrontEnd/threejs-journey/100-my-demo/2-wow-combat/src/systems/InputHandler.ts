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

  // Camera rotation state
  private isRightMouseDown: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  private cameraYaw: number = 0; // Horizontal rotation
  private cameraPitch: number = 0.3; // Vertical rotation (slight downward angle)
  private cameraDistance: number = 10;
  private readonly ROTATION_SPEED: number = 0.003;
  private readonly MIN_PITCH: number = -0.5; // Look down limit
  private readonly MAX_PITCH: number = 1.2; // Look up limit

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

    // Right mouse button for camera rotation
    window.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        // Right mouse button
        this.isRightMouseDown = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        // Hide cursor during rotation for better UX
        document.body.style.cursor = "grabbing";
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (e.button === 2) {
        this.isRightMouseDown = false;
        document.body.style.cursor = "default";
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (this.isRightMouseDown) {
        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;

        this.cameraYaw -= deltaX * this.ROTATION_SPEED;
        this.cameraPitch -= deltaY * this.ROTATION_SPEED;

        // Clamp pitch to prevent camera flipping
        this.cameraPitch = Math.max(
          this.MIN_PITCH,
          Math.min(this.MAX_PITCH, this.cameraPitch),
        );

        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
    });

    // Prevent context menu on right click
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    // Mouse click for targeting (left button only)
    window.addEventListener("click", (e) => {
      if (!this.monster) return;

      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.monster.mesh);

      if (intersects.length > 0) {
        this.player.target = this.monster;
        this.monster.setSelected(true);
        console.log("🎯 Monster targeted!");
      } else {
        // Clicked elsewhere, deselect
        this.player.target = null;
        this.monster.setSelected(false);
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

  /**
   * Get camera rotation parameters
   */
  getCameraRotation(): { yaw: number; pitch: number; distance: number } {
    return {
      yaw: this.cameraYaw,
      pitch: this.cameraPitch,
      distance: this.cameraDistance,
    };
  }
}
