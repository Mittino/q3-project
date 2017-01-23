'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const bcrypt = require('bcrypt-as-promised');


//ROUTES ------------------------------------------------

//get all users
router.get('/:id', (req, res) => {
  knex('users')
  .where('users.id', req.params.id)
  .join('user_skills', 'users.id', '=', 'user_skills.user_id')
  .join('skills', 'user_skills.skill_id', '=', 'skills.id')
  .then((data) => {

    var camData = camelizeKeys(data);

        var output = camData[0];

        output.skillName = {}

        data.forEach((obj) => {
          output.skillName[obj.skill_id] = obj.skill_name;
        })

        delete output.skillId;
        delete output.id;
        res.send(output)

  });
});


//get users by id
// router.get('/:id', (req, res) => {
//   knex('users')
//   .where('id', req.params.id)
//   .then((data) => {
//     res.send(data);
//   });
// });

// EXPORTS ---------------------------
module.exports = router;
