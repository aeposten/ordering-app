import { productArray } from "./data.js";

const PRODUCTS = productArray;
const productsSection = document.getElementById("products");
const orderedProducts = document.getElementById("ordered-products");
const totalPrice = document.getElementById("total-price");
const cardDetails = document.getElementById("card-details");
const completeBtn = document.getElementById("complete-btn");
const paymentBtn = document.getElementById("payment");
const thanksDiv = document.getElementById("thank-you");

const productCart = [];

renderProductHTML();

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  }
});

function renderProductHTML() {
  function renderImageHTML(images) {
    return images.map((image) => `<img src=${image} />`).join("");
  }
  const productDivs = PRODUCTS.map(
    ({ product, name, images, description, price }, index) =>
      `<div id="product-${index}" class="product">
        <div class="product-images" id="img-${index}">${renderImageHTML(
        images
      )}</div>
        <div class="product-info"><h3 data-name="${index}">${name}</h3> <div class="description" data-description="${index}">${description}</div><div class="price" data-price="${index}">${price}</div> </div>
        <div class="add-to-cart" id="add-to-cart"><button data-add="${index}">Add</button></div>
    </div>`
  );
  return (productsSection.innerHTML = productDivs.join(""));
}

function renderCart() {
  const cartDivs = productCart.map(
    ({ product, name, price }, index) =>
      `<div class="product">
    <span>${name}</span> <button data-remove="${index}">remove</button> <span>${price}</span>
  </div>`
  );

  if (productCart.length) {
    orderedProducts.parentElement.classList.remove("display-none");
    return (orderedProducts.innerHTML = cartDivs.join(""));
  } else {
    orderedProducts.parentElement.classList.add("display-none");
  }
}

function calculateTotal() {
  let total = 0;
  productCart.forEach(({ product, price }) => {
    total += price;
  });

  total === 0
    ? ((totalPrice.textContent = ""),
      totalPrice.parentElement.classList.add("display-none"))
    : ((totalPrice.textContent = total),
      totalPrice.parentElement.classList.remove("display-none"));
}

function addToCart(productIndex) {
  productCart.push(PRODUCTS[productIndex]);

  renderCart();
  calculateTotal();
}

function removeFromCart(productIndex) {
  productCart.splice(productIndex, 1);

  calculateTotal();
  renderCart();
}

function togglePaymentDetails() {
  cardDetails.classList.remove("display-none");
}

function submitPayment() {
  thanksDiv.classList.remove("display-none");
  cardDetails.classList.add("display-none");
  productCart.splice(0, productCart.length);
  calculateTotal();
  renderCart();
}

completeBtn.addEventListener("click", togglePaymentDetails);

cardDetails.addEventListener("submit", function (e) {
  e.preventDefault();
  submitPayment();
  cardDetails.reset();
});
