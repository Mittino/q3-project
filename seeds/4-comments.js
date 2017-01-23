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
        }),
        knex('comments').insert({
          id: 2,
          user_id: 1,
          post_id: 2,
          comment_body: 'Yo snoop its ya homie Jeremy, again. Ive got some sick new beats to drop on yo face.'
        }),
        knex('comments').insert({
          id: 3,
          user_id: 1,
          post_id: 2,
          comment_body: 'Yo snoop its ya homie Jeremy ... yet again. You aint done returned my calls B, where is da luv?'
        }),
        knex('comments').insert({
          id: 4,
          user_id: 2,
          post_id: 1,
          comment_body: 'Yo its snoop-lion here. Everyone check out my new dope ass EP!'
        })
        .then(() => {
          return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
        })
      ]);
    });
};
