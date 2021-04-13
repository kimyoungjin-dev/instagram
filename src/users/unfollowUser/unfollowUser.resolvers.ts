import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const checkUser = await client.user.findUnique({
          where: {
            username,
          },
          select: { id: true },
        });
        if (!checkUser) {
          return {
            ok: false,
            error: "Can`t find User",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
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
