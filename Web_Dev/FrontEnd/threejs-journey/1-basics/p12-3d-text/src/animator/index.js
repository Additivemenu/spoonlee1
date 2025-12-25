import * as THREE from "three";

class Animator {
  constructor(scene, camera, renderer, controls) {
    this.clock = new THREE.Clock();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
  }

  startAnimationLoop() {
    const tick = () => {
      const elapsedTime = this.clock.getElapsedTime();

      // Update controls
      this.controls.update();

      // Render
      this.renderer.render(this.scene, this.camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}

export { Animator };
