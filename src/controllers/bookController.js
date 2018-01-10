const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

function bookController(bookService, nav) {
  function getIndex(req, res) {
    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

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
  }
  function getById(req, res) {
    const { id } = req.params;
    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);
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
  }
  function middleware(req, res, next) {
    // if (!req.user) {
    //   res.redirect('/');
    // }
    next();
  }
  return { getIndex, getById, middleware };
}

module.exports = bookController;
