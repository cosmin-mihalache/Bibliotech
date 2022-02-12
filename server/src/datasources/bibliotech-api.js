const { RESTDataSource } = require('apollo-datasource-rest');

class BibliotechApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4000/';
  }

  getAuthorById(id) {
    return this.get(`/authors/${id}`).catch(
      (err) => err.message === '404: Not Found' && null
    );
  }

  async getAuthorBooks(authorId) {
    const items = await this.get(`authors/${authorId}/books`);
    return items.map((item) => item.book);
  }

  getAuthors() {
    return this.get(`/authors`);
  }

  getBookById(id) {
    return this.get(`/books/${id}`).catch(
      (err) => err.message === '404: Not Found' && null
    );
  }

  async getBookAuthors(bookId) {
    const items = await this.get(`books/${bookId}/authors`);
    return items.map((item) => item.author);
  }

  async getBooksReviews(bookId) {
    return this.get(`/reviews?bookId=${bookId}`);
  }

  getBooks() {
    return this.get(`/books`);
  }

  getReviewById(id) {
    return this.get(`/reviews/${id}`).catch(
      (err) => err.message === '404: Not Found' && null
    );
  }

  async getUser(username) {
    const [user] = await this.get(`/users?username=${username}`);
    return user;
  }

  getUserById(id) {
    return this.get(`/users/${id}`).catch(
      (err) => err.message === '404: Not Found' && null
    );
  }

  async getUserLibrary(userId) {
    const items = await this.get(`/users/${userId}/books`);
    return items.map((item) => item.book);
  }

  getUserReviews(userId) {
    return this.get(`/reviews?userId=${userId}`);
  }

  createAuthor(name) {
    return this.post('/authors', { name });
  }

  async createBook({ authorIds, cover, summary, title }) {
    const book = await this.post('books', {
      ...(cover && { cover }),
      ...(summary && { summary }),
      title,
    });

    if (authorIds?.length) {
      await Promise.all(
        authorIds.map((authorId) =>
          this.post('/bookAuthors', {
            authorId: parseInt(authorId),
            bookId: book.id,
          })
        )
      );
    }
    return book;
  }
}

module.exports = BibliotechApi;
