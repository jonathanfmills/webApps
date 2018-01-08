const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }];
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          }
        );
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => { 
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } =
          await request.input('id', sql.Int, id)
            .query('select * from books where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: req.book
        }
      );
    });
  return bookRouter;
}


module.exports = router;
