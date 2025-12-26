import * as THREE from "three";

/**
 * Point Light Setup
 * Mid cost - emits light in all directions from a point (like a light bulb)
 */
export function createPointLight(gui) {
  const pointLight = new THREE.PointLight(0xff9000, 0.8, 10, 2);
  pointLight.position.set(1, 0.2, 0.5);

  // GUI controls
  const folder = gui.addFolder("Point Light");

  folder.add(pointLight, "visible").name("Enable");

  folder
    .add(pointLight, "intensity")
    .min(0)
    .max(3)
    .step(0.01)
    .name("Intensity");

  folder.addColor({ color: 0xff9000 }, "color").onChange((value) => {
    pointLight.color.set(value);
  });

  folder
    .add(pointLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position X");

  folder
    .add(pointLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Y");

  folder
    .add(pointLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Z");

  folder.add(pointLight, "distance").min(0).max(20).step(0.01).name("Distance");

  folder.add(pointLight, "decay").min(0).max(5).step(0.01).name("Decay");

  // Start with light disabled
  pointLight.visible = false;

  return pointLight;
}
