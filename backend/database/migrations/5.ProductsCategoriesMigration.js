// @ts-check

const MigrationsBase = require("../base/MigrationsBase");

class CreateProductsCategoriesMigration extends MigrationsBase {
    async up() {
        await this.ligacao?.query(`
            CREATE TABLE IF NOT EXISTS produtos_categorias (
                id_produto INT NOT NULL,
                id_categoria INT NOT NULL,
                PRIMARY KEY (id_produto, id_categoria),
                FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
                FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
            );
        `);
    }

    async down() {
        await this.ligacao?.query(`DROP TABLE IF EXISTS produtos_categorias;`);
    }
}

module.exports = CreateProductsCategoriesMigration;