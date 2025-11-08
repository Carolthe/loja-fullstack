// @ts-check
const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

/**
 * @abstract
 * @class FactoryBase
 */
class FactoryBase {

    /**
     * @abstract
     * @type {string|undefined}
     */
    tableName;

    /**
     * @type {import('mysql2/promise').Pool|null}
     */
    pool;

    faker;

    _quantity = 1;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        this.faker = faker;
    }

    quantity(quantity) {
        this._quantity = quantity;
        return this;
    }

    /**
     * @abstract
     * @return {{ [key: string]: string|number|boolean|Date }}
     */
    tables() {
        throw new Error("Method 'tables()' must be implemented.");
    }

    async run() {
        if (!this.tableName) {
            throw new Error("Property 'tableName' must be defined.");
        }
        for (let i = 0; i < this._quantity; i++) {
            const data = this.tables();
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);
            const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
            try {
                await this.pool?.query(query, values);
            } catch (error) {
                continue;
            }
        }

        console.log(`✅ Inserção concluída em "${this.tableName}".`);
        await this.pool?.end();
    }
}

module.exports = FactoryBase;