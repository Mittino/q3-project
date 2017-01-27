'use strict';
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'feedanartist'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
