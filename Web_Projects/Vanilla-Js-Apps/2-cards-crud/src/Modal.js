// Modal.js

/**
 * just for managing open and close of the modal
 */
class Modal {
  modal;

  constructor(modalId) {
    this.modal = document.getElementById(modalId);
  }

  show() {
    this.modal.style.display = "flex";
  }

  hide() {
    this.modal.style.display = "none";
  }
}

// Export the class for use in other files
export default Modal;
