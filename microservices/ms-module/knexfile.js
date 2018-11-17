require('dotenv').config();

module.exports = {

    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    migrations: {
        directory: __dirname + '/app/config/knex/migrations',
    },
    seeds: {
        directory: __dirname + '/app/config/knex/seeds'
    },
    debug: process.env.NODE_ENV === 'development'
};
