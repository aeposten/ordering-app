import { productArray } from "./data.js";

// const productArray = [
//     {
//       name: "Custom Pattern",
//       description:
//         "A custom embroidery pattern based on the image or message of your choice.",
//       images: ["img/plant-mom.jpg", "img/strong-women.jpg"],
//       price: 50,
//     },
//     {
//       name: "Pet Portrait",
//       description: "An Embroidered pet portrait based on a photo you provide",
//       images: ["img/rue.jpg", "img/goose.jpg"],
//       price: 80,
//     },
//     {
//       name: "Made to Order Embroidery",
//       description:
//         "A piece of embroidery based on one of my patterns or the pattern of your choice.",
//       images: ["img/revenge.jpg", "img/grief.jpg"],
//       price: 75,
//     },
//   ];

const PRODUCTS = productArray;
const productsSection = document.getElementById("products");
const productCart = [];

renderProductHTML();

document.addEventListener("click", function(e) {
  addToCart(e.target.dataset.add);
})

function renderProductHTML() {
  function renderImageHTML(images) {
    return images.map((image) => `<img src=${image} />`).join("");
  }
  const productCards = PRODUCTS.map(
    ({ product, name, images, description, price }, index) =>
      `<div id="product-${index}" class="product">
        <div class="product-images" id="img-${index}">${renderImageHTML(
        images
      )}</div>
        <div class="product-info"><h3 data-name="${index}">${name}</h3> <div class="description" data-description="${index}">${description}</div><div class="price" data-price="${index}">${price}</div> </div>
        <div class="add-to-cart" id="add-to-cart"><button data-add="${index}">Add</button></div>
    </div>`
  );
  return (productsSection.innerHTML = productCards.join(""));
}

function addToCart(productIndex) {
  productCart.push(PRODUCTS[productIndex]);
  console.log(productCart);
}
