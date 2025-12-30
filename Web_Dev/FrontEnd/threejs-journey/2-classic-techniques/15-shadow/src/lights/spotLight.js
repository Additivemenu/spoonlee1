import * as THREE from "three";

/**
 * Spot Light Setup with Shadow
 * - threejs use perspective camera to render the spotlight cone before every render to create shadow map
 */
export function createSpotLight(gui, scene) {
  const spotlight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
  spotlight.position.set(0, 2, 2);

  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.camera.fov = 30;
  spotlight.shadow.camera.near = 1;
  spotlight.shadow.camera.far = 6;

  const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera);
  spotlightCameraHelper.visible = false;

  // Spotlight GUI
  const spotlightFolder = gui.addFolder("Spot Light");
  spotlightFolder
    .add(spotlight, "intensity")
    .min(0)
    .max(10)
    .step(0.1)
    .name("Intensity");
  spotlightFolder
    .add(spotlight, "distance")
    .min(0)
    .max(20)
    .step(0.1)
    .name("Distance");
  spotlightFolder
    .add(spotlight, "angle")
    .min(0)
    .max(Math.PI / 2)
    .step(0.01)
    .name("Angle");
  spotlightFolder
    .add(spotlight, "penumbra")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Penumbra");
  spotlightFolder.add(spotlight, "decay").min(0).max(5).step(0.1).name("Decay");

  spotlightFolder
    .add(spotlight.position, "x")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Position X");
  spotlightFolder
    .add(spotlight.position, "y")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Position Y");
  spotlightFolder
    .add(spotlight.position, "z")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Position Z");

  spotlightFolder
    .add(spotlight.target.position, "x")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Target X");
  spotlightFolder
    .add(spotlight.target.position, "y")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Target Y");
  spotlightFolder
    .add(spotlight.target.position, "z")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Target Z");

  // Spotlight Shadow Settings GUI
  const spotlightShadowFolder = spotlightFolder.addFolder("Shadow Settings");
  spotlightShadowFolder.add(spotlight, "castShadow").name("Cast Shadow");
  spotlightShadowFolder
    .add(spotlight.shadow.camera, "fov")
    .min(10)
    .max(90)
    .step(1)
    .name("Camera FOV")
    .onChange(() => {
      spotlight.shadow.camera.updateProjectionMatrix();
      spotlightCameraHelper.update();
    });
  spotlightShadowFolder
    .add(spotlight.shadow.camera, "near")
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("Camera Near")
    .onChange(() => {
      spotlight.shadow.camera.updateProjectionMatrix();
      spotlightCameraHelper.update();
    });
  spotlightShadowFolder
    .add(spotlight.shadow.camera, "far")
    .min(1)
    .max(20)
    .step(0.1)
    .name("Camera Far")
    .onChange(() => {
      spotlight.shadow.camera.updateProjectionMatrix();
      spotlightCameraHelper.update();
    });

  spotlightFolder
    .add(spotlightCameraHelper, "visible")
    .name("Show Shadow Camera");

  return { light: spotlight, helper: spotlightCameraHelper };
}
