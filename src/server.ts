require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import * as express from "express";
import * as logger from "morgan";
import client from "../src/client";
import pubsub from "./pubsub";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();
//subscribe에 대한 지식을 서버에 설치
apollo.installSubscriptionHandlers(app);
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql`)
);
