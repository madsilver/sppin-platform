const appRoot = require('app-root-path');
const knex = require(appRoot + '/app/config/knex/knex');
const tablename = 'modules';

module.exports = {

    get: (callback, query) => {
        const limit = query.limit || 1000;
        const page = query.page || 1;
        const offset = (limit * page) - limit;
        const sort = query.sort || 'id';
        const order = query.order || 'asc';

        knex(tablename).count('id as count').then((total) => {
            knex.select('*').from(tablename)
                .limit(limit)
                .offset(offset)
                .orderBy(sort, order)
                .then((modules) => {
                    callback({
                        modules: modules,
                        count: total[0].count
                    })
                })
                .catch(callback);
        });
    },

    post: (module, callback) => {
        knex(tablename)
            .insert(module)
            .then(callback)
            .catch(callback);
    },

    put: (module, callback) => {
        knex(tablename).where('id', module.id)
            .update(module)
            .then(callback)
            .catch(callback);
    }

};

