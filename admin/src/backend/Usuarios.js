// @ts-check

/**
 * @typedef Usuario
 * @property {number} id
 */

import { Admin } from "./Admin";

export class Usuarios extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "usuarios";
  }

  /**
   * @returns {Promise<Usuario[]>}
   */
  async getAllUsers() {
    /**
     * @type {Usuario[]|null}
     */
    const data = await this.makeRequest();
    if (!data) {
      return [];
    }
    return data;
  }

  /**
   * @template T
   * @param {number|string} id
   * @returns {Promise<T|null>}
   */
  async getById(id) {
    /**
     * @type {T|null}
     */
    const data = await this.makeRequest({
      pathParams: {
        id: String(id),
      },
    });
    return data;
  }

  /**
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const response = await this.makeRequest({
      method: "DELETE",
      pathParams: {
        id: String(id),
      },
    });
    return response !== null;
  }
}
