import { PRODUCTS } from "./products-data.js";
import { showModal } from "./modal.js";

// Function to generate the HTML for each product
// ! note 'data-id' and 'data-name' attributes are  HTML5 'data-*' attribute syntax. They allow you to store custom data on any HTML element
function generateProductHTML(product) {
  return `
        <div class="productItemCard" id="product-${product.id}">
          <div class="productItemImg_container"><img src="${product.image}" alt="${product.name}"></div>
          <h5 class="header">${product.name}</h5>
          <div class="productItemInfo"><p>${product.description}</p></div>
          <span class="price">${product.price}</span>
          <button class="read-more-btn" data-name="${product.name}">Read more</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
      `;
}

// Generate the HTML for the product list and insert it into the DOM
const productList = document.getElementById("productList");
productList.innerHTML = PRODUCTS.map(generateProductHTML).join("");

// Add event listeners to the "Read more" buttons
const readMoreButtons = document.querySelectorAll(".read-more-btn");
readMoreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productName = event.target.getAttribute("data-name"); // ! This is the data-name attribute of the button
    showModal(productName);
  });
});

// Add event listeners to the "Delete" buttons
const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-id");
    deleteProduct(productId);
  });
});

// Function to delete a product from the DOM
function deleteProduct(productId) {
  const productElement = document.getElementById(`product-${productId}`);
  console.log(productElement);
  if (productElement) {
    productElement.remove();
    // productElement.style.display = "none";
  }
}
