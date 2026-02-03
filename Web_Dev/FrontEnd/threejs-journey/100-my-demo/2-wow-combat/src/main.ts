import * as THREE from "three";
import { Player } from "./entities/Player";
import { Monster } from "./entities/Monster";
import { InputHandler } from "./systems/InputHandler";
import { UIManager } from "./systems/UIManager";

/**
 * Main Game Class
 */
class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private player: Player;
  private monster: Monster;

  private inputHandler: InputHandler;
  private uiManager: UIManager;

  private clock: THREE.Clock;

  constructor() {
    // Initialize Three.js
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 10, 50);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 10, 15);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    this.setupLighting();

    // Ground
    this.createGround();

    // Create entities
    this.player = this.createPlayer();
    this.monster = this.createMonster();

    // Set mutual references
    this.monster.setTarget(this.player);

    // Initialize systems
    this.inputHandler = new InputHandler(this.player, this.camera);
    this.inputHandler.setMonster(this.monster);
    this.uiManager = new UIManager();

    // Clock for delta time
    this.clock = new THREE.Clock();

    // Window resize handler
    window.addEventListener("resize", () => this.onWindowResize());

    console.log("🎮 Game initialized!");
    console.log("📖 Controls:");
    console.log("  - WASD: Move player");
    console.log("  - Click monster: Target");
    console.log("  - 1: Attack (15 energy)");
    console.log("  - 2: Heavy Strike (30 energy)");
    console.log("  - 3: Heal (40 energy)");
  }

  /**
   * Setup scene lighting
   */
  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    this.scene.add(directionalLight);
  }

  /**
   * Create ground plane
   */
  private createGround(): void {
    const geometry = new THREE.PlaneGeometry(50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3d8f3d,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(50, 50, 0x000000, 0x4d4d4d);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }

  /**
   * Create player entity
   */
  private createPlayer(): Player {
    const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      emissive: 0x1a5490,
      roughness: 0.5,
      metalness: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 1, 5);
    mesh.castShadow = true;
    this.scene.add(mesh);

    // Add a simple "weapon" indicator
    const weaponGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
    const weaponMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
    weapon.position.set(0.7, 0, 0);
    mesh.add(weapon);

    return new Player(mesh);
  }

  /**
   * Create monster entity
   */
  private createMonster(): Monster {
    const geometry = new THREE.BoxGeometry(1.5, 2, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0xe74c3c,
      emissive: 0x8b0000,
      roughness: 0.7,
      metalness: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 1, -5);
    mesh.castShadow = true;
    this.scene.add(mesh);

    // Add "eyes" to make it look more menacing
    const eyeGeometry = new THREE.SphereGeometry(0.15);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 1,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.3, 0.76);
    mesh.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.3, 0.76);
    mesh.add(rightEye);

    return new Monster(mesh);
  }

  /**
   * Handle window resize
   */
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Main update loop
   */
  private update(): void {
    const deltaTime = this.clock.getDelta();

    // Update input
    this.inputHandler.update();

    // Update entities
    this.player.update(deltaTime);
    this.monster.update(deltaTime);

    // Update camera to follow player
    const cameraOffset = new THREE.Vector3(0, 10, 15);
    const targetPosition = this.player.position.clone().add(cameraOffset);
    this.camera.position.lerp(targetPosition, 0.1);
    this.camera.lookAt(this.player.position);

    // Update UI
    this.uiManager.updatePlayerStats(this.player);
    this.uiManager.updateSkillButtons(this.player);
    this.uiManager.updateMonsterState(this.monster);
  }

  /**
   * Render loop
   */
  private render(): void {
    this.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }

  /**
   * Start the game
   */
  start(): void {
    this.render();
  }
}

// Initialize and start game
const game = new Game();
game.start();
