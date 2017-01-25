'use strict';

const express = require('express');
const app = express();

var port = 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

var allowCrossDomain = function (req, res, next) {
  res.header('Allow-Control-Allow-Origin', '*');
  res.header('Allow-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Allow-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);

app.listen(port, function () {
  console.log('Listening on port', port);
});
