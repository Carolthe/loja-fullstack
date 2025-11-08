// @ts-check
const FactoriesBase = require('../base/FactoriesBase');

class NewsletterFactory extends FactoriesBase {
    tableName = 'newsletters';

    constructor() {
        super();
    }

    tables() {
        return ({
            nome: this.faker.person.firstName(),
            email: this.faker.internet.email(),
            data_inscricao: this.faker.date.past(),
        })
    }
}

module.exports = NewsletterFactory;