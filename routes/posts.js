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
  .then((data) => {
    res.send(data);
  });
});
//get posts by id
router.get('/:id', (req, res) => {
  knex('posts')
  .where('id', req.params.id)
  .then((data) => {
    res.send(data);
  });
});
//get comments for posts
router.get('/:id/comments', (req, res) => {
  knex('comments')
  .where('post_id', req.params.id)
  .then((data) => {
    res.send(data);
  });
});

// EXPORTS ---------------------------
module.exports = router;
