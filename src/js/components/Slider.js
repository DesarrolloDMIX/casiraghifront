let Slider = function (element) {
  this.element = element;
  this.slidesContainer = element.querySelector(".slider__slides-container");
  this.slides = Array.from(element.querySelectorAll(".slider__slide"));
  this.prev = element.querySelector(".slider__prev");
  this.next = element.querySelector(".slider__next");
  this.currentPos = 0;
  this.unit = 100;
  this.limit = -(this.slides.length - 1) * this.unit;
  this.isAutoSliding = false;
  this.disableAutoSlide = false;
  this.autoSlideInterval = null;
  this.autoSlideTime = 3000;

  this.handlePrev = (evt) => {
    let newPos =
      this.currentPos == 0 ? this.limit : this.currentPos + this.unit;
    this.changeSlide(newPos);
  };

  this.handleNext = (evt) => {
    let newPos =
      this.currentPos == this.limit ? 0 : this.currentPos - this.unit;
    this.changeSlide(newPos);
  };

  this.handleMouseEnter = () => {
    this.isAutoSliding = true;
    this.toggleAutoSlide();
  };

  this.handleMouseLeave = () => {
    this.isAutoSliding = false;
    this.toggleAutoSlide();
  };

  this.toggleAutoSlide = () => {
    if (!this.isAutoSliding) {
      this.autoSlideInterval = setInterval(this.handleNext, this.autoSlideTime);
    } else {
      clearInterval(this.autoSlideInterval);
    }
    this.isAutoSliding = !this.isAutoSliding;
  };

  this.changeSlide = (newPos) => {
    this.slidesContainer.style.transform = `translateX(${newPos}%)`;
    this.currentPos = newPos;
  };

  this.init = () => {
    this.prev.addEventListener("click", this.handlePrev);
    this.next.addEventListener("click", this.handleNext);
    if (!this.disableAutoSlide) {
      this.element.addEventListener("mouseenter", this.handleMouseEnter);
      this.element.addEventListener("mouseleave", this.handleMouseLeave);
      this.toggleAutoSlide();
    }
    return this;
  };
};

export default {
  create: Slider,
  selector: ".js-slider",
  key: "sliders",
  isArray: true,
};
