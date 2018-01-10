const passport = require('passport');
const debug = require('debug')('app:passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    debug('serializing user');
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    debug('deserializing user');
    done(null, user);
  });
};
