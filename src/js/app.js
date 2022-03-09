import components from "./components";

const App = function () {
  this.components = [];

  this.init = () => {
    components.forEach((comp) => {
      let elements = document.querySelectorAll(comp.selector);

      if (elements.length === 0) {
        return;
      }

      let instances = Array.from(elements).map((element) =>
        new comp.create(element).init()
      );
      this.components[comp.key] = comp.hasOwnProperty("isArray")
        ? instances
        : instances[0];
    }, this);
  };
};

export default App;
