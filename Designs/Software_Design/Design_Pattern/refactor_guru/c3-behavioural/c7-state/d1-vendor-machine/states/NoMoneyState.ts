// src/states/NoMoneyState.ts
import { VendingMachineState } from "../interfaces/VendingMachineState";
import { VendingMachine } from "../VendingMachine";
import { HasMoneyState } from "./HasMoneyState";

/**
 * Initial state when no money is inserted
 * 
 * you define the state transition inside the concrete state classes
 */
export class NoMoneyState implements VendingMachineState {
  constructor(private machine: VendingMachine) {}

  insertMoney(amount: number): void {
    this.machine.addBalance(amount);
    this.machine.setState(new HasMoneyState(this.machine));   // ! transition to another state
    console.log(
      `Inserted $${amount}. Current balance: $${this.machine.getBalance()}`,
    );
  }

  selectProduct(productId: string): void {
    console.log("Please insert money first");
  }

  dispenseProduct(): void {
    console.log("Please insert money first");
  }

  refund(): void {
    console.log("No money to refund");
  }
}
