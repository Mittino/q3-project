'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');


//ROUTES ------------------------------------------------

router.get('/', (req, res) => {
  knex('users')
  .then((data) => {
    res.send(data);
  });
});




// EXPORTS ---------------------------
module.exports = router;
