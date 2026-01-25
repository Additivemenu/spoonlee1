import GUI from "lil-gui";
import * as THREE from "three";

/**
 * Debug UI controls for the physics demo
 */
export class DebugUI {
  constructor(objectFactory) {
    this.objectFactory = objectFactory;
    this.gui = new GUI();
    this.setupControls();
  }

  setupControls() {
    const debugObject = {};

    // Create sphere button
    debugObject.createSphere = () => {
      this.objectFactory.createSphere(
        Math.random() * 0.5 + 0.2,
        new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          3,
          (Math.random() - 0.5) * 3,
        ),
      );
    };
    this.gui.add(debugObject, "createSphere").name("Create Sphere");

    // Create box button
    debugObject.createBox = () => {
      this.objectFactory.createBox(
        Math.random() * 0.5 + 0.2,
        Math.random() * 0.5 + 0.2,
        Math.random() * 0.5 + 0.2,
        new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          3,
          (Math.random() - 0.5) * 3,
        ),
      );
    };
    this.gui.add(debugObject, "createBox").name("Create Box");

    // Reset scene button
    debugObject.reset = () => {
      this.objectFactory.reset();
    };
    this.gui.add(debugObject, "reset").name("Reset Scene");
  }

  /**
   * Clean up the debug UI
   */
  destroy() {
    this.gui.destroy();
  }
}
