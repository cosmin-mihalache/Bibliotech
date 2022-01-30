import fetch from 'node-fetch';

const baseURL = 'http://localhost:5000';

const resolvers = {
  Author: {
    async books(author, args, context, info) {
      const res = await fetch(`${baseURL}/authors/${author.id}/books`);
      const items = await res.json();
      return items.map((item) => item.book);
    },
  },
  Book: {
    async authors(book, args, context, info) {
      const res = await fetch(`${baseURL}/books/${book.id}.authors`);
      const items = await res.json();
      return items.map((item) => item.author);
    },
  },
  Query: {
    async author(root, { id }, context, info) {
      // Fetch an author by ID here...
      const res = await fetch(`${baseURL}/authors/${id}`).catch(
        (err) => err.message === '404: Not Found' && null
      );
      return res.json();
    },
    async authors(root, args, context, info) {
      // Fetch all authors here...
      const res = await fetch(`${baseURL}/authors`);
      return res.json();
    },
    async book(root, { id }, context, info) {
      // Fetch an book by ID here...
      const res = await fetch(`${baseURL}/books/${id}`).catch(
        (err) => err.message === '404: Not Found' && null
      );
      return res.json();
    },
    async books(root, args, context, info) {
      // Fetch all books here...
      const res = await fetch(`${baseURL}/books`);
      return res.json();
    },
  },
};

export default resolvers;
