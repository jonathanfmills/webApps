const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'userName',
      passwordField: 'password'
    }, (userName, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');

          const user = await col.findOne({ userName });

          debug(user, userName);

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }


        } catch (err) {
          console.log(err.stack);
        }

        // Close connection
        client.close();
      }());

    }));
};
