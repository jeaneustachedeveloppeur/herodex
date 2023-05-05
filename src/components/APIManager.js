class APIManager {
  #baseUrl;
  #publicKey;

  constructor() {
    this.#baseUrl = import.meta.env.VITE_MARVEL_API_BASE_URL;
    this.#publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  }

  async getCharacters({ page }) {
    const url = `${this.#baseUrl}/characters?apikey=${this.#publicKey}&offset=${page * 20}`;
    const response = await fetch(url);
    const { data } = await response.json();
    return data.results;
  }

  async getCharacter(id) {
    const url = `${this.#baseUrl}/characters/${id}?apikey=${this.#publicKey}`;
    const response = await fetch(url);
    const { data } = await response.json();
    return data.results;
  }
}

export default APIManager;
