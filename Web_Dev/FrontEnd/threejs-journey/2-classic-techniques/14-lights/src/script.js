import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

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
 *! Lights
 */
// //! Ambient light （mini cost） - 每个mesh 无论朝向哪里，都会被均匀照亮
// const ambientLight = new THREE.AmbientLight(); // Ambient light is a light that globally illuminates all objects in the scene equally.
// ambientLight.color = new THREE.Color(0xffffff);
// ambientLight.intensity = 0.5;
// scene.add(ambientLight);
// gui
//   .add(ambientLight, "intensity")
//   .min(0)
//   .max(3)
//   .step(0.01)
//   .name("Ambient Light Intensity");

// //! directional lights (mid cost) are parallel and have a direction
// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
// directionalLight.position.set(1, 0.25, 0);
// scene.add(directionalLight);

// //! hemisphere light (mini cost) - 天地两色
// // The HemisphereLight is similar to the AmbientLight but with a different color from the sky than the color coming from the ground. Faces facing the sky will be lit by one color while another color will lit faces facing the ground.
// // The first parameter is the color corresponding to the sky color, the second parameter is the groundColor and the third parameter is the intensity:
// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
// scene.add(hemisphereLight);

// //! point light (mid cost) - 点光源 (伟哥爱用这个)
// // A PointLight gets emitted from a single point in all directions. A good example of a PointLight is a light bulb.
// const pointLight = new THREE.PointLight(0xff9000, 0.8, 10, 2);
// pointLight.position.set(1, 0.2, 0.5);
// scene.add(pointLight);

// //! rect area light (high cost) - 面光源 (只能照亮物体的一个面，不能投射阴影) - 黑暗房间中的显示屏光
// // The RectAreaLight is a light that gets emitted from a rectangular plane in one direction. It can be used to simulate light sources such as windows or neon lights.
// // Note: RectAreaLight only works with MeshStandardMaterial and MeshPhysicalMaterial.
// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
// rectAreaLight.position.set(-1.5, 0, 1.5); //
// rectAreaLight.lookAt(new THREE.Vector3()); // looking at the center of the scene
// scene.add(rectAreaLight);

//! spot light (high cost) - 聚光灯 (能投射阴影)
// A SpotLight is a light that gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets.
// A good example of a SpotLight is a flashlight or a stage spotlight.
const spotLight = new THREE.SpotLight(0xffffff, 10);
spotLight.position.set(0, 2, 3);
spotLight.angle = Math.PI * 0.2; // 光锥角度
spotLight.penumbra = 0.25; // 光锥边缘的柔和度
spotLight.decay = 2; // 衰减
spotLight.distance = 10; // 有效距离
// spotLight.castShadow = true; // 投射阴影
// spotLight.shadow.mapSize.width = 1024; // 阴影贴图分辨率
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.far = 15; // 阴影相机的远裁剪面
// spotLight.shadow.camera.near = 1; // 阴影相机的近裁剪面
// spotLight.shadow.camera.fov = 30; // 阴影相机的视野
scene.add(spotLight);
scene.add(spotLight.target); // spotlight 需要一个 target 对象来指示照射方向

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
