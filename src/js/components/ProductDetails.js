import addProductToCart from "../utilities/addProductToCart";

let ProductDetails = function (element) {
  this.cardBottom = element;
  this.addToCartButton = this.cardBottom.querySelector(
    ".js-product-card__add-to-cart-button"
  );
  this.finishShoppingButton = this.cardBottom.querySelector(
    ".js-product-card__finish-shopping-button"
  );
  this.addedToCartScreen = this.cardBottom.querySelector(
    ".js-product-card__added-to-cart-screen"
  );
  this.qtyInput = this.cardBottom.querySelector(".js-product-card__qty-input");
  this.imageContainer = document.querySelector(
    ".js-product-card__img-container"
  );
  this.currentImage = this.imageContainer.querySelector(
    ".js-product-card__img"
  );
  this.imageListContainer = document.querySelector(
    ".js-product-card__img-selector-list"
  );
  this.imageList = document.querySelectorAll(
    ".js-product-card__img-selector-list-item"
  );
  this.imagePrevButton = this.imageContainer.querySelector(
    ".js-product-card__img-selector-prev"
  );
  this.imageNextButton = this.imageContainer.querySelector(
    ".js-product-card__img-selector-next"
  );
  this.colorsList = this.imageContainer.querySelector(
    ".js-product-card__colors-list"
  );
  this.currentSelectedColor = null;

  this.handleColorChange = (evt) => {
    if (!evt.target.classList.contains("js-product-card__colors-list-item")) {
      return false;
    }
    this.colorsList.classList.remove("input-error");

    let colorsArray = Array.from(this.colorsList.children);
    let pickedColorIndex = colorsArray.indexOf(evt.target);

    colorsArray.forEach((color) => {
      color.classList.remove("is-active");
    });

    colorsArray[pickedColorIndex].classList.add("is-active");
    this.currentSelectedColor = colorsArray[pickedColorIndex].dataset.colorId;
  };

  this.handleClickNewImage = (evt) => {
    if (
      !evt.target.classList.contains("js-product-card__img-selector-list-item")
    ) {
      return false;
    }
    let newIndex = evt.target.dataset.newIndex;
    let oldIndex = this.currentImage.dataset.currentIndex;

    let newImage = this.imageList[newIndex];
    let oldImage = this.imageList[oldIndex];

    this.currentImage.src = newImage.src;
    this.currentImage.dataset.currentIndex = newIndex;

    oldImage.classList.remove("is-active");
    newImage.classList.add("is-active");
  };

  this.handlePrev = (evt) => {
    let oldIndex = +this.currentImage.dataset.currentIndex;
    let newIndex = oldIndex - 1;
    if (newIndex < 0) {
      newIndex = this.imageList.length - 1;
    }

    let oldImage = this.imageList[oldIndex];
    let newImage = this.imageList[newIndex];

    this.currentImage.src = newImage.src;
    this.currentImage.dataset.currentIndex = newIndex;

    oldImage.classList.remove("is-active");
    newImage.classList.add("is-active");
  };

  this.handleNext = (evt) => {
    let oldIndex = +this.currentImage.dataset.currentIndex;
    let newIndex = oldIndex + 1;
    if (newIndex > this.imageList.length - 1) {
      newIndex = 0;
    }

    let oldImage = this.imageList[oldIndex];
    let newImage = this.imageList[newIndex];

    this.currentImage.src = newImage.src;
    this.currentImage.dataset.currentIndex = newIndex;

    oldImage.classList.remove("is-active");
    newImage.classList.add("is-active");
  };

  this.handleAddToCart = (evt) => {
    if (parseInt(this.qtyInput.value) == 0) {
      return;
    }
    this.addToCartButton.removeEventListener("click", this.handleAddToCart);

    let product = {
      id: this.addToCartButton.dataset.productId,
      quantity: this.qtyInput.value,
      fraction: this.addToCartButton.dataset.fraction,
      cents: this.addToCartButton.dataset.cents,
      name: this.addToCartButton.dataset.productName,
    };

    let resultPromise = addProductToCart(product);

    resultPromise.then((result) => {
      if (!result.success) {
        if (result.error == "invalid quantity") {
          this.qtyInput.classList.add("input-error");
        } else {
          this.qtyInput.classList.remove("input-error");
        }

        if (result.error == "") {
          this.cardBottom.classList.add("product-card__bottom--error");
        } else {
          this.cardBottom.classList.remove("product-card__bottom--error");
        }
      } else {
        this.cardBottom.classList.add("product-card__bottom--added-to-cart");
      }

      setTimeout(() => {
        this.cardBottom.classList.remove("product-card__bottom--added-to-cart");
        this.addToCartButton.addEventListener("click", this.handleAddToCart);
      }, 2000);
    });
  };

  this.handleFinishShopping = (e) => {
    this.finishShoppingButton.removeEventListener(
      "click",
      this.handleFinishShopping
    );

    let product = {
      id: this.addToCartButton.dataset.productId,
      quantity: this.qtyInput.value,
      fraction: this.addToCartButton.dataset.fraction,
      cents: this.addToCartButton.dataset.cents,
    };

    let result = addProductToCart(product, { redirect: true });

    setTimeout(() => {
      this.cardBottom.classList.remove("product-card__bottom--added-to-cart");
      this.addToCartButton.addEventListener("click", this.handleAddToCart);
    }, 2000);
  };

  this.init = () => {
    this.addToCartButton.addEventListener("click", this.handleAddToCart);
    this.finishShoppingButton.addEventListener(
      "click",
      this.handleFinishShopping
    );
    this.imagePrevButton.addEventListener("click", this.handlePrev);
    this.imageNextButton.addEventListener("click", this.handleNext);
    this.imageListContainer.addEventListener("click", this.handleClickNewImage);
    this.colorsList.addEventListener("click", this.handleColorChange);
    Array.from(this.colorsList.children).forEach((color) => {
      color.style.backgroundColor = color.dataset.color;
    });

    return this;
  };
};

export default {
  create: ProductDetails,
  selector: ".js-product-card__bottom",
  key: "productCards",
  isArray: true,
};
