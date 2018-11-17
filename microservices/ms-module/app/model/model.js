const appRoot = require('app-root-path');
const knex = require(appRoot + '/app/config/knex/knex');
const tablename = 'modules';

module.exports = {

    get: (callback) => {
        knex.select('*').from(tablename).then(callback);
    },

    post: (module, callback) => {
        knex(tablename).insert(module).then(callback);
    }

};

