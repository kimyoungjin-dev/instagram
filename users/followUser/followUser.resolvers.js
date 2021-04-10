import client from "../../client";
import { protectedResolver } from "../users.utils";

//username : 상희
//loggedInUser.username : 영진
export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      //유저가 존재하는지 체크를 먼저한다.
      console.log(username, loggedInUser.username);
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "User is Not exist",
        };
      }
      //update를 사용한다는것에 주의하자
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
