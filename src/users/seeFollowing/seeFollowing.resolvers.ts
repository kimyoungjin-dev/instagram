import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId }, { loggedInUser, client }) => {
      const checkUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!checkUser) {
        return {
          ok: false,
          error: "Cant find User",
        };
      }

      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;
