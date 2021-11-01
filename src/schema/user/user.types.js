import { gql } from "apollo-server-express";

const userType = gql`
  type Query {
    users(query: String): [User!]!
    me: User!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: Int!): User!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int
  }

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
`;

export default userType;
