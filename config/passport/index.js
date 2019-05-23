'use strict';

const passport = require('passport');
const passportConfig = server => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user); //request.user
  });
  passport.deserializeUser((user, done) => {
    done(null, user); //request.user
  });
  require('./local')(server);
};

module.exports = passportConfig;
