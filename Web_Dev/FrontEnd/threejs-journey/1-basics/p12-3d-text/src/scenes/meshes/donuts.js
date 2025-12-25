import * as THREE from "three";

export function createDonuts({ scene, matcapTexture, numberOfDonuts = 100 }) {
  // create 100 donuts randomly around the text
  // generate geometry and material first, then reuse them to create multiple meshes to improve performance
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  for (let i = 0; i < numberOfDonuts; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    // random position [-5, 5, -5, 5, -5, 5]
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
}
