// src/states/HasMoneyState.ts
import { VendingMachineState } from "../interfaces/VendingMachineState";
import { VendingMachine } from "../VendingMachine";
import { NoMoneyState } from "./NoMoneyState";
import { DispensingState } from "./DispensingState";

/**
 * When money is available for purchases
 */
export class HasMoneyState implements VendingMachineState {
  constructor(private machine: VendingMachine) {}

  insertMoney(amount: number): void {
    this.machine.addBalance(amount);
    console.log(
      `Added $${amount}. Current balance: $${this.machine.getBalance()}`,
    );
  }

  selectProduct(productId: string): void {
    const price = this.machine.getProductPrice(productId);
    if (!this.machine.hasProduct(productId)) {
      console.log("Product out of stock");
      return;
    }

    if (this.machine.getBalance() >= price) {
      this.machine.setState(new DispensingState(this.machine, productId));
      this.machine.dispenseProduct();
    } else {
      console.log(
        `Insufficient funds. Need $${price - this.machine.getBalance()} more`,
      );
    }
  }

  dispenseProduct(): void {
    console.log("Please select a product first");
  }

  refund(): void {
    const refundAmount = this.machine.getBalance();
    this.machine.deductBalance(refundAmount);
    this.machine.setState(new NoMoneyState(this.machine));
    console.log(`Refunded $${refundAmount}`);
  }
}
