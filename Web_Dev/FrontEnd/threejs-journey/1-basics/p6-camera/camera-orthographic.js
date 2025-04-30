// script.js

import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl-orthographic-camera");

console.log("JavaScript is working");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes: it might impact the fidelity with this aspect ratio
const sizes = {
  width: 800,
  height: 600,
};

// Camera ==================================================================================================================
/**
 * ! 这6个参数实际上定义了一个空间中的长方体, 这个长方体决定了相机能够看到的空间范围. see concept of frustum https://threejs.org/docs/#api/en/math/Frustum
 * 1st argument: left
 * 2nd argument: right
 * 3rd argument: top
 * 4th argument: bottom
 * 5th argument: near
 * 6th argument: far
 */
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, // left - horizontal -> aspectRatio 是为了补偿render size长宽比
  1 * aspectRatio, // right - horizontal -> aspectRatio 是为了补偿render size长宽比
  1, // top - vertical
  -1, // bottom - vertical
  0.1, // near
  100, // far
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2; // By default, Three.js considers the forward/backward axis to be z. this moves the camera backward
scene.add(camera);

// Renderer ================================================================================================================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height); //! this sets the size of the canvas
/**
 * !instead of a single render, we use RAF to continuously render the scene with the camera
 *
 * option4: Animate - adapt to frame rate using Three.js built-in Clock
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime(); // return how many seconds have passed since the Clock was created.

  // Update objects
  mesh.rotation.y = elapsedTime; // ! rotation speed is a constant ((delta of degree / deltaTime)), this is so animation is independent of frame rate on the browser

  // // update camera position
  // camera.position.x = Math.cos(elapsedTime);
  // camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);

  // Call tick again on the next frame -> chain up the animation
  window.requestAnimationFrame(tick);
};
tick();
