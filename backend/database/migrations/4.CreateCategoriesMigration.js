// @ts-check

const MigrationsBase = require("../base/MigrationsBase");

class CreateCategoriesMigration extends MigrationsBase {
    async up() {
        await this.pool?.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id_categoria INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
            );
        `);
    }

    async down() {
        await this.pool?.query(`DROP TABLE IF EXISTS categorias;`);
    }
}

module.exports = CreateCategoriesMigration;