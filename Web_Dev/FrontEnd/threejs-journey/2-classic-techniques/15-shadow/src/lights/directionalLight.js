import * as THREE from "three";

/**
 * Directional Light Setup with Shadow
 * Three.js uses orthographic camera to render the directional light before every render to create shadow map
 */
export function createDirectionalLight(gui, scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(2, 2, -1);

  // shadow config
  directionalLight.castShadow = true;
  // game's graphics settings often allow to adjust shadow quality
  directionalLight.shadow.mapSize.width = 1024; // increase shadow map resolution
  directionalLight.shadow.mapSize.height = 1024;
  // adjust shadow camera frustum - 定义了阴影相机的视锥体范围
  // 合理的调整这些值可以提升阴影质量，避免出现锯齿或模糊的阴影效果
  // e.g. warno里你视角拉的越近阴影越精细
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 6;
  directionalLight.shadow.camera.left = -2;
  directionalLight.shadow.camera.right = 2;
  directionalLight.shadow.camera.top = 2;
  directionalLight.shadow.camera.bottom = -2;
  // directionalLight.shadow.radius = 10; // optional: to soften the shadow edges (works with PCFSoftShadowMap)

  // Camera helper
  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera,
  );
  directionalLightCameraHelper.visible = false;

  // GUI
  const directionalFolder = gui.addFolder("Directional Light");
  directionalFolder
    .add(directionalLight, "intensity")
    .min(0)
    .max(3)
    .step(0.001)
    .name("Intensity");
  directionalFolder
    .add(directionalLight.position, "x")
    .min(-5)
    .max(5)
    .step(0.001)
    .name("Position X");
  directionalFolder
    .add(directionalLight.position, "y")
    .min(-5)
    .max(5)
    .step(0.001)
    .name("Position Y");
  directionalFolder
    .add(directionalLight.position, "z")
    .min(-5)
    .max(5)
    .step(0.001)
    .name("Position Z");

  // Shadow Settings GUI
  const shadowFolder = directionalFolder.addFolder("Shadow Settings");
  shadowFolder.add(directionalLight, "castShadow").name("Cast Shadow");
  shadowFolder
    .add(directionalLight.shadow.camera, "near")
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("Camera Near")
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
      directionalLightCameraHelper.update();
    });
  shadowFolder
    .add(directionalLight.shadow.camera, "far")
    .min(1)
    .max(20)
    .step(0.1)
    .name("Camera Far")
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
      directionalLightCameraHelper.update();
    });
  shadowFolder
    .add(directionalLight.shadow.camera, "left")
    .min(-10)
    .max(0)
    .step(0.1)
    .name("Camera Left")
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
      directionalLightCameraHelper.update();
    });
  shadowFolder
    .add(directionalLight.shadow.camera, "right")
    .min(0)
    .max(10)
    .step(0.1)
    .name("Camera Right")
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
      directionalLightCameraHelper.update();
    });
  shadowFolder
    .add(directionalLight.shadow.camera, "top")
    .min(0)
    .max(10)
    .step(0.1)
    .name("Camera Top")
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
      directionalLightCameraHelper.update();
    });
  shadowFolder
    .add(directionalLight.shadow.camera, "bottom")
    .min(-10)
    .max(0)
    .step(0.1)
    .name("Camera Bottom")
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
      directionalLightCameraHelper.update();
    });

  directionalFolder
    .add(directionalLightCameraHelper, "visible")
    .name("Show Shadow Camera");

  return { light: directionalLight, helper: directionalLightCameraHelper };
}
