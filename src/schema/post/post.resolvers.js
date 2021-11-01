const resolvers = {
  Query: {
    posts: (parent, { query }, { db }) => {
      if (!query) {
        return db.PostList;
      }
      return db.PostList.filter((post) =>
        post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    },
  },
  Mutation: {
    createPost: (parent, { data }, { db, pubsub }) => {
      const userExists = db.UserList.some(
        (user) => user.id === Number(data.author)
      );
      if (!userExists) throw new Error("User does not exists!");
      const post = {
        id: "5",
        ...data,
      };
      db.PostList.push(post);

      if (data.published) {
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post,
          },
        });
      }
      return post;
    },
    deletePost: (parent, { id }, { db, pubsub }) => {
      const postIndex = db.PostList.findIndex((post) => post.id === Number(id));
      if (postIndex === -1) throw new Error("Post not found!");
      const [post] = db.PostList.splice(postIndex, 1);

      db.CommentList = db.CommentList.filter((comment) => comment.post !== id);

      if (post.published) {
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: post,
          },
        });
      }
      return post;
    },
    updatePost(parent, { id, data }, { db, pubsub }, info) {
      const post = db.PostList.find((post) => post.id === Number(id));
      const originalPost = { ...post };

      if (!post) {
        throw new Error("Post not found");
      }

      if (typeof data.title === "string") {
        post.title = data.title;
      }

      if (typeof data.body === "string") {
        post.body = data.body;
      }

      if (typeof data.published === "boolean") {
        post.published = data.published;

        if (originalPost.published && !post.published) {
          pubsub.publish("post", {
            post: {
              mutation: "DELETED",
              data: originalPost,
            },
          });
        } else if (!originalPost.published && post.published) {
          pubsub.publish("post", {
            post: {
              mutation: "CREATED",
              data: post,
            },
          });
        }
      } else if (post.published) {
        pubsub.publish("post", {
          post: {
            mutation: "UPDATED",
            data: post,
          },
        });
      }

      return post;
    },
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.UserList.find((user) => {
        return user.id === Number(parent.author);
      });
    },
    comments(parent, args, { db }, info) {
      return db.CommentList.filter((comment) => {
        return comment.post === Number(parent.id);
      });
    },
  },
};

export default resolvers;
