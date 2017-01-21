'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
          id: 1,
          user_id: 1,
          description: 'I need someone to paint the inside of my dungeon',
          budget: 150,
        }),
        knex('posts').insert({
          id: 2,
          user_id: 2,
          description: 'Im just lookin for a talented young brother to roll me up some quality',
          budget: 4200,
        })
        .then(() => {
          return knex.raw("SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts))");
        })
      ]);
    });
};
