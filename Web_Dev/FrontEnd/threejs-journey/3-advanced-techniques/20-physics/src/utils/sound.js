/**
 * Sound utility for collision effects
 */
export class SoundManager {
  constructor(soundPath) {
    this.hitSound = new Audio(soundPath);
  }

  /**
   * Play collision sound based on impact strength
   * @param {Object} collision - Collision event from physics engine
   */
  playHitSound = (collision) => {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal();

    // only play sound if impact is strong enough
    // otherwise there will be too many sounds
    if (impactStrength > 1.5) {
      this.hitSound.volume = Math.random();
      this.hitSound.currentTime = 0; // rewind to start
      this.hitSound.play();
    }
  };
}
