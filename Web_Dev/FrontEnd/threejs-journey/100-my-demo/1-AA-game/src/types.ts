import * as THREE from "three";

export interface GameState {
  score: number;
  planesDestroyed: number;
  isRunning: boolean;
}

export interface Plane {
  mesh: THREE.Group;
  velocity: THREE.Vector3;
  health: number;
}

export interface Bullet {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  lifetime: number;
}

export interface GameConfig {
  planeSpawnInterval: number;
  bulletSpeed: number;
  bulletLifetime: number;
}
