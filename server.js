'use strict';

const express = require('express');
const app = express();

var port = 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);

app.listen(port, function () {
  console.log('Listening on port', port);
});
