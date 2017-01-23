'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');

//ROUTES ------------------------------------------------

//get all comments
// router.get('/', (req, res) => {
//   knex('comments')
//   .orderBy('id')
//   .then((data) => {
//     res.send(data);
//   });
// });

//get comments by user_id (possibly so users can see their own comments)
// router.get('/user/:id', (req, res) => {
//   knex('comments')
//   .where('user_id', req.params.id)
//   .then((data) => {
//     res.send(data);
//   });
// });

//get comments by post id
router.get('/:postId', (req, res) => {
  knex('posts')
  .where('posts.id', req.params.postId)
  .join('comments', 'posts.id', '=', 'comments.post_id')
  .join('users', 'comments.user_id', '=', 'users.id')
  .select('posts.id', 'comment_body', 'comments.created_at', 'users.profile_url', 'users.username', 'comments.user_id')
  .then((data) => {
    res.send(data)
  })
})


// EXPORTS ---------------------------
module.exports = router;
