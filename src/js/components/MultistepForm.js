let MultistepForm = function (element) {
  this.element = element;
  this.steps = Array.from(element.querySelectorAll(".multistep-form__step"));
  this.nextButtons = Array.from(
    this.steps.map((step) => step.querySelector(".multistep-form__next-button"))
  );

  // this.handleNextClick = i

  this.init = () => {
    this.nextButtons.forEach((btn, i) => {
      btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        this.steps[i].classList.add("done");
      });
    }, this);
  };
};

export default {
  create: MultistepForm,
  selector: ".js-multistep-form",
  key: "multistepForm",
  isArray: true,
};
