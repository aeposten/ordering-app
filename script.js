import { productArray } from "./data.js";

const PRODUCTS = productArray;
const productsSection = selectComponent("products");
const orderedProducts = selectComponent("ordered-products");
const totalPrice = selectComponent("total-price");
const cardDetails = selectComponent("card-details");
const completeBtn = selectComponent("complete-btn");
const thanksDiv = selectComponent("thank-you");
const overlayEl = selectComponent("overlay");
const modalEl = selectComponent("modal");

let carousel;
const productCart = [];

renderProductHTML();
generateImageToggles();

// Dynamically selects component by id
function selectComponent(elementId) {
  const component = document.getElementById(elementId);
  return component;
}

//Dynamically toggles display-none css class
function toggleDisplayNone(element) {
  return element.classList.toggle("display-none");
}

// Uses add or remove from cart functions based on dataset
document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addToCart(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  }
});

//Renders HTML for each product in PRODUCTS array
function renderProductHTML() {
  // Renders HTML for each product image
  function renderImageHTML(images, productIndex) {
    carousel = images.map(
      ({ image, src, dots }, index) =>
        `<div class="carousel-img" data-img="${productIndex}-${index}" style="background-image: url(${src})" ><span class="dots-span">${dots}</span></div>`
    );
    return carousel.join("");
  }
  // Creates div containing each product
  const productDivs = PRODUCTS.map(
    ({ product, name, images, description, price }, index) =>
      `<div id="product-${index}" class="product">
          <div class="product-info">
            <div>
            <h3 class="philosopher" data-name="${index}">${name}</h3>         
            <div class="product-images" id="img-${index}">
              ${renderImageHTML(images, index)}
            </div>
          </div>
          <div class="mulish"">
            <div class="description" data-description="${index}">${description}</div>
            <div class="price" data-price="${index}">$ ${price}.00</div>
            <div class="add-to-cart" id="add-to-cart"><button class="btn" data-add="${index}">Add</button></div>
          </div>
      </div>`
  );

  return (productsSection.innerHTML = productDivs.join(""));
}

// Generates image toggles
function generateImageToggles() {
  const toggleClass = document.querySelectorAll(".carousel-img");

  toggleClass.forEach((item, index) => {
    if (index % 2 === 0) {
      item.classList.toggle("display-none");
      console.log(item.classList)
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

// Renders cart of selected products
function renderCart() {
  const cartDivs = productCart.map(
    ({ product, name, price }, index) =>
      `<div class="product mulish">
    <span>${name}</span> <span>$ ${price}.00 </span> <button class="btn" data-remove="${index}">remove</button>
  </div>`
  );

  if (productCart.length) {
    orderedProducts.parentElement.classList.remove("display-none");
    return (orderedProducts.innerHTML = cartDivs.join(""));
  } else {
    orderedProducts.parentElement.classList.add("display-none");
  }
}

//Adds items to productCart
function addToCart(productIndex) {
  productCart.push(PRODUCTS[productIndex]);

  renderCart();
  calculateTotal();
}

// Removes items from  productCart
function removeFromCart(productIndex) {
  productCart.splice(productIndex, 1);

  calculateTotal();
  renderCart();
}

// Calculates total cost of products added to productCart
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

// Toggles modal for paymentDetails
function togglePaymentDetails() {
  //removes display-none from card-details and overlay
  toggleDisplayNone(cardDetails);
  toggleDisplayNone(overlayEl);

  //adds modal to card-details
  cardDetails.classList.toggle("modal");
}

// Submits payment
function submitPayment() {
  //removes display-none from card-details
  toggleDisplayNone(cardDetails);
  //adds display-none to thanks
  toggleDisplayNone(thanksDiv);

  //adds modal to thanks
  thanksDiv.classList.toggle("modal");
  productCart.splice(0, productCart.length);
  calculateTotal();
  renderCart();
}

// Event listener for "complete payment" button
completeBtn.addEventListener("click", togglePaymentDetails);

// Event listener for cardDetails form
cardDetails.addEventListener("submit", function (e) {
  e.preventDefault();
  const CCFormData = new FormData(cardDetails);
  const fullName = CCFormData.get("fullName");
  thanksDiv.innerText = `Thank you ${fullName}`;

  submitPayment();
  setTimeout(() => {
    toggleDisplayNone(thanksDiv);
    toggleDisplayNone(overlayEl);
  }, 4000);
});
