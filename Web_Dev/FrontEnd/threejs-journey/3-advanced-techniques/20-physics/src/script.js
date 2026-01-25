import * as THREE from "three";
import { SceneManager } from "./scene/SceneManager.js";
import { PhysicsWorld } from "./physics/world.js";
import { ObjectFactory } from "./objects/ObjectFactory.js";
import { SoundManager } from "./utils/sound.js";
import { DebugUI } from "./debug/DebugUI.js";

/**
 * Main application entry point
 */
class PhysicsDemo {
  constructor() {
    // Get canvas
    this.canvas = document.querySelector("canvas.webgl");

    // Initialize core systems
    this.sceneManager = new SceneManager(this.canvas);
    this.physicsWorld = new PhysicsWorld();
    this.soundManager = new SoundManager("/sounds/hit.mp3");

    // Initialize object factory
    this.objectFactory = new ObjectFactory(
      this.sceneManager.scene,
      this.physicsWorld,
      this.sceneManager.environmentMapTexture,
      this.soundManager,
    );

    // Initialize debug UI
    this.debugUI = new DebugUI(this.objectFactory);

    // Create initial sphere
    this.objectFactory.createSphere(0.5, new THREE.Vector3(0, 3, 0));

    // Setup animation loop
    this.clock = new THREE.Clock();
    this.oldElapsedTime = 0;

    this.animate();
  }

  /**
   * Animation loop
   */
  animate = () => {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.oldElapsedTime;
    this.oldElapsedTime = elapsedTime;

    // ===================================================================
    // //! Update physics world (sync physics engine with rendering engine)
    this.physicsWorld.step(deltaTime);

    // Sync Three.js objects with physics bodies
    this.objectFactory.updateObjects();

    // ===================================================================
    // Update scene and render
    this.sceneManager.update();

    // Continue animation loop
    window.requestAnimationFrame(this.animate);
  };
}

// Initialize the application
new PhysicsDemo();
