import { gql } from "apollo-server-express";

import userResolver from "./user/user.resolvers";
import postResolver from "./post/post.resolvers";
import commentResolver from "./comment/comment.resolvers";
import subscriptionResolver from "./Subscription";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
  }

  type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
    post: PostSubscriptionPayload!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  input UpdateCommentInput {
    text: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  type PostSubscriptionPayload {
    mutation: MutationType!
    data: Post!
  }

  type CommentSubscriptionPayload {
    mutation: MutationType!
    data: Comment!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [
    userResolver,
    postResolver,
    commentResolver,
    subscriptionResolver,
  ],
});

export default schema;

// import { stitchSchemas } from "@graphql-tools/stitch";
// import userSchema from "./user";
// import postSchema from "./post";
// import commentSchema from "./comment";

// // build the combined schema
// const schema = stitchSchemas({
//   subschemas: [userSchema, postSchema, commentSchema],
// });

// export default schema;
