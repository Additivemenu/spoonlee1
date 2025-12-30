import * as THREE from "three";

/**
 * Point Light Setup with Shadow
 * threejs use perspective camera to render all 6 directions before every render to create shadow map
    so basically it's like having 6 cameras for each point light to capture the scene from all directions
    this is computationally expensive, so point lights with shadows should be used sparingly in a scene
 */
export function createPointLight(gui, scene) {
  const pointLight = new THREE.PointLight(0xffffff, 2.7);
  pointLight.position.set(-1, 1, 0);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 5;

  const pointLightCameraHelper = new THREE.CameraHelper(
    pointLight.shadow.camera,
  );
  pointLightCameraHelper.visible = false;

  // Point Light GUI
  const pointLightFolder = gui.addFolder("Point Light");
  pointLightFolder
    .add(pointLight, "intensity")
    .min(0)
    .max(10)
    .step(0.1)
    .name("Intensity");
  pointLightFolder
    .add(pointLight, "distance")
    .min(0)
    .max(20)
    .step(0.1)
    .name("Distance");
  pointLightFolder
    .add(pointLight, "decay")
    .min(0)
    .max(5)
    .step(0.1)
    .name("Decay");

  pointLightFolder
    .add(pointLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Position X");
  pointLightFolder
    .add(pointLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Position Y");
  pointLightFolder
    .add(pointLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.1)
    .name("Position Z");

  // Point Light Shadow Settings GUI
  const pointLightShadowFolder = pointLightFolder.addFolder("Shadow Settings");
  pointLightShadowFolder.add(pointLight, "castShadow").name("Cast Shadow");
  pointLightShadowFolder
    .add(pointLight.shadow.camera, "near")
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("Camera Near")
    .onChange(() => {
      pointLight.shadow.camera.updateProjectionMatrix();
      pointLightCameraHelper.update();
    });
  pointLightShadowFolder
    .add(pointLight.shadow.camera, "far")
    .min(1)
    .max(20)
    .step(0.1)
    .name("Camera Far")
    .onChange(() => {
      pointLight.shadow.camera.updateProjectionMatrix();
      pointLightCameraHelper.update();
    });

  pointLightFolder
    .add(pointLightCameraHelper, "visible")
    .name("Show Shadow Camera");

  return { light: pointLight, helper: pointLightCameraHelper };
}
