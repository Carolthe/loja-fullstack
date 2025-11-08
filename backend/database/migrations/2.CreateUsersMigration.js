// @ts-check
const MigrationsBase = require("../base/MigrationsBase");

class CreateUserMigration extends MigrationsBase {
    async up() {
        await this.pool?.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    async down() {
        await this.pool?.query(`DROP TABLE IF EXISTS usuarios;`);
    }
}

module.exports = CreateUserMigration;