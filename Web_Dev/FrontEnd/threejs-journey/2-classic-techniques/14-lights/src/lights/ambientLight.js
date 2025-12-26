import * as THREE from "three";

/**
 * Ambient Light Setup
 * Mini cost - illuminates all objects uniformly regardless of direction
 */
export function createAmbientLight(gui) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  // GUI controls
  const folder = gui.addFolder("Ambient Light");

  folder.add(ambientLight, "visible").name("Enable");

  folder
    .add(ambientLight, "intensity")
    .min(0)
    .max(3)
    .step(0.01)
    .name("Intensity");

  folder.addColor({ color: 0xffffff }, "color").onChange((value) => {
    ambientLight.color.set(value);
  });

  // Start with light disabled
  ambientLight.visible = false;

  return ambientLight;
}
