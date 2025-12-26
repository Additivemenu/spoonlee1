import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { createAmbientLight } from "./lights/ambientLight.js";
import { createDirectionalLight } from "./lights/directionalLight.js";
import { createHemisphereLight } from "./lights/hemisphereLight.js";
import { createPointLight } from "./lights/pointLight.js";
import { createRectAreaLight } from "./lights/rectAreaLight.js";
import { createSpotLight } from "./lights/spotLight.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// axis helper (RGB = XYZ convention)
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Lights
 */
// Create all lights with GUI controls
const { light: ambientLight, helper: ambientHelper } = createAmbientLight(gui);
const { light: directionalLight, helper: directionalHelper } =
  createDirectionalLight(gui);
const { light: hemisphereLight, helper: hemisphereHelper } =
  createHemisphereLight(gui);
const { light: pointLight, helper: pointHelper } = createPointLight(gui);
const { light: rectAreaLight, helper: rectAreaHelper } =
  createRectAreaLight(gui);
const { light: spotLight, helper: spotHelper } = createSpotLight(gui);

// Add all lights to scene
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(hemisphereLight);
scene.add(pointLight);
scene.add(rectAreaLight);
scene.add(spotLight);
scene.add(spotLight.target); // spotlight needs target

// Add all helpers to scene
if (directionalHelper) scene.add(directionalHelper);
if (hemisphereHelper) scene.add(hemisphereHelper);
if (pointHelper) scene.add(pointHelper);
if (rectAreaHelper) scene.add(rectAreaHelper);
if (spotHelper) scene.add(spotHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material,
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update light helpers (some helpers need to be updated each frame)
  if (spotHelper && spotHelper.visible) spotHelper.update();
  if (directionalHelper && directionalHelper.visible)
    directionalHelper.update();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
