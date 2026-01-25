import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Manages Three.js scene, camera, renderer, and lighting
 */
export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    this.setupSizes();
    this.setupTextures();
    this.setupLighting();
    this.setupFloor();
    this.setupCamera();
    this.setupRenderer();
    this.setupEventListeners();
  }

  setupSizes() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  setupTextures() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    this.environmentMapTexture = cubeTextureLoader.load([
      "/textures/environmentMaps/0/px.png",
      "/textures/environmentMaps/0/nx.png",
      "/textures/environmentMaps/0/py.png",
      "/textures/environmentMaps/0/ny.png",
      "/textures/environmentMaps/0/pz.png",
      "/textures/environmentMaps/0/nz.png",
    ]);
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  setupFloor() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#777777",
        metalness: 0.3,
        roughness: 0.4,
        envMap: this.environmentMapTexture,
        envMapIntensity: 0.5,
      }),
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    this.scene.add(floor);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    );
    this.camera.position.set(-3, 3, 3);
    this.scene.add(this.camera);

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  /**
   * Update controls and render the scene
   */
  update() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
