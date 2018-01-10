const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById } = bookController(null, nav);
  bookRouter.use((req, res, next) => {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  });
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}


module.exports = router;
