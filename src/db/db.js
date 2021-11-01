let UserList = [
  {
    id: 1,
    name: "Johns",
    username: "john",
    age: 20,
    nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
      },
      {
        id: 5,
        name: "Kelly",
        username: "kelly2019",
        age: 5,
        nationality: "CHILE",
      },
    ],
  },
  {
    id: 2,
    name: "Pedro",
    username: "PedroTech",
    age: 20,
    nationality: "BRAZIL",
  },
  {
    id: 3,
    name: "Sarah",
    username: "cameron",
    age: 25,
    nationality: "INDIA",
    friends: [
      {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
      },
    ],
  },
  {
    id: 4,
    name: "Kelly",
    username: "kelly2019",
    age: 5,
    nationality: "CHILE",
  },
];

let PostList = [
  {
    id: 1,
    title: "Avengers Endgame",
    body: "body",
    published: true,
    author: 1,
  },
  {
    id: 2,
    title: "Interstellar",
    body: "body",
    isInTheaters: true,
    author: 2,
  },
  {
    id: 3,
    title: "Superbad",
    body: "body",
    isInTheaters: true,
    author: 3,
  },
  {
    id: 4,
    title: "PedroTech The Movie",
    body: "body",
    isInTheaters: false,
    author: 0,
  },
];

let CommentList = [
  {
    id: 1,
    text: "comment 1",
    author: 2,
    post: 4,
  },
  {
    id: 2,
    text: "comment 2",
    author: 1,
    post: 3,
  },
  {
    id: 3,
    text: "comment 3",
    author: 1,
    post: 2,
  },
  {
    id: 4,
    text: "comment 4",
    author: 3,
    post: 1,
  },
];

const db = { UserList, PostList, CommentList };

export { db as default };
