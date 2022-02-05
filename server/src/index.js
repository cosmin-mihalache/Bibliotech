const { ApolloServer } = require('apollo-server');
const BibliotechAPI = require('./datasources/bibliotech-api');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        bibliotechAPI: new BibliotechAPI(),
      };
    },
  });

  const { url, port } = await server.listen({
    port: process.env.PORT || 4000,
  });

  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
