import "./styles/main.scss";
import App from "./App";

const $container = document.querySelector("#app");

const app = new App($container);

app.init();
