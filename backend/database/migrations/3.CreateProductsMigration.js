// @ts-check

const MigrationsBase = require("../base/MigrationsBase");

class CreateUserMigration extends MigrationsBase {
    async up() {
        await this.ligacao?.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id_produto INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(150) NOT NULL,
                descricao TEXT,
                preco DECIMAL(10,2) NOT NULL,
                imagem VARCHAR(255),
                estoque INT DEFAULT 0,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    async down() {
        await this.ligacao?.query(`DROP TABLE IF EXISTS produtos;`);
    }
}

module.exports = CreateUserMigration;