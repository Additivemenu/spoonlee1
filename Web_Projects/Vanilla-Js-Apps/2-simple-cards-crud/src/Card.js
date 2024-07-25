/**
 * note the object of this class is not HTML element,
 * but mirror of the HTML element.
 * The method inside this class, corresponds to handlers in react functional component
 */
class Card {
  card; // HTML element
  cardTitleElement; // HTML element
  cardDescriptionElement; // HTML element
  deleteDialogModal; // HTML element

  constructor(title, description, deleteDialogModal) {
    this.deleteDialogModal = deleteDialogModal;

    // Create card elements
    this.card = document.createElement("div"); // just like declaring a variable
    this.card.className = "card";

    this.cardTitleElement = document.createElement("div");
    this.cardTitleElement.className = "card-title";
    this.cardTitleElement.textContent = title;

    this.cardDescriptionElement = document.createElement("div");
    this.cardDescriptionElement.className = "card-description";
    this.cardDescriptionElement.textContent = description;

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // editButton.onclick = () => this.editCard(cardTitle, cardDescription);    // same as below
    editButton.addEventListener("click", () => this.editCard());

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    // deleteButton.onclick = () => this.deleteCard(card);      // same as below
    // deleteButton.addEventListener("click", () => this.deleteCard(card));
    deleteButton.addEventListener("click", () => this.confirmDeleteCard());

    // Append elements to card
    cardActions.append(editButton);
    cardActions.append(deleteButton);
    this.card.append(this.cardTitleElement);
    this.card.append(this.cardDescriptionElement);
    this.card.append(cardActions);
  }

  // get html nodes
  getCard() {
    return this.card;
  }

  editCard() {
    const newTitle = prompt(
      "Enter new title",
      this.cardTitleElement.textContent
    );
    const newDescription = prompt(
      "Enter new description",
      this.cardDescriptionElement.textContent
    );

    if (newTitle) {
      this.cardTitleElement.textContent = newTitle;
    }
    if (newDescription) {
      this.cardDescriptionElement.textContent = newDescription;
    }
  }

  // ! this is similar to defining a handler in react functional component
  confirmDeleteCard() {
    this.deleteDialogModal.show(
      "Are you sure you want to delete this card?",
      () =>
        //   this.deleteCard(card)
        this.card.remove()
    );
  }
}

export default Card;
