const appRoot = require('app-root-path');
const knex = require(appRoot + '/app/config/knex/knex');
const tablename = 'logs';

module.exports = {

    get: (q, callback) => {

        let offset = q.page == 1 ? 0 : (q.limit * q.page) - q.limit;

        if(isNaN(offset)) {
            callback({
                error: true
            });
        }
        else {
            knex(tablename).count('id as c').then((total) => {
                knex.select('*').from(tablename)
                    .limit(q.limit)
                    .offset(offset)
                    .orderBy(q.sort, q.order)
                    .then((logs) => {
                        callback({
                            data: logs,
                            total: total[0].c
                        })
                    });
            });
        }
    },

    post: (log, callback) => {
        knex(tablename).insert(log).then(callback);
    }
};

