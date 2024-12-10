/**
 * Defines the contract for all states with methods for common actions.
 * 
 * 在每个状态下, 可以进行的操作
 */
export interface VendingMachineState {
  insertMoney(amount: number): void;
  selectProduct(productId: string): void;
  dispenseProduct(): void;
  refund(): void;
}
