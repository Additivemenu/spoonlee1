import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * texture
 */
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
bakedShadow.colorSpace = THREE.SRGBColorSpace; //Textures used as map and matcap are supposed to be encoded in sRGB.
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 *! Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light - threejs use orthographic camera to render the directional light before every render to create shadow map
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 2, -1);
scene.add(directionalLight);

// Directional Light GUI
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

directionalLight.castShadow = true; //! enable this light to cast shadow
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

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera,
);
scene.add(directionalLightCameraHelper);

directionalLightCameraHelper.visible = false;
directionalFolder
  .add(directionalLightCameraHelper, "visible")
  .name("Show Shadow Camera");

// Spotlight - threejs use perspective camera to render the spotlight cone before every render to create shadow map
const spotlight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotlight.position.set(0, 2, 2);
scene.add(spotlight);
scene.add(spotlight.target);

// Spotlight Shadow Settings
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.fov = 30; // field of view
spotlight.shadow.camera.near = 1;
spotlight.shadow.camera.far = 6;

const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera);
scene.add(spotlightCameraHelper);
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

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

//  point light - threejs use perspective camera to render all 6 directions before every render to create shadow map
// so basically it's like having 6 cameras for each point light to capture the scene from all directions
// this is computationally expensive, so point lights with shadows should be used sparingly in a scene
const pointLight = new THREE.PointLight(0xffffff, 2.7);
pointLight.position.set(-1, 1, 0);

pointLight.castShadow = true; //! enable this light to cast shadow
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);
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
pointLightFolder.add(pointLight, "decay").min(0).max(5).step(0.1).name("Decay");

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

/**
 *! Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true; //! enable sphere to cast shadow

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material, // option1: use standard material - it will calculate shadow dynamically based on shadow map
  //   new THREE.MeshBasicMaterial({ map: bakedShadow }), // option2: use baked shadow - but it's static
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true; //! enable plane to receive shadow

scene.add(sphere, plane);

//! simple fake shadow - a simple plane with a transparent shadow texture applied to it, always faces up
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  }),
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.005; //! slightly above the plane to avoid z-fighting

scene.add(sphereShadow);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//! enable shadow map
// basically need 3 steps to activate shadows in a scene:
// 1. enable shadow map in the renderer
// 2. define which lights will cast shadows
// 3. define which objects will cast and receive shadows
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadow map algorithm type,  default THREE.PCFShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update the sphere'
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  // jumping effect
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)); // oscillate between 0 and 1

  // update sphere shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = 1 - sphere.position.y; // fade out shadow when sphere is higher

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
