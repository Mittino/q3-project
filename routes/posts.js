'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');

//ROUTES ------------------------------------------------

//get all posts
router.get('/', (req, res) => {
    knex('posts')
    .select('posts.id', 'description', 'location', 'budget', 'img_url', 'created_at')
    .join('users', 'posts.user_id', '=', 'users.id')
    .join('post_skills', 'posts.id', '=', 'post_skills.post_id')
    .join('skills', 'post_skills.skill_id', '=', 'skills.id')
    .select('user_id', 'users.username', 'users.user_bio', 'skills.skill_name', 'post_skills.skill_id').then((data) => {
        data = camelizeKeys(data);

        let finalData = {}

        for (var obj in data) {
            if (finalData[data[obj].id]) {
                finalData[data[obj].id].skills[data[obj].skillId] = data[obj].skillName
            } else {
                finalData[data[obj].id] = {
                    "id": data[obj].id,
                    "description": data[obj].description,
                    "location": data[obj].location,
                    "budget": data[obj].budget,
                    "imgUrl": data[obj].imgUrl,
                    "createdAt": data[obj].createdAt,
                    "userId": data[obj].userId,
                    "username": data[obj].username,
                    "userBio": data[obj].userBio,
                    "skills": {
                        [data[obj].skillId]: data[obj].skillName
                    }
                }
            }
        }

        res.send(finalData);

    });
});
//get posts by id
router.get('/:id', (req, res) => {
    knex('posts')
    .where('posts.id', req.params.id)
    .select('posts.id', 'description', 'location', 'budget', 'img_url', 'created_at')
    .join('users', 'posts.user_id', '=', 'users.id')
    .join('post_skills', 'posts.id', '=', 'post_skills.post_id')
    .join('skills', 'post_skills.skill_id', '=', 'skills.id')
    // .orderBy('id')
    .select('user_id', 'users.username', 'users.user_bio', 'skills.skill_name', 'post_skills.skill_id')
    .then((data) => {

        data = camelizeKeys(data);

        let finalData = {}

        for (var obj in data) {
            if (finalData[data[obj].id]) {
                finalData[data[obj].id].skills[data[obj].skillId] = data[obj].skillName
            } else {
                finalData[data[obj].id] = {
                    "id": data[obj].id,
                    "description": data[obj].description,
                    "location": data[obj].location,
                    "budget": data[obj].budget,
                    "imgUrl": data[obj].imgUrl,
                    "createdAt": data[obj].createdAt,
                    "userId": data[obj].userId,
                    "username": data[obj].username,
                    "userBio": data[obj].userBio,
                    "skills": {
                        [data[obj].skillId]: data[obj].skillName
                    }
                }
            }
        }

        res.send(finalData);
    });
});
//get comments for posts
// router.get('/:id/comments', (req, res) => {
//     knex('comments').where('post_id', req.params.id).then((data) => {
//         res.send(data);
//     });
// });

// EXPORTS ---------------------------
module.exports = router;
