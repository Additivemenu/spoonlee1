import Card from "./Card.js";

/**
 * wrapper class for managing cards (like K8S to docker containers)
 */
class CardManager {
  constructor(containerId, modal) {
    this.cardContainer = document.getElementById(containerId);
    this.modal = modal;

    // Add event listener for the "Add Card" button
    const addCardButton = document.getElementById("add-card-button");
    addCardButton.addEventListener("click", () => this.addCard());
  }

  addCard(title = "New Card", description = "This is a new card.") {
    const card = new Card(title, description, this.modal).getCard(); // get card HTML elements
    this.cardContainer.append(card);
  }
}

// ! Export the class for use in other files
export default CardManager;
