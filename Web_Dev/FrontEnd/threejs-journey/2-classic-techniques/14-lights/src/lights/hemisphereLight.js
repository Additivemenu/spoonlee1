import * as THREE from "three";

/**
 * Hemisphere Light Setup
 * Mini cost - different colors from sky and ground (天地两色)
 */
export function createHemisphereLight(gui) {
  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);

  // GUI controls
  const folder = gui.addFolder("Hemisphere Light");

  folder.add(hemisphereLight, "visible").name("Enable");

  folder
    .add(hemisphereLight, "intensity")
    .min(0)
    .max(3)
    .step(0.01)
    .name("Intensity");

  folder
    .addColor({ skyColor: 0xff0000 }, "skyColor")
    .onChange((value) => {
      hemisphereLight.color.set(value);
    })
    .name("Sky Color");

  folder
    .addColor({ groundColor: 0x0000ff }, "groundColor")
    .onChange((value) => {
      hemisphereLight.groundColor.set(value);
    })
    .name("Ground Color");

  // Start with light disabled
  hemisphereLight.visible = false;

  return hemisphereLight;
}
