import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { createAmbientLight } from "./lights/ambientLight.js";
import { createDirectionalLight } from "./lights/directionalLight.js";
import { createSpotLight } from "./lights/spotLight.js";
import { createPointLight } from "./lights/pointLight.js";

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
bakedShadow.colorSpace = THREE.SRGBColorSpace;
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
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Lights
 */
const ambientLight = createAmbientLight(gui);
scene.add(ambientLight);

const { light: directionalLight, helper: directionalLightCameraHelper } =
  createDirectionalLight(gui, scene);
scene.add(directionalLight);
scene.add(directionalLightCameraHelper);

const { light: spotlight, helper: spotlightCameraHelper } = createSpotLight(
  gui,
  scene,
);
scene.add(spotlight);
scene.add(spotlight.target);
scene.add(spotlightCameraHelper);

const { light: pointLight, helper: pointLightCameraHelper } = createPointLight(
  gui,
  scene,
);
scene.add(pointLight);
scene.add(pointLightCameraHelper);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material, // option1: use standard material - it will calculate shadow dynamically based on shadow map
  //   new THREE.MeshBasicMaterial({ map: bakedShadow }), // option2: use baked shadow - but it's static
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;

scene.add(sphere, plane);

//! Simple fake shadow
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  }),
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.005;

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

// Enable shadow map - read from localStorage or use default
const savedShadowMapEnabled = localStorage.getItem("rendererShadowMapEnabled");
renderer.shadowMap.enabled =
  savedShadowMapEnabled !== null ? JSON.parse(savedShadowMapEnabled) : false;

const savedShadowMapType = localStorage.getItem("rendererShadowMapType");
renderer.shadowMap.type =
  savedShadowMapType !== null
    ? parseInt(savedShadowMapType)
    : THREE.PCFSoftShadowMap;

gui
  .add(renderer.shadowMap, "enabled")
  .name("Shadow Map Enabled")
  .onChange((value) => {
    // Save to localStorage
    localStorage.setItem("rendererShadowMapEnabled", JSON.stringify(value));
    // Reload the page to reinitialize the renderer with new shadow settings
    window.location.reload();
  });
gui
  .add(renderer.shadowMap, "type", {
    BasicShadowMap: THREE.BasicShadowMap,
    PCFShadowMap: THREE.PCFShadowMap,
    PCFSoftShadowMap: THREE.PCFSoftShadowMap,
    VSMShadowMap: THREE.VSMShadowMap,
  })
  .name("Shadow Map Type")
  .onChange((value) => {
    // Save to localStorage
    localStorage.setItem("rendererShadowMapType", value.toString());
    // Reload the page to reinitialize the renderer with new shadow settings
    window.location.reload();
  });

/**
 * Animate
 */
const clock = new THREE.Clock();
let sphereMovementEnabled = true;

// Animation controls
const animationControls = {
  sphereMovement: true,
};

// Add animation controls to GUI
gui
  .add(animationControls, "sphereMovement")
  .name("Sphere Movement")
  .onChange((value) => {
    sphereMovementEnabled = value;
  });

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update the sphere only if movement is enabled
  if (sphereMovementEnabled) {
    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    // Update sphere shadow
    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = 1 - sphere.position.y;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
