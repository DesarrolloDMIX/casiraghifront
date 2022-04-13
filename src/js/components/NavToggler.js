const NavToggler = function (element) {
  this.toggler = element;
  this.nav = document.querySelector(".js-nav");
  this.backdrop = document.querySelector(".js-nav-backdrop");

  this.handleClick = () => {
    this.nav.classList.toggle("open");
    this.backdrop.classList.toggle("open");
  };

  this.init = () => {
    this.toggler.addEventListener("click", this.handleClick);
    this.backdrop.addEventListener("click", this.handleClick);
    return this;
  };
};

export default {
  create: NavToggler,
  selector: ".js-nav-toggler",
  key: "navToggler",
};
