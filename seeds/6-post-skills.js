exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('post_skills').del().then(function() {
        return Promise.all([
            // Inserts seed entries
            knex('post_skills').insert({
              id: 1,
              skill_id: 1,
              post_id: 1
            }),
            knex('post_skills').insert({
              id: 2,
              skill_id: 1,
              post_id: 2
            }),
            knex('post_skills').insert({
              id: 3,
              skill_id: 2,
              post_id: 1
            }),
            knex('post_skills').insert({
              id: 4,
              skill_id: 3,
              post_id: 2
            })
        ])
        .then(() => {
          return knex.raw("SELECT setval('post_skills_id_seq', (SELECT MAX(id) FROM post_skills))");
        });
    });
};
