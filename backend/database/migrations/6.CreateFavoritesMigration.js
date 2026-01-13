// @ts-check

const MigrationsBase = require("../base/MigrationsBase");

class CreateFavoritesMigration extends MigrationsBase {
    async up() {
        await this.ligacao?.query(`
            CREATE TABLE IF NOT EXISTS favoritos (
                id_favorito INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario INT,
                id_produto INT,
                data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY (id_usuario, id_produto),
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
                FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
            );
        `);
    }

    async down() {
        await this.ligacao?.query(`DROP TABLE IF EXISTS favoritos;`);
    }
}

module.exports = CreateFavoritesMigration;