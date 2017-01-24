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
router.get('/:id', (req, res, next) => {
    knex('users')
    .where('users.id', req.params.id)
    .leftJoin('user_skills', 'users.id', '=', 'user_skills.user_id')
    .leftJoin('skills', 'user_skills.skill_id', '=', 'skills.id')
    .then((data) => {
      console.log(camelizeKeys(data));
      // if (data.length === 0 && data[0].skillId === null) { //user doesn't exist
      //   res.send(camelizeKeys(data));
      // } else {
        var camData = camelizeKeys(data);

        var output = camData[0];

        output.skillName = {}

        data.forEach((obj) => {
            output.skillName[obj.skill_id] = obj.skill_name;
        })

        delete output.skillId;
        delete output.id;
        res.send(output)
      // }

    });
});

//POST to users -----------------------------------

router.post('/', (req, res, next) => {
    //if there is no email error
    if (!req.body.email) {
        return next(boom.create(400, 'Email must not be blank'));
    }
    if (!req.body.username) {
        return next(boom.create(400, 'Username must not be blank'));
    }
    //if there is not password error
    if (!req.body.password) {
        return next(boom.create(400, 'Password must not be blank'));
    }

    knex('users').where('email', req.body.email)
    .first()
    .then((result) => {
        if (result) {
            next(boom.create(400, 'Account already exists'));
        } else {
            knex('users')
            .where('username', req.body.username)
            .first()
            .then((usernameResult) => {
                // if there is a result that means that username is already in the database
                if (usernameResult) {
                    next(boom.create(400, 'Username is taken'));
                }
                return bcrypt.hash(req.body.password, 12)
                .then((hashedPassword) => {
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
                    knex('users')
                    .insert(newUser, '*')
                    .then((newUser) => {
                      // console.log(newUser);
                        var addingSkills = req.body.skills;
                            for (var i = 0; i < addingSkills.length; i++) {
                                knex('user_skills')
                                .insert({
                                  skill_id: addingSkills[i],
                                  user_id: newUser[0].id
                                }, '*')
                                .then(() => {
                                  res.send(newUser);
                                })
                                .catch((err) => {
                                      console.error(err);
                                      next(boom.create(400, 'Failed'));
                                    });
                            } //end for loop for adding skills
                    }) //hashed password then
                    .catch((err) => {
                          console.error(err);
                          next(boom.create(400, 'Failed'));
                        });
                }) // check for username
                .catch((err) => {
                      console.error(err);
                      next(boom.create(400, 'Failed'));
                    });
            }) //first else statement for email check
            .catch((err) => {
                  console.error(err);
                  next(boom.create(400, 'Failed'));
                });
        }
    }) //first then
    .catch((err) => {
          console.error(err);
          next(boom.create(400, 'Failed'));
        });
}) //overall post

router.patch('/:id', (req,res,next)=>{
  knex('users')
  .where('id', req.params.id)
  .then((result)=>{
    if (!result[0]) {
      next(boom.create(400, 'User doesn\'t exist.'));
    }
    knex('users')
    .where('id', req.params.id)
    .update({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      user_bio: req.body.userBio,
      zip_code: req.body.zipCode,
      phone_number: req.body.phoneNumber,
      profile_url: req.body.profileUrl,
      website: req.body.website
    }, '*')
    .then((result)=>{
      result = camelizeKeys(result);
      delete result[0].isAdmin;
      delete result[0].password;
      res.send(result)
    })//end second then for update
    .catch((err) => {
          console.error(err);
          next(boom.create(400, 'Failed'));
        });
  })//end first then
  .catch((err) => {
        console.error(err);
        next(boom.create(400, 'Failed'));
      });
})//end router.patch

// EXPORTS ---------------------------
module.exports = router;
