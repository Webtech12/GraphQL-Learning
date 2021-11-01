import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { PubSub } from "graphql-subscriptions";

import schema from "./schema";
import db from "./db/db";

const pubsub = new PubSub();

async function startApolloServer(schema, db) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onOperation: (message, params) => {
        return { ...params, context: { db, pubsub } };
      },
    },
    { server: httpServer, path: "/" }
  );

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context: {
      db,
      pubsub,
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  // [ApolloServerPluginDrainHttpServer({ httpServer })]

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema, db);
