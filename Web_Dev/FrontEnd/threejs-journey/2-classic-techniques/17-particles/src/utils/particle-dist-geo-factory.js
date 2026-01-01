import * as THREE from "three";

/**
 * Creates a geometry for particle distribution
 * @param {*} options
 * @param {number} options.count - number of particles
 * @param {number} options.radius - radius of the distribution cube (from -radius to +radius)
 * @returns
 */
const createParticleDistributionGeometry = ({ count = 500, radius = 2 }) => {
  const particleDistributionGeometry = new THREE.BufferGeometry();

  // Float32Array is a typed array that stores 32-bit floating point numbers in a contiguous memory block - good for GPU
  const positions = new Float32Array(count * 3); // each vertex has x,y,z -> so the array is like [x0,y0,z0, x1,y1,z1, ...]
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * radius * 2; // random position between -radius to +radius
    colors[i] = Math.random(); // random color value between 0 to 1
  }

  particleDistributionGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  // yes, we can also set custom per-vertex colors
  particleDistributionGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3),
  );

  return { particleDistributionGeometry };
};

export { createParticleDistributionGeometry };
