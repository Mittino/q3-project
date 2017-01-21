'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('username').notNullable().unique()
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.text('user_bio').defaultTo('');
    table.integer('zip_code').defaultTo(80302);
    table.integer('phone_number').notNullable();
    table.string('profile_url').defaultTo('');
    table.string('website').defaultTo('');
    table.boolean('is_admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
