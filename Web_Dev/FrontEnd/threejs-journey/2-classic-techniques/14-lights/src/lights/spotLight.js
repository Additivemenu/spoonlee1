import * as THREE from "three";

/**
 * Spot Light Setup
 * High cost - cone-shaped light (like a flashlight or stage spotlight)
 * Can cast shadows
 */
export function createSpotLight(gui) {
  const spotLight = new THREE.SpotLight(0xffffff, 10);
  spotLight.position.set(0, 2, 3);
  spotLight.angle = Math.PI * 0.2;
  spotLight.penumbra = 0.25;
  spotLight.decay = 2;
  spotLight.distance = 10;

  // Set default visibility
  spotLight.visible = false;

  // Helper - visualizes the spotlight cone
  const helper = new THREE.SpotLightHelper(spotLight);
  helper.visible = false;

  // GUI controls
  const folder = gui.addFolder("Spot Light");

  folder.add(spotLight, "visible").name("Enable");

  folder
    .add(spotLight, "intensity")
    .min(0)
    .max(20)
    .step(0.01)
    .name("Intensity");

  folder.addColor({ color: 0xffffff }, "color").onChange((value) => {
    spotLight.color.set(value);
  });

  folder
    .add(spotLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position X");

  folder
    .add(spotLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Y");

  folder
    .add(spotLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Position Z");

  folder
    .add(spotLight, "angle")
    .min(0)
    .max(Math.PI / 2)
    .step(0.01)
    .name("Angle (光锥角度)");

  folder
    .add(spotLight, "penumbra")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Penumbra (柔和度)");

  folder.add(spotLight, "decay").min(0).max(5).step(0.01).name("Decay (衰减)");

  folder
    .add(spotLight, "distance")
    .min(0)
    .max(20)
    .step(0.01)
    .name("Distance (距离)");

  folder
    .add(spotLight.target.position, "x")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Target X");

  folder
    .add(spotLight.target.position, "y")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Target Y");

  folder
    .add(spotLight.target.position, "z")
    .min(-5)
    .max(5)
    .step(0.01)
    .name("Target Z");

  folder.add(helper, "visible").name("Show Helper");

  return { light: spotLight, helper };
}
