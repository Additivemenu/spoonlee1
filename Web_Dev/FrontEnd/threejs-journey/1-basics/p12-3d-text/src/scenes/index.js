import * as THREE from "three";
import { create3DText } from "./meshes/text3D";
import { createDonuts } from "./meshes/donuts";

const createScene = () => {
  const scene = new THREE.Scene();
  // axis helper
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
  matcapTexture.encoding = THREE.sRGBEncoding;

  // objects
  create3DText({ scene, matcapTexture, textToDisplay: "Hello Three.js!" });
  createDonuts({ scene, matcapTexture, numberOfDonuts: 200 });

  return scene;
};

export { createScene };
