'use strict';

// DEPENDENCIES -----------------------------------------
const express = require('express');
const router = express.Router();

const knex = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');
const boom = require('boom');


//ROUTES ------------------------------------------------
router.get('/', (req, res) => {
  knex('skills')
  .select('*')
  .then((data) => {
    data = camelizeKeys(data);
    let newArr = [];
    res.header('Access-Control-Allow-Origin', '*');
    for (var i = 0; i < data.length; i++) {
      newArr.push(data[i].skillName)
    }
    res.send(newArr);
  })
})

module.exports = router;
