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
    reviews(book, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getBooksReviews(book.id);
    },
  },
  Review: {
    book(review, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getBookById(review.bookId);
    },
    reviewedOn(review, args, { dataSources }, info) {
      return review.createdAt;
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
    review(root, { id }, { dataSources }, info) {
      return dataSources.bibliotechAPI.getReviewById(id);
    },
  },
};

module.exports = resolvers;
