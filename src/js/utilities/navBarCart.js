import { pubsub } from "./pubsub";

export const navBarCart = {
    updatePrice: ({ newTotal }) => {
        navBarCart.fractionElement.dataset.fraction = newTotal.fraction;
        navBarCart.centsElement.dataset.cents = newTotal.cents;

        if (newTotal.fraction == '0') {
            navBarCart.cartElement.setAttribute('data-is-empty', '');
        } else {
            navBarCart.cartElement.removeAttribute('data-is-empty');
        }

        navBarCart.fractionElement.innerHTML = newTotal.fraction;
        navBarCart.centsElement.innerHTML = newTotal.cents;
    },
    showNotice: () => {
        if (navBarCart.cartElement.hasAttribute('data-is-empty')) {
            navBarCart.notice.classList.add('notice--show');
            setTimeout(() => {
                navBarCart.notice.classList.remove('notice--show');
            }, 3500);
        } else {
            pubsub.unsubscribe('productAddedToCart', navBarCart.showNotice);
        }
    },
    init: () => {
        if (document.getElementById('nav-bar-cart')) {
            navBarCart.cartElement = document.getElementById('nav-bar-cart');
            navBarCart.fractionElement = navBarCart.cartElement.querySelector('[data-fraction]');
            navBarCart.centsElement = navBarCart.cartElement.querySelector('[data-cents]');
            navBarCart.notice = navBarCart.cartElement.querySelector('.notice');

            pubsub.subscribe('productAddedToCart', navBarCart.showNotice);
            pubsub.subscribe('productAddedToCart', navBarCart.updatePrice);
        }
    }
}