import { productArray } from "./data.js";

const PRODUCTS = productArray;
const productsSection = document.getElementById("products");
const orderedProducts = document.getElementById("ordered-products");
const totalPrice = document.getElementById("total-price");
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

  return (orderedProducts.innerHTML = cartDivs.join(""));
}

function calculateTotal() {
  let total = 0;
  productCart.forEach(({ product, price }) => {
    total += price;
  });
  totalPrice.textContent = total;
}

function addToCart(productIndex) {
  PRODUCTS[productIndex].inCart = true;
  productCart.push(PRODUCTS[productIndex]);

  renderCart();
  calculateTotal();
}

function removeFromCart(productIndex) {
  productCart[productIndex].inCart = false;
  productCart.splice(productIndex, 1);

  calculateTotal();
  renderCart();
}
