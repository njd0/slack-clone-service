import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './types/index';
import resolvers from './resolvers/index';
import models from './models';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({
    models,
    user: { id: 1 },
  }),
});

const app = express();
app.use(cors('*'));
app.use(bodyParser.json());

server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 8080 }, () => {
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
  });
});
