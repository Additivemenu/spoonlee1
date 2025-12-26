import * as THREE from "three";

/**
 * Directional Light Setup
 * Mid cost - parallel rays with a direction (like sunlight)
 */
export function createDirectionalLight(gui) {
  const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
  directionalLight.position.set(1, 0.25, 0);

  // Set default visibility
  directionalLight.visible = false;

  // Helper - visualizes the light direction
  const helper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
  helper.visible = false;

  // GUI controls
  const folder = gui.addFolder("Directional Light");

  folder.add(directionalLight, "visible").name("Enable");

  folder
    .add(directionalLight, "intensity")
    .min(0)
    .max(3)
    .step(0.01)
    .name("Intensity");

  folder.addColor({ color: 0x00fffc }, "color").onChange((value) => {
    directionalLight.color.set(value);
  });

  folder
    .add(directionalLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position X");

  folder
    .add(directionalLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Y");

  folder
    .add(directionalLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Z");

  folder.add(helper, "visible").name("Show Helper");

  return { light: directionalLight, helper };
}
