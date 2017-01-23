
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_skills').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user_skills').insert({
          id: 1,
          user_id: 1
        })
      ])
      .then(() => {
        return knex.raw("SELECT setval('user_skills_id_seq', (SELECT MAX(id) FROM user_skills))");
      });
    });
};
