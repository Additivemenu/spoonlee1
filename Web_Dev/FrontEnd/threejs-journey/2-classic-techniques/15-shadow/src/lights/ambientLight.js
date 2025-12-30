import * as THREE from "three";

/**
 * Ambient Light Setup
 */
export function createAmbientLight(gui) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);

  gui
    .add(ambientLight, "intensity")
    .min(0)
    .max(3)
    .step(0.001)
    .name("Ambient Intensity");

  return ambientLight;
}
