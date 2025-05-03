import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl-buffer-geometry");

console.log("JavaScript is working");

// Scene
const scene = new THREE.Scene();

// Object
// !geometry definition ================================================================================================================
// !simple built-in geometry ----------------------------------
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.SphereGeometry(1, 32, 32);

// !custom geometry -------------------------------------------
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry();
const generateSimpleTriangle = (geometry) => {
  // !Create a Float32Array containing the vertices position (3 by 3)
  const positionsArray = new Float32Array([
    0,
    0,
    0, // First vertex
    0,
    1,
    0, // Second vertex
    1,
    0,
    0, // Third vertex
  ]);
  // !Create the attribute and name it 'position'
  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  geometry.setAttribute("position", positionsAttribute);
};

const generateRandomTriangles = (geometry) => {
  // Create 50 triangles (450 values)
  const count = 50;
  const positionsArray = new Float32Array(count * 3 * 3);
  for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
  }

  // Create the attribute and name it 'position'
  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  geometry.setAttribute("position", positionsAttribute);
};
// generateSimpleTriangle(geometry);
generateRandomTriangles(geometry);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// keep resizing the renderer size so that the camera and renderer can fit the new window size
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //pixel ratio 最大设为2,   抗锯齿?
});

// enter, exit fullscreen - native js api, nothing to do with three.js
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen(); // only canvas element goes to fullscreen
  } else {
    document.exitFullscreen();
  }
});

// Camera
/**
 * 这4个参数实际上定义了一个空间锥形, 这个锥形决定了相机能够看到的空间范围. see concept of frustum https://threejs.org/docs/#api/en/math/Frustum
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

// controls ================================================================================================================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // damping让视角控制似乎有惯性一般

// Renderer ================================================================================================================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //pixel ratio 最大设为2,   抗锯齿?

/**
 * instead of a single render, we use RAF to continuously render the scene with the camera
 *
 * option4: Animate - adapt to frame rate using Three.js built-in Clock
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime(); // return how many seconds have passed since the Clock was created.

  // Update objects

  // update camera position

  // update controls - do this in every frame
  controls.update();

  // render the scene with the camera
  renderer.render(scene, camera);

  // Call tick again on the next frame -> chain up the animation
  window.requestAnimationFrame(tick);
};
tick();
