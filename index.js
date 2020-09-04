import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './types/index';
import resolvers from './resolvers/index';
import models from './models';
import initServices from './services';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({
    models,
    user: { id: 1 },
    services: initServices(models),
    SECRET: '123', // TODO store randomly generated secret
    REFRESHSECRET: '456', // TODO store refresh secret in user
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
