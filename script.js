import { productArray } from "./data.js";

const productsSection = document.getElementById("products");

renderProductHTML();
function renderProductHTML() {

    function renderImageHTML(images) {
           return  images.map((image) => 
                `<img src=${image} />`
            ).join("")
    }
  const productCards = productArray.map(({product, name, images, description, price}, index) => 
    `<div id="product-${index}" class="product">
        <div class="product-images" id="img-${index}">${renderImageHTML(images)}</div>
        <div class="product-info"><h3>${
          name
        }</h3> <div class="description">${
      description
    }</div><div class="price">${price}</div> </div>
        <div class="add-to-cart" id="add-to-cart"><button>Add</button></div>
    </div>`
  );
  return (productsSection.innerHTML = productCards.join(""));
}




console.log(productArray);
im