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
    reviewer(review, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getUserById(review.userId);
    },
  },
  User: {
    library(user, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getUserLibrary(user.id);
    },
    reviews(user, args, { dataSources }, info) {
      return dataSources.bibliotechAPI.getUserReviews(user.id);
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
    user(root, { username }, { dataSources }, info) {
      return dataSources.bibliotechAPI.getUser(username);
    },
  },
  Mutation: {
    createAuthor(root, { name }, { dataSources }, info) {
      return dataSources.bibliotechAPI.createAuthor(name);
    },
    createBook(root, { input }, { dataSources }, info) {
      return dataSources.bibliotechAPI.createBook(input);
    },
    createReview(root, { input }, { dataSources }, info) {
      return dataSources.bibliotechAPI.createReview(input);
    },
  },
};

module.exports = resolvers;
