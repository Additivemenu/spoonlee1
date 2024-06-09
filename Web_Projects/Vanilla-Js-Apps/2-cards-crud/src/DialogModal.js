import Modal from "./Modal.js";

class DialogModal extends Modal {
  messageElement;
  yesButton;
  noButton;
  onYesCallback; // offer a callback to the user

  // filling up the modal content details ----------------------------------------------
  constructor(modalId) {
    super(modalId);

    this.modalContent = this.modal.querySelector(".modal-content");

    this.messageElement = document.createElement("p");
    this.messageElement.id = "modal-message";
    this.messageElement.append("Are you sure you want to delete this card?");
    this.modalContent.append(this.messageElement);

    const modalActions = document.createElement("div");
    modalActions.className = "modal-actions";
    this.modalContent.append(modalActions);

    this.yesButton = document.createElement("button");
    this.yesButton.id = "modal-yes-button";
    this.yesButton.append("Yes");
    this.yesButton.addEventListener("click", () => this.handleYes());
    modalActions.append(this.yesButton);

    this.noButton = document.createElement("button");
    this.noButton.id = "modal-no-button";
    this.noButton.append("No");
    this.noButton.addEventListener("click", () => this.handleNo());
    modalActions.append(this.noButton);
  }

  // this is similar to defining a handler in react functional component ----------------------
  show(message, onYes) {
    this.messageElement.textContent = message;
    this.onYesCallback = onYes; // ! like method injection

    this.modal.style.display = "flex";
  }

  handleYes() {
    if (this.onYesCallback) {
      this.onYesCallback();
    }
    this.hide();
  }

  handleNo() {
    this.hide();
  }
}

export default DialogModal;
