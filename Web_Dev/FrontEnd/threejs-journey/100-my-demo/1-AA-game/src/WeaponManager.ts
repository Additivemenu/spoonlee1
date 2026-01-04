import * as THREE from "three";
import { Bullet, GameConfig } from "./types";

/**
 * WeaponManager handles the AA gun, its rotation, and bullet shooting
 */
export class WeaponManager {
  private gunBase: THREE.Group; // Base (static)
  private turret: THREE.Group; // Turret (rotates horizontally on XZ plane)
  private barrelGroup: THREE.Group; // Barrel assembly (rotates vertically on XY plane)
  private bullets: Bullet[] = [];
  private scene: THREE.Scene;
  private config: GameConfig;

  constructor(scene: THREE.Scene, config: GameConfig) {
    this.scene = scene;
    this.config = config;

    // Initialize gun components
    this.gunBase = new THREE.Group();
    this.turret = new THREE.Group();
    this.barrelGroup = new THREE.Group();

    this.createGun();
    this.scene.add(this.gunBase);
  }

  private createGun(): void {
    this.gunBase.position.set(0, 0, 0);

    // Base platform (static)
    const baseGeometry = new THREE.CylinderGeometry(1.5, 2, 0.5, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    this.gunBase.add(base);

    // Turret body (rotates horizontally)
    this.turret.position.y = 0.5; // Place on top of base
    const turretGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1, 8);
    const turretMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const turretMesh = new THREE.Mesh(turretGeometry, turretMaterial);
    turretMesh.position.y = 0.5;
    turretMesh.castShadow = true;
    this.turret.add(turretMesh);
    this.gunBase.add(this.turret);

    // Barrel assembly (rotates vertically)
    this.barrelGroup.position.set(0, 1, 0); // Pivot point at turret top

    // Gun barrel - create a cylinder that points in +Z direction by default
    const barrelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 8);
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    // Rotate barrel to point forward (along -Z axis)
    // Cylinder's default is along Y axis, rotate 90° around X to point along Z
    barrel.rotation.x = Math.PI / 2;
    // Position barrel forward from pivot point (half length forward)
    barrel.position.set(0, 0, -2);
    barrel.castShadow = true;
    this.barrelGroup.add(barrel);

    this.turret.add(this.barrelGroup);
  }

  public updateGunRotation(targetPoint: THREE.Vector3): void {
    // Calculate direction from gun position to target
    const gunPosition = new THREE.Vector3(0, 1.5, 0); // Gun pivot position
    const direction = targetPoint.clone().sub(gunPosition).normalize();

    // Calculate azimuth angle (horizontal rotation) for turret
    // This makes the turret rotate on XZ plane (around Y axis)
    const azimuthAngle = Math.atan2(direction.x, direction.z);
    this.turret.rotation.y = azimuthAngle;

    // Calculate elevation angle (vertical rotation) for barrel
    // This makes the barrel rotate in vertical plane (around X axis in local space)
    const horizontalDistance = Math.sqrt(
      direction.x * direction.x + direction.z * direction.z,
    );
    let elevationAngle = Math.atan2(direction.y, horizontalDistance);

    // Limit vertical rotation: 20 degrees to 80 degrees
    const minAngle = Math.PI / 9; // 20 degrees (lower limit)
    const maxAngle = (4 * Math.PI) / 9; // 80 degrees (upper limit)
    elevationAngle = Math.max(minAngle, Math.min(maxAngle, elevationAngle));

    // Apply elevation to barrel group (rotates around its local X axis)
    this.barrelGroup.rotation.x = elevationAngle;
  }

  public shoot(position: THREE.Vector3, direction: THREE.Vector3): void {
    const bullet = this.createBullet(position, direction);
    this.bullets.push(bullet);

    // Gun recoil animation - move barrel back slightly
    const originalZ = this.barrelGroup.position.z;
    this.barrelGroup.position.z -= 0.3;
    setTimeout(() => {
      this.barrelGroup.position.z = originalZ;
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
    // Calculate bullet spawn position at the tip of the barrel
    // Since barrel is 4 units long and positioned at z=-2, tip is at z=-4
    const bulletStartPos = new THREE.Vector3(0, 0, -4); // At barrel tip in local space
    // Transform to world space
    this.barrelGroup.localToWorld(bulletStartPos);
    return bulletStartPos;
  }

  /**
   * Get the actual direction the barrel is pointing
   */
  public getBarrelDirection(): THREE.Vector3 {
    // The barrel points along -Z axis in its local space
    const localDirection = new THREE.Vector3(0, 0, -1);
    // Transform direction to world space (rotation only, no translation)
    const worldDirection = localDirection
      .applyMatrix4(this.barrelGroup.matrixWorld)
      .sub(
        new THREE.Vector3().setFromMatrixPosition(this.barrelGroup.matrixWorld),
      )
      .normalize();
    return worldDirection;
  }
}
