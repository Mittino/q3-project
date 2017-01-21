'use strict';

const express = require('express');
const app = express();
const knex = require('./knex');

var port = 5000;

app.get('/users', function (req, res) {
  knex('users')
    .then((data) => {
      res.send(data);
    });
});

app.listen(port, function () {
  console.log('Listening on port', port);
});
