'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const boom = require('boom');


//ROUTES ------------------------------------------------

//get comments by post id
router.get('/:postId', (req, res, next) => {
  knex('posts')
  .where('posts.id', req.params.postId)
  .join('comments', 'posts.id', '=', 'comments.post_id')
  .join('users', 'comments.user_id', '=', 'users.id')
  .select('posts.id', 'comment_body', 'comments.created_at', 'users.profile_url', 'users.username', 'comments.user_id')
  .orderBy('comments.created_at')
  .then((data) => {
    data = camelizeKeys(data);
    res.header('Access-Control-Allow-Origin', '*')
    res.send(data);
  })
  .catch((err) => {
      next(err);
    });
})

router.post('/', (req, res, next) =>{
  let adding = {
    user_id: req.body.userId,
    post_id: req.body.postId,
    comment_body: req.body.commentBody
  }
  console.log(adding);
  knex('comments')
  .insert(adding, '*')
  .then((result) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(camelizeKeys(result[0]));
  })
  .catch((err) => {
      next(err);
    });
})

// EXPORTS ---------------------------
module.exports = router;
