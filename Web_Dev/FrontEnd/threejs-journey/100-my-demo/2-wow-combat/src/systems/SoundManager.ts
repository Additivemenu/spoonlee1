import * as THREE from "three";

/**
 * Sound Manager for handling game audio effects
 * Uses procedural audio generation for attacks
 */
export class SoundManager {
  private listener: THREE.AudioListener;
  private audioContext: AudioContext;

  constructor(camera: THREE.Camera) {
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);
    this.audioContext = this.listener.context;

    this.initializeSounds();
  }

  /**
   * Initialize sound effects using procedural audio
   */
  private initializeSounds(): void {
    // We'll create sounds on-the-fly using oscillators
    // No need to load external audio files
  }

  /**
   * Play player light attack sound
   */
  playPlayerAttack(): void {
    this.playSound(() => {
      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);

      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.15);
    });
  }

  /**
   * Play player heavy attack sound (deeper and longer)
   */
  playPlayerHeavyAttack(): void {
    this.playSound(() => {
      const now = this.audioContext.currentTime;

      // Main impact
      const oscillator1 = this.audioContext.createOscillator();
      const gainNode1 = this.audioContext.createGain();

      oscillator1.type = "sawtooth";
      oscillator1.frequency.setValueAtTime(250, now);
      oscillator1.frequency.exponentialRampToValueAtTime(80, now + 0.2);

      gainNode1.gain.setValueAtTime(0.4, now);
      gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      oscillator1.connect(gainNode1);
      gainNode1.connect(this.audioContext.destination);

      oscillator1.start(now);
      oscillator1.stop(now + 0.3);

      // Add bass rumble for heavy feel
      const oscillator2 = this.audioContext.createOscillator();
      const gainNode2 = this.audioContext.createGain();

      oscillator2.type = "sine";
      oscillator2.frequency.setValueAtTime(60, now);
      oscillator2.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gainNode2.gain.setValueAtTime(0.3, now);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      oscillator2.connect(gainNode2);
      gainNode2.connect(this.audioContext.destination);

      oscillator2.start(now);
      oscillator2.stop(now + 0.35);
    });
  }

  /**
   * Play monster attack sound
   */
  playMonsterAttack(): void {
    this.playSound(() => {
      const now = this.audioContext.currentTime;

      // Growl-like sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);

      gainNode.gain.setValueAtTime(0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.2);
    });
  }

  /**
   * Play heal sound (softer, higher pitch)
   */
  playHeal(): void {
    this.playSound(() => {
      const now = this.audioContext.currentTime;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.35);
    });
  }

  /**
   * Generic method to play a sound using a callback
   */
  private playSound(soundCallback: () => void): void {
    try {
      // Resume audio context if it's suspended (browser autoplay policy)
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      soundCallback();
    } catch (error) {
      console.warn("Could not play sound:", error);
    }
  }

  /**
   * Set master volume
   */
  setVolume(volume: number): void {
    this.listener.setMasterVolume(Math.max(0, Math.min(1, volume)));
  }
}
