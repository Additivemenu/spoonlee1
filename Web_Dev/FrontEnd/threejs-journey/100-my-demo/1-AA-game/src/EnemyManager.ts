import * as THREE from "three";
import { Plane, GameConfig } from "./types";

/**
 * EnemyManager handles plane creation, spawning, and movement
 */
export class EnemyManager {
  private planes: Plane[] = [];
  private scene: THREE.Scene;
  private config: GameConfig;
  private lastPlaneSpawn = 0;

  constructor(scene: THREE.Scene, config: GameConfig) {
    this.scene = scene;
    this.config = config;
  }

  private createPlane(): Plane {
    const planeGroup = new THREE.Group();

    // Fuselage
    const fuselageGeometry = new THREE.BoxGeometry(0.5, 0.5, 2);
    const fuselageMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4444,
    });
    const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
    fuselage.castShadow = true;
    planeGroup.add(fuselage);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(4, 0.1, 0.8);
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xff6666 });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    wings.position.y = -0.2;
    wings.castShadow = true;
    planeGroup.add(wings);

    // Tail
    const tailGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.8);
    const tail = new THREE.Mesh(tailGeometry, wingMaterial);
    tail.position.set(0, 0.3, -0.8);
    tail.castShadow = true;
    planeGroup.add(tail);

    // Random spawn position and direction
    const side = Math.random() > 0.5 ? 1 : -1;
    const startX = side * (30 + Math.random() * 20);
    const startY = 15 + Math.random() * 15;
    const startZ = -40 + Math.random() * 20;

    planeGroup.position.set(startX, startY, startZ);

    // Point towards the opposite side
    const targetX = -side * (20 + Math.random() * 30);
    const direction = new THREE.Vector3(targetX - startX, -2, 40);
    direction.normalize();

    // Rotate plane to face direction
    planeGroup.lookAt(
      planeGroup.position.x + direction.x,
      planeGroup.position.y + direction.y,
      planeGroup.position.z + direction.z,
    );

    this.scene.add(planeGroup);

    return {
      mesh: planeGroup,
      velocity: direction.multiplyScalar(8 + Math.random() * 4),
      health: 1,
    };
  }

  public spawnPlanes(deltaTime: number): void {
    this.lastPlaneSpawn += deltaTime;

    if (this.lastPlaneSpawn >= this.config.planeSpawnInterval) {
      this.planes.push(this.createPlane());
      this.lastPlaneSpawn = 0;
    }
  }

  public update(deltaTime: number): void {
    for (let i = this.planes.length - 1; i >= 0; i--) {
      const plane = this.planes[i];

      // Update position
      plane.mesh.position.add(plane.velocity.clone().multiplyScalar(deltaTime));

      // Remove if out of bounds
      if (
        plane.mesh.position.z > 50 ||
        plane.mesh.position.y < -5 ||
        Math.abs(plane.mesh.position.x) > 60
      ) {
        this.scene.remove(plane.mesh);
        this.planes.splice(i, 1);
      }
    }
  }

  public getPlanes(): Plane[] {
    return this.planes;
  }

  public removePlane(plane: Plane): void {
    const index = this.planes.indexOf(plane);
    if (index > -1) {
      this.scene.remove(plane.mesh);
      this.planes.splice(index, 1);
    }
  }
}
