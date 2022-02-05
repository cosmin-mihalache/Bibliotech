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

  getBooks() {
    return this.get(`/books`);
  }
}

module.exports = BibliotechApi;
