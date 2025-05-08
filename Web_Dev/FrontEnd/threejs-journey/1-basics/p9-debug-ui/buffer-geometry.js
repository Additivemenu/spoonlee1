import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap"; // for animation
import GUI from "lil-gui"; // debug ui library

/**
 * !debug ui
 */
const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolders: false,
});
window.addEventListener("keydown", (e) => {
  if (e.key === "h") {
    gui.show(gui._hidden);
  }
});
const debugObject = {}; // ! note lil-gui can only tweak objects, not primitives

// Canvas
const canvas = document.querySelector("canvas.webgl-buffer-geometry");

console.log("JavaScript is working");

// Scene
const scene = new THREE.Scene();

// Object
// !geometry definition ================================================================================================================
// !simple built-in geometry ----------------------------------
debugObject.color = "#3a6ea6";

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// ! define gui tweakable parameters ------------------------------------------------------------------------------------------------
const cubeTweaks = gui.addFolder("awesome_cube");

cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
cubeTweaks.add(mesh, "visible");
cubeTweaks.add(material, "wireframe");
cubeTweaks.addColor(debugObject, "color").onChange((value) => {
  // 加了个中间变量debugObject来tweak material color (有点proxy的意思)
  // 不直接addColor(material, "color")是有原因的
  material.color.set(value);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    duration: 1,
    y: mesh.rotation.y + Math.PI * 2,
  });
};
cubeTweaks.add(debugObject, "spin");

// tweak the geometry
debugObject.subdivision = 2; // act as proxy
cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(10)
  .step(1)
  .name("subdivision")
  .onFinishChange(() => {
    // !onFinishChange is friendly to performance

    mesh.geometry.dispose(); //! dispose the old geometry

    // ! create new mesh geometry
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    );
  });

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
