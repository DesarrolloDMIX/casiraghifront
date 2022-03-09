require("../scss/index.scss");
require("bootstrap/dist/js/bootstrap.bundle");

import App from "./app";
import addProductToCart from "./utilities/addProductToCart";
import { navBarCart } from "./utilities/navBarCart";

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

window.dmixFormatMoney = formatMoney;

const app = new App();

app.init();

let addToCartButtons = Array.from(
  document.querySelectorAll(".js-add-to-cart-button")
);

function handleAddToCart(evt) {
  evt.target.onclick = null;

  let qtyInput = evt.target.nextElementSibling;

  let product = {
    id: evt.target.dataset.productId,
    quantity: qtyInput.value,
    fraction: evt.target.dataset.fraction,
    cents: evt.target.dataset.cents,
    name: evt.target.dataset.productName,
  };

  let resultPromise = addProductToCart(product);

  resultPromise.then((result) => {
    if (!result.success) {
      if (result.error == "invalid quantity") {
        qtyInput.classList.add("input-error");
      } else {
        qtyInput.classList.remove("input-error");
      }

      if (result.error == "") {
        evt.target.parentElement.classList.add("error");
      } else {
        evt.target.parentElement.classList.remove("error");
      }
    } else {
      evt.target.parentElement.classList.add("success");
    }
  });

  setTimeout(() => {
    evt.target.parentElement.classList.remove("success");
    evt.target.onclick = handleAddToCart;
  }, 2000);
}

addToCartButtons.forEach((button) => {
  button.onclick = handleAddToCart;
});

let addToCartNumberInputs = Array.from(
  document.querySelectorAll(".js-product-card__qty-input")
);
let preventInputNegativeNumber = (e) => {
  e.target.value =
    !!e.target.value && Math.abs(e.target.value) >= 0
      ? Math.abs(e.target.value)
      : 0;
};

addToCartNumberInputs.forEach((input) => {
  input.oninput = preventInputNegativeNumber;
});

navBarCart.init();
