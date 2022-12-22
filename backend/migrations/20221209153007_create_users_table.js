/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('users', function (table) {
    table.increments();
    table.string('username',255).unique().notNullable();
    table.string('password').notNullable();
    table.enu('role', ['ADMIN', 'USER']).notNullable().defaultTo('USER');
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('users');
};
