// src/VendingMachine.ts
import { VendingMachineState } from "./interfaces/VendingMachineState";
import { NoMoneyState } from "./states/NoMoneyState";

/**
 * Maintains the current state and delegates operations to it.
 * 
 * 该类是封装的最后结果, 外界使用该类的时候, 只需要调用该类的方法即可, 不需要关心具体的状态
 */
export class VendingMachine {
  private state: VendingMachineState;
  private balance: number = 0;
  private inventory: Map<string, number> = new Map();
  private prices: Map<string, number> = new Map();

  constructor() {
    // Initialize with no money state
    this.state = new NoMoneyState(this);

    // Initialize some products
    this.inventory.set("A1", 5); // 5 units
    this.prices.set("A1", 1.5); // $1.50
  }

  public setState(state: VendingMachineState): void {
    this.state = state;
  }

  public insertMoney(amount: number): void {
    this.state.insertMoney(amount);
  }

  public selectProduct(productId: string): void {
    this.state.selectProduct(productId);
  }

  public dispenseProduct(): void {
    this.state.dispenseProduct();
  }

  public refund(): void {
    this.state.refund();
  }

  // Helper methods to manage machine state
  public addBalance(amount: number): void {
    this.balance += amount;
  }

  public deductBalance(amount: number): void {
    this.balance -= amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getProductPrice(productId: string): number {
    return this.prices.get(productId) || 0;
  }

  public hasProduct(productId: string): boolean {
    return (this.inventory.get(productId) || 0) > 0;
  }

  public dispenseProductFromInventory(productId: string): void {
    const currentQuantity = this.inventory.get(productId) || 0;
    if (currentQuantity > 0) {
      this.inventory.set(productId, currentQuantity - 1);
    }
  }
}
