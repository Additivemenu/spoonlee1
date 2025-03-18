import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

console.log("JavaScript is working");

// Scene
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Objects
 */
const group = new THREE.Group();
// group.scale.y = 2;
// group.rotation.y = 0.2;
scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );
// cube1.position.x = -1.5;
// group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube2.position.x = 0;
group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );
// cube3.position.x = 1.5;
// group.add(cube3);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3; // By default, Three.js considers the forward/backward axis to be z. this moves the camera backward
camera.lookAt(new THREE.Vector3(0, 0, 0)); // looking at origin
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// rendering the scene ========================================================================================================

// option1: only render once
// renderer.render(scene, camera);

/**
 * option2:
 * Animate: not adapting to frame rate
 */
// const tick = () => {
//   // Update objects
//   cube2.rotation.y += 0.01; // ! rotation speed is (0.01 / frame time), which is dependent on the frame rate

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };
// tick();

/**
 * option3:
 * Animate: adapt to frame rate
 */
// let time = Date.now();
// const tick = () => {
//   // Time
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;      // ! how much time it's been since the last tick
//   time = currentTime;

//   // Update objects
//   cube2.rotation.y += 0.001 * deltaTime;     // ! rotation speed is constant (delta of degree / deltaTime)

//   renderer.render(scene, camera);
//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };
// tick();

/**
 * option4: Animate - adapt to frame rate using Three.js built-in Clock
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  cube2.rotation.y = elapsedTime; // ! rotation speed is a constant ((delta of degree / deltaTime))

  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();

/**
 * option5: use lib for specific animations
 */
// gsap.to(cube2.position, { duration: 1, delay: 1, x: 2 });
// const tick = () => {
//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };
// tick();
