exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('post_skills').del().then(function() {
        return Promise.all([
            // Inserts seed entries
            knex('post_skills').insert({
              id: 1,
              skill_id: 2,
              post_id: 1
            }),
            knex('post_skills').insert({
              id: 2,
              skill_id: 3,
              post_id: 2
            }),
            knex('post_skills').insert({
              id: 3,
              skill_id: 4,
              post_id: 2
            }),
            knex('post_skills').insert({
              id: 4,
              skill_id: 11,
              post_id: 2
            }),
            knex('post_skills').insert({
              id: 5,
              skill_id: 3,
              post_id: 4
            }),
            knex('post_skills').insert({
              id: 6,
              skill_id: 9,
              post_id: 3
            }),
            knex('post_skills').insert({
              id: 7,
              skill_id: 7,
              post_id: 3
            })
        ])
        .then(() => {
          return knex.raw("SELECT setval('post_skills_id_seq', (SELECT MAX(id) FROM post_skills))");
        });
    });
};
