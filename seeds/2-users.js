'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first_name: 'Leslie',
          last_name: 'Knope',
          username: 'parks',
          password: 'parks',
          email: 'leslie@pawneeparks.net',
          phone_number: '3033303462',
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Ron',
          last_name: 'Swanson',
          username: 'Ron',
          password: 'ron',
          email: 'ron@parks.com',
          phone_number: '1800-toll-free',
          user_bio: 'I build wooden furniture. I wan a Chair Award once.'
        }),
      knex('users').insert({
        id: 3,
        first_name: 'Tom',
        last_name: 'Haverford',
        username: 'tommytom',
        password: 'saweet',
        email: 'tom@parks.com',
        phone_number: '1800-toll-free',
        user_bio: 'Treat Yo Self'
      }),
      knex('users').insert({
        id: 4,
        first_name: 'Andy',
        last_name: 'Dwyer',
        username: 'andy',
        password: 'andy',
        email: 'andy@parks.com',
        phone_number: '1800-toll-free',
        user_bio: 'Burt Macklin - FBI'
      }),
      knex('users').insert({
        id: 5,
        first_name: 'Ann',
        last_name: 'Perkins',
        username: 'ann',
        password: 'ann',
        email: 'annp@parkshealth.com',
        phone_number: '89089089',
        user_bio: 'I like art.'
      })
      .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
      })
    ]);
  });
};
