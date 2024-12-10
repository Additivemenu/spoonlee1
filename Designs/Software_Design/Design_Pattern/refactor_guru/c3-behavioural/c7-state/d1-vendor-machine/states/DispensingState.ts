// src/states/DispensingState.ts
import { VendingMachineState } from "../interfaces/VendingMachineState";
import { VendingMachine } from "../VendingMachine";
import { NoMoneyState } from "./NoMoneyState";
import { HasMoneyState } from "./HasMoneyState";

/**
 * When a product is being dispensed
 */
export class DispensingState implements VendingMachineState {
  constructor(
    private machine: VendingMachine,
    private selectedProduct: string,
  ) {}

  insertMoney(amount: number): void {
    console.log("Please wait, dispensing product");
  }

  selectProduct(productId: string): void {
    console.log("Please wait, dispensing product");
  }

  dispenseProduct(): void {
    const price = this.machine.getProductPrice(this.selectedProduct);
    this.machine.deductBalance(price);
    this.machine.dispenseProductFromInventory(this.selectedProduct);

    console.log(`Dispensed product ${this.selectedProduct}`);

    if (this.machine.getBalance() > 0) {
      this.machine.setState(new HasMoneyState(this.machine));
    } else {
      this.machine.setState(new NoMoneyState(this.machine));
    }
  }

  refund(): void {
    console.log("Please wait, dispensing product");
  }
}
