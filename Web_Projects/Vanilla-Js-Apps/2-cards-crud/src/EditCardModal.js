import Modal from "./Modal.js";

class EditCardModal extends Modal {
  cardTitleInput;
  cardDescriptionInput;
  onSaveCallback;

  constructor(modalId) {
    super(modalId);

    this.modalContent = this.modal.querySelector(".modal-content");

    this.cardTitleInput = document.createElement("input");
    this.cardTitleInput.id = "card-title-input";
    this.cardTitleInput.placeholder = "Card Title";
    this.modalContent.append(this.cardTitleInput);

    this.cardDescriptionInput = document.createElement("textarea");
    this.cardDescriptionInput.id = "card-description-input";
    this.cardDescriptionInput.placeholder = "Card Description";
    this.modalContent.append(this.cardDescriptionInput);

    const modalActions = document.createElement("div");
    modalActions.className = "modal-actions";
    this.modalContent.append(modalActions);

    const saveButton = document.createElement("button");
    saveButton.id = "modal-save-button";
    saveButton.append("Save");
    saveButton.addEventListener("click", () => this.handleSave());
    modalActions.append(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.id = "modal-cancel-button";
    cancelButton.append("Cancel");
    cancelButton.addEventListener("click", () => this.handleCancel());
    modalActions.append(cancelButton);
  }

  show(title, description, onSave) {
    this.cardTitleInput.value = title;
    this.cardDescriptionInput.value = description;
    this.onSaveCallback = onSave; // ! like method injection

    this.modal.style.display = "flex";
  }

  getCardTitle() {
    return this.cardTitleInput.value;
  }

  getCardDescription() {
    return this.cardDescriptionInput.value;
  }

  handleSave() {
    if (this.onSaveCallback) {
      this.onSaveCallback(
        this.cardTitleInput.value,
        this.cardDescriptionInput.value
      );
    }
    this.hide();
  }

  handleCancel() {
    this.hide();
  }
}

export default EditCardModal;
