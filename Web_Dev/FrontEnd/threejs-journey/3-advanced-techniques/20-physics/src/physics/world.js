import * as CANNON from "cannon-es";

/**
 * ===========================================================================================
 *! Physics world
 * cannon.js is the physics engine - it's like backend calculation for 3D physics simulation
 * three.js is the rendering engine - it's like frontend rendering for 3D graphics display
 */
export class PhysicsWorld {
  constructor() {
    this.world = new CANNON.World();
    this.setupWorld();
    this.setupMaterials();
    this.createFloor();
  }

  setupWorld() {
    //! optimize collision detection for many objects
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);

    //! allow objects to sleep when they stop moving to save computation
    // (slept objects are ignored in physics calculations)
    this.world.allowSleep = true;

    // https://schteppe.github.io/cannon.js/docs/classes/Vec3.html
    this.world.gravity.set(0, -9.82, 0); // gravity vec defined in m/s²
    // this.world.gravity.set(0, 0, 0); // no gravity
  }

  setupMaterials() {
    //! materials (material in physics engine, not threejs material)
    this.concreteMaterial = new CANNON.Material("concrete");
    this.plasticMaterial = new CANNON.Material("plastic");

    //! contact material - defines how two materials interact
    const concretePlasticContactMaterial = new CANNON.ContactMaterial(
      this.concreteMaterial,
      this.plasticMaterial,
      {
        friction: 0.1, // how much resistance when sliding against each other
        restitution: 0.7, // bounciness
      },
    );

    this.world.addContactMaterial(concretePlasticContactMaterial);
    // set as default contact material, if not specified otherwise:
    this.world.defaultContactMaterial = concretePlasticContactMaterial;
  }

  createFloor() {
    const floorBody = new CANNON.Body({
      mass: 0, // mass = 0 makes the body static
      position: new CANNON.Vec3(0, 0, 0),
      shape: new CANNON.Plane(), // cannojs plane is infinite
      material: this.concreteMaterial, // ! use concrete material
    });

    // rotate the floor to be horizontal: axis, angle - rotate around X axis by 90 degrees
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5,
    );

    this.world.addBody(floorBody);
  }

  /**
   * Update physics simulation
   * @param {number} deltaTime - Time since last update
   */
  step(deltaTime) {
    this.world.step(1 / 60, deltaTime, 3);
  }

  /**
   * Remove a body from the physics world
   * @param {CANNON.Body} body - Body to remove
   */
  removeBody(body) {
    this.world.removeBody(body);
  }
}
