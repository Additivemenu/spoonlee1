// script.js

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl-camera-built-in-controls");

console.log("JavaScript is working");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
/**
 * ! 这4个参数实际上定义了一个空间锥形, 这个锥形决定了相机能够看到的空间范围. see concept of frustum https://threejs.org/docs/#api/en/math/Frustum
 *
 * 1st argument: Field of view (FOV) - how much of the scene is visible, recommended to use 45-75
 * 2nd argument: aspect ratio (width / height), usually we take the render size
 * 3rd argument: near clipping plane - the closest point that can be seen
 * 4th argument: far clipping plane - the farthest point that can be seen
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 5;
scene.add(camera);

// ! controls ================================================================================================================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // ! damping让视角控制似乎有惯性一般

// Renderer ================================================================================================================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
/**
 * !instead of a single render, we use RAF to continuously render the scene with the camera
 *
 * option4: Animate - adapt to frame rate using Three.js built-in Clock
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime(); // return how many seconds have passed since the Clock was created.

  // Update objects

  // update camera position

  // ! update controls - do this in every frame
  controls.update();

  // render the scene with the camera
  renderer.render(scene, camera);

  // Call tick again on the next frame -> chain up the animation
  window.requestAnimationFrame(tick);
};
tick();
