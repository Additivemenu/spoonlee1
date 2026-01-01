import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { createParticleDistributionGeometry } from "./utils/particle-dist-geo-factory";

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
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 *! Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

/**
 *! Particles
 */
// option1: use built-in geometry
// const particleDistributionGeometry = new THREE.SphereGeometry(1, 32, 32); // particle distribution shape

// option2: custom particle positions
const { particleDistributionGeometry } = createParticleDistributionGeometry({
  radius: 2,
  count: 50000,
});

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02, // single size of each particle
  sizeAttenuation: true, // if camera distance affects size, if true, further particles appear smaller, otherwise all particles have same size regardless of distance
  //   color: new THREE.Color(0x00ff00),
  transparent: true, //! enable transparency
  alphaMap: particleTexture, //! use texture alpha channel for transparency - so we could see through the transparent parts of the texture
  // options for particle see-through handling
  //   alphaTest: 0.001, //! set alphaTest to let GPU discard pixels with low alpha value - this is 0 by default, we set it to a small value to avoid rendering dark edges
  //   depthTest: false, //! tell GPU to ignore depth when rendering particles, so particles are always visible even if behind other objects
  depthWrite: false, //! tell GPU not to write depth info for particles to avoid some transparency sorting issues
  // options for particle blending
  blending: THREE.AdditiveBlending, //! use additive blending for glowing effect
  vertexColors: true, // enable per-vertex color from geometry
});
const particleCloud = new THREE.Points(
  particleDistributionGeometry,
  particlesMaterial,
);
scene.add(particleCloud);

// cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

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
camera.position.z = 3;
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

  // option1: update particles as a whole
  // particleCloud.rotation.y = elapsedTime * 0.02;

  // option2: update each particle position for wave effect individually
  const positions = particleDistributionGeometry.attributes.position.array;
  const count = particleDistributionGeometry.attributes.position.count;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3; // index in the positions array
    const x = positions[i3];
    const y = positions[i3 + 1];
    // z position as wave function of x, and time
    positions[i3 + 2] = Math.sin(x * 2 + elapsedTime) * 0.1;
  }
  particleDistributionGeometry.attributes.position.needsUpdate = true; //! inform GPU about position attribute update

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
