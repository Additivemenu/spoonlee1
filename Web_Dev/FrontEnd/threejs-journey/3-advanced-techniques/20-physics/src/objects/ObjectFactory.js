import * as THREE from "three";
import * as CANNON from "cannon-es";

/**
 * Factory for creating physics-enabled 3D objects
 */
export class ObjectFactory {
  constructor(scene, physicsWorld, environmentMapTexture, soundManager) {
    this.scene = scene;
    this.physicsWorld = physicsWorld;
    this.environmentMapTexture = environmentMapTexture;
    this.soundManager = soundManager;

    // Track all created objects
    this.objectsToUpdate = [];

    // extract geometry and material for reuse to save memory
    this.sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    this.sphereMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
      envMapIntensity: 0.5,
    });

    this.boxMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
      envMapIntensity: 0.5,
    });
  }

  /**
   * Create a sphere with physics
   * @param {number} radius - Sphere radius
   * @param {THREE.Vector3} position - Initial position
   * @returns {THREE.Mesh} - Created sphere mesh
   */
  createSphere(radius, position) {
    // three.js mesh
    const sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
    sphereMesh.scale.set(radius, radius, radius);
    sphereMesh.castShadow = true;
    sphereMesh.position.copy(position);
    this.scene.add(sphereMesh);

    // cannon.js body
    const sphereBody = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(position.x, position.y, position.z), // m
      shape: new CANNON.Sphere(radius), // radius
      material: this.physicsWorld.plasticMaterial, // ! use plastic material
    });

    sphereBody.addEventListener("collide", this.soundManager.playHitSound);
    this.physicsWorld.world.addBody(sphereBody);

    //! attach the body to the mesh for later use
    this.objectsToUpdate.push({
      mesh: sphereMesh,
      body: sphereBody,
    });

    return sphereMesh;
  }

  /**
   * Create a box with physics
   * @param {number} width - Box width
   * @param {number} height - Box height
   * @param {number} depth - Box depth
   * @param {THREE.Vector3} position - Initial position
   * @returns {THREE.Mesh} - Created box mesh
   */
  createBox(width, height, depth, position) {
    // three.js mesh
    const boxMesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      this.boxMaterial,
    );
    boxMesh.castShadow = true;
    boxMesh.position.copy(position);
    this.scene.add(boxMesh);

    // cannon.js body
    const boxBody = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(position.x, position.y, position.z), // center of the box, in m
      shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)), // dimensions, note half extents
      material: this.physicsWorld.plasticMaterial, // ! use plastic material
    });

    boxBody.addEventListener("collide", this.soundManager.playHitSound);
    this.physicsWorld.world.addBody(boxBody);

    //! attach the body to the mesh for later use
    this.objectsToUpdate.push({
      mesh: boxMesh,
      body: boxBody,
    });

    return boxMesh;
  }

  /**
   * Update all object positions/rotations to match physics simulation
   */
  updateObjects() {
    // sync threejs mesh position/rotation with cannojs body position/rotation
    for (const object of this.objectsToUpdate) {
      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    }
  }

  /**
   * Remove all objects from scene and physics world
   */
  reset() {
    // clear threejs scene and physics world
    for (const object of this.objectsToUpdate) {
      object.body.removeEventListener(
        "collide",
        this.soundManager.playHitSound,
      );

      // remove body
      this.physicsWorld.removeBody(object.body);

      // remove mesh
      this.scene.remove(object.mesh);
    }

    // clear data structure that tracks objects
    this.objectsToUpdate.splice(0, this.objectsToUpdate.length); // clear the array
  }
}
