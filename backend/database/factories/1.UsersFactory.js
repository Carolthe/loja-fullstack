// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class UsersFactory extends FactoriesBase {
    tableName = 'usuarios';

    constructor() {
        super();
    }

    tables() {
        return ({
            nome: this.faker.person.fullName(),
            email: this.faker.internet.email(),
            senha: this.faker.internet.password(),
            data_criacao: this.faker.date.past(),
        })
    }
}

module.exports = UsersFactory;
