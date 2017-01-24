'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const boom = require('boom');


//ROUTES ------------------------------------------------

//get all posts
router.get('/', (req, res) => {
    knex('posts')
    .select('posts.id', 'title', 'description', 'location', 'budget', 'img_url', 'created_at')
    .join('users', 'posts.user_id', '=', 'users.id')
    .leftJoin('post_skills', 'posts.id', '=', 'post_skills.post_id')
    .leftJoin('skills', 'post_skills.skill_id', '=', 'skills.id')
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
                    "title": data[obj].title,
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
    })
    .catch((err) => {
          console.error(err);
          next(boom.create(400, 'Failed'));
        });
});
//get posts by id
router.get('/:id', (req, res) => {
    knex('posts')
    .where('posts.id', req.params.id)
    .select('posts.id', 'title', 'description', 'location', 'budget', 'img_url', 'created_at')
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
                    "title": data[obj].title,
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
    })
    .catch((err) => {
          console.error(err);
          next(boom.create(400, 'Failed'));
        });
});

router.post('/:userId', (req, res, next)=>{
  var newPost = {
    user_id: req.params.userId,
    description: req.body.description,
    location: req.body.location,
    budget: req.body.budget,
    img_url: req.body.imgUrl
  }
  knex('posts')
  .insert(newPost, '*')
  .then((addedPost)=> {
    addedPost = camelizeKeys(addedPost);
    let theSkills = req.body.skills;
    console.log(theSkills);
    for (var i = 0; i < theSkills.length; i++) {
      console.log(theSkills[i]);
        knex('post_skills')
        .insert({
          skill_id: theSkills[i],
          post_id: addedPost[0].id
        }).then((res)=>{
          console.log(res);
        })
    } //end for loop for adding skills
    return addedPost
  }).then((addedPost)=>{
    res.send(addedPost)
  })
  //closes the then
  .catch((err) => {
        console.error(err);
        next(boom.create(400, 'Failed'));
      });
})//router.post close

//need delete
router.delete('/:id', (req,res,next)=>{
  knex('posts')
  .where('id', req.params.id)
  .first()
  .then((response)=>{
    if (!response) {
      next(boom.create(400, 'Post does not exist'));
    }
    let toDelete = camelizeKeys(response)
    return knex('posts')
    .where('id', toDelete.id)
    .del()
    .then((deleted)=>{
      // delete toDelete.id
      res.send(toDelete)
    }).catch((err) => {
          console.error(err);
          next(boom.create(400, 'Failed2'));
        })
  });
});

// EXPORTS ---------------------------
module.exports = router;
