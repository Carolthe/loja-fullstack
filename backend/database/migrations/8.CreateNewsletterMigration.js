// @ts-check

const MigrationsBase = require("../base/MigrationsBase");

class CreateNewsletterMigration extends MigrationsBase {
    async up() {
        await this.ligacao?.query(`
            CREATE TABLE newsletters (
                id_newsletter INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    async down() {
        await this.ligacao?.query(`DROP TABLE IF EXISTS newsletters;`);
    }
}

module.exports = CreateNewsletterMigration;