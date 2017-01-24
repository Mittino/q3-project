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

router.post('/:userId', (req, res, next)=>{
  var newPost = {
    user_id: req.params.userId,
    description: req.body.description,
    location: req.body.location,
    budget: req.body.budget,
    img_url: req.body.img_url
  }
  knex('posts')
  .insert(newPost, '*')
  .then((addedPost)=> {
    addedPost = camelizeKeys(addedPost);
    if (req.body.skills.length === 0) {
      res.send(addedPost)
    } else {
      for (var skill in req.body.skills) {
        knex('post_skills')
        .insert({
          skill_id: skill,
          post_id: addedPost[0].id
        })
      }
      res.send(addedPost)
    }//closes the else
  })//closes the then
})//router.post close

// EXPORTS ---------------------------
module.exports = router;
