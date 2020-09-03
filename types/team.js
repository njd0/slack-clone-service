import { gql } from 'apollo-server-express';

export default gql`
  type Team {
    id: Int!,
    owner: User!,
    members: [User!]!,
    channels: [Channel!]!,
  }

  type Query {
    getTeam(id: String!): Team,
  }

  type Mutation {
    createTeam(name: String!): Team!
  }
`;
