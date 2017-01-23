'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const bcrypt = require('bcrypt-as-promised');


//ROUTES ------------------------------------------------

//get all users
router.get('/', (req, res) => {
  knex('users')
  .join('user_skills', 'users.id', '=', 'user_skills.user_id')
  // .join('skills', 'user_skills.skill_id', '=', 'skills.id')
  // .orderBy('user.id')
  .then((data) => {
    res.send(data);
  });
});


//get users by id
router.get('/:id', (req, res) => {
  knex('users')
  .where('id', req.params.id)
  .then((data) => {
    res.send(data);
  });
});

// EXPORTS ---------------------------
module.exports = router;
