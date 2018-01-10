const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.use((req, res, next) => {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  });
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug("Connected correctly to server");

          const db = client.db(dbName);

          const col = db.collection('books');

          const books = await col.find().toArray();
          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          console.log(err.stack);
        }

        // Close connection
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);

          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          console.log(err.stack);
        }

        // Close connection
        client.close();
      }());
    });
  return bookRouter;
}


module.exports = router;
