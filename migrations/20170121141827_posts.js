'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.text('description').defaultTo('');
    table.string('location').notNullable().defaultTo('');
    table.integer('budget').notNullable().defaultTo(0);
    table.string('img_url').defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
