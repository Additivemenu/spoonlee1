import CardManager from "./CardManager.js"; // ! remember suffix ".js"
import Modal from "./Modal.js";

// Initialize the Modal
const modal = new Modal("modal"); // ! this represents the modal element, and its related operations

// Initialize the CardManager
const cardManager = new CardManager("card-container", modal); // ! this represents the card container element, and its related operations

// Example usage: Add initial cards
cardManager.addCard();
cardManager.addCard();
cardManager.addCard();

console.log("add cards done");

// Add event listener for the "Add Card" button
const addCardButton = document.getElementById("add-card-button");
addCardButton.addEventListener("click", () => cardManager.addCard());
