import GUI from "lil-gui";
import { createRenderer } from "./infra/renderer";
import { createCamera } from "./infra/camera";
import { createControl } from "./infra/controls";
import { createScene } from "./scenes/index.js";

// Debug
const gui = new GUI();

//! setup scene
const canvas = document.querySelector("canvas.webgl");
const scene = createScene();

// infra
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = createCamera({ scene, sizes });
const controls = createControl({
  camera,
  canvas,
});
const renderer = createRenderer({ canvas, sizes });

// listener
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

// put everything together and start animation
const animator = new (await import("./animator/index.js")).Animator(
  scene,
  camera,
  renderer,
  controls,
);
animator.startAnimationLoop();
