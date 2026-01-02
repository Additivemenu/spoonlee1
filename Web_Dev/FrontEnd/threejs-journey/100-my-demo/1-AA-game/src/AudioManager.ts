/**
 * AudioManager handles all game sound effects using Web Audio API
 */
export class AudioManager {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private isMuted: boolean = false;

  constructor() {
    // Create audio context
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Create master gain node for volume control
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.3; // 30% volume by default
  }

  /**
   * Play gun fire sound effect
   */
  public playGunFire(): void {
    if (this.isMuted) return;

    const currentTime = this.audioContext.currentTime;

    // Create oscillator for the gunshot
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Configure gunshot sound (short, punchy)
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(100, currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, currentTime + 0.1);

    // Quick attack and decay for punch
    gainNode.gain.setValueAtTime(0.5, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.1);

    // Play the sound
    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.1);
  }

  /**
   * Play explosion sound effect
   */
  public playExplosion(): void {
    if (this.isMuted) return;

    const currentTime = this.audioContext.currentTime;

    // Create noise for explosion
    const bufferSize = this.audioContext.sampleRate * 0.5; // 0.5 seconds
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);

    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Create buffer source
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;

    // Create filter for explosion rumble
    const filter = this.audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, currentTime + 0.5);

    // Create gain for envelope
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.8, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);

    // Connect nodes
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Play the explosion
    noise.start(currentTime);
    noise.stop(currentTime + 0.5);
  }

  /**
   * Play a hit sound when bullet hits a plane
   */
  public playHit(): void {
    if (this.isMuted) return;

    const currentTime = this.audioContext.currentTime;

    // Create a short metallic hit sound
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Metallic ping sound
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.1);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.1);
  }

  /**
   * Set master volume (0 to 1)
   */
  public setVolume(volume: number): void {
    this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
  }

  /**
   * Toggle mute on/off
   */
  public toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  /**
   * Check if audio is muted
   */
  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Resume audio context (needed for browser autoplay policies)
   */
  public resume(): void {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }
}
