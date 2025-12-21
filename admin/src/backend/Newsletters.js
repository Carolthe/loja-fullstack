// @ts-check

/**
 * @typedef Newsletter
 * @property {number} id
 */

import { Admin } from "./Admin";

export class Newsletters extends Admin {
  /**
   * @returns {string}
   */
  getSufix() {
    return "newsletters";
  }
}
