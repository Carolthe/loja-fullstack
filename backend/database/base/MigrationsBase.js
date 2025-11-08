// @ts-check
const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * @abstract
 * @class MigrationsBase
 */
class MigrationsBase {
  /**
   * @type {import("mysql2/promise").Pool|null}
   */
  pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  /**
   * @abstract
   */
  async up() {
    throw new Error("Method 'up()' must be implemented.");
  }

  /**
   * @abstract
   */
  async down() {
    throw new Error("Method 'down()' must be implemented.");
  }
}

module.exports = MigrationsBase;