import Router from "./router";
import APIManager from "./components/APIManager";

class App {
  constructor(container) {
    this.$container = container;
    this.router = new Router(this);
    this.apiManager = new APIManager();
  }
  
  init() {
    this.router.handleRoute();
  }

  render(html) {
    this.$container.innerHTML = /*html*/`
      <header>
        <nav>
          <a href="/">
            <h1>Marvel</h1>
          </a>
        </nav>
      </header>
      <main>
        ${html}
      </main>
    `;
  }
};

export default App;
