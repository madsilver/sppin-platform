
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.integer('department');
        table.boolean('status').notNullable().defaultTo(true);
        table.string('permissions');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
