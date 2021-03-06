import { gql } from 'apollo-server-express';

export default gql`
  type User { 
    id: Int!
    email: String!
    username: String!
    teams: [Team!]!
  } 

  type Query {
    getUser(id: Int!): User
    getUsers: [User!]!
  }

  type RegisterResponse {
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
