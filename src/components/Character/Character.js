import { character, infos } from "./Character.module.scss";

class Character {
  constructor(app, id) {
    this.app = app;
    this.id = id;
    this.character = {};
  }

  async init() {
    await this.#getCharacter();
  }

  async #getCharacter() {
    const character = await this.app.apiManager.getCharacter(this.id);
    this.character = character[0];
  }

  render() {
    return /*html*/`
      <div class=${character}>
        <img src="${this.character.thumbnail.path}.${this.character.thumbnail.extension}" alt="${this.character.name}">
        <div class=${infos}>
          <h2>${this.character.name}</h2>
          <p>${this.character.description}</p>
        </div>
      </div>
    `;
  }
}

export default Character;
