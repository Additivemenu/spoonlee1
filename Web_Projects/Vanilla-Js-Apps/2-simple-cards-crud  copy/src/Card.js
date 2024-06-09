class Card {
  card;

  constructor(title, description) {
    // Create card elements
    this.card = document.createElement("div"); // just like declaring a variable
    card.className = "card";

    const cardTitle = document.createElement("div");
    cardTitle.className = "card-title";
    cardTitle.textContent = title;

    const cardDescription = document.createElement("div");
    cardDescription.className = "card-description";
    cardDescription.textContent = description;

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // editButton.onclick = () => this.editCard(cardTitle, cardDescription);    // same as below
    editButton.addEventListener("click", () =>
      this.editCard(cardTitle, cardDescription)
    );

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    // deleteButton.onclick = () => this.deleteCard(card);      // same as below
    // deleteButton.addEventListener("click", () => this.deleteCard(card));
    deleteButton.addEventListener("click", () => this.confirmDeleteCard(card));

    // Append elements to card
    cardActions.append(editButton);
    cardActions.append(deleteButton);
    card.append(cardTitle);
    card.append(cardDescription);
    card.append(cardActions);
  }

  editCard(cardTitle, cardDescription) {
    const newTitle = prompt("Enter new title", cardTitle.textContent);
    const newDescription = prompt(
      "Enter new description",
      cardDescription.textContent
    );

    if (newTitle) cardTitle.textContent = newTitle;
    if (newDescription) cardDescription.textContent = newDescription;
  }

  // ! this is similar to defining a handler in react functional component
  confirmDeleteCard(card) {
    this.modal.show("Are you sure you want to delete this card?", () =>
      //   this.deleteCard(card)
      this.card.remove()
    );
  }
}
