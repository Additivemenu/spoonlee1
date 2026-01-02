import * as THREE from "three";

/**
 * InputManager handles all user input (mouse, keyboard)
 */
export class InputManager {
  private mousePosition = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();
  private shootCallbacks: Array<() => void> = [];
  private muteToggleCallbacks: Array<() => void> = [];
  private crosshairElement: HTMLElement | null = null;

  constructor() {
    this.crosshairElement = document.getElementById("crosshair");
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Mouse move for aiming
    window.addEventListener("mousemove", (event) => {
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update crosshair position
      this.updateCrosshairPosition(event.clientX, event.clientY);
    });

    // Shooting
    window.addEventListener("click", () => this.handleShoot());
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        this.handleShoot();
      }
      if (event.code === "KeyM") {
        this.handleMuteToggle();
      }
    });
  }

  private handleShoot(): void {
    this.shootCallbacks.forEach((callback) => callback());
  }

  private handleMuteToggle(): void {
    this.muteToggleCallbacks.forEach((callback) => callback());
  }

  private updateCrosshairPosition(x: number, y: number): void {
    if (this.crosshairElement) {
      this.crosshairElement.style.left = `${x}px`;
      this.crosshairElement.style.top = `${y}px`;
    }
  }

  public onShoot(callback: () => void): void {
    this.shootCallbacks.push(callback);
  }

  public onMuteToggle(callback: () => void): void {
    this.muteToggleCallbacks.push(callback);
  }

  public getAimDirection(camera: THREE.PerspectiveCamera): THREE.Vector3 {
    this.raycaster.setFromCamera(this.mousePosition, camera);
    return this.raycaster.ray.direction.clone();
  }

  public getTargetPoint(
    camera: THREE.PerspectiveCamera,
    distance: number = 20,
  ): THREE.Vector3 {
    this.raycaster.setFromCamera(this.mousePosition, camera);
    const targetPoint = this.raycaster.ray.origin
      .clone()
      .add(this.raycaster.ray.direction.multiplyScalar(distance));
    return targetPoint;
  }
}
