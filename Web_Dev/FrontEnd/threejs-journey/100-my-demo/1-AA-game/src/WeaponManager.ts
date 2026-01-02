import * as THREE from "three";
import { Bullet, GameConfig } from "./types";

/**
 * WeaponManager handles the AA gun, its rotation, and bullet shooting
 */
export class WeaponManager {
  private gun: THREE.Group;
  private bullets: Bullet[] = [];
  private scene: THREE.Scene;
  private config: GameConfig;

  constructor(scene: THREE.Scene, config: GameConfig) {
    this.scene = scene;
    this.config = config;
    this.gun = this.createGun();
    this.scene.add(this.gun);
  }

  private createGun(): THREE.Group {
    const gunGroup = new THREE.Group();
    gunGroup.position.set(0, 0, 0);

    // Base platform
    const baseGeometry = new THREE.CylinderGeometry(1.5, 2, 0.5, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    gunGroup.add(base);

    // Rotating turret
    const turretGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1, 8);
    const turretMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const turret = new THREE.Mesh(turretGeometry, turretMaterial);
    turret.position.y = 0.75;
    turret.castShadow = true;
    gunGroup.add(turret);

    // Gun barrel
    const barrelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 8);
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.set(0, 1.5, -1.5);
    barrel.rotation.x = -Math.PI / 6;
    barrel.castShadow = true;
    gunGroup.add(barrel);

    return gunGroup;
  }

  public updateGunRotation(targetPoint: THREE.Vector3): void {
    this.gun.lookAt(targetPoint);

    // Limit vertical rotation: 20 degrees to 80 degrees
    // Convert degrees to radians: 20° = π/9, 80° = 4π/9
    const minAngle = Math.PI / 9; // 20 degrees (lower limit)
    const maxAngle = (4 * Math.PI) / 9; // 80 degrees (upper limit)

    this.gun.rotation.x = Math.max(
      minAngle,
      Math.min(maxAngle, this.gun.rotation.x),
    );
  }

  public shoot(position: THREE.Vector3, direction: THREE.Vector3): void {
    const bullet = this.createBullet(position, direction);
    this.bullets.push(bullet);

    // Gun recoil animation
    this.gun.position.y -= 0.1;
    setTimeout(() => {
      this.gun.position.y += 0.1;
    }, 50);
  }

  private createBullet(
    position: THREE.Vector3,
    direction: THREE.Vector3,
  ): Bullet {
    const bulletGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const bulletMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 0.5,
    });
    const bulletMesh = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bulletMesh.position.copy(position);
    bulletMesh.castShadow = true;

    this.scene.add(bulletMesh);

    // Add tracer effect
    const trailGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.3,
    });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    trail.position.copy(position);
    this.scene.add(trail);

    setTimeout(() => {
      this.scene.remove(trail);
    }, 100);

    return {
      mesh: bulletMesh,
      velocity: direction.multiplyScalar(this.config.bulletSpeed),
      lifetime: this.config.bulletLifetime,
    };
  }

  public update(deltaTime: number): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];

      // Update position
      bullet.mesh.position.add(
        bullet.velocity.clone().multiplyScalar(deltaTime),
      );

      // Update lifetime
      bullet.lifetime -= deltaTime;

      // Remove if expired
      if (bullet.lifetime <= 0) {
        this.scene.remove(bullet.mesh);
        this.bullets.splice(i, 1);
      }
    }
  }

  public getBullets(): Bullet[] {
    return this.bullets;
  }

  public removeBullet(bullet: Bullet): void {
    const index = this.bullets.indexOf(bullet);
    if (index > -1) {
      this.scene.remove(bullet.mesh);
      this.bullets.splice(index, 1);
    }
  }

  public getGunPosition(): THREE.Vector3 {
    const bulletStartPos = new THREE.Vector3(0, 2, -2);
    this.gun.localToWorld(bulletStartPos);
    return bulletStartPos;
  }
}
