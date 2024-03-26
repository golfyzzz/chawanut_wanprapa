const knex = require('knex')

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'project_soft',
        },
        seeds: {
            directory: "./data/seeds"
        }
    }
};