let Carousel = function (element) {
  this.element = element;
  this.track = element.querySelector(".js-carousel-track");
  this.prevButton = element.querySelector(".js-carousel-prev");
  this.nextButton = element.querySelector(".js-carousel-next");
  this.items = Array.from(element.querySelectorAll(".js-carousel-item"));
  this.numberOfItems = element.querySelectorAll(".js-carousel-item").length;
  this.handlePrev = () => {
    const unit = this.getTrackUnit();
    let newPosition = +this.track.dataset.position + unit;
    if (Math.floor(newPosition) > 0) {
      newPosition = this.getLastUnitPosition();
    }
    this.track.style.transform = `translateX(${newPosition}%)`;
    this.track.dataset.position = newPosition;
  };

  this.handleNext = () => {
    const unit = this.getTrackUnit();
    let newPosition = +this.track.dataset.position - unit;
    if (newPosition <= -100) {
      newPosition = 0;
    }
    this.track.style.transform = `translateX(${newPosition}%)`;
    this.track.dataset.position = newPosition;
  };

  this.getLastUnitPosition = () => {
    return this.getTrackUnit() * (this.getTotalNumberOfUnits() - 1) * -1;
  };

  this.getTotalNumberOfUnits = () => {
    let numberOfUnits;
    let numberOfItemsCount = this.numberOfItems;
    if (window.innerWidth < 634) {
      numberOfUnits = numberOfItemsCount;
    } else if (window.innerWidth > 634 && window.innerWidth < 1024) {
      while (!Number.isInteger(numberOfItemsCount / 2)) {
        numberOfItemsCount++;
      }
      numberOfUnits = numberOfItemsCount / 2;
    } else if (window.innerWidth >= 1024) {
      while (!Number.isInteger(numberOfItemsCount / 3)) {
        numberOfItemsCount++;
      }
      numberOfUnits = numberOfItemsCount / 3;
    }
    return numberOfUnits;
  };

  this.getTrackUnit = () => {
    if (window.innerWidth < 634) {
      return 100 / this.numberOfItems;
    } else if (window.innerWidth > 634 && window.innerWidth < 1024) {
      return 200 / this.numberOfItems;
    } else if (window.innerWidth >= 1024) {
      return 300 / this.numberOfItems;
    }
  };

  this.getTrackWidth = () => {
    if (window.innerWidth < 634) {
      return this.numberOfItems * 100;
    } else if (window.innerWidth >= 634 && window.innerWidth < 1024) {
      return this.numberOfItems * 50;
    } else if (window.innerWidth >= 1024) {
      return this.numberOfItems * 33.333;
    }
  };

  this.handleResize = () => {
    if (window.innerWidth < 634 && this.widthState != 1) {
      this.track.style.width = `${this.getTrackWidth()}%`;
      this.widthState = 1;
    } else if (
      window.innerWidth > 634 &&
      window.innerWidth < 1024 &&
      this.widthState != 2
    ) {
      this.track.style.width = `${this.getTrackWidth()}%`;
      this.widthState = 2;
    } else if (window.innerWidth > 1024 && this.widthState != 3) {
      this.track.style.width = `${this.getTrackWidth()}%`;
      this.widthState = 3;
    }
  };

  this.init = () => {
    this.prevButton.addEventListener("click", this.handlePrev);
    this.nextButton.addEventListener("click", this.handleNext);

    this.track.style.width = `${this.getTrackWidth()}%`;
    this.items.forEach((item) => {
      item.style.flexBasis = `${100 / this.numberOfItems}%`;
    });

    window.addEventListener("resize", this.handleResize);

    return this;
  };
};

export default {
  create: Carousel,
  selector: ".js-carousel",
  key: "carousels",
  isArray: true,
};
