import * as THREE from "three";

const createRenderer = ({ canvas, sizes }) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  return renderer;
};

export { createRenderer };
