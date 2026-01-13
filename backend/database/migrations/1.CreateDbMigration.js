// @ts-check
const mysql = require('mysql2/promise');

const MigrationsBase = require("../base/MigrationsBase");

class CreateDbMigration extends MigrationsBase {
    ligacao = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    async up() {
        await this.ligacao?.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    }

    async down() {
        await this.ligacao?.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\`;`);
    }
}

module.exports = CreateDbMigration;