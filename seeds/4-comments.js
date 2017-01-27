'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
          id: 1,
          user_id: 1,
          post_id: 4,
          comment_body: 'Ann you beautiful thing - I will paint for you!'
        }),
        knex('comments').insert({
          id: 2,
          user_id: 5,
          post_id: 3,
          comment_body: 'What kind of art are you looking for?'
        }),
        knex('comments').insert({
          id: 3,
          user_id: 3,
          post_id: 2,
          comment_body: 'Art is great. Sparklesuds.'
        }),
        knex('comments').insert({
          id: 4,
          user_id: 4,
          post_id: 1,
          comment_body: 'I can art!'
        })
        .then(() => {
          return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
        })
      ]);
    });
};
