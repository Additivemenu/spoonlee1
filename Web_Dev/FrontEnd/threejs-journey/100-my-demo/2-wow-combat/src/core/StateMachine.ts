/**
 * Base State interface for FSM
 */
export interface IState {
  name: string;
  enter(): void;
  update(deltaTime: number): void;
  exit(): void;
}

/**
 * Finite State Machine
 * Used for Monster AI behavior management
 */
export class StateMachine {
  private currentState: IState | null = null;
  private states: Map<string, IState> = new Map();

  addState(state: IState): void {
    this.states.set(state.name, state);
  }

  setState(stateName: string): void {
    const newState = this.states.get(stateName);

    if (!newState) {
      console.warn(`State "${stateName}" not found`);
      return;
    }

    if (this.currentState === newState) {
      return;
    }

    if (this.currentState) {
      this.currentState.exit();
    }

    this.currentState = newState;
    this.currentState.enter();
  }

  update(deltaTime: number): void {
    if (this.currentState) {
      this.currentState.update(deltaTime);
    }
  }

  getCurrentStateName(): string {
    return this.currentState?.name || "None";
  }
}
