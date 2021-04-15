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
  //ctx를 사용해준 이유는 context는 http // websocket이 될수도 있기 때문이다.
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return { loggedInUser: context.loggedInUser };
    }
  },
  //onConnect을 이용 => user 인증한다.
  subscriptions: {
    onConnect: async ({ token }: { token?: string }) => {
      if (!token) {
        throw new Error("You can`t listen");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
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
