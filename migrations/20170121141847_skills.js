'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('skills', (table) => {
    table.increments();
    table.string('skill_name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('skills');
};
