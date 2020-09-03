import { gql } from 'apollo-server-express';

export default gql`
  type Channel {
    id: Int!,
    messages: [Message!]!,
    public: Boolean!,
    users: [User!]!,
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean): Channel!
  }
`;
