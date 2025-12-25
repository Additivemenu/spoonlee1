import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"; // three.js built-in font loader
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"; // three.js built-in text geometry
import { createDonuts } from "./donuts";

export function create3DText({
  scene,
  matcapTexture,
  textToDisplay = "Hello Three.js",
}) {
  /**
   * load Fonts from local static file
   */
  const fontLoader = new FontLoader();
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    console.log("font loaded");
    // canvas > scene >  Mesh = Geometry + Material
    // https://threejs.org/docs/?q=Geometry#TextGeometry
    const textGeometry = new TextGeometry(textToDisplay, {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 5,
      // bevel options, to make the text edges smoother
      bevelEnabled: true,
      bevelThickness: 0.03, // in depth direction
      bevelSize: 0.02, // in size direction
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.center(); // center the geometry
    //  alternative way to center the text geometry
    // textGeometry.computeBoundingBox();
    // // move the text to center (half of its size in each axis negatively)
    // textGeometry.translate(
    //   (textGeometry.boundingBox.max.x - 0.02) * -0.5, // bevelSize compensation
    //   (textGeometry.boundingBox.max.y - 0.02) * -0.5,
    //   (textGeometry.boundingBox.max.z - 0.03) * -0.5, // bevelThickness compensation
    // );

    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
  });
}
