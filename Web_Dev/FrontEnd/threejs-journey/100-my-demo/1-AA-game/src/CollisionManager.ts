import * as THREE from "three";
import { Bullet, Plane } from "./types";

/**
 * CollisionManager handles collision detection and explosion effects
 */
export class CollisionManager {
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  public checkCollisions(
    bullets: Bullet[],
    planes: Plane[],
    onHit: (bullet: Bullet, plane: Plane) => void,
  ): void {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];

      for (let j = planes.length - 1; j >= 0; j--) {
        const plane = planes[j];

        // Simple distance-based collision
        const distance = bullet.mesh.position.distanceTo(plane.mesh.position);

        if (distance < 2.5) {
          // Hit!
          this.createExplosion(plane.mesh.position);
          onHit(bullet, plane);
          break;
        }
      }
    }
  }

  private createExplosion(position: THREE.Vector3): void {
    // Create explosion effect
    const explosionGeometry = new THREE.SphereGeometry(1, 8, 8);
    const explosionMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 1,
    });
    const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
    explosion.position.copy(position);
    this.scene.add(explosion);

    // Animate explosion
    let scale = 0.1;
    const explosionInterval = setInterval(() => {
      scale += 0.3;
      explosion.scale.set(scale, scale, scale);
      explosionMaterial.opacity -= 0.1;

      if (explosionMaterial.opacity <= 0) {
        clearInterval(explosionInterval);
        this.scene.remove(explosion);
      }
    }, 50);
  }
}
