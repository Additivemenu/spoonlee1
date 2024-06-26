import CardManager from "./CardManager.js"; // ! remember suffix ".js"
import Modal from "./Modal.js";
import DialogModal from "./DialogModal.js";
import EditCardModal from "./EditCardModal.js";

// Initialize the Modal
const dialogModal = new DialogModal("modal"); // ! this represents the modal element, and its related operations
const editModal = new EditCardModal("modal");

// Initialize the CardManager
const cardManager = new CardManager("card-container", dialogModal, editModal); // ! this represents the card container element, and its related operations

// Example usage: Add initial cards
cardManager.addCard();
cardManager.addCard();
cardManager.addCard();

console.log("add cards done");

// Add event listener for the "Add Card" button
const addCardButton = document.getElementById("add-card-button");
addCardButton.addEventListener("click", () => cardManager.addCard());
