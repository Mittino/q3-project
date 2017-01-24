'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first_name: 'Jeremy',
          last_name: 'Bowers',
          username: 'commandLineMurderer',
          password: 'I wish I was hashed',
          email: 'jb@galvanize.net',
          phone_number: '3033303462',
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Snoop',
          last_name: 'Dogg',
          username: 'DOdoubleG',
          password: 'I have loads of hash',
          email: 'sd@420universe.uk',
          phone_number: '1800-toll-free',
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
      });
    });
};
