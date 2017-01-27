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
          title: 'Pawnee Painting Needed - Parks Department',
          description: 'The parks department is looking for new painting for the city hall building!',
          budget: 150,
        }),
        knex('posts').insert({
          id: 2,
          user_id: 3,
          title: 'Looking for Amazing Art',
          description: 'I\'m just lookin for a talented artist to help create masterpieces for Entertainment720!',
          budget: 4200,
        }),
        knex('posts').insert({
          id: 4,
          user_id: 4,
          title: 'Art is cool',
          description: 'Sure I like art! ',
          budget: 0,
        }),
        knex('posts').insert({
          id: 3,
          user_id: 5,
          title: 'Quilt Needed',
          description: 'My bestie Lesie needs a new friendship quilt',
          budget: 100,
        })
        .then(() => {
          return knex.raw("SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts))");
        })
      ]);
    });
};
