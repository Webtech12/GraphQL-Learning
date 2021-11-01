import { gql } from "apollo-server-express";

const commentType = gql`
  type Query {
    comments(query: Int): [Comment!]!
  }

  type Mutation {
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: Int!): Comment!
  }

  input CreateCommentInput {
    text: String!
    author: Int!
    post: Int!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

export default commentType;
