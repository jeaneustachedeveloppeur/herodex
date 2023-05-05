import Character from "./components/Character/Character";
import Characters from "./components/Characters/Characters";
import Error404 from "./components/Error404";

class Router {
  constructor(app) {
    this.app = app;

    this.routes = [
      {
        path: "/",
        component: Characters,
      },
      {
        path: "/characters/:id",
        component: Character,
      },
    ];

    this.currentRoute = 
      {
        path: "",
        component: Error404,
      };
  }

  #formatPath(path) {
    return path.replace(/:\w+/g, "\\d+");
  }

  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes.find((route) => {
      const regex = new RegExp(`^${this.#formatPath(route.path)}$`);
      return regex.test(path);
    });

    if (route) {
      this.currentRoute = route;
    }

    this.render(path);
  }

  async render(path) {
    const { component } = this.currentRoute;
    const instance = new component(this.app, path.split("/").slice(2));
    await instance.init();
    const html = instance.render();
    this.app.render(html);
    instance.hydrate();
  }
}

export default Router;
