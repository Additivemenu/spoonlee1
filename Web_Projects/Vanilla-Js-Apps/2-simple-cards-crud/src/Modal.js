// Modal.js

class Modal {
  modal;
  messageElement;
  yesButton;
  noButton;
  onYesCallback;

  constructor(modalId) {
    this.modal = document.getElementById(modalId);

    this.messageElement = this.modal.querySelector("#modal-message"); // ! query by id
    this.yesButton = this.modal.querySelector("#modal-yes-button");
    this.noButton = this.modal.querySelector("#modal-no-button");
    
    this.yesButton.addEventListener("click", () => this.handleYes());
    this.noButton.addEventListener("click", () => this.handleNo());
  }

  show(message, onYes) {
    this.messageElement.textContent = message;
    this.onYesCallback = onYes;

    this.modal.style.display = "flex";
  }

  hide() {
    this.modal.style.display = "none";
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

// Export the class for use in other files
export default Modal;
