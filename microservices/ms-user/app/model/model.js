const appRoot = require('app-root-path');
const knex = require(appRoot + '/app/config/knex/knex');
const tablename = 'users';

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
                .then((users) => {
                    callback({
                        users: users,
                        count: total[0].count
                    })
                })
                .catch(callback);
        });
    },

    post: (user, callback) => {
        knex(tablename).insert(user)
            .then(callback)
            .catch(callback);
    },

    put: (user, callback) => {
        knex(tablename).where('id', user.id)
            .update(user)
            .then(callback)
            .catch(callback);
    },

    getByLogin: (data, callback) => {
        knex.select().from(tablename)
            .where('username', data.username)
            .where('password', data.password)
            .then(callback)
            .catch(callback);
    }
};
