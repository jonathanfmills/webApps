function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      resolve({ description: 'our description' });
    });
  }
  return { getBookById };
}

module.exports = goodreadsService();
