import { gql } from "apollo-server-express";

const postType = gql`
  type Query {
    posts(query: String): [Post!]!
  }

  type Mutation {
    createPost(data: CreatePostInput): Post!
    deletePost(id: Int!): Post!
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
`;

export default postType;
