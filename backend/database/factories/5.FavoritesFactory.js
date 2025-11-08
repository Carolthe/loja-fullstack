// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class FavoritesFactory extends FactoriesBase {
    tableName = 'favoritos';

    constructor() {
        super();
    }

    tables() {
        return ({
            id_usuario: this.faker.number.int({ min: 1, max: 10 }),
            id_produto: this.faker.number.int({ min: 1, max: 50 }),
            data_adicionado: this.faker.date.past(),
        })
    }
}

module.exports = FavoritesFactory;