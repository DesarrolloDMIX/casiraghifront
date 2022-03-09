import { pubsub } from "../utilities/pubsub";

const Cart = function (element) {
  this.elem = element;
  this.totalPriceFractionElement = this.elem.querySelector(
    ".cart__bottom .price__fraction"
  );
  this.totalPriceCentsElement = this.elem.querySelector(
    ".cart__bottom .price__cents"
  );
  this.cartItems = this.elem.querySelectorAll(".cart-item");
  this.quantityCounter = this.elem.querySelector(".number-products-in-car");

  this.updateTotalPrice = ({ newTotal }) => {
    this.totalPriceFractionElement.innerHTML = newTotal.fraction;
    this.totalPriceCentsElement.innerHTML = newTotal.cents;
  };

  this.init = () => {
    pubsub.subscribe("cartAmountChanged", this.updateTotalPrice);
    this.elem.addEventListener(
      "quantityUpdated",
      this.handleQuantityUpdated.bind(this)
    );

    return this;
  };
};

Cart.prototype.handleQuantityUpdated = function (evt) {
  let newQty = Array.from(this.cartItems).reduce((previus, current) => {
    return (
      parseInt(previus) +
      parseInt(current.querySelector(".cart-item__qta-number").value)
    );
  }, 0);

  this.quantityCounter.innerHTML = newQty;
};

export default {
  create: Cart,
  selector: ".js-cart",
  key: "Cart",
};
