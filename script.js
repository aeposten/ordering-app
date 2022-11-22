import { productArray } from "./data.js";

const PRODUCTS = productArray;
const productsSection = document.getElementById("products");
const orderedProducts = document.getElementById("ordered-products");
const totalPrice = document.getElementById("total-price");
const cardDetails = document.getElementById("card-details");
const completeBtn = document.getElementById("complete-btn");
const thanksDiv = document.getElementById("thank-you");

let carousel;
const productCart = [];

renderProductHTML();
generateImageToggles();

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  }
});

function renderProductHTML() {
  function renderImageHTML(images, productIndex) {
    carousel = images.map(
      (image, index) =>
        `<div class="carousel-img" data-img="${productIndex}-${index}" style="background-image: url(${image})" ></div>`
    );
    return carousel.join("");
  }

  const productDivs = PRODUCTS.map(
    ({ product, name, images, description, price }, index) =>
      `<div id="product-${index}" class="product">
          <div class="product-info">
            <div>
            <h3 data-name="${index}">${name}</h3>         
            <div class="product-images" id="img-${index}">
              ${renderImageHTML(images, index)}
            </div>
          </div>
          <div>
            <div class="description" data-description="${index}">${description}</div>
            <div class="price" data-price="${index}">$ ${price}.00</div>
            <div class="add-to-cart" id="add-to-cart"><button class="btn" data-add="${index}">Add</button></div>
          </div>
      </div>`
  );

  return (productsSection.innerHTML = productDivs.join(""));
}

function generateImageToggles() {
  const toggleClass = document.querySelectorAll(".carousel-img");

  toggleClass.forEach((item, index) => {
    if (index % 2 === 0) {
      item.classList.toggle("display-none");
      toggleClass[index].addEventListener("click", function () {
        toggleClass[index + 1].classList.toggle("display-none");
        toggleClass[index].classList.toggle("display-none");
      });
    } else if (index % 2 !== 0) {
      toggleClass[index].addEventListener("click", function () {
        toggleClass[index - 1].classList.toggle("display-none");
        toggleClass[index].classList.toggle("display-none");
      });
    }
  });
}

// function generateImageToggles() {

//   carousel.forEach((img, index) => {
//     const toggleClass = document.querySelectorAll(".carousel-img");
//     let current = 0;
//     let next = current + 1;
//     if (current === 0) {
//       toggleClass[current].classList.toggle("display-none")
//     }
//   })
// }

function renderCart() {
  const cartDivs = productCart.map(
    ({ product, name, price }, index) =>
      `<div class="product">
    <span>${name}</span> <button class="btn" data-remove="${index}">remove</button> <span>${price}</span>
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
  cardDetails.classList.toggle("display-none");
  cardDetails.classList.add("modal");
}

function submitPayment() {
  cardDetails.classList.toggle("display-none");
  thanksDiv.classList.toggle("display-none");
  thanksDiv.classList.add("modal");
  productCart.splice(0, productCart.length);
  calculateTotal();
  renderCart();
}

completeBtn.addEventListener("click", togglePaymentDetails);

cardDetails.addEventListener("submit", function (e) {
  e.preventDefault();
  submitPayment();
  setTimeout(() => {
    thanksDiv.classList.toggle("display-none");
  }, 4000)
});
