// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class CategoriesFactory extends FactoriesBase {
    tableName = 'categorias';

    constructor() {
        super();
    }

    tables() {
        return ({
            nome: this.faker.commerce.department(),
        })
    }
}

module.exports = CategoriesFactory;