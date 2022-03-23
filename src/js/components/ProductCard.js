const ProductCard = function (element) {
  this.qtyInput = element.querySelector(".js-product-card__qty-input");
  this.qtyButtonMore = element.querySelector(".card__quantity-input-more");
  this.qtyButtonLess = element.querySelector(".card__quantity-input-less");

  this.handleIncreaseQty = () => {
    this.qtyInput.value = +this.qtyInput.value + 1;
    this.qtyInput.dispatchEvent(new Event("input"));
  };

  this.handleDecreaseQty = () => {
    this.qtyInput.value = +this.qtyInput.value - 1;
    this.qtyInput.dispatchEvent(new Event("input"));
  };

  this.init = () => {
    this.qtyButtonMore.addEventListener("click", this.handleIncreaseQty);
    this.qtyButtonLess.addEventListener("click", this.handleDecreaseQty);
    return this;
  };
};

export default {
  create: ProductCard,
  selector: ".js-card",
  key: "cards",
  isArray: true,
};
