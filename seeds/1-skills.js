'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('skills').insert({id: 1, skill_name: 'none'}),
        knex('skills').insert({id: 2, skill_name: 'painting'}),
        knex('skills').insert({id: 3, skill_name: 'drawing'}),
        knex('skills').insert({id: 4, skill_name: 'sculpting'}),
        knex('skills').insert({id: 5, skill_name: 'photography'}),
        knex('skills').insert({id: 6, skill_name: 'metal work'}),
        knex('skills').insert({id: 7, skill_name: 'sewing'}),
        knex('skills').insert({id: 8, skill_name: 'knitting'}),
        knex('skills').insert({id: 9, skill_name: 'quilting'}),
        knex('skills').insert({id: 10, skill_name: 'wood carving'}),
        knex('skills').insert({id: 11, skill_name: 'collaging'}),
        knex('skills').insert({id: 12, skill_name: 'graphic design'}),
      ]);
    });
};
