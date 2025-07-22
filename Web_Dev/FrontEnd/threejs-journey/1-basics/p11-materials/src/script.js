import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Debug GUI
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
);
const matcapTexture = textureLoader.load("./textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

// textures used as map and matcap are supposed to be encoded in sRGB and we need to inform Three.js of this
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * ! Objects
 * 这里就是在手动dependency injection...
 */
// 1. MeshBasicMaterial ------------------------------
// ! bind the texture to the material
// const material = new THREE.MeshBasicMaterial();
// material properties (setter dependency injection)
// material.map = doorColorTexture;
// material.color = new THREE.Color("red"); // ! yes, you need to pass Three.js color instance
// material.wireframe = true; // wireframe mode on
// material.transparent = true;
// material.opacity = 0.2;
// material.alphaMap = doorAlphaTexture; // ! bind the alpha texture to the material
// material.side = THREE.DoubleSide; // render both sides of the geometry (这层皮的里外两面)

// 2. MeshNormalMaterial ------------------------
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

//! 3. MeshMatcapMaterial ------------------------
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// 4. MeshDepthMaterial ------------------------
// const material = new THREE.MeshDepthMaterial();

// 5. MeshLambertMaterial (need lights) ------------------------
// const material = new THREE.MeshLambertMaterial();

// 6. MeshPhongMaterial ------------------------
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100; // shininess of the material
// material.specular = new THREE.Color("blue"); // specular color of the material

// 7. MeshToonMaterial ------------------------
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter; // no need to mipmap for toon shading
// gradientTexture.magFilter = THREE.NearestFilter; // no need to mipmap for toon shading
// gradientTexture.generateMipmaps = false; // no need to mipmap for toon shading
// material.gradientMap = gradientTexture;

//! 8. MeshStandardMaterial (physically based rendering (PBR)) ------------------------
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1; // intensity of the ambient occlusion map
// material.displacementMap = doorHeightTexture; // 这个texture会引起geometry displacement (形变了)
material.metalnessMap = doorMetalnessTexture; // metalness map
material.roughnessMap = doorRoughnessTexture; // roughness map
material.normalMap = doorNormalTexture; // normal map
material.transparent = true; // make the material transparent
// material.alphaMap = doorAlphaTexture; // alpha map for transparency

gui.add(material, "metalness", 0, 1, 0.01).name("Metalness");
gui.add(material, "roughness", 0, 1, 0.01).name("Roughness");

// 9. MeshPhysicalMaterial (PBR) ------------------------


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

/**
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap; // materials that has a reflection will appear with this environment map
});

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
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
