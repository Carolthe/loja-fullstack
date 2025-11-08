// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class ProductsCategoriesFactory extends FactoriesBase {
    tableName = 'produtos_categorias';

    constructor() {
        super();
    }

    tables() {
        return ({
            id_produto: this.faker.number.int({ min: 1, max: 50 }),
            id_categoria: this.faker.number.int({ min: 1, max: 10 }),
        })
    }
}

module.exports = ProductsCategoriesFactory;