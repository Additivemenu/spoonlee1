import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * !===============================================
 * !Textures
 * !===============================================
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("onStart");
};
loadingManager.onProgress = () => {
  console.log("onProgress");
};
loadingManager.onLoad = () => {
  console.log("onLoad");
};
loadingManager.onError = () => {
  console.log("onError");
};
const textureLoader = new THREE.TextureLoader(loadingManager);

//! load all the textures into memory
const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
colorTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
alphaTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

const heightTexture = textureLoader.load("/textures/door/height.jpg");
heightTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

const normalTexture = textureLoader.load("/textures/door/normal.jpg");
normalTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
);
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
metalnessTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
roughnessTexture.colorSpace = THREE.SRGBColorSpace; // Textures used as map and matcap are supposed to be encoded in sRGB.

//! texture transformation (similar to background-image attr and transform() in css)
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.center.z = 0.5;

//! filtering and mipmapping
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;  // checkerboard-8x8 is a small size file

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture }); // !
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
