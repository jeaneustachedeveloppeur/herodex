import { cards, card, spinner } from "./Characters.module.scss";

class Characters {
  constructor(app) {
    this.app = app;
    this.characters = [];
    this.page = 0;
  }

  async init() {
    await this.#getCharacters();
  }

  async #getCharacters() {
    const newCharacters = await this.app.apiManager.getCharacters({ page: this.page });
    this.characters = [...this.characters, ...newCharacters];
    this.page++;
  }

  #renderCharacter(character) {
    return /*html*/`
    <li class=${card}>
      <a href="/characters/${character.id}">
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
        ${character.name}
      </a>
    </li>
  `
  }

  render() {
    return /*html*/`
      <h2>Tous les personnages</h2>
      <ul class=${cards}>
        ${this.characters.map((character) => (
          this.#renderCharacter(character)
        )).join("")}
        <svg class=${spinner} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><style>.spinner_ZCsl{animation:spinner_qV4G 1.2s cubic-bezier(0.52,.6,.25,.99) infinite}.spinner_gaIW{animation-delay:.6s}@keyframes spinner_qV4G{0%{r:0;opacity:1}100%{r:11px;opacity:0}}</style><circle class="spinner_ZCsl" cx="12" cy="12" r="0"/><circle class="spinner_ZCsl spinner_gaIW" cx="12" cy="12" r="0"/></svg>
      </ul>
    `;
  }

  hydrate() {
    const $spinner = document.querySelector(`.${spinner}`);

    const callback = async (entries) => {
      if (entries[0].isIntersecting) {
        await this.#getCharacters();

        const $cards = document.querySelector(`.${cards}`);
        $cards.innerHTML = /*html*/`
          ${this.characters.map((character) => this.#renderCharacter(character)).join("")}
          <svg class=${spinner} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><style>.spinner_ZCsl{animation:spinner_qV4G 1.2s cubic-bezier(0.52,.6,.25,.99) infinite}.spinner_gaIW{animation-delay:.6s}@keyframes spinner_qV4G{0%{r:0;opacity:1}100%{r:11px;opacity:0}}</style><circle class="spinner_ZCsl" cx="12" cy="12" r="0"/><circle class="spinner_ZCsl spinner_gaIW" cx="12" cy="12" r="0"/></svg>
        `;

        this.hydrate();
      }
    };

    const observer = new IntersectionObserver(callback);
    observer.observe($spinner);
  }
}

export default Characters;
