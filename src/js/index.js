require('../scss/index.scss')
require('bootstrap/dist/js/bootstrap.bundle')

import App from './app'
import addProductToCart from "./utilities/addProductToCart";
import { navBarCart } from "./utilities/navBarCart";

const app = new App()

app.init()

let addToCartButtons = Array.from(document.querySelectorAll('.js-add-to-cart-button'));

addToCartButtons.forEach(button => {
    button.onclick = function handleAddToCart(evt) {

        evt.target.onclick = null;

        let qtyInput = evt.target.nextElementSibling;

        let product = {
            id: evt.target.dataset.productId,
            quantity: qtyInput.value,
            fraction: evt.target.dataset.fraction,
            cents: evt.target.dataset.cents,
        }

        let resultPromise = addProductToCart(product);

        resultPromise.then((result) => {
            if (!result.success) {
                if (result.error == 'invalid quantity') {
                    qtyInput.classList.add('input-error');
                } else {
                    qtyInput.classList.remove('input-error');
                }

                if (result.error == '') {
                    evt.target.parentElement.classList.add('error');
                } else {
                    evt.target.parentElement.classList.remove('error');
                }
            } else {
                evt.target.parentElement.classList.add('success');
            }
        })

        setTimeout(() => {
            evt.target.parentElement.classList.remove('success')
            evt.target.onclick = handleAddToCart
        }, 2000)
    }
});

let addToCartNumberInputs = Array.from(document.querySelectorAll('.js-product-card__qty-input'));
let preventInputNegativeNumber = (e) => {
    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : 1
}

addToCartNumberInputs.forEach(input => {
    input.oninput = preventInputNegativeNumber
})

navBarCart.init();