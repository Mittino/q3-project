'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');


//ROUTES ------------------------------------------------

//get user by id
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

router.post('/', (req, res, next) => {
  if (!req.body.email) {
    return next(boom.create(400, 'Email must not be blank'));
  }
  if (!req.body.password) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  knex('users')
  .where('email', req.body.email)
  .then((result)=>{
    if(result){
      next(boom.create(400, 'Account already exists'));
    }
    knex('users')
    .where('username', req.body.username)
    .then((usernameResult)=>{
      if (usernameResult) {
        next(boom.create(400, 'Username is taken'));
      }
      return bycrypt.hash(req.body.password, 12)
      .then((hashedPassword)=>{
        var newUser = {
          "first_name": req.body.firstName,
          "last_name": req.body.lastName,
          "username": req.body.username,
          "password": hashedPassword,
          "email": req.body.email,
          "user_bio": req.body.userBio,
          "zip_code": req.body.zipCode,
          "phone_number": req.body.phoneNumber,
          "profile_url": req.body.profileUrl,
          "website": req.body.website,
          "is_admin": false
        };
        var addingSkills = req.body.skills;
        if (addingSkills.length === 0) {
          knex('users')
          .where('email', req.body.email)
          .first()
          .then((dataToSend)=>{
            res.send(dataToSend)
          })
        }

        knex('users')
        .insert(newUser, ['id'])
        .then((userId) => {
          for (var i = 0; i < addingSkills.length; i++) {
            knex('user-skills')
            .insert({
              skill_id: addingSkills[i],
              user_id: userId
            })
            .then(()=>{
              knex('users')
              .where('email', req.body.email)
              .first()
              .then((dataToSend)=>{
                res.send(dataToSend)
              })
            })
          }
        })
      })
    })
  })
})
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
