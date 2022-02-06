const resolvers = {
  Author: {
    books(author, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getAuthorBooks(author.id);
    },
  },
  Book: {
    authors(book, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getBookAuthors(book.id);
    },
  },
  Query: {
    author(root, { id }, { dataSources }, info) {
      return dataSources.bibliotechAPI.getAuthorById(id);
    },
    authors(root, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getAuthors();
    },
    book(root, { id }, { dataSources }, info) {
      return dataSources.bibliotechAPI.getBookById(id);
    },
    books(root, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getBooks();
    },
  },
};

module.exports = resolvers;
