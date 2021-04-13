import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      const searchUser = await client.user.findMany({
        where: {
          username: { contains: keyword.toLowerCase() },
        },
        take: 1,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      const totalCount = await client.user.count({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          },
        },
      });

      return {
        ok: true,
        searchUser,
        totalUser: Math.ceil(totalCount),
        totalPages: Math.ceil(totalCount / 5),
      };
    },
  },
};

export default resolvers;
