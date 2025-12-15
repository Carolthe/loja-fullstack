// @ts-check

export class Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    throw new Error("Method 'getSufix()' must be implemented.");
  }

  getUrl() {
    return `http://localhost:3000/admin/${this.getSufix()}`;
  }

  /**
   * @template T
   * @return {Promise<T|null>}
   */
  async makeRequest() {
    const url = this.getUrl();
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  }
}
