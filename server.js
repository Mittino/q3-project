'use strict';

const express = require('express')
const app = express();

var port = 5000;

app.listen(port, function () {
  console.log('Listening on port', port);
});
