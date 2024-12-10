// src/index.ts
import { VendingMachine } from "./VendingMachine";

// Example usage
const vendingMachine = new VendingMachine();
vendingMachine.selectProduct("A1"); // Please insert money first
vendingMachine.insertMoney(1.0); // Inserted $1.00
vendingMachine.insertMoney(0.75); // Added $0.75
vendingMachine.selectProduct("A1"); // Product dispensed
vendingMachine.refund(); // Refunded $0.25
