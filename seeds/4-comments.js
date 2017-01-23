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
          post_id: 2,
          comment_body: 'Yo snoop its ya homie Jeremy. Ive been working on my skillzz and I would be up to the task.'
        })
        .then(() => {
          return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
        })
      ]);
    });
};
