// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class ProductsFactory extends FactoriesBase {
    tableName = 'produtos';

    constructor() {
        super();
    }

    tables() {
        return ({
            nome: this.faker.commerce.productName(),
            descricao: this.faker.commerce.productDescription(),
            preco: this.faker.commerce.price(),
            imagem: this.faker.image.url(),
            estoque: this.faker.number.int({ min: 0, max: 1000 }),
            data_criacao: this.faker.date.past(),
        })
    }
}

module.exports = ProductsFactory;
