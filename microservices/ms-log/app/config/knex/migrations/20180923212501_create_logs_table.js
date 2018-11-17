
exports.up = function(knex, Promise) {
    return knex.schema.createTable('logs', function(table) {
        table.increments('id').primary();
        table.string('log').notNullable();
        table.string('username').notNullable();
        table.text('data');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('logs');
};
