import * as THREE from "three";

/**
 * SceneManager handles scene setup, camera, renderer, lighting, and environment
 */
export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  // Camera rotation state
  private cameraRotationY = 0; // Horizontal rotation
  private cameraRotationX = 0; // Vertical rotation
  private cameraDistance = 15; // Distance from origin

  constructor(canvas: HTMLCanvasElement) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
    this.scene.fog = new THREE.Fog(0x87ceeb, 50, 200);

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 5, 0);

    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Setup lighting
    this.setupLighting();

    // Create ground
    this.createGround();

    // Handle window resize
    window.addEventListener("resize", () => this.onWindowResize());
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    this.scene.add(directionalLight);
  }

  private createGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x228b22,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Rotate camera based on mouse movement
   * @param deltaX Horizontal mouse movement
   * @param deltaY Vertical mouse movement
   */
  public rotateCamera(deltaX: number, deltaY: number): void {
    // Sensitivity factor
    const sensitivity = 0.003;

    // Update rotation angles
    this.cameraRotationY -= deltaX * sensitivity;
    this.cameraRotationX -= deltaY * sensitivity;

    // Limit vertical rotation to prevent camera flipping
    this.cameraRotationX = Math.max(
      -Math.PI / 3, // -60 degrees
      Math.min(Math.PI / 3, this.cameraRotationX), // +60 degrees
    );

    // Calculate new camera position using spherical coordinates
    const x =
      this.cameraDistance *
      Math.sin(this.cameraRotationY) *
      Math.cos(this.cameraRotationX);
    const y = 5 + this.cameraDistance * Math.sin(this.cameraRotationX);
    const z =
      this.cameraDistance *
      Math.cos(this.cameraRotationY) *
      Math.cos(this.cameraRotationX);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 5, 0);
  }
}
