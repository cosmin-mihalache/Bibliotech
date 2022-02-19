const { ForbiddenError, UserInputError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

class BibliotechApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4000/';
  }

  async checkUniqueUserData(email, username) {
    const res = await Promise.all([
      this.get(`/users?email=${email}`),
      this.get(`users?username=${username}`),
    ]);
    const [existingEmail, existingUsername] = res;

    if (existingEmail.length) {
      throw new UserInputError('Email is already in use');
    } else if (existingUsername.length) {
      throw new UserInputError('Username already in use');
    }
  }

  async signUp({ email, name, username }) {
    await this.checkUniqueUserData(email, username);
    return this.post('/users', {
      email,
      name,
      username,
    });
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

  async createReview({ bookId, rating, reviewerId, text }) {
    const existingReview = await this.get(
      `/reviews?bookId=${bookId}&userId=${reviewerId}`
    );

    if (existingReview.length) {
      throw new ForbiddenError('Users can only submit one review per book');
    }

    return this.post('/reviews', {
      ...(text && { text }),
      bookId: parseInt(bookId),
      createdAt: new Date().toISOString(),
      rating,
      userId: parseInt(reviewerId),
    });
  }

  updateReview({ id, rating, text }) {
    return this.patch(`reviews/${id}`, {
      rating,
      ...(text && { text }),
    });
  }

  async deleteReview(id) {
    await this.delete(`/reviews/${id}`);
    return id;
  }
}

module.exports = BibliotechApi;
