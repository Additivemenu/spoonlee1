import { GameState } from "./types";

/**
 * UIManager handles all UI updates and displays
 */
export class UIManager {
  private scoreElement: HTMLElement | null;
  private hitsElement: HTMLElement | null;

  constructor() {
    this.scoreElement = document.getElementById("score");
    this.hitsElement = document.getElementById("hits");
  }

  public updateScore(gameState: GameState): void {
    if (this.scoreElement) {
      this.scoreElement.textContent = gameState.score.toString();
    }
    if (this.hitsElement) {
      this.hitsElement.textContent = gameState.planesDestroyed.toString();
    }
  }
}
