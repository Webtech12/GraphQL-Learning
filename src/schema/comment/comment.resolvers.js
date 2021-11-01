const resolvers = {
  Query: {
    comments: (parent, { query }, { db, pubsub }) => {
      return db.CommentList;
    },
  },
  Mutation: {
    createComment: (parent, { data }, { db, pubsub }) => {
      const userExists = db.UserList.some(
        (user) => user.id === Number(data.author)
      );
      if (!userExists) throw new Error("User does not exists!");
      const comment = {
        id: 5,
        ...data,
      };
      db.CommentList.push(comment);

      pubsub.publish(`comment ${Number(data.post)}`, {
        comment: {
          mutation: "CREATED",
          data: comment,
        },
      });
      return comment;
    },
    deleteComment: (parent, { id }, { db, pubsub }) => {
      const commentIndex = db.CommentList.findIndex(
        (comment) => comment.id === id
      );
      if (commentIndex === -1) throw new Error("Comment not found!");

      const [deletedComment] = db.CommentList.splice(commentIndex, 1);
      pubsub.publish(`comment ${Number(deletedComment.post)}`, {
        comment: {
          mutation: "DELETED",
          data: deletedComment,
        },
      });

      return deletedComment;
    },
    updateComment(parent, { id, data }, { db, pubsub }, info) {
      const comment = db.CommentList.find(
        (comment) => comment.id === Number(id)
      );

      if (!comment) {
        throw new Error("Comment not found");
      }

      if (typeof data.text === "string") {
        comment.text = data.text;
      }

      pubsub.publish(`comment ${Number(comment.post)}`, {
        comment: {
          mutation: "UPDATED",
          data: comment,
        },
      });

      return comment;
    },
  },
  Comment: {
    author: (parent, args, { db, pubsub }) => {
      return db.UserList.find((user) => user.id === Number(parent.author));
    },
    post: (parent, args, { db, pubsub }) => {
      return db.PostList.find((post) => post.id === Number(parent.post));
    },
  },
};

export default resolvers;
