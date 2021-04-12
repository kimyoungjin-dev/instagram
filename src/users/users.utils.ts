import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver: Resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      console.log(query);
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "수정 할 수 없습니다. 로그인 후 진행하세요",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}
