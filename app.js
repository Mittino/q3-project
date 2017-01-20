'use strict';

//to run this use node app.js in terminal
//to run the client side server use npm start in terminal

let express = require('express');
let app = express();
let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port 5000");
});
