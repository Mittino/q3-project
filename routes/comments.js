'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');

//ROUTES ------------------------------------------------

//get all comments
router.get('/', (req, res) => {
  knex('comments')
  .orderBy('id')
  .then((data) => {
    res.send(data);
  });
});

//get comments by user_id (possibly so users can see their own comments)
router.get('/user/:id', (req, res) => {
  knex('comments')
  .where('user_id', req.params.id)
  .then((data) => {
    res.send(data);
  });
});


// EXPORTS ---------------------------
module.exports = router;
