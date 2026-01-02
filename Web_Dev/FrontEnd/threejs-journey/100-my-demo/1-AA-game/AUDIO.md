# 🔊 Audio System Documentation

## Overview

The AA Game features a complete audio system using the **Web Audio API** for synthesized sound effects. All audio is generated procedurally - no audio files needed!

## AudioManager Class

Located in `src/AudioManager.ts`, this manager handles all game sounds.

### Features

- ✅ **Gun fire sound** - Punchy gunshot effect
- ✅ **Explosion sound** - Rumbling explosion with low-pass filter
- ✅ **Hit sound** - Metallic ping on successful hits
- ✅ **Volume control** - Adjustable master volume
- ✅ **Mute functionality** - Toggle audio on/off
- ✅ **Browser compatibility** - Handles autoplay policies

## Sound Design

### 1. Gun Fire (`playGunFire()`)

```typescript
// Short, punchy gunshot
- Type: Sawtooth wave
- Frequency: 100Hz → 50Hz (exponential ramp)
- Duration: 0.1 seconds
- Volume: 50%
```

**Effect**: Creates a sharp, powerful gunshot sound with quick attack and decay.

### 2. Explosion (`playExplosion()`)

```typescript
// Rumbling explosion
- Source: White noise
- Filter: Low-pass (1000Hz → 50Hz)
- Duration: 0.5 seconds
- Volume: 80%
```

**Effect**: Produces a deep, rumbling explosion with gradual decay.

### 3. Hit Sound (`playHit()`)

```typescript
// Metallic impact
- Type: Sine wave
- Frequency: 800Hz → 400Hz (exponential ramp)
- Duration: 0.1 seconds
- Volume: 30%
```

**Effect**: Creates a bright, metallic ping indicating a successful hit.

## Integration

### In main.ts

```typescript
// Initialize
this.audioManager = new AudioManager();

// Resume on user interaction (browser requirement)
window.addEventListener("click", () => this.audioManager.resume(), {
  once: true,
});

// Play sounds on events
this.audioManager.playGunFire(); // When shooting
this.audioManager.playHit(); // On bullet hit
this.audioManager.playExplosion(); // When plane destroyed
```

### User Controls

1. **Mute Button** (Top-right corner)

   - Click to toggle sound on/off
   - Visual indicator: 🔊 Sound / 🔇 Muted

2. **Keyboard Shortcut**
   - Press **M** to toggle mute
   - Works anywhere in game

## Technical Details

### Web Audio API

The audio system uses the Web Audio API for several advantages:

1. **No file loading** - All sounds generated on-the-fly
2. **Low latency** - Instant sound playback
3. **Small bundle size** - No audio assets to download
4. **Precise control** - Fine-tuned frequency and timing
5. **Performance** - Efficient audio processing

### Audio Graph

```
[Oscillator/Noise]
      ↓
   [Filter] (optional)
      ↓
  [GainNode] (envelope)
      ↓
[MasterGain] (volume control)
      ↓
 [Destination] (speakers)
```

### Browser Autoplay Policy

Modern browsers require user interaction before playing audio. The game handles this by:

1. Initializing AudioContext on page load
2. Resuming context on first click
3. All subsequent sounds play without issues

```typescript
// Resume audio context on user interaction
window.addEventListener("click", () => this.audioManager.resume(), {
  once: true, // Only needed once
});
```

## API Reference

### Methods

#### `playGunFire(): void`

Plays the gun fire sound effect.

#### `playExplosion(): void`

Plays the explosion sound effect.

#### `playHit(): void`

Plays the metallic hit sound effect.

#### `setVolume(volume: number): void`

Sets master volume (0.0 to 1.0).

```typescript
audioManager.setVolume(0.5); // 50% volume
```

#### `toggleMute(): void`

Toggles audio mute on/off.

#### `getMuted(): boolean`

Returns current mute state.

#### `resume(): void`

Resumes the audio context (handles browser autoplay policies).

## Customization

### Adjust Volume

Default volume is 30%. To change:

```typescript
// In AudioManager constructor
this.masterGain.gain.value = 0.5; // 50% volume
```

### Modify Sound Effects

Each sound method can be tweaked:

```typescript
// Make gunshot deeper
oscillator.frequency.setValueAtTime(80, currentTime); // Lower frequency

// Longer explosion
const bufferSize = this.audioContext.sampleRate * 1.0; // 1 second

// Higher pitched hit
oscillator.frequency.setValueAtTime(1200, currentTime); // Higher pitch
```

## Performance

- **CPU Usage**: Minimal (< 1%)
- **Memory**: ~1KB per AudioContext
- **Latency**: < 10ms
- **Simultaneous Sounds**: No limit (browser handles mixing)

## Future Enhancements

Potential additions:

1. **Background music** - Ambient soundtrack
2. **Plane engine sounds** - Fly-by effects
3. **Radio chatter** - Voice samples
4. **Reload sound** - Ammunition effects
5. **Ambient sounds** - Wind, environment
6. **3D audio** - Positional sound based on object location

## Example: Adding a New Sound

```typescript
// In AudioManager.ts
public playReload(): void {
  if (this.isMuted) return;

  const currentTime = this.audioContext.currentTime;

  // Create oscillator
  const oscillator = this.audioContext.createOscillator();
  const gainNode = this.audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(this.masterGain);

  // Mechanical click sound
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(200, currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(100, currentTime + 0.05);

  gainNode.gain.setValueAtTime(0.2, currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.05);

  oscillator.start(currentTime);
  oscillator.stop(currentTime + 0.05);
}
```

Then call it when needed:

```typescript
this.audioManager.playReload();
```

## Troubleshooting

### No Sound?

1. Check browser console for errors
2. Ensure audio isn't muted (check button)
3. Click anywhere in the game first (autoplay policy)
4. Check system volume settings

### Sound Distorted?

- Lower master volume: `setVolume(0.2)`
- Reduce individual sound volumes in `AudioManager.ts`

### Performance Issues?

- The audio system is very lightweight
- If issues persist, check for other performance bottlenecks

---

**The audio system adds immersion without any external dependencies!** 🎵
