// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class CartFactory extends FactoriesBase {
    tableName = 'carrinho';

    constructor() {
        super();
    }

    tables() {
        return ({
            id_usuario: this.faker.number.int({ min: 1, max: 10 }),
            id_produto: this.faker.number.int({ min: 1, max: 50 }),
            quantidade: this.faker.number.int({ min: 1, max: 5 }),
            data_adicionado: this.faker.date.past(),
        })
    }
}

module.exports = CartFactory;