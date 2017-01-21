'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('skills').insert({id: 1, skill_name: 'painting'}),
        knex('skills').insert({id: 2, skill_name: 'drawing'}),
        knex('skills').insert({id: 3, skill_name: 'sculpting'}),
      ]);
    });
};
