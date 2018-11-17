
exports.up = function(knex, Promise) {
    return knex.schema.createTable('modules', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('label').notNullable();
        table.string('icon').notNullable();
        table.string('color').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('modules');
};
