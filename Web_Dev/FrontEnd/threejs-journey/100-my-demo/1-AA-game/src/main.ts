import * as THREE from "three";

// Game State
interface GameState {
  score: number;
  planesDestroyed: number;
  isRunning: boolean;
}

interface Plane {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  health: number;
}

interface Bullet {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  lifetime: number;
}

class AAGame {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private gun: THREE.Group;
  private planes: Plane[] = [];
  private bullets: Bullet[] = [];
  private gameState: GameState;

  private mousePosition = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();

  private readonly PLANE_SPAWN_INTERVAL = 2000; // ms
  private readonly BULLET_SPEED = 50;
  private readonly BULLET_LIFETIME = 3; // seconds
  private lastPlaneSpawn = 0;

  constructor() {
    this.gameState = {
      score: 0,
      planesDestroyed: 0,
      isRunning: true,
    };

    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
    this.scene.fog = new THREE.Fog(0x87ceeb, 50, 200);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 5, 0);

    // Renderer setup
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create gun
    this.gun = this.createGun();
    this.scene.add(this.gun);

    // Setup lighting
    this.setupLighting();

    // Create ground
    this.createGround();

    // Event listeners
    this.setupEventListeners();

    // Start game loop
    this.animate();
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    this.scene.add(directionalLight);
  }

  private createGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x228b22,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
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
      velocity: direction.multiplyScalar(this.BULLET_SPEED),
      lifetime: this.BULLET_LIFETIME,
    };
  }

  private setupEventListeners(): void {
    // Mouse move for aiming
    window.addEventListener("mousemove", (event) => {
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Shooting
    const shoot = () => {
      if (!this.gameState.isRunning) return;

      // Calculate shooting direction
      this.raycaster.setFromCamera(this.mousePosition, this.camera);
      const shootDirection = this.raycaster.ray.direction.clone();

      // Bullet starts from gun barrel
      const bulletStartPos = new THREE.Vector3(0, 2, -2);
      this.gun.localToWorld(bulletStartPos);

      const bullet = this.createBullet(bulletStartPos, shootDirection);
      this.bullets.push(bullet);

      // Gun recoil animation
      this.gun.position.y -= 0.1;
      setTimeout(() => {
        this.gun.position.y += 0.1;
      }, 50);
    };

    window.addEventListener("click", shoot);
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        shoot();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private updateGunRotation(): void {
    // Update gun rotation based on mouse position
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    const targetPoint = this.raycaster.ray.origin
      .clone()
      .add(this.raycaster.ray.direction.multiplyScalar(20));

    this.gun.lookAt(targetPoint);

    // Limit vertical rotation
    this.gun.rotation.x = Math.max(
      -Math.PI / 6,
      Math.min(Math.PI / 3, this.gun.rotation.x),
    );
  }

  private spawnPlanes(deltaTime: number): void {
    this.lastPlaneSpawn += deltaTime;

    if (this.lastPlaneSpawn >= this.PLANE_SPAWN_INTERVAL) {
      this.planes.push(this.createPlane());
      this.lastPlaneSpawn = 0;
    }
  }

  private updateBullets(deltaTime: number): void {
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

  private updatePlanes(deltaTime: number): void {
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

  private checkCollisions(): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];

      for (let j = this.planes.length - 1; j >= 0; j--) {
        const plane = this.planes[j];

        // Simple distance-based collision
        const distance = bullet.mesh.position.distanceTo(plane.mesh.position);

        if (distance < 2.5) {
          // Hit!
          this.createExplosion(plane.mesh.position);

          // Remove bullet and plane
          this.scene.remove(bullet.mesh);
          this.bullets.splice(i, 1);

          this.scene.remove(plane.mesh);
          this.planes.splice(j, 1);

          // Update score
          this.gameState.score += 100;
          this.gameState.planesDestroyed++;
          this.updateUI();

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

  private updateUI(): void {
    const scoreElement = document.getElementById("score");
    const hitsElement = document.getElementById("hits");

    if (scoreElement)
      scoreElement.textContent = this.gameState.score.toString();
    if (hitsElement)
      hitsElement.textContent = this.gameState.planesDestroyed.toString();
  }

  private clock = new THREE.Clock();

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    const deltaTime = this.clock.getDelta();

    if (this.gameState.isRunning) {
      // Update gun rotation
      this.updateGunRotation();

      // Spawn planes
      this.spawnPlanes(deltaTime * 1000); // Convert to ms

      // Update game objects
      this.updateBullets(deltaTime);
      this.updatePlanes(deltaTime);

      // Check collisions
      this.checkCollisions();
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  };
}

// Initialize game when page loads
window.addEventListener("DOMContentLoaded", () => {
  new AAGame();
});
