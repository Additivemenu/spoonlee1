import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import * as CANNON from "cannon-es";

/**
 * Debug
 */
const gui = new GUI();
const debugObject = {};
debugObject.createSphere = () => {
  createSphere(
    Math.random() * 0.5 + 0.2,
    new THREE.Vector3((Math.random() - 0.5) * 3, 3, (Math.random() - 0.5) * 3),
  );
};
gui.add(debugObject, "createSphere").name("Create Sphere");

debugObject.createBox = () => {
  createBox(
    Math.random() * 0.5 + 0.2,
    Math.random() * 0.5 + 0.2,
    Math.random() * 0.5 + 0.2,
    new THREE.Vector3((Math.random() - 0.5) * 3, 3, (Math.random() - 0.5) * 3),
  );
};
gui.add(debugObject, "createBox").name("Create Box");

debugObject.reset = () => {
  // clear threejs scene and physics world
  for (const object of objectsToUpdate) {
    object.body.removeEventListener("collide", playHitSound);
    // remove body
    world.removeBody(object.body);

    // remove mesh
    scene.remove(object.mesh);
  }
  // clear data structure that tracks objects
  objectsToUpdate.splice(0, objectsToUpdate.length); // clear the array
};
gui.add(debugObject, "reset").name("Reset Scene");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * sound
 */
const hitSound = new Audio("/sounds/hit.mp3");
const playHitSound = (collision) => {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  // only play sound if impact is strong enough
  // otherwise there will be too many sounds
  if (impactStrength > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0; // rewind to start
    hitSound.play();
  }
};

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

/**
 * ===========================================================================================
 *! physics world
 canno.js is the physics engine - it's like backend calculation for 3D physics simulation
 three.js is the rendering engine - it's like frontend rendering for 3D graphics display
 */
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world); //! optimize collision detection for many objects
world.allowSleep = true; //! allow objects to sleep when they stop moving to save computation (slept objects are ignored in physics calculations)
// https://schteppe.github.io/cannon.js/docs/classes/Vec3.html
world.gravity.set(0, -9.82, 0); // gravity vec defined in m/s²
// world.gravity.set(0, 0, 0); // no gravity
//! materials (material in physics engine, not threejs material)
const concreteMaterial = new CANNON.Material("concrete");
const plasticMaterial = new CANNON.Material("plastic");

//! contact material - defines how two materials interact
const concretePlasticContactMaterial = new CANNON.ContactMaterial(
  concreteMaterial,
  plasticMaterial,
  {
    friction: 0.1, // how much resistance when sliding against each other
    restitution: 0.7, // bounciness
  },
);
world.addContactMaterial(concretePlasticContactMaterial);
// set as default contact material, if not specified otherwise:
world.defaultContactMaterial = concretePlasticContactMaterial;

// physics sphere
// const sphereBody = new CANNON.Body({
//   mass: 1, // kg
//   position: new CANNON.Vec3(0, 3, 0), // m
//   shape: new CANNON.Sphere(0.5), // radius
//   material: plasticMaterial, // ! use plastic material
// });
// //! apply an initial force (only lasts for one frame (physics step)) to the sphere
// // this is like you kick on the sphere
// sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));
// world.addBody(sphereBody);

// floor
const floorBody = new CANNON.Body({
  mass: 0, // mass = 0 makes the body static
  position: new CANNON.Vec3(0, 0, 0), //
  shape: new CANNON.Plane(), // cannojs plane is infinite
  material: concreteMaterial, // ! use concrete material
});
// rotate the floor to be horizontal: axis, angle  - rotate around X axis by 90 degrees
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture,
//     envMapIntensity: 0.5,
//   }),
// );
// sphere.castShadow = true;
// sphere.position.y = 0.5;
// scene.add(sphere);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  }),
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Utils
 */
const objectsToUpdate = [];
// extract geomtry and material for reuse to save memory
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
});
const createSphere = (radius, position) => {
  // three.js mesh
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.scale.set(radius, radius, radius);
  sphereMesh.castShadow = true;
  sphereMesh.position.copy(position);
  scene.add(sphereMesh);

  // canno.js body
  const sphereBody = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(position.x, position.y, position.z), // m
    shape: new CANNON.Sphere(radius), // radius
    material: plasticMaterial, // ! use plastic material
  });
  sphereBody.addEventListener("collide", playHitSound);
  world.addBody(sphereBody);

  //! attach the body to the mesh for later use
  sphereMesh.userData.body = sphereBody;
  objectsToUpdate.push({
    mesh: sphereMesh,
    body: sphereBody,
  });

  return sphereMesh;
};
createSphere(0.5, new THREE.Vector3(0, 3, 0));

const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
});
const createBox = (width, height, depth, position) => {
  // three.js mesh
  const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    boxMaterial,
  );
  boxMesh.castShadow = true;
  boxMesh.position.copy(position);
  scene.add(boxMesh);

  // canno.js body
  const boxBody = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(position.x, position.y, position.z), // center of the box, in m
    shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)), // dimensions, note half extents
    material: plasticMaterial, // ! use plastic material
  });
  boxBody.addEventListener("collide", playHitSound);
  world.addBody(boxBody);

  //! attach the body to the mesh for later use
  boxMesh.userData.body = boxBody;
  objectsToUpdate.push({
    mesh: boxMesh,
    body: boxBody,
  });

  return boxMesh;
};

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // ===================================================================
  // //! Update physics world` (sync physics engine with rendering engine)
  world.step(1 / 60, deltaTime, 3);

  // sync threejs mesh position/rotation with cannojs body position/rotation
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }

  // ===================================================================
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
