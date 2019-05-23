'use strict';

require('dotenv/config');
const promise = require('bluebird');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
const db = pgp(connectionString);
const bcrypt = require('bcrypt');

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  queries = require('../../src/server/database/queries');

const localConfig = async server => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'correo',
        passwordField: 'clave'
      },
      await function(correo, clave, done) {
        if (correo && clave) {
          db.one('select * from usuarios where correo=$1', correo)
            .then(function(usuario) {
              if (usuario) {
                const result = bcrypt.compare(clave, usuario.password);
                if (err) {
                  return err;
                }
                if (result) {
                  console.log('entra');
                  res.status(200).json(usuario);
                  return done(null, usuario);
                } else {
                  console.log('no entra');
                  return done(null, false);
                }
              } else {
                return done(null, false);
              }
            })
            .catch(function(err) {
              return done(null, false);
            });
        } else {
          return done(null, false);
        }
      }
    )
  );
  server.post(
    '/auth',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );
};

module.exports = localConfig;
