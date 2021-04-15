require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import * as express from "express";
import * as logger from "morgan";
import client from "../src/client";
import * as http from "http";

const PORT = process.env.PORT;

//서버는 http , ws 두가지 프로토콜을 다룰수있다.

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    }
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

const httpSever = http.createServer(app);
apollo.installSubscriptionHandlers(httpSever);

//httpSever상에서 listen 한다.
httpSever.listen(PORT, () =>
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql`)
);
