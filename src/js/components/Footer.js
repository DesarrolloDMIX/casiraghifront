let Footer = function (element) {
  this.element = element;
  this.map = element.querySelector(".footer__map");
  this.phonesList = element.querySelector(".footer__phones-list-slot");
  this.contactForm = element.querySelector(".footer__contact-form");
  this.address = element.querySelector(".footer__address");
  this.phoneSpecial = element.querySelector(".footer__phone-special");
  this.waterMark = element.querySelector(".footer__water-mark");
  this.rights = element.querySelector(".footer__rights");

  this.cleanHtml = () => {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  };

  this.wrapInColumn = (elmts) => {
    let column = document.createElement("DIV");
    column.className = "footer__column";
    elmts.forEach((elmt) => {
      column.appendChild(elmt);
    });

    return column;
  };

  this.hideLabels = () => {
    let labels = Array.from(this.element.querySelectorAll("label"));
    labels.forEach((label) => {
      label.style.display = "none";
    });

    let inputs = Array.from(this.element.querySelectorAll("input, textarea"));
    inputs.forEach((input) => {
      input.placeholder = input.dataset.placeholder;
    });
  };

  this.showLabels = () => {
    let labels = Array.from(this.element.querySelectorAll("label"));
    labels.forEach((label) => {
      label.style.display = "initial";
    });

    let inputs = Array.from(this.element.querySelectorAll("input, textarea"));
    inputs.forEach((input) => {
      input.placeholder = "";
    });
  };

  this.addColumns = () => {
    this.cleanHtml();
    this.element.appendChild(this.wrapInColumn([this.map]));
    this.element.appendChild(
      this.wrapInColumn([this.phonesList, this.phoneSpecial, this.rights])
    );
    this.element.appendChild(
      this.wrapInColumn([this.contactForm, this.waterMark])
    );
  };

  this.removeColumns = () => {
    this.cleanHtml();
    this.map;
    this.element.appendChild(this.map);
    this.element.appendChild(this.phonesList);
    this.element.appendChild(this.contactForm);
    this.element.appendChild(this.address);
    this.element.appendChild(this.phoneSpecial);
    this.element.appendChild(this.waterMark);
  };

  this.handleResize = () => {
    if (window.innerWidth < 634 && this.widthState != 1) {
      this.removeColumns();
      this.hideLabels();
      this.widthState = 1;
    } else if (
      window.innerWidth >= 634 &&
      window.innerWidth < 1024 &&
      this.widthState != 2
    ) {
      this.removeColumns();
      this.showLabels();
      this.widthState = 2;
    } else if (window.innerWidth >= 1024 && this.widthState != 3) {
      this.addColumns();
      this.showLabels();
      this.widthState = 3;
    }
  };

  this.init = () => {
    window.addEventListener("resize", this.handleResize);

    if (window.innerWidth >= 1024) {
      this.addColumns();
    } else if (window.innerWidth < 634) {
      this.hideLabels();
    }

    return this;
  };
};

export default {
  create: Footer,
  selector: ".js-footer",
  key: "footer",
};
