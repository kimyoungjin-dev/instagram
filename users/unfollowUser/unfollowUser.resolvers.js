import client from "../../client";
import { protectedResolver } from "../users.utils";

//protectedResolver를 사용해준다.

// username:상희
// loggedInUser : 영진
export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        //username(상희)가 존재하지않는다면, return false
        const ok = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Can find User",
          };
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                //connect 반대
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
