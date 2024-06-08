// modal.js

// Create the modal structure and append it to the body
const modal = document.createElement("div");
modal.id = "productModal";
modal.classList.add("modal");
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2 id="modalProductName"></h2>
  </div>
`;
document.body.appendChild(modal);

const modalContent = document.getElementById("modalProductName");
const closeModal = document.getElementsByClassName("close")[0];

// ! Function to show the modal with the product name
export function showModal(productName) {
  modalContent.textContent = productName;
  modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when the user clicks anywhere outside of the modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
