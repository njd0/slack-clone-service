import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(bodyParser.json());

server.applyMiddleware({ app });

app.listen({ port: 8080 }, () => {
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
});
