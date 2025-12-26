import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

/**
 * RectArea Light Setup
 * High cost - light from a rectangular plane (like a window or monitor)
 * Note: Only works with MeshStandardMaterial and MeshPhysicalMaterial
 * Cannot cast shadows
 */
export function createRectAreaLight(gui) {
  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
  rectAreaLight.position.set(-1.5, 0, 1.5);
  rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0));

  // Set default visibility
  rectAreaLight.visible = false;

  // Helper - visualizes the rectangular light area
  const helper = new RectAreaLightHelper(rectAreaLight);
  helper.visible = false;

  // GUI controls
  const folder = gui.addFolder("RectArea Light");

  folder.add(rectAreaLight, "visible").name("Enable");

  folder
    .add(rectAreaLight, "intensity")
    .min(0)
    .max(10)
    .step(0.01)
    .name("Intensity");

  folder.addColor({ color: 0x4e00ff }, "color").onChange((value) => {
    rectAreaLight.color.set(value);
  });

  folder
    .add(rectAreaLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position X");

  folder
    .add(rectAreaLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Y");

  folder
    .add(rectAreaLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Z");

  folder.add(rectAreaLight, "width").min(0).max(5).step(0.01).name("Width");

  folder.add(rectAreaLight, "height").min(0).max(5).step(0.01).name("Height");

  folder.add(helper, "visible").name("Show Helper");

  return { light: rectAreaLight, helper };
}
