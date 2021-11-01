const resolvers = {
  Query: {
    me: () => {
      return {
        name: "as",
      };
    },
    users: (parent, { query }, { db }) => {
      if (!query) {
        return db.UserList;
      }
      return db.UserList.filter((user) =>
        user.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    },
  },
  Mutation: {
    createUser: (parent, { data }, { db }) => {
      const usernameTaken = db.UserList.some(
        (user) => user.username === data.username
      );
      if (usernameTaken) throw new Error("Username exists!");
      const user = {
        id: 5,
        ...data,
      };
      db.UserList.push(user);
      return user;
    },
    deleteUser: (parent, { id }, { db }) => {
      const userIndex = db.UserList.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error("User not found!");
      const deletedUsers = db.UserList.splice(userIndex, 1);

      PostList = PostList.filter((post) => {
        const match = post.author === id;
        if (match) {
          CommentList = CommentList.filter(
            (comment) => comment.post !== post.id
          );
        }
        return !match;
      });

      CommentList = CommentList.filter((comment) => comment.author !== id);

      return deletedUsers[0];
    },
    updateUser: (parent, { id, data }, { db }) => {
      const user = db.UserList.find((user) => user.id === Number(id));

      if (!user) {
        throw new Error("User not found");
      }

      if (typeof data.email === "string") {
        const emailTaken = db.UserList.some(
          (user) => user.email === data.email
        );

        if (emailTaken) {
          throw new Error("Email taken");
        }

        user.email = data.email;
      }

      if (typeof data.name === "string") {
        user.name = data.name;
      }

      if (typeof data.age !== "undefined") {
        user.age = data.age;
      }

      return user;
    },
  },
  User: {
    posts: (parent, args, { db }) => {
      return db.PostList.filter((post) => post.author === parent.id);
    },
    comments: (parent, args, { db }) => {
      return db.CommentList.filter((comment) => comment.author === parent.id);
    },
  },
};

export default resolvers;
