require('dotenv/config');
const promise = require('bluebird');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
const db = pgp(connectionString);
